import React from 'react';
import { 
  Zap, 
  Target, 
  FileText, 
  Send, 
  Kanban, 
  BookOpen, 
  Sparkles,
  Settings,
  LogIn,
  LogOut,
  Database,
  CloudOff,
  UserCheck
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  totalPipelineValue,
  user,
  isSupabaseConfigured,
  onOpenAuth,
  onOpenSettings,
  onSignOut
}) {
  const tabs = [
    { id: 'dashboard', name: 'Executive Overview', icon: Zap },
    { id: 'offer', name: '$100M Offer Architect', icon: Target },
    { id: 'campaign', name: 'AI Copy Studio', icon: Send },
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
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
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

          {/* Right Action Icons & User Profile */}
          <div className="flex items-center space-x-3">
            
            {/* Supabase Status Pill */}
            <button
              onClick={onOpenSettings}
              className={`hidden sm:flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                isSupabaseConfigured
                  ? 'bg-emerald-950/40 text-brand-300 border-emerald-800/40 hover:bg-emerald-900/40'
                  : 'bg-dark-800 text-gray-400 border-dark-600 hover:border-gray-500'
              }`}
              title={isSupabaseConfigured ? "Supabase PostgreSQL Connected" : "Running in Local Demo Mode (Click to configure Supabase)"}
            >
              {isSupabaseConfigured ? (
                <>
                  <Database className="w-3 h-3 text-brand-accent" />
                  <span>PostgreSQL Cloud</span>
                </>
              ) : (
                <>
                  <CloudOff className="w-3 h-3 text-amber-400" />
                  <span>Demo Mode</span>
                </>
              )}
            </button>

            {/* Settings Button */}
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-xl bg-dark-800 border border-dark-600 text-gray-300 hover:text-white hover:bg-dark-700 transition-colors"
              title="System Settings (Supabase & Gemini AI)"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* User Auth Section */}
            {user ? (
              <div className="flex items-center space-x-2 pl-2 border-l border-dark-600">
                <div className="flex flex-col text-right hidden lg:block">
                  <span className="text-xs font-bold text-gray-200 leading-none">
                    {user.user_metadata?.full_name || user.email.split('@')[0]}
                  </span>
                  <span className="text-[10px] text-brand-accent font-medium leading-tight">
                    Authenticated
                  </span>
                </div>
                <button
                  onClick={onSignOut}
                  className="p-2 rounded-xl bg-dark-800 border border-dark-600 text-gray-400 hover:text-red-400 hover:bg-dark-700 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                <LogIn className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Sign In</span>
              </button>
            )}

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
