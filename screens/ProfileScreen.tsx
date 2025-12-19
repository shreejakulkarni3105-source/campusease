
import React, { useState, useRef } from 'react';
import BottomNav from '../components/BottomNav';
import { User } from '../types';

interface Props {
  user: User | null;
  onLogout: () => void;
  onUpdateProfile: (updates: Partial<User>) => void;
}

const ProfileScreen: React.FC<Props> = ({ user, onLogout, onUpdateProfile }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [showPermissionMsg, setShowPermissionMsg] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoAction = (type: 'gallery' | 'camera') => {
    setShowPermissionMsg(true);
    // Short delay to show the permission explanation before system prompt
    setTimeout(() => {
      setShowPermissionMsg(false);
      setShowPicker(false);
      if (fileInputRef.current) {
        if (type === 'camera') {
          fileInputRef.current.setAttribute('capture', 'environment');
        } else {
          fileInputRef.current.removeAttribute('capture');
        }
        fileInputRef.current.click();
      }
    }, 1500);
  };

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
    <div className="flex-1 flex flex-col p-6 pb-20 animate-in fade-in duration-500 relative">
      <h1 className="text-2xl font-black mb-8 tracking-tight">Profile Settings</h1>

      <div className="flex flex-col items-center mb-10">
        <div className="relative mb-5 group">
          <div className="size-32 rounded-[2.5rem] border-4 border-slate-800 p-1.5 bg-background shadow-2xl relative overflow-hidden">
            <img 
              src={user?.profilePic || `https://picsum.photos/seed/${user?.email || 'shreeja'}/200/200`} 
              className="w-full h-full rounded-[2rem] object-cover" 
              alt="Profile" 
            />
            <div 
              onClick={() => setShowPicker(true)}
              className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <span className="material-symbols-outlined text-white">photo_camera</span>
            </div>
          </div>
          <button 
            onClick={() => setShowPicker(true)}
            className="absolute -bottom-1 -right-1 size-10 bg-primary rounded-2xl border-4 border-background flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </button>
        </div>
        <h2 className="text-2xl font-black tracking-tight">{user?.name || 'Shreeja Kulkarni'}</h2>
        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-1">
          {user?.role === 'assigner' ? 'Space Coordinator' : 'Student Member'}
        </p>
      </div>

      <div className="space-y-3">
        <div className="bg-surface/50 rounded-2xl border border-slate-800/50 p-5 flex items-center gap-5">
          <div className="size-11 rounded-xl bg-slate-800 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">mail</span>
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-wider mb-0.5">Contact Email</p>
            <p className="font-bold text-sm text-slate-200">{user?.email || 's.kulkarni@university.edu'}</p>
          </div>
        </div>
        {user?.role === 'student' && (
          <div className="bg-surface/50 rounded-2xl border border-slate-800/50 p-5 flex items-center gap-5">
            <div className="size-11 rounded-xl bg-slate-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">id_card</span>
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-wider mb-0.5">Student ID</p>
              <p className="font-bold text-sm text-slate-200">{user.studentId}</p>
            </div>
          </div>
        )}
        <div className="bg-surface/50 rounded-2xl border border-slate-800/50 p-5 flex items-center gap-5">
          <div className="size-11 rounded-xl bg-slate-800 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">verified_user</span>
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-wider mb-0.5">Account Status</p>
            <p className="font-bold text-sm text-green-500">Verified Active</p>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8">
        <button 
          onClick={onLogout}
          className="w-full h-14 rounded-2xl border border-red-500/20 text-red-500 font-black uppercase text-xs tracking-widest bg-red-500/5 hover:bg-red-500/10 transition-colors"
        >
          Sign Out of Account
        </button>
      </div>

      {/* Profile Pic Picker Bottom Sheet */}
      {showPicker && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowPicker(false)}></div>
          <div className="relative bg-surface rounded-t-[2.5rem] p-8 space-y-4 animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-slate-800 rounded-full mx-auto mb-6"></div>
            <h3 className="text-xl font-black text-center mb-6 tracking-tight">Update Profile Photo</h3>
            
            <button 
              onClick={() => handlePhotoAction('camera')}
              className="w-full h-16 bg-slate-800 hover:bg-slate-700 rounded-2xl flex items-center px-6 gap-4 transition-colors"
            >
              <span className="material-symbols-outlined text-primary">photo_camera</span>
              <span className="font-bold">Take a Photo</span>
            </button>
            <button 
              onClick={() => handlePhotoAction('gallery')}
              className="w-full h-16 bg-slate-800 hover:bg-slate-700 rounded-2xl flex items-center px-6 gap-4 transition-colors"
            >
              <span className="material-symbols-outlined text-primary">image</span>
              <span className="font-bold">Choose from Gallery</span>
            </button>
            <button 
              onClick={() => setShowPicker(false)}
              className="w-full h-14 font-black uppercase text-xs tracking-widest text-slate-500 pt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Permission Explanation Message */}
      {showPermissionMsg && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-black/80"></div>
          <div className="relative bg-surface p-8 rounded-[2rem] border border-slate-800 text-center animate-in zoom-in duration-300">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-primary text-[32px]">security</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Access Request</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              CampusEase needs access to your gallery or camera to let you personalize your profile. We only use the image you select.
            </p>
            <div className="flex justify-center">
              <span className="material-symbols-outlined animate-spin text-primary">sync</span>
            </div>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Fix: Added the required user prop to BottomNav */}
      <BottomNav user={user} />
    </div>
  );
};

export default ProfileScreen;
