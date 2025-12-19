
import React, { useState, useRef } from 'react';
import BottomNav from '../components/BottomNav';
import { User } from '../types';

interface Props {
  user: User | null;
  onLogout: () => void;
  onUpdateProfile: (updates: Partial<User>) => void;
}

const AssignerProfileScreen: React.FC<Props> = ({ user, onLogout, onUpdateProfile }) => {
  const [showPicker, setShowPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateProfile({ profilePic: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="flex-1 flex flex-col p-6 pb-20 animate-in fade-in duration-500 relative">
      <header className="mb-8">
        <h1 className="text-2xl font-black tracking-tight">Assigner Profile</h1>
      </header>

      <section className="flex flex-col items-center mb-10">
        <div className="relative mb-5 group">
          <div className="size-32 rounded-[2.5rem] border-4 border-slate-800 p-1.5 bg-background shadow-2xl relative overflow-hidden">
            <img 
              src={user?.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'admin'}`} 
              className="w-full h-full rounded-[2rem] object-cover" 
              alt="Profile" 
            />
            <button 
              onClick={() => setShowPicker(true)}
              aria-label="Change profile photo"
              className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <span className="material-symbols-outlined text-white">photo_camera</span>
            </button>
          </div>
        </div>
        <h2 className="text-2xl font-black tracking-tight">{user?.name}</h2>
        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mt-2 border border-primary/20">
          Space Controller
        </span>
      </section>

      <section className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-surface/50 rounded-3xl border border-slate-800/50 p-5 text-center">
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-wider mb-1">Managed Rooms</p>
          <p className="text-2xl font-black text-primary">12</p>
        </div>
        <div className="bg-surface/50 rounded-3xl border border-slate-800/50 p-5 text-center">
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-wider mb-1">Active Blocks</p>
          <p className="text-2xl font-black text-primary">8</p>
        </div>
      </section>

      <section className="space-y-3" aria-label="Account Details">
        <div className="bg-surface/50 rounded-2xl border border-slate-800/50 p-5 flex items-center gap-5">
          <div className="size-11 rounded-xl bg-slate-800 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">mail</span>
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-wider mb-0.5">Admin Email</p>
            <p className="font-bold text-sm text-slate-200">{user?.email}</p>
          </div>
        </div>
        <div className="bg-surface/50 rounded-2xl border border-slate-800/50 p-5 flex items-center gap-5">
          <div className="size-11 rounded-xl bg-slate-800 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">security</span>
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-wider mb-0.5">Access Level</p>
            <p className="font-bold text-sm text-green-500">Tier 1 Controller</p>
          </div>
        </div>
      </section>

      <footer className="mt-auto pt-8">
        <button 
          onClick={onLogout}
          aria-label="Sign out of admin account"
          className="w-full h-14 rounded-2xl border border-red-500/20 text-red-500 font-black uppercase text-xs tracking-widest bg-red-500/5 hover:bg-red-500/10 transition-colors"
        >
          Sign Out of Account
        </button>
      </footer>

      {showPicker && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end" role="dialog" aria-modal="true" aria-labelledby="picker-title">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowPicker(false)}></div>
          <div className="relative bg-surface rounded-t-[2.5rem] p-8 space-y-4 animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-slate-800 rounded-full mx-auto mb-6"></div>
            <h3 id="picker-title" className="text-xl font-black text-center mb-6 tracking-tight">Admin Photo</h3>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-16 bg-slate-800 hover:bg-slate-700 rounded-2xl flex items-center px-6 gap-4 transition-colors"
            >
              <span className="material-symbols-outlined text-primary" aria-hidden="true">image</span>
              <span className="font-bold">Choose from Gallery</span>
            </button>
            <button onClick={() => setShowPicker(false)} className="w-full h-14 font-black uppercase text-xs tracking-widest text-slate-500 pt-2">Cancel</button>
          </div>
        </div>
      )}

      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
      <BottomNav user={user} />
    </main>
  );
};

export default AssignerProfileScreen;
