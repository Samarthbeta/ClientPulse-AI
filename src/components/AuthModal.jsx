import React, { useState } from 'react';
import { X, Lock, Mail, User, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
import { signInUser, signUpUser } from '../services/supabase';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (isSignUp) {
        const data = await signUpUser(email, password, fullName);
        if (data?.user && !data.session) {
          setSuccessMessage('Account created! Please check your email to confirm registration, or log in if email confirmation is disabled.');
        } else {
          setSuccessMessage('Account created and signed in successfully!');
          onAuthSuccess(data.session);
          setTimeout(() => onClose(), 1200);
        }
      } else {
        const data = await signInUser(email, password);
        setSuccessMessage('Signed in successfully!');
        onAuthSuccess(data.session);
        setTimeout(() => onClose(), 800);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6 sm:p-8 max-w-md w-full glow-card relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-accent/30 text-brand-accent flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold text-white">
            {isSignUp ? 'Create Your Account' : 'Sign In to ClientPulse'}
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {isSignUp
              ? 'Save your deal pipeline securely to PostgreSQL with Row Level Security'
              : 'Access your persistent multi-device pipeline and campaigns'}
          </p>
        </div>

        {/* Error / Success Alerts */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-800/50 text-red-300 text-xs flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/50 border border-emerald-800/50 text-brand-300 text-xs flex items-start space-x-2">
            <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-brand-accent" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isSignUp && (
            <div>
              <label className="block font-bold text-gray-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Aditya Samarth"
                  className="w-full bg-dark-900 border border-dark-500 rounded-xl pl-9 pr-4 py-2.5 text-white focus:border-brand-accent outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-bold text-gray-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-dark-900 border border-dark-500 rounded-xl pl-9 pr-4 py-2.5 text-white focus:border-brand-accent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-dark-900 border border-dark-500 rounded-xl pl-9 pr-4 py-2.5 text-white focus:border-brand-accent outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-accent text-black font-extrabold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Processing...' : isSignUp ? 'Create Free Account' : 'Sign In'}
          </button>
        </form>

        {/* Toggle Sign Up / Sign In */}
        <div className="mt-5 text-center text-xs text-gray-400">
          {isSignUp ? (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => { setIsSignUp(false); setError(null); }}
                className="text-brand-accent font-bold hover:underline"
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => { setIsSignUp(true); setError(null); }}
                className="text-brand-accent font-bold hover:underline"
              >
                Sign Up
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
