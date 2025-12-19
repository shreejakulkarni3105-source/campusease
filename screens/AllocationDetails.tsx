
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_CLASSROOMS } from '../constants';
import { RoomStatus } from '../types';

const AllocationDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = MOCK_CLASSROOMS.find(r => r.id === id);

  // Use local state to simulate status changes for the demo
  const [currentStatus, setCurrentStatus] = useState<RoomStatus>(() => {
    const statuses: RoomStatus[] = ['available', 'reserved', 'occupied'];
    return statuses[parseInt(id || '0') % 3];
  });
  const [isCancelling, setIsCancelling] = useState(false);
  const [showStudentDetails, setShowStudentDetails] = useState(false);

  if (!room) return <div className="p-6 text-center">Room not found</div>;

  const handleCancelReservation = () => {
    setIsCancelling(true);
    setTimeout(() => {
      setCurrentStatus('available');
      setIsCancelling(false);
    }, 800);
  };

  const getStatusDisplay = (status: RoomStatus) => {
    switch (status) {
      case 'available': return { label: 'Available', color: 'text-green-500', bg: 'bg-green-500' };
      case 'reserved': return { label: 'Reserved', color: 'text-yellow-500', bg: 'bg-yellow-500' };
      case 'occupied': return { label: 'Occupied', color: 'text-red-500', bg: 'bg-red-500' };
    }
  };

  const maskEmail = (email: string) => {
    const [name, domain] = email.split('@');
    if (!name) return '*******@***.***';
    return `${name.slice(0, 2)}****@${domain}`;
  };

  const statusInfo = getStatusDisplay(currentStatus);
  const mockStudent = {
    id: '#82910442',
    email: 's.kulkarni@university.edu'
  };

  return (
    <div className="flex-1 flex flex-col p-6 animate-in fade-in slide-in-from-right-4 duration-500 pb-10">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="size-12 rounded-full bg-surface border border-slate-800 flex items-center justify-center">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-bold tracking-tight">Allocation Details</h1>
      </div>

      <div className="bg-surface rounded-[2.5rem] border border-slate-800 p-8 space-y-8 shadow-2xl relative overflow-hidden">
        <div className="text-center relative z-10">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Space Controller View</p>
          <h2 className="text-6xl font-black tracking-tighter">{room.roomNumber}</h2>
          <p className="text-primary font-bold mt-2 text-lg">{room.building}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 bg-background/50 rounded-3xl border border-slate-800/50 flex flex-col items-center">
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-wider mb-2">Status</p>
            <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full border border-slate-700">
              <span className={`size-2 rounded-full ${statusInfo.bg}`}></span>
              <p className={`font-black text-xs uppercase tracking-widest ${statusInfo.color}`}>{statusInfo.label}</p>
            </div>
          </div>
          <div className="p-5 bg-background/50 rounded-3xl border border-slate-800/50 flex flex-col items-center">
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-wider mb-2">Max Cap</p>
            <p className="font-black text-xl">{room.capacity}</p>
          </div>
        </div>

        {currentStatus !== 'available' ? (
          <>
            <section className="pt-6 border-t border-slate-800/50">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-[10px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">verified_user</span>
                  Privacy-First ID
                </h3>
                <button 
                  onClick={() => setShowStudentDetails(!showStudentDetails)}
                  className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {showStudentDetails ? 'lock_open' : 'lock'}
                  </span>
                  {showStudentDetails ? 'Hide' : 'Decrypt'}
                </button>
              </div>
              
              <div className="p-5 bg-background/30 rounded-3xl border border-slate-800/30">
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-600 mb-1 tracking-widest">Student Identifier</p>
                    <p className="font-black text-2xl tracking-tighter">{mockStudent.id}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-600 mb-1 tracking-widest">Contact (Masked)</p>
                    {showStudentDetails ? (
                      <p className="font-bold text-slate-300 animate-in fade-in duration-300">{mockStudent.email}</p>
                    ) : (
                      <p className="font-bold text-slate-500 tracking-widest">{maskEmail(mockStudent.email)}</p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                Allocation Window
              </h3>
              <div className="p-5 bg-primary/5 border border-primary/10 rounded-3xl">
                <p className="font-black text-2xl text-primary tracking-tighter">2:00 PM — 4:00 PM</p>
                <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mt-1">Full 2-hour maximum applied</p>
              </div>
            </section>

            <button
              onClick={handleCancelReservation}
              disabled={isCancelling}
              className="w-full h-18 border-2 border-red-500/20 text-red-500 bg-red-500/5 hover:bg-red-500/10 transition-all rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isCancelling ? (
                <span className="material-symbols-outlined animate-spin">sync</span>
              ) : (
                <>
                  <span className="material-symbols-outlined">block</span>
                  Revoke Allocation
                </>
              )}
            </button>
          </>
        ) : (
          <div className="pt-6 border-t border-slate-800/50 text-center py-12">
            <div className="size-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-green-500 text-[40px]">check_circle</span>
            </div>
            <p className="font-black text-xl text-slate-200">Room Clear</p>
            <p className="text-sm text-slate-500 mt-2 font-medium">No active or pending allocations found.</p>
          </div>
        )}
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-8 mb-4 w-full h-18 bg-surface border border-slate-800 rounded-[2rem] font-black text-slate-400 hover:text-white transition-colors uppercase tracking-widest text-xs"
      >
        Dismiss
      </button>
    </div>
  );
};

export default AllocationDetails;
