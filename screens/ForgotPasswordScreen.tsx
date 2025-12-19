
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserRole } from '../types';

const ForgotPasswordScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialRole = (location.state as any)?.role || 'student';

  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>(initialRole);
  const [error, setError] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    // Role-based validation
    if (role === 'student' && !email.toLowerCase().endsWith('@university.edu')) {
      setError('Please use your university email address.');
      return;
    }

    if (role === 'assigner' && !email.toLowerCase().endsWith('@admin.edu')) {
      setError('Please use your admin email address.');
      return;
    }

    setIsLoading(true);

    // Simulate sending email
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1200);
  };

  if (isSent) {
    return (
      <div className="flex-1 flex flex-col p-8 items-center justify-center text-center animate-in zoom-in duration-500">
        <div className="size-20 bg-green-500 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-green-500/20">
          <span className="material-symbols-outlined text-white text-[40px]">mark_email_read</span>
        </div>
        <h1 className="text-3xl font-black mb-4">Check Your Inbox</h1>
        <p className="text-slate-400 mb-10 leading-relaxed">
          Password reset instructions have been sent to <span className="text-white font-bold">{email}</span>.
        </p>
        <button
          onClick={() => navigate('/signin')}
          className="w-full h-16 bg-surface border border-slate-800 rounded-2xl font-black text-lg shadow-xl shadow-black/20 hover:bg-slate-800 transition-all"
        >
          Return to Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-8 justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/signin')} className="size-10 rounded-full bg-surface flex items-center justify-center border border-slate-800">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-bold">Reset Password</h1>
      </div>

      <div className="mb-10">
        <p className="text-slate-400 font-medium">
          Enter your email and we'll send you instructions to reset your password.
        </p>
      </div>

      <form onSubmit={handleReset} className="space-y-6">
        {/* Role Selector */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Account Type</label>
          <div className="flex bg-surface p-1 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => { setRole('student'); setError(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase transition-all ${
                role === 'student' ? 'bg-primary text-white shadow-lg' : 'text-slate-500'
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => { setRole('assigner'); setError(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase transition-all ${
                role === 'assigner' ? 'bg-primary text-white shadow-lg' : 'text-slate-500'
              }`}
            >
              Assigner
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">College Email</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-[20px]">mail</span>
            <input
              type="email"
              placeholder={role === 'student' ? "name@university.edu" : "admin@admin.edu"}
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              className="w-full h-14 bg-surface border border-slate-800 rounded-2xl pl-12 pr-4 text-white placeholder:text-slate-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
          </div>
          <p className="text-[10px] text-slate-600 font-medium ml-1">
            {role === 'student' ? 'Must end in @university.edu' : 'Must end in @admin.edu'}
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl animate-in shake-in duration-300">
            <span className="material-symbols-outlined text-red-500 text-[18px] shrink-0">error</span>
            <p className="text-red-500 text-[11px] font-bold leading-tight">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-16 bg-primary hover:bg-blue-600 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
        >
          {isLoading ? (
            <span className="material-symbols-outlined animate-spin font-black">sync</span>
          ) : (
            <>
              Send Instructions
              <span className="material-symbols-outlined font-black">send</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordScreen;
