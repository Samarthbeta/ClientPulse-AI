import React, { useState } from 'react';
import { 
  Target, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Award, 
  Flame, 
  ArrowRight, 
  Copy, 
  Check, 
  DollarSign 
} from 'lucide-react';
import { NICHES } from '../data/niches';

export default function OfferArchitect({ selectedNiche, setSelectedNiche, setActiveTab }) {
  const [dreamOutcome, setDreamOutcome] = useState(selectedNiche?.dreamOutcome || "15 new booked high-ticket clients every 30 days");
  const [targetAudience, setTargetAudience] = useState(selectedNiche?.audience || "Clinic Owners & Doctors");
  const [timeToResult, setTimeToResult] = useState("14 Days");
  const [guaranteeType, setGuaranteeType] = useState("100% Money-Back + Pay You $500 for Wasting Your Time");
  
  // Hormozi Equation Sliders (1 to 10)
  const [dreamScore, setDreamScore] = useState(9);
  const [likelihoodScore, setLikelihoodScore] = useState(9);
  const [timeDelayScore, setTimeDelayScore] = useState(2); // Lower is better
  const [effortScore, setEffortScore] = useState(2); // Lower is better

  const [copied, setCopied] = useState(false);

  // Hormozi Value Formula
  const numerator = dreamScore * likelihoodScore;
  const denominator = Math.max(1, timeDelayScore * effortScore);
  const valueScore = Math.min(100, Math.round((numerator / denominator) * 10));

  const handleNicheChange = (nicheId) => {
    const found = NICHES.find(n => n.id === nicheId);
    if (found) {
      setSelectedNiche(found);
      setDreamOutcome(found.dreamOutcome);
      setTargetAudience(found.audience);
    }
  };

  const grandSlamOfferText = `We help ${targetAudience} achieve ${dreamOutcome} in ${timeToResult} with zero ad spend and zero extra staff hours—or ${guaranteeType}.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(grandSlamOfferText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-dark-600 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-brand-accent uppercase tracking-wider mb-1">
            <Target className="w-4 h-4" />
            <span>Alex Hormozi $100M Offer Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Grand Slam Offer Generator
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Make an offer so ridiculously good that people feel stupid saying no.
          </p>
        </div>

        {/* Niche selector dropdown */}
        <div className="flex items-center space-x-2">
          <label className="text-xs font-bold text-gray-400 whitespace-nowrap">Load Niche:</label>
          <select
            value={selectedNiche?.id || ''}
            onChange={(e) => handleNicheChange(e.target.value)}
            className="bg-dark-800 border border-dark-500 rounded-lg px-3 py-2 text-xs text-brand-accent font-semibold outline-none focus:border-brand-accent cursor-pointer"
          >
            {NICHES.map(n => (
              <option key={n.id} value={n.id}>{n.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid: Inputs & Live Value Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Offer Inputs */}
        <div className="lg:col-span-2 space-y-5 bg-dark-800 border border-dark-600 rounded-2xl p-6 glow-card">
          <h2 className="text-base font-bold text-white flex items-center">
            <Sparkles className="w-4 h-4 text-brand-accent mr-2" />
            <span>Core Offer Pillars</span>
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-300 mb-1">Target Client Audience</label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full bg-dark-900 border border-dark-500 rounded-xl px-4 py-2.5 text-white focus:border-brand-accent outline-none"
                placeholder="e.g. Private Clinic Owners, Real Estate Brokers"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-300 mb-1">Dream Outcome (The Irresistible Result)</label>
              <textarea
                rows={2}
                value={dreamOutcome}
                onChange={(e) => setDreamOutcome(e.target.value)}
                className="w-full bg-dark-900 border border-dark-500 rounded-xl p-3 text-white focus:border-brand-accent outline-none"
                placeholder="e.g. 20 qualified booked appointments per month on complete autopilot"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-300 mb-1">Time Delay to First Result</label>
                <input
                  type="text"
                  value={timeToResult}
                  onChange={(e) => setTimeToResult(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-500 rounded-xl px-4 py-2.5 text-white focus:border-brand-accent outline-none"
                  placeholder="e.g. 7 to 14 Days"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-300 mb-1">Risk-Reversal Guarantee</label>
                <input
                  type="text"
                  value={guaranteeType}
                  onChange={(e) => setGuaranteeType(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-500 rounded-xl px-4 py-2.5 text-white focus:border-brand-accent outline-none"
                  placeholder="e.g. 100% Refund or we work for free until you hit goal"
                />
              </div>
            </div>
          </div>

          {/* Hormozi Value Equation Sliders */}
          <div className="pt-5 border-t border-dark-600 space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
              The Hormozi Value Equation Diagnostics
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-gray-300">Dream Outcome Intensity</span>
                  <span className="text-brand-accent">{dreamScore} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={dreamScore}
                  onChange={(e) => setDreamScore(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-gray-300">Perceived Likelihood (Trust)</span>
                  <span className="text-brand-accent">{likelihoodScore} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={likelihoodScore}
                  onChange={(e) => setLikelihoodScore(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-gray-300">Time Delay (Lower = Better)</span>
                  <span className="text-red-400">{timeDelayScore} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={timeDelayScore}
                  onChange={(e) => setTimeDelayScore(Number(e.target.value))}
                  className="w-full accent-red-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-gray-300">Client Effort & Sacrifice (Lower = Better)</span>
                  <span className="text-red-400">{effortScore} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={effortScore}
                  onChange={(e) => setEffortScore(Number(e.target.value))}
                  className="w-full accent-red-400 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Score & Output */}
        <div className="space-y-6">
          
          {/* Score Card */}
          <div className="bg-gradient-to-b from-dark-800 to-dark-900 border border-dark-600 rounded-2xl p-6 glow-card text-center relative overflow-hidden">
            <span className="text-xs uppercase font-extrabold tracking-wider text-gray-400">
              Offer Desirability Score
            </span>
            <div className="mt-2 flex items-center justify-center">
              <span className="text-5xl font-black text-brand-accent tracking-tight">
                {valueScore}
              </span>
              <span className="text-xl font-bold text-gray-400 ml-1">/ 100</span>
            </div>
            
            <p className="text-xs text-gray-300 mt-2 font-medium">
              {valueScore >= 75 
                ? "🔥 Grand Slam Offer! Clients will feel irresponsible saying no." 
                : "⚠️ Good start. Decrease client effort or increase your guarantee to raise conversions."}
            </p>

            <div className="mt-4 pt-4 border-t border-dark-600 text-left text-xs text-gray-400 space-y-1">
              <p>• High Perceived Likelihood: <strong className="text-brand-accent">Active Guarantee</strong></p>
              <p>• Zero Client Friction: <strong className="text-brand-accent">100% Done-For-You</strong></p>
            </div>
          </div>

          {/* Generated Grand Slam Statement */}
          <div className="bg-dark-800 border border-brand-500/30 rounded-2xl p-6 glow-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-brand-accent uppercase tracking-wider flex items-center">
                <Award className="w-4 h-4 mr-1.5" />
                <span>Your Grand Slam Pitch</span>
              </span>
              <button
                onClick={copyToClipboard}
                className="text-xs text-gray-300 hover:text-white flex items-center space-x-1 px-2.5 py-1 rounded bg-dark-700 border border-dark-500"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-brand-accent" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <p className="text-sm font-semibold text-gray-100 leading-relaxed italic bg-dark-900/80 p-3.5 rounded-xl border border-dark-600">
              "{grandSlamOfferText}"
            </p>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setActiveTab('campaign')}
                className="w-full inline-flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all"
              >
                <span>Write Campaign Copy</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* 3-Tier Value Ladder */}
      <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6 glow-card">
        <h2 className="text-base font-bold text-white mb-2">
          💎 3-Tier High-Ticket Pricing Matrix (The Anchoring Strategy)
        </h2>
        <p className="text-xs text-gray-400 mb-6">
          Always present three options. The high VIP anchor makes the Pro tier look like an undeniable steal.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="p-5 rounded-xl bg-dark-900 border border-dark-600 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase">Tier 1: Starter Audit</span>
              <div className="text-2xl font-black text-white mt-2">$997</div>
              <p className="text-xs text-gray-400 mt-1">One-time setup & diagnostic</p>
              <ul className="text-xs text-gray-300 mt-4 space-y-2">
                <li>✓ Full intake leakage audit</li>
                <li>✓ Setup of basic response flow</li>
                <li>✓ Standard email support</li>
              </ul>
            </div>
            <button 
              onClick={() => setActiveTab('proposal')}
              className="mt-6 w-full py-2 rounded-lg bg-dark-700 text-xs font-bold text-gray-300 hover:bg-dark-600"
            >
              Select for Pitch
            </button>
          </div>

          <div className="p-5 rounded-xl bg-dark-900 border-2 border-brand-accent shadow-lg shadow-brand-accent/10 flex flex-col justify-between relative">
            <span className="absolute -top-3 right-4 px-2 py-0.5 rounded-full bg-brand-accent text-black font-extrabold text-[10px] uppercase tracking-wider">
              Most Popular
            </span>
            <div>
              <span className="text-xs font-bold text-brand-accent uppercase">Tier 2: Growth Engine</span>
              <div className="text-2xl font-black text-white mt-2">
                $2,497 <span className="text-xs font-normal text-gray-400">/ mo</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Full done-for-you client system</p>
              <ul className="text-xs text-gray-300 mt-4 space-y-2">
                <li>✓ 24/7 instant lead qualification</li>
                <li>✓ Direct calendar booking integration</li>
                <li>✓ 100% Risk Reversal Guarantee</li>
                <li>✓ Dedicated Slack channel & weekly reports</li>
              </ul>
            </div>
            <button 
              onClick={() => setActiveTab('proposal')}
              className="mt-6 w-full py-2 rounded-lg bg-brand-500 text-xs font-bold text-black hover:bg-brand-400"
            >
              Select for Pitch
            </button>
          </div>

          <div className="p-5 rounded-xl bg-dark-900 border border-dark-600 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-purple-400 uppercase">Tier 3: VIP White-Glove</span>
              <div className="text-2xl font-black text-white mt-2">
                $5,997 <span className="text-xs font-normal text-gray-400">/ mo</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Full enterprise takeover</p>
              <ul className="text-xs text-gray-300 mt-4 space-y-2">
                <li>✓ Everything in Growth Engine</li>
                <li>✓ Multi-channel outreach management</li>
                <li>✓ Custom CRM integration</li>
                <li>✓ 24/7 priority phone response</li>
              </ul>
            </div>
            <button 
              onClick={() => setActiveTab('proposal')}
              className="mt-6 w-full py-2 rounded-lg bg-dark-700 text-xs font-bold text-gray-300 hover:bg-dark-600"
            >
              Select for Pitch
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
