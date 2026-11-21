import React, { useState } from 'react';
import { 
  Send, 
  Copy, 
  Check, 
  Sparkles, 
  Mail, 
  MessageSquare, 
  Globe, 
  Video, 
  ShieldAlert, 
  Zap, 
  Brain 
} from 'lucide-react';
import { COGNITIVE_BIASES } from '../data/cognitiveBiases';

export default function CampaignStudio({ selectedNiche }) {
  const [activeFormat, setActiveFormat] = useState('email');
  const [selectedBiases, setSelectedBiases] = useState(['loss_aversion', 'system_blame', 'risk_reversal']);
  const [copiedKey, setCopiedKey] = useState(null);

  const toggleBias = (id) => {
    if (selectedBiases.includes(id)) {
      if (selectedBiases.length > 1) {
        setSelectedBiases(selectedBiases.filter(b => b !== id));
      }
    } else {
      setSelectedBiases([...selectedBiases, id]);
    }
  };

  const copyText = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const nicheName = selectedNiche?.name || "Dental & Medical Clinics";
  const audience = selectedNiche?.audience || "Clinic Owners & Doctors";
  const pain = selectedNiche?.painPoint || "Staff turnover and receptionist missing after-hours patient calls";
  const fear = selectedNiche?.fearTrigger || "Losing high-value implant patients to corporate dental chains";
  const avgValue = selectedNiche?.metrics?.avgCustomerValue || 1500;

  // Dynamically constructed copy based on selected niche and cognitive biases
  const emailStep1 = `Subject: Quick question regarding your intake at {{Company_Name}}

Hi {{First_Name}},

I noticed {{Company_Name}} is doing incredible work in ${nicheName}.

Here is the brutal truth in your industry right now:
${pain}. 

Data shows that whenever an inquiry goes unanswered for longer than 5 minutes, the probability of them booking drops by 391%. In your business, with an average client value of $${avgValue.toLocaleString()}, losing just 3 inquiries a week is quietly draining over $18,000 every single month.

It's not your front desk's fault—traditional human intake stacks were never built for 24/7 consumer expectations.

We built an automated 24/7 intake pipeline that qualifies and books appointments in under 90 seconds directly into your calendar.

If we don't book you at least 10 qualified new clients in your first 30 days, you pay $0 and keep the system.

Open to seeing a 2-minute video of how it looks?

Best,
Samarth (Aditya)
Founder, ClientPulse AI`;

  const emailStep2 = `Subject: The math behind the $${(avgValue * 4).toLocaleString()} leak at {{Company_Name}}

Hi {{First_Name}},

Following up on my note from Tuesday.

Dr. Marcus at Apex had the exact same issue: ${fear}.

Last month, they switched to our automated intake engine. Within 21 days:
- Response time dropped from 3 hours to 45 seconds.
- No-show rate decreased by 34%.
- 18 high-value appointments booked with zero added payroll.

We only take on 3 new practices per region to avoid competing in local markets.

Do you have 5 minutes this Thursday at 2 PM to look over the numbers?

Best,
Samarth`;

  const linkedinDM = `Hey {{First_Name}} — love what you're doing with {{Company_Name}}.

Saw your recent updates. Quick question: are you guys struggling with ${pain} like most ${audience} right now?

We just developed an automated workflow that solves ${fear} without hiring more staff or spending more on ads. 

Put together a 3-minute personalized loom teardown of your current booking flow showing where leads are dropping off. Mind if I send the link over here?`;

  const landingPageCopy = `# HERO SECTION
HEADLINE:
Stop Bleeding High-Value Clients to Fast Competitors.

SUB-HEADLINE:
The 24/7 Automated Intake & Client Acquisition System built exclusively for ${audience}. Turn missed inquiries into confirmed high-ticket bookings in under 90 seconds—guaranteed.

PRIMARY CTA BUTTON:
[ Claim Your Free Practice Leakage Audit → ]

---

# THE PROBLEM (Loss Aversion & System-Blame)
You didn't start your business to answer emails at 11 PM or watch your receptionist lose $3,000 inquiries to corporate competitors.

The Problem Isn't You. It's The Outdated Stack:
• 68% of inquiries arrive after-hours or on weekends.
• Manual follow-up takes 4+ hours (prospects have already moved to competitor B).
• Ads get clicks, but your calendar remains half-empty.

---

# THE SOLUTION (The Grand Slam Offer)
We install a complete done-for-you client acquisition pipeline into your business in under 14 days.
✓ 24/7 Instant Qualification & Booking
✓ Zero Payroll Burden (Automated)
✓ 100% Risk Reversal: 15 Booked Clients or You Pay Nothing.`;

  const vslScript = `[0:00 - 0:15 | The Pattern Interrupt & Fear Hook]
"If you are running a business in ${nicheName}, there is a silent hemorrhage happening inside your operations right now that is costing you at least $15,000 every 30 days..."

[0:15 - 0:35 | The Villain / System-Blame]
"And the crazy part? It has nothing to do with your skill or your service quality. The truth is, the way consumers buy changed overnight, but 90% of practices are still using a 2018 manual intake stack..."

[0:35 - 0:60 | The Risk-Free Emergency Exit]
"In this short breakdown, I’m going to show you the 90-second automated system we install that books high-paying clients on autopilot. And if it doesn't add at least $10,000 in booked value in your first month, you don't pay a single cent. Click below to see the proof."`;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-dark-600 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-brand-accent uppercase tracking-wider mb-1">
            <Brain className="w-4 h-4" />
            <span>MindFluence Persuasion Copy Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Cognitive-Bias Outreach Generator
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Generate psychologically validated campaigns tuned to <span className="text-brand-accent font-semibold">{nicheName}</span>.
          </p>
        </div>
      </div>

      {/* Cognitive Biases Toggle Bar */}
      <div className="bg-dark-800 border border-dark-600 rounded-2xl p-5 glow-card">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-300 mb-3 flex items-center">
          <Zap className="w-4 h-4 text-brand-accent mr-2" />
          <span>Active Cognitive Bias Stack</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {COGNITIVE_BIASES.map((bias) => {
            const isSelected = selectedBiases.includes(bias.id);
            return (
              <button
                key={bias.id}
                onClick={() => toggleBias(bias.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-brand-500/20 text-brand-accent border border-brand-accent/40 shadow-sm shadow-brand-accent/20'
                    : 'bg-dark-900 text-gray-400 border border-dark-600 hover:text-gray-200'
                }`}
              >
                {bias.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Format Selector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-dark-600 pb-3">
        <button
          onClick={() => setActiveFormat('email')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeFormat === 'email'
              ? 'bg-brand-500 text-black shadow-md'
              : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Cold Email Drip (2-Step)</span>
        </button>

        <button
          onClick={() => setActiveFormat('linkedin')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeFormat === 'linkedin'
              ? 'bg-brand-500 text-black shadow-md'
              : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>LinkedIn DM Script</span>
        </button>

        <button
          onClick={() => setActiveFormat('landing')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeFormat === 'landing'
              ? 'bg-brand-500 text-black shadow-md'
              : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>High-Converting Landing Page</span>
        </button>

        <button
          onClick={() => setActiveFormat('vsl')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeFormat === 'vsl'
              ? 'bg-brand-500 text-black shadow-md'
              : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>60-Sec VSL Script</span>
        </button>
      </div>

      {/* Content Display Panels */}
      {activeFormat === 'email' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6 glow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-dark-600 mb-4">
                <span className="text-xs font-bold text-brand-accent uppercase tracking-wider">
                  Step 1: The Pain & Fear Hook
                </span>
                <button
                  onClick={() => copyText(emailStep1, 'email1')}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded bg-dark-700 text-xs text-gray-200 hover:text-white"
                >
                  {copiedKey === 'email1' ? <Check className="w-3.5 h-3.5 text-brand-accent" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'email1' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="text-xs font-mono text-gray-200 whitespace-pre-wrap leading-relaxed bg-dark-900 p-4 rounded-xl border border-dark-700">
                {emailStep1}
              </pre>
            </div>
            <div className="mt-4 p-3 bg-brand-500/5 rounded-xl border border-brand-accent/20 text-[11px] text-gray-300">
              💡 <strong>Psychology Note:</strong> Uses <em>Loss Aversion</em> to expose the $18k leak, then applies <em>System-Blame</em> to eliminate defensiveness, ending with <em>Complete Risk Reversal</em>.
            </div>
          </div>

          <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6 glow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-dark-600 mb-4">
                <span className="text-xs font-bold text-brand-accent uppercase tracking-wider">
                  Step 2: Social Proof & Scarcity Follow-Up
                </span>
                <button
                  onClick={() => copyText(emailStep2, 'email2')}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded bg-dark-700 text-xs text-gray-200 hover:text-white"
                >
                  {copiedKey === 'email2' ? <Check className="w-3.5 h-3.5 text-brand-accent" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'email2' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="text-xs font-mono text-gray-200 whitespace-pre-wrap leading-relaxed bg-dark-900 p-4 rounded-xl border border-dark-700">
                {emailStep2}
              </pre>
            </div>
            <div className="mt-4 p-3 bg-brand-500/5 rounded-xl border border-brand-accent/20 text-[11px] text-gray-300">
              💡 <strong>Psychology Note:</strong> Applies <em>Social Proof</em> through concrete case study stats and triggers urgency via <em>Real Scarcity</em> (limiting 3 per market).
            </div>
          </div>
        </div>
      )}

      {activeFormat === 'linkedin' && (
        <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6 glow-card">
          <div className="flex items-center justify-between pb-3 border-b border-dark-600 mb-4">
            <span className="text-xs font-bold text-brand-accent uppercase tracking-wider">
              High-Converting Inbound LinkedIn DM Script
            </span>
            <button
              onClick={() => copyText(linkedinDM, 'linkedin')}
              className="flex items-center space-x-1 px-2.5 py-1 rounded bg-dark-700 text-xs text-gray-200 hover:text-white"
            >
              {copiedKey === 'linkedin' ? <Check className="w-3.5 h-3.5 text-brand-accent" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'linkedin' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="text-xs font-mono text-gray-200 whitespace-pre-wrap leading-relaxed bg-dark-900 p-4 rounded-xl border border-dark-700">
            {linkedinDM}
          </pre>
          <div className="mt-4 p-3 bg-brand-500/5 rounded-xl border border-brand-accent/20 text-[11px] text-gray-300">
            💡 <strong>Why this works:</strong> Instead of pitching in the first message, it offers a high-value customized audit (<em>Endowment Effect</em>) and asks permission to share.
          </div>
        </div>
      )}

      {activeFormat === 'landing' && (
        <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6 glow-card">
          <div className="flex items-center justify-between pb-3 border-b border-dark-600 mb-4">
            <span className="text-xs font-bold text-brand-accent uppercase tracking-wider">
              Full Landing Page Copy Blueprint
            </span>
            <button
              onClick={() => copyText(landingPageCopy, 'landing')}
              className="flex items-center space-x-1 px-2.5 py-1 rounded bg-dark-700 text-xs text-gray-200 hover:text-white"
            >
              {copiedKey === 'landing' ? <Check className="w-3.5 h-3.5 text-brand-accent" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'landing' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="text-xs font-mono text-gray-200 whitespace-pre-wrap leading-relaxed bg-dark-900 p-4 rounded-xl border border-dark-700">
            {landingPageCopy}
          </pre>
        </div>
      )}

      {activeFormat === 'vsl' && (
        <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6 glow-card">
          <div className="flex items-center justify-between pb-3 border-b border-dark-600 mb-4">
            <span className="text-xs font-bold text-brand-accent uppercase tracking-wider">
              60-Second Video Sales Letter (VSL) Hook Script
            </span>
            <button
              onClick={() => copyText(vslScript, 'vsl')}
              className="flex items-center space-x-1 px-2.5 py-1 rounded bg-dark-700 text-xs text-gray-200 hover:text-white"
            >
              {copiedKey === 'vsl' ? <Check className="w-3.5 h-3.5 text-brand-accent" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'vsl' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="text-xs font-mono text-gray-200 whitespace-pre-wrap leading-relaxed bg-dark-900 p-4 rounded-xl border border-dark-700">
            {vslScript}
          </pre>
        </div>
      )}

    </div>
  );
}
