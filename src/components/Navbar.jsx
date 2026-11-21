import React from 'react';
import { 
  Zap, 
  Target, 
  FileText, 
  Send, 
  Kanban, 
  BookOpen, 
  ExternalLink,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, totalPipelineValue }) {
  const tabs = [
    { id: 'dashboard', name: 'Executive Overview', icon: Zap },
    { id: 'offer', name: '$100M Offer Architect', icon: Target },
    { id: 'campaign', name: 'Persuasion Copy Studio', icon: Send },
    { id: 'proposal', name: 'Client Proposal Deck', icon: FileText },
    { id: 'pipeline', name: 'Deal Pipeline CRM', icon: Kanban },
    { id: 'playbook', name: 'Empire Playbook', icon: BookOpen },
  ];

  return (
    <header className="border-b border-dark-600 bg-dark-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-accent flex items-center justify-center shadow-lg shadow-brand-500/20">
              <Sparkles className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight text-white">ClientPulse</span>
                <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
                  AI OS
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-medium">Founder & Client Acquisition Suite</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-500/10 text-brand-accent border border-brand-accent/30 shadow-sm shadow-brand-accent/10'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-dark-700/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-accent' : 'text-gray-400'}`} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Metrics & User Badge */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Active Pipeline</span>
              <span className="text-sm font-extrabold text-brand-accent">
                ${totalPipelineValue.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center space-x-2 pl-3 border-l border-dark-600">
              <div className="w-8 h-8 rounded-full bg-dark-700 border border-brand-500/40 flex items-center justify-center text-xs font-bold text-white">
                SB
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-gray-200 leading-none">Samarth (Aditya)</p>
                <p className="text-[10px] text-brand-400 font-medium leading-tight">Founder & CEO</p>
              </div>
            </div>
          </div>

        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden overflow-x-auto py-2 space-x-1 border-t border-dark-700/50">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs whitespace-nowrap font-medium ${
                  isActive
                    ? 'bg-brand-500/20 text-brand-accent border border-brand-accent/30'
                    : 'text-gray-400 hover:bg-dark-700/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
