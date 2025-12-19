
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_CLASSROOMS } from '../constants';
import { SearchFilters, User } from '../types';
import BottomNav from '../components/BottomNav';

interface Props {
  filters: SearchFilters;
  user: User | null;
}

const ResultsScreen: React.FC<Props> = ({ filters, user }) => {
  const navigate = useNavigate();

  const filtered = MOCK_CLASSROOMS.filter(room => {
    if (filters.building && room.building !== filters.building) return false;
    if (room.capacity < filters.capacity) return false;
    return true;
  });

  return (
    <main className="flex-1 flex flex-col p-6 pb-24">
      <header className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/filter')} 
          aria-label="Back to filters"
          className="size-12 rounded-full bg-surface border border-slate-800 flex items-center justify-center shadow-lg active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined" aria-hidden="true">tune</span>
        </button>
        <div>
          <h1 className="text-2xl font-black tracking-tight">Available Rooms</h1>
          <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em]">
            {filtered.length} matching spaces
          </p>
        </div>
      </header>

      <section className="space-y-4 flex-1" aria-label="Search Results">
        {filtered.map(room => (
          <button
            key={room.id}
            onClick={() => navigate(`/detail/${room.id}`)}
            aria-label={`Room ${room.roomNumber} in ${room.building}, capacity ${room.capacity}`}
            className="w-full text-left group bg-surface rounded-[2.5rem] p-6 border border-slate-800 active:scale-[0.98] transition-all flex flex-col gap-6 shadow-xl hover:border-slate-700"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-3xl font-black tracking-tighter">{room.roomNumber}</h3>
                <p className="text-slate-400 text-sm font-bold mt-1">{room.building}</p>
              </div>
              <div className="bg-green-500/10 text-green-500 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-green-500/20">
                <span className="size-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true"></span>
                Available
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-slate-400 bg-background/50 px-3 py-1.5 rounded-xl border border-slate-800">
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">group</span>
                  <span className="text-xs font-black">{room.capacity}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 bg-background/50 px-3 py-1.5 rounded-xl border border-slate-800">
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">schedule</span>
                  <span className="text-xs font-black">Until {room.availableUntil}</span>
                </div>
              </div>
              <div className="size-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined font-black" aria-hidden="true">arrow_forward</span>
              </div>
            </div>
          </button>
        ))}

        {filtered.length === 0 && (
          <div role="status" className="flex flex-col items-center justify-center py-24 text-center animate-in zoom-in duration-500">
            <div className="size-24 rounded-full bg-slate-800/30 flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-6xl text-slate-700" aria-hidden="true">search_off</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight mb-2">No rooms available</h2>
            <p className="text-slate-500 text-sm max-w-[260px] leading-relaxed font-medium">
              We couldn't find any rooms matching your criteria. Try another building or time slot.
            </p>
          </div>
        )}
      </section>

      <BottomNav user={user} />
    </main>
  );
};

export default ResultsScreen;
