
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_CLASSROOMS } from '../constants';
import { Classroom, Reservation } from '../types';
import { getSmartStudyRecommendation } from '../services/geminiService';

interface Props {
  onReserve: (room: Classroom) => void;
  reservations: Reservation[];
}

const DetailScreen: React.FC<Props> = ({ onReserve, reservations }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = MOCK_CLASSROOMS.find(r => r.id === id);
  const [tip, setTip] = useState<string>('');
  const [error, setError] = useState<string>('');

  const activeReservations = reservations.filter(r => r.status === 'upcoming');
  const isDoubleBooked = activeReservations.some(r => r.classroom.id === room?.id);
  const isAtLimit = activeReservations.length >= 2;

  useEffect(() => {
    if (room) {
      getSmartStudyRecommendation(room.building).then(setTip);
    }
  }, [room]);

  if (!room) return <div>Room not found</div>;

  const handleReserve = () => {
    if (isAtLimit) {
      setError("You've reached the maximum of 2 active reservations.");
      return;
    }
    if (isDoubleBooked) {
      setError("You already have an active reservation for this room.");
      return;
    }
    onReserve(room);
    navigate('/confirmation');
  };

  return (
    <div className="flex-1 flex flex-col pb-10">
      <div className="relative h-64 overflow-hidden">
        <img src={room.imageUrl} className="w-full h-full object-cover" alt={room.roomNumber} />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 size-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      </div>

      <div className="flex-1 p-6 space-y-8 -mt-10 relative z-10">
        <div className="bg-surface/80 backdrop-blur-xl p-6 rounded-[2.5rem] border border-slate-800 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-green-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full">Available</span>
            <p className="text-slate-400 text-sm font-bold">{room.building}</p>
          </div>
          <h1 className="text-4xl font-black">Room {room.roomNumber}</h1>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 animate-in shake-in duration-300">
            <span className="material-symbols-outlined text-red-500">warning</span>
            <p className="text-sm font-bold text-red-500">{error}</p>
          </div>
        )}

        {tip && (
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl flex items-start gap-3">
            <span className="material-symbols-outlined text-primary">lightbulb</span>
            <div className="flex-1">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">AI Study Tip</h4>
              <p className="text-sm font-medium italic text-slate-300">"{tip}"</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-surface rounded-2xl border border-slate-800 flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-primary text-[24px] mb-2">groups</span>
            <p className="text-[10px] text-slate-500 font-black uppercase mb-1">Max Capacity</p>
            <p className="font-bold text-lg">{room.capacity} Seats</p>
          </div>
          <div className="p-4 bg-surface rounded-2xl border border-slate-800 flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-primary text-[24px] mb-2">schedule</span>
            <p className="text-[10px] text-slate-500 font-black uppercase mb-1">Time Limit</p>
            <p className="font-bold text-lg">2 Hours Max</p>
          </div>
        </div>

        <section>
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 ml-1">Included Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {room.amenities.map(a => (
              <span key={a} className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl text-xs font-bold text-slate-300 flex items-center gap-2">
                <span className="size-1 rounded-full bg-primary"></span>
                {a}
              </span>
            ))}
          </div>
        </section>

        <div className="pt-4">
          <button
            onClick={handleReserve}
            disabled={isAtLimit && !isDoubleBooked}
            className={`w-full h-18 rounded-[2rem] font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl ${
              isDoubleBooked 
                ? 'bg-amber-500 text-black' 
                : isAtLimit 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                  : 'bg-primary hover:bg-blue-600 text-white shadow-primary/30 active:scale-[0.98]'
            }`}
          >
            {isDoubleBooked ? (
              <>
                <span className="material-symbols-outlined font-black">warning</span>
                Double Booked
              </>
            ) : isAtLimit ? (
              'Limit Reached'
            ) : (
              <>
                Reserve Now
                <span className="material-symbols-outlined font-black">arrow_forward</span>
              </>
            )}
          </button>
          <p className="text-center text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-4">
            Free of charge • Instant confirmation
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailScreen;
