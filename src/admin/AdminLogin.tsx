import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { Logo } from '../components/common/Logo';
import { Lock, Mail, KeyRound, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

interface AdminLoginProps {
  onBackToWebsite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToWebsite }) => {
  const { login } = useCms();
  const [email, setEmail] = useState('admin@islamabadescapes.pk');
  const [password, setPassword] = useState('Islamabad2026!');
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  const handleQuickDemoLogin = () => {
    setEmail('admin@islamabadescapes.pk');
    setPassword('Islamabad2026!');
    login('admin@islamabadescapes.pk', 'Islamabad2026!');
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetMessage(`Password reset instruction sent to ${resetEmail || email}. In development mode, you can always log in with the 1-Click Demo button.`);
  };

  return (
    <div className="min-h-screen bg-[#0F241B] flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Subtle Gradient & Margalla Graphic */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1B4332] via-[#0F241B] to-[#0A1812] opacity-90" />

      {/* Back to Site Button */}
      <div className="relative z-10 w-full max-w-md mb-6 flex justify-between items-center">
        <button
          onClick={onBackToWebsite}
          className="text-xs text-[#D4A373] hover:text-white transition-colors flex items-center gap-1.5"
        >
          ← Return to Public Website
        </button>
        <span className="text-[11px] text-white/50 uppercase tracking-wider">
          CMS v2.6.4 Protected
        </span>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#D4A373]/30 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Card Header */}
        <div className="bg-[#133826] p-8 text-center border-b border-[#2D6A4F]">
          <div className="flex justify-center mb-3">
            <Logo variant="admin" size="lg" showSubtitle={false} />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4A373] block">
            Central Management System
          </span>
          <h2 className="font-serif text-2xl font-bold text-white mt-1">
            Admin Authentication
          </h2>
        </div>

        {/* Form Body */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#133826]" /> Administrator Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#133826]"
                placeholder="admin@islamabadescapes.pk"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#133826]" /> Security Key / Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowResetModal(true)}
                  className="text-xs text-[#2D6A4F] hover:underline"
                >
                  Forgot Key?
                </button>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#D5CEC5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#133826]"
                placeholder="••••••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#133826] text-[#D4A373] hover:text-[#FAF8F5] rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#1B4332] transition-all shadow-md flex items-center justify-center gap-2 mt-2"
            >
              <span>Unlock Admin Panel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="mt-6 pt-5 border-t border-[#E5DFD7] text-center">
            <span className="text-xs text-slate-500 block mb-2 font-medium">
              Reviewer / Demo Fast Access:
            </span>
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 px-4 bg-[#E8F0EA] hover:bg-[#D5E5DA] text-[#133826] border border-[#2D6A4F]/40 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
              <span>1-Click Master Admin Login</span>
            </button>
            <p className="text-[11px] text-slate-400 mt-2 font-mono">
              Credentials: admin@islamabadescapes.pk / Islamabad2026!
            </p>
          </div>
        </div>
      </div>

      {/* Password Reset Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF8F5] rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#D4A373]/40">
            <h3 className="font-serif text-xl font-bold text-[#133826] mb-2">
              Reset Master Credentials
            </h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Enter your registered administrator email to receive authorization credentials.
            </p>

            {resetMessage ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 mb-4">
                {resetMessage}
              </div>
            ) : (
              <form onSubmit={handleResetSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  placeholder="admin@islamabadescapes.pk"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#133826]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#133826] text-[#D4A373] rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Send Reset Link
                </button>
              </form>
            )}

            <button
              onClick={() => {
                setShowResetModal(false);
                setResetMessage('');
              }}
              className="mt-3 w-full py-2 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
