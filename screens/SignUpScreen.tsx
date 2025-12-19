
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserRole, User } from '../types';

interface Props {
  onLogin: (user: User) => void;
}

const SignUpScreen: React.FC<Props> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as UserRole
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    // Role-based validation
    if (formData.role === 'student' && !formData.email.toLowerCase().endsWith('@university.edu')) {
      setError('Please use your university email to sign up.');
      return;
    }

    if (formData.role === 'assigner' && !formData.email.toLowerCase().endsWith('@admin.edu')) {
      setError('Please use your admin email for an assigner account.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    const newUser: User = { 
      name: formData.name, 
      email: formData.email, 
      role: formData.role,
      studentId: formData.role === 'student' ? '#82910442' : undefined
    };
    
    onLogin(newUser);
    navigate(formData.role === 'assigner' ? '/assigner-dashboard' : '/');
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  return (
    <div className="flex-1 flex flex-col p-8 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10">
        <h1 className="text-4xl font-black mb-2 tracking-tight">Create Account</h1>
        <p className="text-slate-400 font-medium">Join the campus study network.</p>
      </div>

      <form onSubmit={handleSignUp} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">I am a...</label>
          <div className="flex bg-surface p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => updateField('role', 'student')}
              className={`flex-1 py-2 rounded-lg text-xs font-black uppercase transition-all ${
                formData.role === 'student' ? 'bg-primary text-white' : 'text-slate-500'
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => updateField('role', 'assigner')}
              className={`flex-1 py-2 rounded-lg text-xs font-black uppercase transition-all ${
                formData.role === 'assigner' ? 'bg-primary text-white' : 'text-slate-500'
              }`}
            >
              Assigner
            </button>
          </div>
          <p className="text-[10px] text-slate-500 font-medium ml-1 mt-2">
            {formData.role === 'student' ? 'Requires @university.edu' : 'Requires @admin.edu'}
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
          <input
            type="text"
            placeholder="Jane Doe"
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="w-full h-14 bg-surface border border-slate-800 rounded-2xl px-6 text-white placeholder:text-slate-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">College Email</label>
          <input
            type="email"
            placeholder={formData.role === 'student' ? "j.doe@university.edu" : "admin@admin.edu"}
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full h-14 bg-surface border border-slate-800 rounded-2xl px-6 text-white placeholder:text-slate-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => updateField('password', e.target.value)}
              className="w-full h-14 bg-surface border border-slate-800 rounded-2xl px-6 text-white placeholder:text-slate-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Confirm</label>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => updateField('confirmPassword', e.target.value)}
              className="w-full h-14 bg-surface border border-slate-800 rounded-2xl px-6 text-white placeholder:text-slate-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
             <p className="text-red-500 text-xs font-bold">{error}</p>
          </div>
        )}

        <button
          type="submit"
          className="w-full h-16 bg-primary hover:bg-blue-600 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.98] mt-4"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500 font-medium">
        Already have an account?{' '}
        <Link to="/signin" className="text-primary font-bold hover:underline">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUpScreen;
