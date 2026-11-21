import React from 'react';
import { 
  BookOpen, 
  DollarSign, 
  ShieldAlert, 
  CheckCircle, 
  Users, 
  HelpCircle, 
  TrendingUp, 
  Award 
} from 'lucide-react';

export default function BusinessKnowledge() {
  const objections = [
    {
      objection: '"You are too expensive for our budget right now."',
      psychology: 'Price is only an issue in the absence of perceived value and loss.',
      script: '"I completely understand, Dr. [Name]. But let me ask you: if we plug the leak that is currently costing you $18,000 in missed patients every month, is investing $2,497 expensive, or is staying with your current broken intake expensive? The most expensive option is doing nothing."'
    },
    {
      objection: '"Just send me some info and let me think about it."',
      psychology: 'This is a polite brush-off because they lack urgency.',
      script: '"I can certainly email you our one-pager. But usually when people say that, it means they have a doubt they are too polite to mention. What is the one thing keeping you from solving this leak today?"'
    },
    {
      objection: '"We already have a front desk team handling calls."',
      psychology: 'They feel criticized. Apply System-Blame.',
      script: '"Your front desk is great at patient care when they are in the clinic. But who answers your calls at 9:30 PM on a Sunday or when the desk is busy with check-ins? 65% of high-value inquiries arrive when your desk is unavailable. We are not replacing your team—we are their 24/7 backup safety net."'
    },
    {
      objection: '"How do I know this will actually work for us?"',
      psychology: 'Fear of looking foolish. Activate Complete Risk Reversal.',
      script: '"That’s exactly why we take 100% of the risk off your shoulders. If we don’t book at least 10 qualified consultations in your first 30 days, we wire back your full payment immediately. You only keep us if we make you significantly more money than we cost."'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="pb-6 border-b border-dark-600">
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-brand-accent uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4" />
          <span>The Founder's Playbook</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          The 7-Figure Founder Operating System
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          The exact principles, math, and psychology you need to build an empire where people work for you.
        </p>
      </div>

      {/* The Math of $10k - $25k / Month */}
      <div className="bg-gradient-to-r from-dark-800 via-dark-700 to-dark-800 border border-dark-600 rounded-2xl p-6 sm:p-8 glow-card">
        <h2 className="text-lg font-bold text-white flex items-center mb-2">
          <TrendingUp className="w-5 h-5 text-brand-accent mr-2" />
          <span>The Math of Financial Freedom (It's Simpler Than You Think)</span>
        </h2>
        <p className="text-xs text-gray-300 leading-relaxed mb-6">
          Most beginners try to sell $20 items to 1,000 strangers. That is exhausting. True business owners sell high-ticket recurring retainers to a handful of B2B clients:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-center">
          <div className="p-5 rounded-xl bg-dark-900 border border-dark-600">
            <span className="text-xs font-bold text-gray-400 uppercase">Stage 1: Freedom</span>
            <div className="text-3xl font-black text-brand-accent mt-2">$10,000 <span className="text-xs text-gray-400">/ mo</span></div>
            <p className="text-xs text-gray-300 mt-1 font-semibold">Just 4 Clients @ $2,500/mo</p>
            <p className="text-[11px] text-gray-400 mt-2">Replaces 99% of 9-to-5 salaries. You are officially your own boss.</p>
          </div>

          <div className="p-5 rounded-xl bg-dark-900 border-2 border-brand-accent shadow-md shadow-brand-accent/10">
            <span className="text-xs font-bold text-brand-accent uppercase">Stage 2: Scale</span>
            <div className="text-3xl font-black text-white mt-2">$25,000 <span className="text-xs text-gray-400">/ mo</span></div>
            <p className="text-xs text-brand-300 mt-1 font-semibold">10 Clients @ $2,500/mo</p>
            <p className="text-[11px] text-gray-400 mt-2">At this stage, you hire 1-2 offshore contractors ($800/mo) to manage fulfillment.</p>
          </div>

          <div className="p-5 rounded-xl bg-dark-900 border border-dark-600">
            <span className="text-xs font-bold text-purple-400 uppercase">Stage 3: Empire</span>
            <div className="text-3xl font-black text-purple-400 mt-2">$50,000+ <span className="text-xs text-gray-400">/ mo</span></div>
            <p className="text-xs text-gray-300 mt-1 font-semibold">20 Clients @ $2,500/mo</p>
            <p className="text-[11px] text-gray-400 mt-2">You now run a full digital agency. You focus 100% on strategy and acquisitions.</p>
          </div>
        </div>
      </div>

      {/* Objection Handling Scripts */}
      <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6 glow-card">
        <h2 className="text-lg font-bold text-white mb-2">
          🛡️ Battle-Tested Objection Crushers
        </h2>
        <p className="text-xs text-gray-400 mb-6">
          Memorize these 4 psychological reframes. When you master these, closing clients on sales calls becomes effortless.
        </p>

        <div className="space-y-4">
          {objections.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-dark-900 border border-dark-600 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-950/60 text-red-400 border border-red-900/40">
                  Client Objection
                </span>
                <h4 className="font-bold text-sm text-white">{item.objection}</h4>
              </div>
              <p className="text-xs text-gray-400 italic">
                Psychological Diagnosis: <span className="text-gray-300">{item.psychology}</span>
              </p>
              <div className="mt-2 p-3 rounded-lg bg-dark-800 border border-dark-500 text-xs text-brand-300 font-medium leading-relaxed">
                🗣️ <strong>Word-for-Word Script:</strong> {item.script}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delegation & Building Your Empire */}
      <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6 glow-card">
        <h2 className="text-lg font-bold text-white mb-2 flex items-center">
          <Users className="w-5 h-5 text-brand-accent mr-2" />
          <span>How to Have People Working For You (The Delegation SOP)</span>
        </h2>
        <div className="text-xs text-gray-300 space-y-3 leading-relaxed mt-4">
          <p>
            The difference between a stressed freelancer and a true CEO is <strong>Standard Operating Procedures (SOPs)</strong>:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li><strong className="text-white">Close the first 3 clients yourself:</strong> Understand the exact pain points, objections, and intake workflows.</li>
            <li><strong className="text-white">Record 5-minute Loom videos of the fulfillment process:</strong> Show how to configure the intake tool, test calendar links, and send monthly reports.</li>
            <li><strong className="text-white">Hire talented virtual operations assistants (from Upwork / OnlineJobs.ph for $6 - $10/hr):</strong> Give them the exact Loom videos and checklists.</li>
            <li><strong className="text-white">You only step in for relationship reviews:</strong> Your team delivers the service, while you focus on landing new $2,500/mo accounts.</li>
          </ol>
        </div>
      </div>

    </div>
  );
}
