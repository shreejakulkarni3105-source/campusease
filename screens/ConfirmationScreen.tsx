
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Reservation } from '../types';

interface Props {
  reservation: Reservation | null;
}

const ConfirmationScreen: React.FC<Props> = ({ reservation }) => {
  const navigate = useNavigate();

  if (!reservation) return <div>No reservation found</div>;

  return (
    <div className="flex-1 flex flex-col p-8 items-center justify-center text-center animate-in zoom-in duration-500">
      <div className="w-full bg-surface rounded-[3rem] border border-slate-800 p-8 shadow-2xl relative overflow-hidden">
        {/* Success burst effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-40 bg-green-500/10 blur-[60px] rounded-full"></div>
        
        <div className="size-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-500/30 relative z-10">
          <span className="material-symbols-outlined text-[48px] text-white font-black">check</span>
        </div>

        <h1 className="text-4xl font-black mb-2 tracking-tighter">Spot Secured!</h1>
        <p className="text-slate-400 mb-10 font-medium">
          Your room is ready for you. Check in when you arrive.
        </p>

        <div className="space-y-4 bg-background/50 rounded-3xl p-6 border border-slate-800/50 mb-8">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Classroom</span>
            <span className="font-black text-lg text-primary">{reservation.classroom.roomNumber}</span>
          </div>
          <div className="h-px bg-slate-800 w-full"></div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Building</span>
            <span className="font-bold text-slate-200">{reservation.classroom.building}</span>
          </div>
          <div className="h-px bg-slate-800 w-full"></div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Window</span>
            <span className="font-bold text-slate-200">{reservation.startTime} - {reservation.endTime}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 p-4 bg-primary/10 rounded-2xl border border-primary/20">
          <span className="material-symbols-outlined text-primary text-[20px]">notifications_active</span>
          <p className="text-[10px] font-black uppercase tracking-widest text-primary text-left leading-tight">
            We'll notify you 15 minutes before your time is up.
          </p>
        </div>
      </div>

      <div className="w-full space-y-4 mt-12">
        <button
          onClick={() => navigate('/reservations')}
          className="w-full h-18 bg-primary hover:bg-blue-600 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
        >
          View My Slots
          <span className="material-symbols-outlined font-black">arrow_forward</span>
        </button>
        <button
          onClick={() => navigate('/')}
          className="w-full h-18 bg-surface border border-slate-800 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-all"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
