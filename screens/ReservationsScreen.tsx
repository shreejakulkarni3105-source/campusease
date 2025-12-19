
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Reservation, User } from '../types';
import BottomNav from '../components/BottomNav';

interface Props {
  reservations: Reservation[];
  onCancel: (id: string) => void;
  user: User | null;
}

const ReservationsScreen: React.FC<Props> = ({ reservations, onCancel, user }) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [undoItem, setUndoItem] = useState<string | null>(null);
  const navigate = useNavigate();

  const filtered = activeTab === 'upcoming' 
    ? reservations.filter(r => r.status === 'upcoming')
    : reservations.filter(r => r.status !== 'upcoming');

  const handleCancelWithUndo = (id: string) => {
    onCancel(id);
    setUndoItem(id);
    setTimeout(() => setUndoItem(null), 5000);
  };

  return (
    <main className="flex-1 flex flex-col p-6 pb-24">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-black tracking-tighter">My Study</h1>
        <button 
          onClick={() => setNotificationsEnabled(!notificationsEnabled)}
          aria-label={notificationsEnabled ? "Disable push notifications" : "Enable push notifications"}
          className={`size-11 rounded-2xl flex items-center justify-center border transition-all ${
            notificationsEnabled ? 'bg-primary/10 border-primary text-primary' : 'bg-surface border-slate-800 text-slate-500'
          }`}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            {notificationsEnabled ? 'notifications_active' : 'notifications_off'}
          </span>
        </button>
      </header>

      <nav aria-label="Reservation Tabs" className="flex bg-surface p-1.5 rounded-2xl border border-slate-800 mb-6">
        <button
          onClick={() => setActiveTab('upcoming')}
          aria-pressed={activeTab === 'upcoming'}
          className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
            activeTab === 'upcoming' ? 'bg-primary text-white shadow-lg' : 'text-slate-500'
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab('past')}
          aria-pressed={activeTab === 'past'}
          className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
            activeTab === 'past' ? 'bg-primary text-white shadow-lg' : 'text-slate-500'
          }`}
        >
          History
        </button>
      </nav>

      <section className="flex-1 space-y-4" aria-label="Reservation List">
        {undoItem && (
          <div role="status" className="p-4 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-between animate-in slide-in-from-top-4 duration-300 shadow-xl">
            <span className="text-xs font-bold text-slate-300">Reservation cancelled.</span>
            <button className="text-primary text-xs font-black uppercase tracking-widest" aria-label="Undo cancellation" onClick={() => setUndoItem(null)}>Undo</button>
          </div>
        )}

        {filtered.map(res => (
          <article key={res.id} className="bg-surface rounded-3xl p-5 border border-slate-800 flex flex-col gap-5">
            <div className="flex gap-4">
              <div className="size-20 rounded-2xl overflow-hidden shrink-0 border border-slate-800/50">
                <img src={res.classroom.imageUrl} className="w-full h-full object-cover opacity-80" alt="" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-xl tracking-tight">Room {res.classroom.roomNumber}</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">{res.classroom.building}</p>
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">schedule</span>
                  <span>{res.startTime} — {res.endTime}</span>
                </div>
              </div>
            </div>
            {res.status === 'upcoming' && (
              <button 
                onClick={() => handleCancelWithUndo(res.id)}
                className="w-full h-12 bg-red-500/10 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">close</span>
                Cancel Reservation
              </button>
            )}
          </article>
        ))}
      </section>

      <BottomNav user={user} />
    </main>
  );
};

export default ReservationsScreen;
