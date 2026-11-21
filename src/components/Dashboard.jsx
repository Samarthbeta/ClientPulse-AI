import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  CheckCircle2, 
  ArrowUpRight, 
  ShieldAlert, 
  Target, 
  Send, 
  FileText, 
  Flame, 
  Sparkles,
  Award
} from 'lucide-react';
import { NICHES } from '../data/niches';

export default function Dashboard({ 
  leads, 
  setActiveTab, 
  setSelectedNiche, 
  totalPipelineValue, 
  closedRevenue 
}) {
  const activeDealsCount = leads.filter(l => l.status !== 'won' && l.status !== 'lost').length;
  const wonDealsCount = leads.filter(l => l.status === 'won').length;
  const winRate = leads.length > 0 ? Math.round((wonDealsCount / leads.length) * 100) : 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-dark-800 via-dark-700 to-dark-800 border border-dark-600 p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-accent/30 text-brand-accent text-xs font-semibold mb-4">
            <Flame className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
            <span>Autonomous Agency & SaaS Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Stop Trading Time for Pennies. <br />
            <span className="bg-gradient-to-r from-brand-accent to-emerald-400 bg-clip-text text-transparent">
              Build a High-Ticket Client Empire.
            </span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
            You have the complete stack: high-converting cognitive bias copy, Alex Hormozi $100M offer architecture, interactive client proposal decks, and real-time deal pipeline management.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('offer')}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-accent text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-lg shadow-brand-500/20 active:scale-95"
            >
              <Target className="w-4 h-4 stroke-[2.5]" />
              <span>Architect $100M Offer</span>
            </button>
            <button
              onClick={() => setActiveTab('campaign')}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-dark-700 border border-dark-500 text-gray-200 font-bold text-xs uppercase tracking-wider hover:bg-dark-600 transition-all active:scale-95"
            >
              <Send className="w-4 h-4 text-brand-accent" />
              <span>Generate Cold Pitch</span>
            </button>
            <button
              onClick={() => setActiveTab('proposal')}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-dark-700 border border-dark-500 text-gray-200 font-bold text-xs uppercase tracking-wider hover:bg-dark-600 transition-all active:scale-95"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Open Interactive Proposal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Level Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="bg-dark-800 border border-dark-600 rounded-xl p-5 glow-card relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Pipeline</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-brand-accent flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              ${totalPipelineValue.toLocaleString()}
            </div>
            <p className="text-xs text-gray-400 mt-1 flex items-center">
              <span className="text-brand-accent font-semibold flex items-center mr-1">
                <TrendingUp className="w-3 h-3 mr-0.5" /> {activeDealsCount}
              </span>
              active deal opportunities
            </p>
          </div>
        </div>

        <div className="bg-dark-800 border border-dark-600 rounded-xl p-5 glow-card relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Closed Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-accent flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-brand-accent">
              ${closedRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-gray-400 mt-1 flex items-center">
              <CheckCircle2 className="w-3 h-3 text-brand-accent mr-1" />
              {wonDealsCount} contracts successfully won
            </p>
          </div>
        </div>

        <div className="bg-dark-800 border border-dark-600 rounded-xl p-5 glow-card relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Conversion Rate</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              {winRate}%
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Based on {leads.length} recorded leads
            </p>
          </div>
        </div>

        <div className="bg-dark-800 border border-dark-600 rounded-xl p-5 glow-card relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Avg Deal Size</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              ${leads.length > 0 ? Math.round(totalPipelineValue / Math.max(1, leads.length)).toLocaleString() : '3,500'}
            </div>
            <p className="text-xs text-purple-400 mt-1 font-medium">
              High-Ticket Retainer Target
            </p>
          </div>
        </div>

      </div>

      {/* High-Ticket Niche Scanner */}
      <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6 glow-card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-dark-600 gap-2">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center">
              <Sparkles className="w-5 h-5 text-brand-accent mr-2" />
              <span>High-Ticket Niche Opportunities (Ready to Pitch)</span>
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Select an industry to immediately load psychological fear triggers and tailored offer architectures.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-dark-700 text-brand-accent border border-brand-accent/20 font-semibold self-start sm:self-auto">
            {NICHES.length} Verified Niches
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {NICHES.map((niche) => (
            <div
              key={niche.id}
              className="group bg-dark-900/60 border border-dark-600 hover:border-brand-500/50 rounded-xl p-4 transition-all duration-200 hover:bg-dark-700/30 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-sm text-gray-100 group-hover:text-brand-accent transition-colors">
                    {niche.name}
                  </h3>
                  <span className="text-[11px] font-extrabold text-brand-accent bg-brand-500/10 px-2 py-0.5 rounded border border-brand-accent/20">
                    ${niche.metrics.avgCustomerValue.toLocaleString()} / deal
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1 font-medium">
                  Audience: <span className="text-gray-300">{niche.audience}</span>
                </p>

                <div className="mt-3 p-2.5 rounded-lg bg-red-950/20 border border-red-900/30 text-[11px] text-red-300 leading-snug">
                  <span className="font-bold text-red-400 flex items-center mb-1">
                    <ShieldAlert className="w-3 h-3 mr-1" /> Bleeding Pain Point:
                  </span>
                  {niche.painPoint}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-dark-700/60 flex items-center justify-between">
                <span className="text-[11px] text-gray-400">
                  ~{niche.metrics.missedLeadsPerMonth} missed leads/mo
                </span>
                <button
                  onClick={() => {
                    setSelectedNiche(niche);
                    setActiveTab('offer');
                  }}
                  className="inline-flex items-center text-xs font-bold text-brand-accent group-hover:translate-x-1 transition-transform"
                >
                  <span>Build Pitch</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The 5-Phase Founder Path */}
      <div className="bg-gradient-to-b from-dark-800 to-dark-900 border border-dark-600 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-2">
          🗺️ Your Path from Solopreneur to 7-Figure Boss
        </h2>
        <p className="text-xs text-gray-400 mb-6">
          Follow the exact system that separates stressed freelancers from multi-client agency owners.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-dark-700/50 border border-dark-500">
            <span className="text-xs font-extrabold text-brand-accent">STAGE 1</span>
            <h4 className="font-bold text-sm text-white mt-1">High-Ticket Offer</h4>
            <p className="text-xs text-gray-400 mt-1">
              Stop charging hourly. Create an outcome-based offer ($1,500 - $3,000) with a money-back guarantee.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-dark-700/50 border border-dark-500">
            <span className="text-xs font-extrabold text-brand-accent">STAGE 2</span>
            <h4 className="font-bold text-sm text-white mt-1">Fear-Driven Outreach</h4>
            <p className="text-xs text-gray-400 mt-1">
              Send 20 personalized audit pitches/day using the MindFluence Loss Aversion & System Blame copy.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-dark-700/50 border border-dark-500">
            <span className="text-xs font-extrabold text-brand-accent">STAGE 3</span>
            <h4 className="font-bold text-sm text-white mt-1">Digital Proposal Closer</h4>
            <p className="text-xs text-gray-400 mt-1">
              Send our interactive ROI deck. Show them how much revenue they are losing every single month.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-dark-700/50 border border-brand-accent/30 bg-brand-500/5">
            <span className="text-xs font-extrabold text-brand-accent">STAGE 4</span>
            <h4 className="font-bold text-sm text-white mt-1">Delegation & Empire</h4>
            <p className="text-xs text-gray-400 mt-1">
              Once you hit 5 recurring clients ($10k/mo), hire offshore contractors to do the fulfillment while you steer.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
