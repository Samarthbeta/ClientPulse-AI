import { createClient } from '@supabase/supabase-js';

// Get config from env or localStorage
export function getSupabaseConfig() {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  const savedUrl = localStorage.getItem('cp_supabase_url');
  const savedKey = localStorage.getItem('cp_supabase_key');

  const url = envUrl || savedUrl || '';
  const key = envKey || savedKey || '';

  return { url, key, isConfigured: Boolean(url && key) };
}

let supabaseInstance = null;

export function getSupabase() {
  const { url, key, isConfigured } = getSupabaseConfig();
  if (!isConfigured) return null;

  if (!supabaseInstance || supabaseInstance.supabaseUrl !== url) {
    try {
      supabaseInstance = createClient(url, key, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        }
      });
    } catch (err) {
      console.error('Failed to initialize Supabase client:', err);
      return null;
    }
  }
  return supabaseInstance;
}

// === AUTH API ===
export async function signUpUser(email, password, fullName) {
  const client = getSupabase();
  if (!client) throw new Error('Supabase is not configured. Please configure your Supabase URL & Anon Key.');

  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName }
    }
  });
  if (error) throw error;
  return data;
}

export async function signInUser(email, password) {
  const client = getSupabase();
  if (!client) throw new Error('Supabase is not configured.');

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw error;
  return data;
}

export async function signOutUser() {
  const client = getSupabase();
  if (!client) return;
  const { error } = await client.auth.signOut();
  if (error) throw error;
}

export async function getCurrentSession() {
  const client = getSupabase();
  if (!client) return null;
  const { data } = await client.auth.getSession();
  return data?.session || null;
}

// === LEADS DATABASE API (ROW LEVEL SECURITY PROTECTED) ===
export async function fetchUserLeads() {
  const client = getSupabase();
  if (!client) return null;

  const { data, error } = await client
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createUserLead(leadData) {
  const client = getSupabase();
  if (!client) return null;

  const session = await getCurrentSession();
  if (!session?.user) throw new Error('You must be signed in to save leads to the database.');

  const { data, error } = await client
    .from('leads')
    .insert([
      {
        user_id: session.user.id,
        company: leadData.company,
        contact: leadData.contact,
        value: leadData.value,
        niche: leadData.niche,
        status: leadData.status || 'lead',
        notes: leadData.notes || ''
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateUserLead(id, updates) {
  const client = getSupabase();
  if (!client) return null;

  const { data, error } = await client
    .from('leads')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteUserLead(id) {
  const client = getSupabase();
  if (!client) return null;

  const { error } = await client
    .from('leads')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}

// Test connection
export async function testSupabaseConnection(url, key) {
  try {
    const testClient = createClient(url, key);
    const { error } = await testClient.from('profiles').select('count', { count: 'exact', head: true });
    // If error is code 42P01 (table doesn't exist yet), connection still works
    if (error && error.code !== '42P01' && error.message.includes('FetchError')) {
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}
