import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Database, 
  Sparkles, 
  Key, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink, 
  Copy, 
  Check 
} from 'lucide-react';
import { testSupabaseConnection, getSupabaseConfig } from '../services/supabase';
import { getGeminiApiKey, setGeminiApiKey, testGeminiApiKey } from '../services/ai';

export default function SettingsModal({ isOpen, onClose, onSettingsUpdated }) {
  const currentSupabase = getSupabaseConfig();
  const [supabaseUrl, setSupabaseUrl] = useState(currentSupabase.url);
  const [supabaseKey, setSupabaseKey] = useState(currentSupabase.key);
  const [supabaseStatus, setSupabaseStatus] = useState(null); // { ok: bool, message: string }
  const [testingSupabase, setTestingSupabase] = useState(false);

  const [geminiKey, setGeminiKey] = useState(getGeminiApiKey());
  const [geminiStatus, setGeminiStatus] = useState(null);
  const [testingGemini, setTestingGemini] = useState(false);

  const [copiedSql, setCopiedSql] = useState(false);

  if (!isOpen) return null;

  const handleTestSupabase = async () => {
    if (!supabaseUrl.trim() || !supabaseKey.trim()) {
      setSupabaseStatus({ ok: false, message: 'Please enter both Supabase URL and Anon Key.' });
      return;
    }
    setTestingSupabase(true);
    setSupabaseStatus(null);
    const res = await testSupabaseConnection(supabaseUrl.trim(), supabaseKey.trim());
    setTestingSupabase(false);
    if (res.ok) {
      setSupabaseStatus({ ok: true, message: 'Successfully connected to Supabase project!' });
    } else {
      setSupabaseStatus({ ok: false, message: `Connection failed: ${res.error}` });
    }
  };

  const handleTestGemini = async () => {
    if (!geminiKey.trim()) {
      setGeminiStatus({ ok: false, message: 'Please enter a Gemini API Key.' });
      return;
    }
    setTestingGemini(true);
    setGeminiStatus(null);
    const res = await testGeminiApiKey(geminiKey.trim());
    setTestingGemini(false);
    if (res.ok) {
      setGeminiStatus({ ok: true, message: 'Gemini 2.0 Flash API connected successfully!' });
    } else {
      setGeminiStatus({ ok: false, message: `Gemini API test failed: ${res.error}` });
    }
  };

  const handleSave = () => {
    if (supabaseUrl.trim()) {
      localStorage.setItem('cp_supabase_url', supabaseUrl.trim());
    } else {
      localStorage.removeItem('cp_supabase_url');
    }

    if (supabaseKey.trim()) {
      localStorage.setItem('cp_supabase_key', supabaseKey.trim());
    } else {
      localStorage.removeItem('cp_supabase_key');
    }

    setGeminiApiKey(geminiKey.trim());

    if (onSettingsUpdated) onSettingsUpdated();
    onClose();
  };

  const copySqlSchema = () => {
    const sql = `-- Run this in your Supabase SQL Editor:
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.profiles enable row level security;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);

create table if not exists public.leads (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  company text not null,
  contact text,
  value numeric default 0,
  niche text,
  status text default 'lead',
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.leads enable row level security;
create policy "Users can view own leads" on public.leads for select using (auth.uid() = user_id);
create policy "Users can insert own leads" on public.leads for insert with check (auth.uid() = user_id);
create policy "Users can update own leads" on public.leads for update using (auth.uid() = user_id);
create policy "Users can delete own leads" on public.leads for delete using (auth.uid() = user_id);`;

    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6 sm:p-8 max-w-xl w-full glow-card relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-dark-600">
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-accent/30 text-brand-accent flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-white">System Credentials & Backend</h2>
            <p className="text-xs text-gray-400">Configure real Supabase PostgreSQL and Google Gemini AI</p>
          </div>
        </div>

        <div className="space-y-6 text-xs">
          
          {/* SECTION 1: SUPABASE */}
          <div className="p-4 rounded-xl bg-dark-900 border border-dark-600 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-200 flex items-center">
                <Database className="w-4 h-4 text-emerald-400 mr-1.5" />
                <span>Supabase Cloud Database (PostgreSQL + Auth)</span>
              </span>
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-brand-accent hover:underline flex items-center"
              >
                <span>Dashboard</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>

            <div>
              <label className="block text-gray-400 font-semibold mb-1">Project URL</label>
              <input
                type="text"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                placeholder="https://your-project.supabase.co"
                className="w-full bg-dark-800 border border-dark-500 rounded-lg p-2.5 text-white outline-none focus:border-brand-accent font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block text-gray-400 font-semibold mb-1">Anon / Public API Key</label>
              <input
                type="password"
                value={supabaseKey}
                onChange={(e) => setSupabaseKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                className="w-full bg-dark-800 border border-dark-500 rounded-lg p-2.5 text-white outline-none focus:border-brand-accent font-mono text-[11px]"
              />
            </div>

            {supabaseStatus && (
              <div className={`p-2.5 rounded-lg flex items-start space-x-2 text-[11px] ${
                supabaseStatus.ok
                  ? 'bg-emerald-950/40 text-brand-300 border border-emerald-800/40'
                  : 'bg-red-950/40 text-red-300 border border-red-800/40'
              }`}>
                {supabaseStatus.ok ? <CheckCircle className="w-4 h-4 shrink-0 text-brand-accent" /> : <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />}
                <span>{supabaseStatus.message}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
              <button
                type="button"
                onClick={handleTestSupabase}
                disabled={testingSupabase}
                className="px-3 py-1.5 rounded-lg bg-dark-700 hover:bg-dark-600 text-gray-200 font-bold text-[11px] transition-colors"
              >
                {testingSupabase ? 'Testing...' : 'Test Supabase Connection'}
              </button>

              <button
                type="button"
                onClick={copySqlSchema}
                className="px-3 py-1.5 rounded-lg bg-dark-700 hover:bg-dark-600 text-gray-200 font-bold text-[11px] flex items-center space-x-1"
                title="Copy schema SQL to run in Supabase SQL editor"
              >
                {copiedSql ? <Check className="w-3.5 h-3.5 text-brand-accent" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSql ? 'SQL Copied!' : 'Copy SQL Schema'}</span>
              </button>
            </div>
          </div>

          {/* SECTION 2: GOOGLE GEMINI AI */}
          <div className="p-4 rounded-xl bg-dark-900 border border-dark-600 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-200 flex items-center">
                <Sparkles className="w-4 h-4 text-brand-accent mr-1.5" />
                <span>Google Gemini 2.0 Flash AI Integration</span>
              </span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-brand-accent hover:underline flex items-center"
              >
                <span>Get Free Key</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>

            <div>
              <label className="block text-gray-400 font-semibold mb-1">Gemini API Key</label>
              <div className="relative">
                <Key className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full bg-dark-800 border border-dark-500 rounded-lg pl-9 pr-3 py-2.5 text-white outline-none focus:border-brand-accent font-mono text-[11px]"
                />
              </div>
            </div>

            {geminiStatus && (
              <div className={`p-2.5 rounded-lg flex items-start space-x-2 text-[11px] ${
                geminiStatus.ok
                  ? 'bg-emerald-950/40 text-brand-300 border border-emerald-800/40'
                  : 'bg-red-950/40 text-red-300 border border-red-800/40'
              }`}>
                {geminiStatus.ok ? <CheckCircle className="w-4 h-4 shrink-0 text-brand-accent" /> : <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />}
                <span>{geminiStatus.message}</span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="button"
                onClick={handleTestGemini}
                disabled={testingGemini}
                className="px-3 py-1.5 rounded-lg bg-dark-700 hover:bg-dark-600 text-gray-200 font-bold text-[11px] transition-colors"
              >
                {testingGemini ? 'Testing AI...' : 'Test Gemini API Key'}
              </button>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-dark-600 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-dark-700 text-gray-300 font-bold hover:bg-dark-600 text-xs"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-accent text-black font-extrabold hover:opacity-95 text-xs uppercase tracking-wider"
          >
            Save Settings
          </button>
        </div>

      </div>
    </div>
  );
}
