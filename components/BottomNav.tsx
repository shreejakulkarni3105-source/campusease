
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from '../types';

interface Props {
  user: User | null;
}

const BottomNav: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAssignerFlow = user?.role === 'assigner';

  const tabs = isAssignerFlow 
    ? [
        { id: 'monitor', icon: 'dashboard', path: '/assigner-dashboard', label: 'Monitor' },
        { id: 'profile', icon: 'person', path: '/assigner-profile', label: 'Profile' },
      ]
    : [
        { id: 'home', icon: 'search', path: '/', label: 'Find' },
        { id: 'res', icon: 'calendar_today', path: '/reservations', label: 'My Study' },
        { id: 'profile', icon: 'person', path: '/profile', label: 'Profile' },
      ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav aria-label="Main Navigation" className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-surface border-t border-slate-800 flex items-center justify-around h-16 z-50">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => navigate(tab.path)}
          aria-label={tab.label}
          aria-current={isActive(tab.path) ? 'page' : undefined}
          className={`flex flex-col items-center justify-center flex-1 transition-colors ${isActive(tab.path) ? 'text-primary' : 'text-slate-400'}`}
        >
          <span className="material-symbols-outlined text-[24px]" aria-hidden="true">{tab.icon}</span>
          <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
