
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchFilters } from '../types';
import { BUILDINGS } from '../constants';

interface Props {
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
}

const FilterScreen: React.FC<Props> = ({ filters, setFilters }) => {
  const navigate = useNavigate();

  const capacities = [1, 2, 4, 8, 20];

  return (
    <div className="flex-1 flex flex-col p-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="size-10 rounded-full bg-surface flex items-center justify-center">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-bold">Filters</h1>
      </div>

      <div className="space-y-8 flex-1">
        <section>
          <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Building</label>
          <div className="flex flex-wrap gap-2">
            {['Any', ...BUILDINGS].map(b => (
              <button
                key={b}
                onClick={() => setFilters(f => ({ ...f, building: b === 'Any' ? '' : b }))}
                className={`px-4 py-2 rounded-full border transition-all ${
                  (filters.building === b || (b === 'Any' && filters.building === ''))
                    ? 'bg-primary border-primary text-white'
                    : 'border-slate-800 bg-surface text-slate-300'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </section>

        <section>
          <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Minimum Capacity</label>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {capacities.map(c => (
              <button
                key={c}
                onClick={() => setFilters(f => ({ ...f, capacity: c }))}
                className={`flex-1 min-w-[60px] h-12 rounded-xl border flex items-center justify-center transition-all ${
                  filters.capacity === c
                    ? 'bg-primary border-primary text-white'
                    : 'border-slate-800 bg-surface text-slate-300'
                }`}
              >
                {c}+
              </button>
            ))}
          </div>
        </section>

        <section>
          <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Time Slot</label>
          <div className="flex flex-col gap-2">
            {['Now', 'In 1 hour', 'Later Today'].map(t => (
              <button
                key={t}
                onClick={() => setFilters(f => ({ ...f, timeSlot: t }))}
                className={`w-full h-14 rounded-2xl border flex items-center px-4 justify-between transition-all ${
                  filters.timeSlot === t
                    ? 'bg-primary border-primary text-white'
                    : 'border-slate-800 bg-surface text-slate-300'
                }`}
              >
                <span className="font-bold">{t}</span>
                {filters.timeSlot === t && <span className="material-symbols-outlined text-[20px]">check_circle</span>}
              </button>
            ))}
          </div>
        </section>
      </div>

      <button
        onClick={() => navigate('/results')}
        className="mt-8 w-full h-16 bg-primary hover:bg-blue-600 rounded-2xl font-bold text-lg shadow-lg"
      >
        Show Available Rooms
      </button>
    </div>
  );
};

export default FilterScreen;
