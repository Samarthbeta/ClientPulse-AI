# ClientPulse — Full-Stack Client Acquisition & Offer Platform

A modern full-stack web application designed for solopreneurs and agencies to model business offers, generate AI-powered outreach copy using behavioral economics, and manage deal pipelines with real multi-tenant cloud storage.

---

## 🏗️ Architecture & Stack

| Layer | Technology | Description |
|---|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide Icons | Responsive single-page application with dark mode UI |
| **Authentication** | Supabase Auth | Email/password registration, secure session tokens, password validation |
| **Database** | PostgreSQL (Supabase) | Multi-tenant schema with **Row Level Security (RLS)** ensuring users only access their own data |
| **AI Integration** | Google Gemini 2.0 Flash REST API | Real dynamic LLM generation for multi-channel sales copy |
| **Offline Mode** | Browser `localStorage` | Seamless fallback when cloud credentials are not linked |

---

## 📂 Database Schema (PostgreSQL + RLS)

The database schema is located at [`supabase/schema.sql`](supabase/schema.sql).

### Tables:
1. `public.profiles`: Stores user metadata (linked to `auth.users` on cascade delete).
2. `public.leads`: Stores pipeline prospects (company, contact, deal value, niche, status, notes).
3. `public.campaigns`: Stores AI-generated copy and campaign history.

### Row Level Security (RLS):
Every table enforces user isolation so no customer or deal data is accessible across accounts:
```sql
alter table public.leads enable row level security;
create policy "Users can view own leads" on public.leads for select using (auth.uid() = user_id);
create policy "Users can insert own leads" on public.leads for insert with check (auth.uid() = user_id);
create policy "Users can update own leads" on public.leads for update using (auth.uid() = user_id);
create policy "Users can delete own leads" on public.leads for delete using (auth.uid() = user_id);
```

---

## 🚀 Getting Started

### 1. Local Development
```bash
# Clone the repository
git clone https://github.com/Samarthbeta/ClientPulse-AI.git
cd ClientPulse-AI

# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Connect Supabase Backend (Optional for Cloud Sync)
1. Create a free project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** in Supabase and run the queries inside [`supabase/schema.sql`](supabase/schema.sql).
3. Copy your **Project URL** and **Anon Public Key** from **Project Settings → API**.
4. Click the **Settings (⚙️)** icon in the ClientPulse app header and paste your credentials.

### 3. Connect Google Gemini AI (For Live Dynamic Generation)
1. Get a free API key at [aistudio.google.com](https://aistudio.google.com/app/apikey).
2. In the ClientPulse app, open **Settings (⚙️)** and enter your Gemini API key.
3. Test the connection and start generating custom dynamic campaigns.

---

## 🛠️ Features

* **$100M Offer Architect**: Mathematical modeling based on Alex Hormozi's Value Equation ($\text{Value} = \frac{\text{Outcome} \times \text{Likelihood}}{\text{Delay} \times \text{Effort}}$).
* **AI Copy Studio**: Live integration with Google Gemini 2.0 Flash to generate customized cold emails, LinkedIn DMs, landing page copy, and video scripts.
* **Interactive Proposal Deck**: Client-facing digital proposal with an interactive financial leakage calculator.
* **Deal Pipeline CRM**: Visual Kanban board to track leads from initial identification to closed contracts.
