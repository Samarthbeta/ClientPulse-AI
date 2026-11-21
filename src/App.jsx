import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import OfferArchitect from './components/OfferArchitect';
import CampaignStudio from './components/CampaignStudio';
import InteractiveProposal from './components/InteractiveProposal';
import LeadPipeline from './components/LeadPipeline';
import BusinessKnowledge from './components/BusinessKnowledge';
import { NICHES } from './data/niches';

const INITIAL_LEADS = [
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

  // Load leads from LocalStorage or default to INITIAL_LEADS
  const [leads, setLeads] = useState(() => {
    try {
      const saved = localStorage.getItem('clientpulse_leads');
      return saved ? JSON.parse(saved) : INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  });

  // Save leads to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('clientpulse_leads', JSON.stringify(leads));
    } catch (e) {
      console.error('Failed to save leads to localStorage', e);
    }
  }, [leads]);

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
          />
        )}

        {activeTab === 'playbook' && (
          <BusinessKnowledge />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-700/60 bg-dark-900/50 py-6 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 ClientPulse AI • Built by Samarth (Aditya) • The $100M Client Engine</p>
          <div className="flex space-x-4 text-[11px] text-gray-400">
            <span className="text-brand-accent">MindFluence Engine Active</span>
            <span>•</span>
            <span>Vercel + Supabase Ready</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
