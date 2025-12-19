
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<Props> = ({ onComplete }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    onComplete();
    navigate('/signin');
  };

  return (
    <div className="flex-1 flex flex-col p-8 justify-between animate-in fade-in duration-700">
      <div className="flex justify-end">
        <button 
          onClick={handleStart}
          className="text-xs font-black uppercase tracking-widest text-slate-500 py-2 px-4"
        >
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-12">
        <div className="size-32 rounded-[3rem] bg-primary flex items-center justify-center shadow-2xl shadow-primary/40">
          <span className="material-symbols-outlined text-white text-[64px]">location_on</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-black tracking-tighter leading-tight">
            Find. Reserve. <br/> <span className="text-primary">Study.</span>
          </h1>
          <p className="text-slate-400 font-medium max-w-[260px] mx-auto leading-relaxed">
            The easiest way to find quiet spaces on campus and boost your productivity.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 w-full max-w-[280px]">
          <div className="flex flex-col items-center gap-2">
            <div className="size-12 rounded-2xl bg-surface border border-slate-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">search</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Find</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="size-12 rounded-2xl bg-surface border border-slate-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">event_available</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Reserve</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="size-12 rounded-2xl bg-surface border border-slate-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">menu_book</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Study</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleStart}
        className="w-full h-18 bg-primary hover:bg-blue-600 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/30 transition-all active:scale-[0.98]"
      >
        Get Started
      </button>
    </div>
  );
};

export default OnboardingScreen;
