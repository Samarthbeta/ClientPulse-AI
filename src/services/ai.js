// ai.js — Real Google Gemini API Integration for Dynamic Persuasion Copy

export function getGeminiApiKey() {
  return import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('cp_gemini_api_key') || '';
}

export function setGeminiApiKey(key) {
  if (key) {
    localStorage.setItem('cp_gemini_api_key', key.trim());
  } else {
    localStorage.removeItem('cp_gemini_api_key');
  }
}

/**
 * Generate real persuasion copy using Gemini 2.0 Flash / 1.5 Flash
 */
export async function generatePersuasionCopy({
  niche,
  audience,
  companyName,
  painPoint,
  channel, // 'email', 'linkedin', 'landing', 'vsl', 'offer'
  biases = [],
  customPrompt = '',
  apiKey = null
}) {
  const key = apiKey || getGeminiApiKey();

  if (!key) {
    throw new Error('Gemini API Key missing. Please provide your Google Gemini API Key in Settings (Get a free key at aistudio.google.com).');
  }

  const systemInstruction = `You are an elite B2B copywriter and conversion strategist specializing in behavioral economics, cognitive biases, and high-ticket B2B client acquisition.
You use Dan Kennedy, Alex Hormozi ($100M Offers), and Kahneman & Tversky's loss aversion frameworks.
Never write generic AI buzzwords or fluff like "In today's fast-paced digital world" or "Unlock your potential".
Write punchy, specific, believable, high-status copy that targets the financial hemorrhage (loss aversion) and offers a clear, zero-risk emergency exit.`;

  const biasInstructions = biases.length > 0 
    ? `Explicitly engineer the following cognitive biases into the copy: ${biases.join(', ')}.`
    : `Focus heavily on Loss Aversion (the financial leak), System-Blame (externalizing fault), and Complete Risk Reversal.`;

  let channelPrompt = "";
  if (channel === 'email') {
    channelPrompt = `Write a high-converting 2-Step Cold Email sequence for reaching out to ${audience} at ${companyName || 'the prospect company'}.
Step 1: The Pain & Fear Hook (exposing the financial cost of doing nothing, under 120 words).
Step 2: Social Proof & Scarcity Follow-Up (concrete metrics, short and direct).`;
  } else if (channel === 'linkedin') {
    channelPrompt = `Write a low-friction, permission-based LinkedIn DM outreach script for ${audience}. Offer a personalized 2-minute video audit of their current booking flow. Do not pitch aggressively in the first message.`;
  } else if (channel === 'landing') {
    channelPrompt = `Write the core sections of a high-converting landing page:
1. Hero Headline & Sub-headline (clear promise + timeline).
2. The Problem / The Bleeding Leak (why traditional methods are bleeding money).
3. The Mechanism (how our 24/7 automated intake fixes it).
4. The Risk-Reversal Guarantee (100% money back).
5. Primary Call to Action.`;
  } else if (channel === 'vsl') {
    channelPrompt = `Write a punchy 60-second Video Sales Letter (VSL) script with timestamps [0:00-0:15 Pattern Interrupt], [0:15-0:35 The Bleeding Leak], and [0:35-0:60 The Zero-Risk Solution].`;
  } else {
    channelPrompt = `Write an Alex Hormozi-style Grand Slam Offer for ${niche} targeting ${audience}. Include Dream Outcome, Time Delay, Perceived Likelihood, and an irresistible guarantee.`;
  }

  const promptContent = `
TARGET NICHE: ${niche}
TARGET AUDIENCE: ${audience}
TARGET COMPANY: ${companyName || 'Prospect Firm'}
KNOWN PAIN POINT: ${painPoint}
${biasInstructions}

ADDITIONAL CONTEXT / CUSTOM INSTRUCTION:
${customPrompt || 'None'}

TASK:
${channelPrompt}

FORMAT YOUR RESPONSE IN CLEAN MARKDOWN. Keep it concise, practical, and immediately ready to send.`;

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;

  const payload = {
    contents: [
      {
        role: 'user',
        parts: [{ text: `${systemInstruction}\n\n${promptContent}` }]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1500,
    }
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => ({}));
    const message = errorJson.error?.message || `Gemini API error: ${response.status} ${response.statusText}`;
    throw new Error(message);
  }

  const data = await response.json();
  const outputText = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!outputText) {
    throw new Error('Gemini API returned an empty response. Please check your prompt or try again.');
  }

  return outputText;
}

// Test Gemini API Key
export async function testGeminiApiKey(key) {
  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Respond with the word "CONNECTED" only.' }] }],
        generationConfig: { maxOutputTokens: 10 }
      })
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return { ok: false, error: err.error?.message || 'Invalid API Key' };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}
