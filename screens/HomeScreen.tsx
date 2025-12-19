
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { User } from '../types';

interface Props {
  user: User | null;
}

const HomeScreen: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <main className="flex-1 flex flex-col p-6 pb-20 animate-in fade-in duration-500">
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
            CampusEase
          </h1>
          <p className="text-slate-500 text-sm font-medium">Hi, {user?.name.split(' ')[0] || 'Student'}! 👋</p>
        </div>
        <button 
          onClick={() => navigate('/profile')}
          aria-label="Go to profile"
          className="size-11 rounded-2xl bg-surface border border-slate-800 flex items-center justify-center shadow-lg shadow-black/20"
        >
          <span className="material-symbols-outlined text-[24px] text-primary" aria-hidden="true">person</span>
        </button>
      </header>

      <section className="flex-1 flex flex-col justify-center gap-10">
        <div className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-48 bg-primary/20 blur-[80px] rounded-full" aria-hidden="true"></div>
          
          <div className="relative text-center">
            <h2 className="text-4xl font-black leading-tight mb-4 tracking-tighter">
              Looking for a <span className="text-primary">quiet spot</span>?
            </h2>
            <p className="text-slate-400 mb-8 max-w-[280px] mx-auto font-medium leading-relaxed">
              Real-time availability for every classroom on campus.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/filter')}
          aria-label="Find an empty room now"
          className="group relative w-full h-18 bg-primary hover:bg-blue-600 transition-all rounded-3xl flex items-center justify-center gap-3 shadow-xl shadow-primary/30 active:scale-[0.97]"
        >
          <span className="material-symbols-outlined font-black text-[28px]" aria-hidden="true">search</span>
          <span className="text-xl font-black">Find Empty Room</span>
          <div className="absolute inset-0 rounded-3xl border border-white/20" aria-hidden="true"></div>
        </button>

        <div className="grid grid-cols-2 gap-4">
          <article className="p-5 bg-surface rounded-[2rem] border border-slate-800/50 backdrop-blur-xl">
            <div className="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-primary text-[20px]" aria-hidden="true">electric_bolt</span>
            </div>
            <h3 className="font-black text-sm uppercase tracking-wide">Fast Track</h3>
            <p className="text-xs text-slate-500 font-medium">Reserve in 2 taps</p>
          </article>
          <article className="p-5 bg-surface rounded-[2rem] border border-slate-800/50 backdrop-blur-xl">
            <div className="size-10 rounded-xl bg-green-500/10 flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-green-500 text-[20px]" aria-hidden="true">sensors</span>
            </div>
            <h3 className="font-black text-sm uppercase tracking-wide">Live Feed</h3>
            <p className="text-xs text-slate-500 font-medium">Live capacity updates</p>
          </article>
        </div>
      </section>

      <BottomNav user={user} />
    </main>
  );
};

export default HomeScreen;
