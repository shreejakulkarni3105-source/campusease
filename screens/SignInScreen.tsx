
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, UserRole } from '../types';

interface Props {
  onLogin: (user: User) => void;
}

const SignInScreen: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields to continue.');
      return;
    }

    // Role-based validation
    if (role === 'student' && !email.toLowerCase().endsWith('@university.edu')) {
      setError('Please use your university email (@university.edu) to sign in.');
      return;
    }

    if (role === 'assigner' && !email.toLowerCase().endsWith('@admin.edu')) {
      setError('Please use your admin email (@admin.edu) to access the dashboard.');
      return;
    }

    setIsLoading(true);

    // Simulated auth delay
    setTimeout(() => {
      onLogin({ 
        name: 'Shreeja Kulkarni', 
        email, 
        role, 
        studentId: role === 'student' ? '#82910442' : undefined 
      });
      
      navigate(role === 'assigner' ? '/assigner-dashboard' : '/');
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col p-8 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10 text-center">
        <div className="size-20 rounded-[2rem] bg-primary mx-auto flex items-center justify-center mb-6 shadow-2xl shadow-primary/30">
          <span className="material-symbols-outlined text-[40px] text-white">school</span>
        </div>
        <h1 className="text-4xl font-black mb-2 tracking-tighter">CampusEase</h1>
        <p className="text-slate-400 font-medium">Study smarter, not harder.</p>
        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-4 bg-slate-800/50 py-2 rounded-lg">
          {role === 'assigner' ? 'Admin access helps maintain fair classroom usage.' : 'Sign-in required to manage your study slot reservations.'}
        </p>
      </div>

      <form onSubmit={handleSignIn} className="space-y-6">
        {/* Role Selector */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Sign in as</label>
          <div className="flex bg-surface p-1 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => { setRole('student'); setError(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase transition-all ${
                role === 'student' ? 'bg-primary text-white shadow-lg' : 'text-slate-500'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
              Student
            </button>
            <button
              type="button"
              onClick={() => { setRole('assigner'); setError(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase transition-all ${
                role === 'assigner' ? 'bg-primary text-white shadow-lg' : 'text-slate-500'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
              Assigner
            </button>
          </div>
          <p className="text-[10px] text-slate-500 font-medium ml-1 leading-relaxed">
            {role === 'student' 
              ? 'Students can find and reserve spaces in real-time.' 
              : 'Controllers can monitor and manage room allocations.'}
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Email Address</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-[20px]">mail</span>
              <input
                type="email"
                placeholder={role === 'student' ? "name@university.edu" : "admin@admin.edu"}
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                className="w-full h-16 bg-surface border border-slate-800 rounded-2xl pl-12 pr-4 text-white placeholder:text-slate-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-[20px]">lock</span>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="w-full h-16 bg-surface border border-slate-800 rounded-2xl pl-12 pr-4 text-white placeholder:text-slate-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl animate-in shake-in duration-300">
            <span className="material-symbols-outlined text-red-500 text-[18px] shrink-0">error</span>
            <p className="text-red-500 text-[11px] font-bold leading-tight">{error}</p>
          </div>
        )}

        <div className="text-right">
          <Link to="/forgot-password" state={{ role }} className="text-xs font-bold text-primary hover:underline py-2">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-18 bg-primary hover:bg-blue-600 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
        >
          {isLoading ? (
            <span className="material-symbols-outlined animate-spin">sync</span>
          ) : (
            <>
              Sign In
              <span className="material-symbols-outlined font-black">arrow_forward</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-12 text-center">
        <p className="text-sm text-slate-500 font-medium">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary font-black hover:underline ml-1">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignInScreen;
