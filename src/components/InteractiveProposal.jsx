import React, { useState } from 'react';
import { 
  FileText, 
  DollarSign, 
  Calculator, 
  CheckCircle, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  User, 
  Building2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InteractiveProposal({ selectedNiche }) {
  const [clientName, setClientName] = useState("Acme Healthcare Group");
  const [contactPerson, setContactPerson] = useState("Dr. Robert Sterling");

  // Interactive ROI Calculator State
  const [monthlyLeads, setMonthlyLeads] = useState(80);
  const [avgDealValue, setAvgDealValue] = useState(selectedNiche?.metrics?.avgCustomerValue || 1800);
  const [currentConversion, setCurrentConversion] = useState(6); // 6%
  const [selectedPlan, setSelectedPlan] = useState('growth'); // 'starter', 'growth', 'vip'
  const [isSigned, setIsSigned] = useState(false);

  // Calculations
  const currentRevenue = monthlyLeads * (currentConversion / 100) * avgDealValue;
  // With automated 90-sec speed-to-lead and anti-no-show, conversion jumps to 15%
  const optimizedConversion = 15;
  const projectedRevenue = monthlyLeads * (optimizedConversion / 100) * avgDealValue;
  const monthlyLeakage = Math.max(0, projectedRevenue - currentRevenue);
  const annualLeakage = monthlyLeakage * 12;

  const planPricing = {
    starter: { name: "Starter Audit & Blueprint", price: 997, recurring: false },
    growth: { name: "Growth Engine (Done-For-You)", price: 2497, recurring: true },
    vip: { name: "VIP Enterprise Takeover", price: 5997, recurring: true }
  };

  const handleSign = () => {
    setIsSigned(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      
      {/* Proposal Header Banner */}
      <div className="bg-gradient-to-r from-dark-800 via-dark-700 to-dark-800 border border-dark-600 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-dark-600">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-accent bg-brand-500/10 px-2.5 py-1 rounded border border-brand-accent/20">
              Confidential Business Proposal
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
              Automated Client Acquisition & Intake System
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Prepared for <span className="text-white font-semibold">{clientName}</span> • Lead Strategist: <span className="text-brand-accent">Samarth (Aditya)</span>
            </p>
          </div>

          <div className="bg-dark-900/80 border border-dark-600 rounded-xl p-3 text-xs space-y-1">
            <div className="flex items-center text-gray-300">
              <Building2 className="w-3.5 h-3.5 text-brand-accent mr-1.5" />
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="bg-transparent border-b border-dark-500 text-white font-bold outline-none focus:border-brand-accent text-xs"
              />
            </div>
            <div className="flex items-center text-gray-400">
              <User className="w-3.5 h-3.5 text-gray-400 mr-1.5" />
              <input
                type="text"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="bg-transparent border-b border-dark-500 text-gray-300 outline-none focus:border-brand-accent text-xs"
              />
            </div>
          </div>
        </div>

        {/* Executive Problem Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-dark-900/60 border border-dark-600">
            <span className="text-red-400 font-bold block mb-1">01. The Bleeding Leak</span>
            <p className="text-gray-300 leading-relaxed">
              Leads that arrive after 6 PM or on weekends wait an average of 14 hours for response, resulting in a 70%+ drop-off.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-dark-900/60 border border-dark-600">
            <span className="text-brand-accent font-bold block mb-1">02. The Done-For-You Fix</span>
            <p className="text-gray-300 leading-relaxed">
              Instant 90-second automated response, qualification triage, and calendar booking directly into your schedule.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-dark-900/60 border border-dark-600">
            <span className="text-purple-400 font-bold block mb-1">03. The Result</span>
            <p className="text-gray-300 leading-relaxed">
              Predicted 2.5x increase in qualified booked consultations with zero additional staffing expenses.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive ROI & Revenue Leakage Calculator */}
      <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6 glow-card">
        <div className="flex items-center space-x-2 text-xs font-bold text-brand-accent uppercase tracking-wider mb-2">
          <Calculator className="w-4 h-4" />
          <span>Interactive Financial Leakage Diagnostics</span>
        </div>
        <h2 className="text-lg font-bold text-white">
          See Exactly How Much Revenue You Are Leaving on the Table
        </h2>
        <p className="text-xs text-gray-400 mb-6">
          Adjust the sliders below to match your real business metrics:
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Sliders */}
          <div className="space-y-5 text-xs">
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-gray-300">Monthly Inquiries / Patient Leads</span>
                <span className="text-brand-accent text-sm font-mono">{monthlyLeads} leads/mo</span>
              </div>
              <input
                type="range"
                min="10"
                max="300"
                step="5"
                value={monthlyLeads}
                onChange={(e) => setMonthlyLeads(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-gray-300">Average Client / Case Lifetime Value</span>
                <span className="text-brand-accent text-sm font-mono">${avgDealValue.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="250"
                value={avgDealValue}
                onChange={(e) => setAvgDealValue(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-gray-300">Current Lead-to-Show Conversion Rate</span>
                <span className="text-red-400 text-sm font-mono">{currentConversion}%</span>
              </div>
              <input
                type="range"
                min="2"
                max="15"
                value={currentConversion}
                onChange={(e) => setCurrentConversion(Number(e.target.value))}
                className="w-full accent-red-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Real-time Financial Breakdown */}
          <div className="bg-dark-900 border border-dark-600 rounded-xl p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400">Monthly Uncaptured Revenue (The Leak)</span>
                <div className="text-3xl font-black text-red-400">
                  -${Math.round(monthlyLeakage).toLocaleString()} <span className="text-xs font-normal text-gray-400">/ mo</span>
                </div>
              </div>

              <div className="pt-3 border-t border-dark-700/60">
                <span className="text-[10px] uppercase font-bold text-gray-400">Annual Uncaptured Opportunity</span>
                <div className="text-2xl font-black text-white">
                  ${Math.round(annualLeakage).toLocaleString()} <span className="text-xs font-normal text-gray-400">/ yr</span>
                </div>
              </div>

              <div className="p-3 bg-brand-500/10 rounded-lg border border-brand-accent/20 text-xs text-brand-300">
                ⭐ <strong>ROI Breakdown:</strong> Our Growth Engine retainer is $2,497/mo. Recovering even 2 lost clients pays for the entire system, yielding an estimated <strong>{Math.round((monthlyLeakage / 2497) * 100)}% monthly ROI</strong>.
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Selectable Packages */}
      <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6 glow-card">
        <h2 className="text-base font-bold text-white mb-4">
          Select Your Implementation Tier
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(planPricing).map(([key, plan]) => {
            const isSelected = selectedPlan === key;
            return (
              <div
                key={key}
                onClick={() => setSelectedPlan(key)}
                className={`p-5 rounded-xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-dark-700/80 border-brand-accent shadow-md shadow-brand-accent/10'
                    : 'bg-dark-900 border-dark-600 hover:border-dark-500'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-gray-300 uppercase">{plan.name}</span>
                  {isSelected && <CheckCircle className="w-4 h-4 text-brand-accent" />}
                </div>
                <div className="text-2xl font-black text-white mt-2">
                  ${plan.price.toLocaleString()}
                  {plan.recurring && <span className="text-xs font-normal text-gray-400"> / mo</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* 100% Risk Reversal Guarantee Callout */}
        <div className="mt-6 p-4 rounded-xl bg-dark-900 border border-emerald-500/30 flex items-start space-x-3">
          <ShieldCheck className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
          <div className="text-xs text-gray-300 leading-relaxed">
            <strong className="text-white">Our 30-Day Zero-Risk Guarantee:</strong> If our automated client intake system doesn't generate at least 10 qualified booked consultations in your first 30 days, we refund 100% of your investment immediately. You bear zero financial risk.
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-5 border-t border-dark-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-400">
              Selected: <strong className="text-white">{planPricing[selectedPlan].name}</strong> (${planPricing[selectedPlan].price.toLocaleString()})
            </p>
          </div>

          <button
            onClick={handleSign}
            disabled={isSigned}
            className={`px-8 py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 ${
              isSigned
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-gradient-to-r from-brand-500 to-brand-accent text-black hover:opacity-95 shadow-lg shadow-brand-500/20 active:scale-95'
            }`}
          >
            {isSigned ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Proposal Accepted & Slot Reserved!</span>
              </>
            ) : (
              <>
                <span>Accept Proposal & Lock In Slot</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
