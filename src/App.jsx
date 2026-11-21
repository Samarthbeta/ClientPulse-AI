import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import OfferArchitect from './components/OfferArchitect';
import CampaignStudio from './components/CampaignStudio';
import InteractiveProposal from './components/InteractiveProposal';
import LeadPipeline from './components/LeadPipeline';
import BusinessKnowledge from './components/BusinessKnowledge';
import AuthModal from './components/AuthModal';
import SettingsModal from './components/SettingsModal';
import { NICHES } from './data/niches';
import { 
  getSupabase, 
  getSupabaseConfig, 
  getCurrentSession, 
  signOutUser, 
  fetchUserLeads 
} from './services/supabase';

const INITIAL_DEMO_LEADS = [
  {
    id: '1',
    company: 'Apex Smiles Dental Group',
    contact: 'Dr. Sarah Jenkins (Owner)',
    value: 2500,
    niche: 'Dental Clinic',
    status: 'negotiation',
    date: 'Today'
  },
  {
    id: '2',
    company: 'Horizon Luxury Properties',
    contact: 'Marcus Vance (Managing Broker)',
    value: 3500,
    niche: 'Real Estate',
    status: 'proposal',
    date: 'Yesterday'
  },
  {
    id: '3',
    company: 'Vanguard Spine & Wellness',
    contact: 'Dr. David Cho',
    value: 2500,
    niche: 'Medical Clinic',
    status: 'won',
    date: 'Nov 18'
  },
  {
    id: '4',
    company: 'Titan Solar & Roofing',
    contact: 'Brad Miller (CEO)',
    value: 4500,
    niche: 'Home Services',
    status: 'contacted',
    date: 'Nov 16'
  },
  {
    id: '5',
    company: 'Elevate Peak Performance Gym',
    contact: 'Coach Alex Rivera',
    value: 1800,
    niche: 'Fitness Coaching',
    status: 'lead',
    date: 'Nov 15'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedNiche, setSelectedNiche] = useState(NICHES[0]);

  // Auth & System State
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [supabaseConfig, setSupabaseConfig] = useState(getSupabaseConfig());
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);

  // Leads State
  const [leads, setLeads] = useState(() => {
    try {
      const saved = localStorage.getItem('clientpulse_leads');
      return saved ? JSON.parse(saved) : INITIAL_DEMO_LEADS;
    } catch {
      return INITIAL_DEMO_LEADS;
    }
  });

  // Check auth session on startup
  useEffect(() => {
    const initAuth = async () => {
      const client = getSupabase();
      if (!client) return;

      try {
        const session = await getCurrentSession();
        if (session?.user) {
          setUser(session.user);
          loadCloudLeads();
        }

        // Listen for auth changes
        const { data: authListener } = client.auth.onAuthStateChange((event, session) => {
          setUser(session?.user || null);
          if (session?.user) {
            loadCloudLeads();
          } else {
            // Revert to local storage
            const saved = localStorage.getItem('clientpulse_leads');
            setLeads(saved ? JSON.parse(saved) : INITIAL_DEMO_LEADS);
          }
        });

        return () => {
          authListener?.subscription?.unsubscribe();
        };
      } catch (err) {
        console.warn('Supabase auth init check:', err);
      }
    };

    initAuth();
  }, [supabaseConfig.isConfigured]);

  const loadCloudLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const cloudLeads = await fetchUserLeads();
      if (cloudLeads && Array.isArray(cloudLeads)) {
        setLeads(cloudLeads);
      }
    } catch (err) {
      console.error('Failed to load cloud leads:', err);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  // Local storage backup when not logged in
  useEffect(() => {
    if (!user) {
      try {
        localStorage.setItem('clientpulse_leads', JSON.stringify(leads));
      } catch (e) {
        console.error('Failed to save leads to localStorage', e);
      }
    }
  }, [leads, user]);

  const handleSignOut = async () => {
    await signOutUser();
    setUser(null);
  };

  const handleSettingsUpdated = () => {
    setSupabaseConfig(getSupabaseConfig());
  };

  // Total Pipeline Calculations
  const totalPipelineValue = leads
    .filter(l => l.status !== 'lost')
    .reduce((sum, l) => sum + (Number(l.value) || 0), 0);

  const closedRevenue = leads
    .filter(l => l.status === 'won')
    .reduce((sum, l) => sum + (Number(l.value) || 0), 0);

  return (
    <div className="min-h-screen bg-[#0a0d0b] text-gray-100 flex flex-col selection:bg-brand-accent selection:text-black">
      
      {/* Navigation Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        totalPipelineValue={totalPipelineValue}
        user={user}
        isSupabaseConfigured={supabaseConfig.isConfigured}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onSignOut={handleSignOut}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard 
            leads={leads}
            setActiveTab={setActiveTab}
            setSelectedNiche={setSelectedNiche}
            totalPipelineValue={totalPipelineValue}
            closedRevenue={closedRevenue}
          />
        )}

        {activeTab === 'offer' && (
          <OfferArchitect 
            selectedNiche={selectedNiche}
            setSelectedNiche={setSelectedNiche}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'campaign' && (
          <CampaignStudio 
            selectedNiche={selectedNiche}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}

        {activeTab === 'proposal' && (
          <InteractiveProposal 
            selectedNiche={selectedNiche}
          />
        )}

        {activeTab === 'pipeline' && (
          <LeadPipeline 
            leads={leads}
            setLeads={setLeads}
            user={user}
            isSupabaseConfigured={supabaseConfig.isConfigured}
            onOpenAuth={() => setIsAuthOpen(true)}
            isLoadingLeads={isLoadingLeads}
          />
        )}

        {activeTab === 'playbook' && (
          <BusinessKnowledge />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-700/60 bg-dark-900/50 py-6 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 ClientPulse AI • Built by Samarth (Aditya)</p>
          <div className="flex space-x-4 text-[11px] text-gray-400">
            <span className={supabaseConfig.isConfigured ? "text-brand-accent" : "text-amber-400"}>
              {supabaseConfig.isConfigured ? "Supabase PostgreSQL RLS Active" : "Local Storage Mode"}
            </span>
            <span>•</span>
            <span>Google Gemini 2.0 Flash LLM</span>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(session) => setUser(session?.user || null)}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSettingsUpdated={handleSettingsUpdated}
      />

    </div>
  );
}
