
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_CLASSROOMS } from '../constants';
import { User, RoomStatus } from '../types';
import BottomNav from '../components/BottomNav';

interface Props {
  user: User | null;
}

const AssignerDashboard: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const [filterBuilding, setFilterBuilding] = useState('All');
  const [filterTimeSlot, setFilterTimeSlot] = useState('Now');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const TIME_SLOTS = ['Now', 'In 1 hour', 'Later Today'];

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const calendarData = useMemo(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);
    
    const days = [];
    for (let i = 0; i < startDay; i++) days.push(null);
    for (let i = 1; i <= totalDays; i++) days.push(new Date(year, month, i));
    return days;
  }, [selectedDate]);

  const getMockStatus = (roomId: string, date: Date, timeSlot: string): RoomStatus => {
    const day = date.getDate();
    const timeIdx = TIME_SLOTS.indexOf(timeSlot);
    const seed = parseInt(roomId) + day + timeIdx;
    const statuses: RoomStatus[] = ['available', 'reserved', 'occupied'];
    if (day % 7 === 0 || day % 7 === 6) return 'available';
    return statuses[seed % 3];
  };

  const getStatusColor = (status: RoomStatus) => {
    switch(status) {
      case 'available': return 'text-green-500 bg-green-500/10';
      case 'reserved': return 'text-yellow-500 bg-yellow-500/10';
      case 'occupied': return 'text-red-500 bg-red-500/10';
    }
  };

  const filtered = filterBuilding === 'All' 
    ? MOCK_CLASSROOMS 
    : MOCK_CLASSROOMS.filter(r => r.building === filterBuilding);

  const monthName = selectedDate.toLocaleString('default', { month: 'long' });
  const yearName = selectedDate.getFullYear();

  return (
    <main className="flex-1 flex flex-col p-6 pb-24 animate-in fade-in duration-500">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Assigner Dashboard</h1>
          <p className="text-slate-500 text-sm font-medium">Monitoring all active spaces</p>
        </div>
        <button 
          onClick={() => navigate('/assigner-profile')} 
          aria-label="Go to admin profile"
          className="size-11 rounded-2xl bg-surface border border-slate-800 flex items-center justify-center shadow-lg shadow-black/20"
        >
          <span className="material-symbols-outlined text-primary" aria-hidden="true">person</span>
        </button>
      </header>

      <nav aria-label="View Switcher" className="flex bg-surface p-1 rounded-2xl border border-slate-800 mb-6">
        <button
          onClick={() => setViewMode('list')}
          aria-pressed={viewMode === 'list'}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black uppercase transition-all ${
            viewMode === 'list' ? 'bg-primary text-white shadow-lg' : 'text-slate-500'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">view_list</span>
          List View
        </button>
        <button
          onClick={() => setViewMode('calendar')}
          aria-pressed={viewMode === 'calendar'}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black uppercase transition-all ${
            viewMode === 'calendar' ? 'bg-primary text-white shadow-lg' : 'text-slate-500'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">calendar_month</span>
          Calendar
        </button>
      </nav>

      {viewMode === 'calendar' && (
        <section aria-label="Calendar Availability" className="bg-surface rounded-3xl border border-slate-800 p-6 mb-6 animate-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black tracking-tight">{monthName} {yearName}</h2>
            <div className="flex gap-2">
              <button 
                onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))}
                aria-label="Previous Month"
                className="size-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400"
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">chevron_left</span>
              </button>
              <button 
                onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))}
                aria-label="Next Month"
                className="size-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400"
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">chevron_right</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
              <span key={d} className="text-[10px] font-black text-slate-600 uppercase tracking-widest" aria-hidden="true">{d}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarData.map((date, idx) => {
              if (!date) return <div key={`empty-${idx}`} className="aspect-square"></div>;
              const isToday = date.toDateString() === new Date().toDateString();
              const isSelected = date.toDateString() === selectedDate.toDateString();
              return (
                <button
                  key={date.toISOString()}
                  onClick={() => setSelectedDate(new Date(date))}
                  aria-label={date.toDateString()}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all ${
                    isSelected ? 'bg-primary text-white scale-110 z-10' : 
                    isToday ? 'bg-slate-800 border border-primary/50' : 'hover:bg-slate-800'
                  }`}
                >
                  <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>{date.getDate()}</span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      <section aria-label="Active Room List" className="space-y-4">
        {filtered.map(room => {
          const status = getMockStatus(room.id, selectedDate, filterTimeSlot);
          return (
            <button
              key={room.id}
              onClick={() => navigate(`/allocation/${room.id}`)}
              aria-label={`View allocation for Room ${room.roomNumber}`}
              className="w-full text-left bg-surface rounded-3xl p-5 border border-slate-800 active:scale-[0.98] transition-all flex flex-col gap-4 shadow-sm hover:shadow-md hover:border-slate-700"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-black">{room.roomNumber}</h3>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{room.building}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(status)}`}>
                  {status}
                </span>
              </div>
            </button>
          );
        })}
      </section>

      <BottomNav user={user} />
    </main>
  );
};

export default AssignerDashboard;
