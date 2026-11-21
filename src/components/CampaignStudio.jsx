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
  Brain, 
  Loader2, 
  AlertCircle, 
  Settings,
  RefreshCw
} from 'lucide-react';
import { COGNITIVE_BIASES } from '../data/cognitiveBiases';
import { generatePersuasionCopy, getGeminiApiKey } from '../services/ai';

export default function CampaignStudio({ selectedNiche, onOpenSettings }) {
  const [activeChannel, setActiveChannel] = useState('email');
  const [selectedBiases, setSelectedBiases] = useState(['loss_aversion', 'system_blame', 'risk_reversal']);
  
  // Custom prospect parameters for REAL AI generation
  const [companyName, setCompanyName] = useState('');
  const [customAudience, setCustomAudience] = useState(selectedNiche?.audience || '');
  const [customPain, setCustomPain] = useState(selectedNiche?.painPoint || '');
  const [customPrompt, setCustomPrompt] = useState('');

  // AI state
  const [generatedOutput, setGeneratedOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState(null);

  const [copied, setCopied] = useState(false);

  const toggleBias = (id) => {
    if (selectedBiases.includes(id)) {
      if (selectedBiases.length > 1) {
        setSelectedBiases(selectedBiases.filter(b => b !== id));
      }
    } else {
      setSelectedBiases([...selectedBiases, id]);
    }
  };

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    setAiError(null);

    const hasKey = Boolean(getGeminiApiKey());
    if (!hasKey) {
      setIsGenerating(false);
      setAiError('No Gemini API Key found. Click the settings button below to add your free Google AI Studio key.');
      return;
    }

    try {
      const result = await generatePersuasionCopy({
        niche: selectedNiche?.name || 'General B2B',
        audience: customAudience || selectedNiche?.audience || 'Decision Makers',
        companyName: companyName.trim() || 'Target Company',
        painPoint: customPain || selectedNiche?.painPoint || 'Manual bottlenecks and missed revenue',
        channel: activeChannel,
        biases: selectedBiases.map(b => COGNITIVE_BIASES.find(cb => cb.id === b)?.name).filter(Boolean),
        customPrompt: customPrompt.trim()
      });

      setGeneratedOutput(result);
    } catch (err) {
      setAiError(err.message || 'Failed to generate copy. Please check your API key and connection.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (!generatedOutput) return;
    navigator.clipboard.writeText(generatedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-dark-600 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-brand-accent uppercase tracking-wider mb-1">
            <Brain className="w-4 h-4" />
            <span>Real LLM Persuasion Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Dynamic Campaign Generator
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Powered by Google Gemini 2.0 Flash + MindFluence Cognitive Bias Engineering.
          </p>
        </div>

        <button
          onClick={onOpenSettings}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-dark-800 border border-dark-600 hover:border-gray-500 text-xs font-bold text-gray-300 self-start sm:self-auto transition-colors"
        >
          <Settings className="w-4 h-4 text-brand-accent" />
          <span>Configure API Key</span>
        </button>
      </div>

      {/* Main Grid: Parameters vs AI Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Form: Prospect & Campaign Inputs */}
        <div className="lg:col-span-5 space-y-5 bg-dark-800 border border-dark-600 rounded-2xl p-6 glow-card">
          <h3 className="text-sm font-bold text-white flex items-center">
            <Sparkles className="w-4 h-4 text-brand-accent mr-2" />
            <span>Target Prospect & Parameters</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-300 mb-1">Campaign Channel</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'email', name: 'Cold Email (2-Step)', icon: Mail },
                  { id: 'linkedin', name: 'LinkedIn DM', icon: MessageSquare },
                  { id: 'landing', name: 'Landing Page Copy', icon: Globe },
                  { id: 'vsl', name: '60s Video Script', icon: Video },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = activeChannel === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveChannel(item.id)}
                      className={`flex items-center space-x-2 p-2.5 rounded-xl border text-left font-bold transition-all ${
                        isSelected
                          ? 'bg-brand-500/20 text-brand-accent border-brand-accent shadow-sm shadow-brand-accent/20'
                          : 'bg-dark-900 border-dark-600 text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-300 mb-1">Target Company / Prospect Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Apex Dental Care (or leave blank)"
                className="w-full bg-dark-900 border border-dark-500 rounded-xl p-2.5 text-white outline-none focus:border-brand-accent"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-300 mb-1">Target Decision Maker Audience</label>
              <input
                type="text"
                value={customAudience}
                onChange={(e) => setCustomAudience(e.target.value)}
                placeholder="e.g. Clinic Owners, Managing Partners, VP of Sales"
                className="w-full bg-dark-900 border border-dark-500 rounded-xl p-2.5 text-white outline-none focus:border-brand-accent"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-300 mb-1">Specific Pain Point / Bleeding Leak</label>
              <textarea
                rows={2}
                value={customPain}
                onChange={(e) => setCustomPain(e.target.value)}
                placeholder="e.g. After-hours inquiries go uncalled for 12 hours, losing $2,000 cases"
                className="w-full bg-dark-900 border border-dark-500 rounded-xl p-2.5 text-white outline-none focus:border-brand-accent"
              />
            </div>

            {/* Cognitive Bias Selector */}
            <div>
              <label className="block font-bold text-gray-300 mb-1.5">Cognitive Biases to Inject</label>
              <div className="flex flex-wrap gap-1.5">
                {COGNITIVE_BIASES.map((bias) => {
                  const isSelected = selectedBiases.includes(bias.id);
                  return (
                    <button
                      key={bias.id}
                      type="button"
                      onClick={() => toggleBias(bias.id)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                        isSelected
                          ? 'bg-brand-500/20 text-brand-accent border border-brand-accent/40'
                          : 'bg-dark-900 text-gray-500 border border-dark-600 hover:text-gray-300'
                      }`}
                    >
                      {bias.name.split('/')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-300 mb-1">Custom Prompt / Extra Context (Optional)</label>
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g. Mention that we offer a 14-day free pilot"
                className="w-full bg-dark-900 border border-dark-500 rounded-xl p-2.5 text-white outline-none focus:border-brand-accent"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-accent text-black font-extrabold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-lg shadow-brand-500/20 active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating with Gemini AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 stroke-[2.5]" />
                  <span>Generate Real AI Campaign</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Output: Real Generated AI Copy */}
        <div className="lg:col-span-7 bg-dark-800 border border-dark-600 rounded-2xl p-6 glow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-dark-600 mb-4">
              <span className="text-xs font-bold text-brand-accent uppercase tracking-wider flex items-center">
                <Brain className="w-4 h-4 mr-1.5" />
                <span>AI Generated Output</span>
              </span>

              {generatedOutput && (
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-dark-700 hover:bg-dark-600 text-xs text-gray-200"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-brand-accent" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Text'}</span>
                </button>
              )}
            </div>

            {/* Error Notification */}
            {aiError && (
              <div className="mb-4 p-4 rounded-xl bg-red-950/40 border border-red-800/50 text-red-300 text-xs space-y-2">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{aiError}</span>
                </div>
                <button
                  onClick={onOpenSettings}
                  className="inline-flex items-center space-x-1.5 px-3 py-1 rounded bg-dark-900 border border-red-700/60 text-white font-bold text-[11px]"
                >
                  <Settings className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Open Settings to Add Gemini API Key</span>
                </button>
              </div>
            )}

            {/* Generated Text Area */}
            {generatedOutput ? (
              <div className="bg-dark-900 border border-dark-700 rounded-xl p-5 text-xs text-gray-200 font-mono whitespace-pre-wrap leading-relaxed max-h-[550px] overflow-y-auto">
                {generatedOutput}
              </div>
            ) : (
              <div className="h-72 rounded-xl border border-dashed border-dark-600 flex flex-col items-center justify-center p-6 text-center text-gray-500">
                <Brain className="w-10 h-10 text-dark-500 mb-3" />
                <p className="text-xs font-semibold text-gray-400">No output generated yet.</p>
                <p className="text-[11px] text-gray-500 mt-1 max-w-sm">
                  Fill in your target prospect details on the left and click "Generate Real AI Campaign" to call the live Gemini LLM API.
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-dark-700/60 flex items-center justify-between text-[11px] text-gray-400">
            <span>Model: <strong className="text-gray-200">Google Gemini 2.0 Flash</strong></span>
            <span>Zero hardcoded templates • Dynamic LLM Inference</span>
          </div>
        </div>

      </div>

    </div>
  );
}
