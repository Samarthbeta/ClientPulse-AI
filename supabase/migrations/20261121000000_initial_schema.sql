-- ====================================================================
-- CLIENTPULSE AI — PRODUCTION SUPABASE POSTGRESQL SCHEMA WITH RLS
-- ====================================================================

-- 1. PROFILES TABLE (Linked to Supabase Auth users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  tier text default 'free',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;

create policy "Users can view own profile" 
  on public.profiles for select 
  using (auth.uid() = id);

create policy "Users can update own profile" 
  on public.profiles for update 
  using (auth.uid() = id);

-- 2. LEADS TABLE (Multi-tenant pipeline CRM)
create table if not exists public.leads (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  company text not null,
  contact text,
  email text,
  value numeric default 0,
  niche text,
  status text default 'lead', -- 'lead', 'contacted', 'proposal', 'negotiation', 'won', 'lost'
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for leads
alter table public.leads enable row level security;

create policy "Users can view own leads" 
  on public.leads for select 
  using (auth.uid() = user_id);

create policy "Users can insert own leads" 
  on public.leads for insert 
  with check (auth.uid() = user_id);

create policy "Users can update own leads" 
  on public.leads for update 
  using (auth.uid() = user_id);

create policy "Users can delete own leads" 
  on public.leads for delete 
  using (auth.uid() = user_id);

-- 3. CAMPAIGNS TABLE (AI-generated outreach and copies)
create table if not exists public.campaigns (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  niche text,
  channel text not null, -- 'email', 'linkedin', 'landing', 'vsl'
  biases text[] default '{}',
  prompt text,
  generated_copy text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for campaigns
alter table public.campaigns enable row level security;

create policy "Users can view own campaigns" 
  on public.campaigns for select 
  using (auth.uid() = user_id);

create policy "Users can insert own campaigns" 
  on public.campaigns for insert 
  with check (auth.uid() = user_id);

create policy "Users can delete own campaigns" 
  on public.campaigns for delete 
  using (auth.uid() = user_id);

-- 4. AUTOMATIC USER PROFILE TRIGGER
-- Automatically creates a row in public.profiles whenever a new user signs up in auth.users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id, 
    new.email, 
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger definition
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
