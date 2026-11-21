import React, { useState } from 'react';
import { 
  Kanban, 
  Plus, 
  DollarSign, 
  Building2, 
  MoreVertical, 
  CheckCircle2, 
  X, 
  Trash2, 
  Sparkles,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STAGES = [
  { id: 'lead', title: '01. Identified Prospect', color: 'border-gray-500' },
  { id: 'contacted', title: '02. Pitch / DM Sent', color: 'border-blue-500' },
  { id: 'proposal', title: '03. Proposal Sent', color: 'border-purple-500' },
  { id: 'negotiation', title: '04. In Negotiation', color: 'border-amber-500' },
  { id: 'won', title: '05. Closed Won! 🎉', color: 'border-brand-accent' },
];

export default function LeadPipeline({ leads, setLeads }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCompany, setNewCompany] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newValue, setNewValue] = useState(2500);
  const [newNiche, setNewNiche] = useState('Dental Clinic');

  const addLead = (e) => {
    e.preventDefault();
    if (!newCompany.trim()) return;

    const newDeal = {
      id: Date.now().toString(),
      company: newCompany,
      contact: newContact || 'Decision Maker',
      value: Number(newValue) || 2500,
      niche: newNiche,
      status: 'lead',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };

    setLeads([newDeal, ...leads]);
    setNewCompany('');
    setNewContact('');
    setShowAddModal(false);
  };

  const moveStage = (id, direction) => {
    setLeads(leads.map(lead => {
      if (lead.id === id) {
        const currentIndex = STAGES.findIndex(s => s.id === lead.status);
        const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
        if (nextIndex >= 0 && nextIndex < STAGES.length) {
          const nextStatus = STAGES[nextIndex].id;
          if (nextStatus === 'won') {
            confetti({
              particleCount: 150,
              spread: 80,
              origin: { y: 0.6 }
            });
          }
          return { ...lead, status: nextStatus };
        }
      }
      return lead;
    }));
  };

  const deleteLead = (id) => {
    setLeads(leads.filter(l => l.id !== id));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-dark-600 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-brand-accent uppercase tracking-wider mb-1">
            <Kanban className="w-4 h-4" />
            <span>High-Ticket Deal Pipeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Client Acquisition CRM
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Track every prospect from cold outreach to closed retainer contract.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Prospect</span>
        </button>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-6">
        {STAGES.map((stage) => {
          const stageLeads = leads.filter(l => l.status === stage.id);
          const stageTotal = stageLeads.reduce((sum, l) => sum + (l.value || 0), 0);

          return (
            <div key={stage.id} className="bg-dark-800/80 border border-dark-600 rounded-xl p-3 flex flex-col min-w-[240px]">
              {/* Column Header */}
              <div className="pb-3 border-b border-dark-600 mb-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-gray-200">{stage.title}</h3>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-dark-700 text-gray-300">
                    {stageLeads.length}
                  </span>
                </div>
                <div className="text-[11px] font-extrabold text-brand-accent mt-1">
                  ${stageTotal.toLocaleString()}
                </div>
              </div>

              {/* Cards List */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
                {stageLeads.length === 0 ? (
                  <div className="p-4 rounded-lg border border-dashed border-dark-600 text-center text-[11px] text-gray-500 italic">
                    No active deals in this stage
                  </div>
                ) : (
                  stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-dark-900 border border-dark-600 hover:border-brand-500/40 rounded-xl p-3.5 transition-all shadow-sm space-y-2 group"
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] font-bold text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded">
                          {lead.niche}
                        </span>
                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="font-bold text-sm text-white">{lead.company}</h4>
                      <p className="text-xs text-gray-400">Contact: {lead.contact}</p>

                      <div className="pt-2 border-t border-dark-700/60 flex items-center justify-between text-xs">
                        <span className="font-extrabold text-brand-accent">
                          ${lead.value.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-gray-500">{lead.date}</span>
                      </div>

                      {/* Move Buttons */}
                      <div className="pt-2 flex justify-between gap-1">
                        {stage.id !== 'lead' && (
                          <button
                            onClick={() => moveStage(lead.id, 'prev')}
                            className="p-1 rounded bg-dark-700 text-gray-400 hover:text-white text-[10px] flex items-center"
                            title="Move back"
                          >
                            <ArrowLeft className="w-3 h-3" />
                          </button>
                        )}
                        {stage.id !== 'won' && (
                          <button
                            onClick={() => moveStage(lead.id, 'next')}
                            className="p-1 px-2.5 rounded bg-brand-500/20 text-brand-accent hover:bg-brand-500 hover:text-black font-bold text-[10px] flex items-center space-x-1 ml-auto"
                          >
                            <span>Advance</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6 max-w-md w-full glow-card">
            <div className="flex items-center justify-between pb-4 border-b border-dark-600 mb-4">
              <h3 className="text-base font-bold text-white flex items-center">
                <Plus className="w-4 h-4 text-brand-accent mr-1.5" />
                <span>Add Prospect to Pipeline</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={addLead} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-300 mb-1">Company / Clinic Name</label>
                <input
                  type="text"
                  required
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="e.g. Apex Smiles Dental Group"
                  className="w-full bg-dark-900 border border-dark-500 rounded-lg p-2.5 text-white outline-none focus:border-brand-accent"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-300 mb-1">Contact Name / Title</label>
                <input
                  type="text"
                  value={newContact}
                  onChange={(e) => setNewContact(e.target.value)}
                  placeholder="e.g. Dr. Sarah Jenkins (Owner)"
                  className="w-full bg-dark-900 border border-dark-500 rounded-lg p-2.5 text-white outline-none focus:border-brand-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-300 mb-1">Estimated Deal ($)</label>
                  <input
                    type="number"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="w-full bg-dark-900 border border-dark-500 rounded-lg p-2.5 text-white outline-none focus:border-brand-accent"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-300 mb-1">Target Niche</label>
                  <input
                    type="text"
                    value={newNiche}
                    onChange={(e) => setNewNiche(e.target.value)}
                    className="w-full bg-dark-900 border border-dark-500 rounded-lg p-2.5 text-white outline-none focus:border-brand-accent"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-dark-700 text-gray-300 font-bold hover:bg-dark-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-brand-500 text-black font-extrabold hover:bg-brand-400"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
