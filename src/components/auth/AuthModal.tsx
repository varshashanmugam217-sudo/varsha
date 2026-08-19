import React, { useState } from 'react';
import { X, Sparkles, Lock, Mail, User, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    login, 
    register, 
    switchDemoProfile,
    allRoles 
  } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [targetRoleId, setTargetRoleId] = useState('ml-engineer');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      login(email || 'sunthari@university.edu', name || 'Sunthari');
    } else {
      register(name || 'Sunthari', email || 'student@university.edu', targetRoleId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#141414] border border-[#2a2a2a] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-[#222] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            <div>
              <h2 className="text-base font-bold text-white">CareerGap AI</h2>
              <p className="text-[11px] text-gray-400">Student & Job Seeker Authentication</p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-[#222] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Demo Profiles Banner */}
        <div className="bg-indigo-950/30 border-b border-indigo-500/20 p-4">
          <div className="flex items-center gap-1.5 text-indigo-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Quick Demo Login (No signup required)
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                switchDemoProfile('alex');
                setIsAuthModalOpen(false);
              }}
              className="px-3 py-2 bg-[#181818] hover:bg-[#222] border border-[#333] hover:border-indigo-500 rounded-lg text-left transition-colors text-xs"
            >
              <p className="font-semibold text-white">Sunthari</p>
              <p className="text-[10px] text-indigo-400">Machine Learning Track</p>
            </button>
            <button
              onClick={() => {
                switchDemoProfile('maya');
                setIsAuthModalOpen(false);
              }}
              className="px-3 py-2 bg-[#181818] hover:bg-[#222] border border-[#333] hover:border-indigo-500 rounded-lg text-left transition-colors text-xs"
            >
              <p className="font-semibold text-white">Maya Patel</p>
              <p className="text-[10px] text-purple-400">Full Stack Web Track</p>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex rounded-lg bg-[#1a1a1a] p-1 border border-[#262626]">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                mode === 'login' ? 'bg-[#262626] text-white shadow' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                mode === 'register' ? 'bg-[#262626] text-white shadow' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Register
            </button>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Sunthari"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#181818] border border-[#2a2a2a] focus:border-indigo-500 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="student@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#181818] border border-[#2a2a2a] focus:border-indigo-500 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#181818] border border-[#2a2a2a] focus:border-indigo-500 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Target Dream Role
              </label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                <select
                  value={targetRoleId}
                  onChange={(e) => setTargetRoleId(e.target.value)}
                  className="w-full bg-[#181818] border border-[#2a2a2a] focus:border-indigo-500 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none"
                >
                  {allRoles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.title} ({role.category})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/30"
          >
            <span>{mode === 'login' ? 'Sign In to Dashboard' : 'Create Student Account'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
