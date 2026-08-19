import React, { useState } from 'react';
import { 
  UserCheck, 
  Mail, 
  GraduationCap, 
  Briefcase, 
  Sparkles, 
  RotateCcw, 
  ShieldCheck, 
  Save,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfileView: React.FC = () => {
  const { 
    user, 
    allRoles, 
    currentRole, 
    setCurrentRoleId, 
    switchDemoProfile, 
    resetToDefaultDemo, 
    showNotification 
  } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [targetRoleId, setTargetRoleId] = useState(user.targetRoleId);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentRoleId(targetRoleId);
    showNotification('Profile and career preferences updated successfully!');
  };

  return (
    <div className="p-4 sm:p-8 flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Student Profile & Career Goals
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Manage your student profile, degree information, and active career track settings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Left Column: Profile Form (7 cols) */}
        <form onSubmit={handleSaveProfile} className="lg:col-span-7 bg-[#141414] border border-[#222] p-6 rounded-2xl space-y-6 shadow-sm">
          <div className="flex items-center gap-4 pb-4 border-b border-[#222]">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 border border-[#333] flex items-center justify-center text-white text-xl font-bold shadow-md">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{user.name}</h3>
              <p className="text-xs text-gray-400">{user.email}</p>
              <span className="inline-block mt-1 text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                {user.plan} Student Account
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#181818] border border-[#2a2a2a] focus:border-indigo-500 rounded-lg p-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#181818] border border-[#2a2a2a] focus:border-indigo-500 rounded-lg p-2.5 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Active Target Job Role
              </label>
              <select
                value={targetRoleId}
                onChange={(e) => setTargetRoleId(e.target.value)}
                className="w-full bg-[#181818] border border-[#2a2a2a] focus:border-indigo-500 rounded-lg p-2.5 text-xs text-white focus:outline-none"
              >
                {allRoles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.title} ({role.category} • {role.averageSalary})
                  </option>
                ))}
              </select>
            </div>

            <div className="p-4 bg-[#181818] rounded-xl border border-[#262626] space-y-2">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                <h4 className="text-xs font-bold text-white">University Education</h4>
              </div>
              <p className="text-xs text-gray-300">
                {user.resume.education[0]?.institution || 'University of California, Berkeley'}
              </p>
              <p className="text-[11px] text-gray-400">
                {user.resume.education[0]?.degree} in {user.resume.education[0]?.fieldOfStudy} • Class of {user.resume.education[0]?.graduationYear}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#222] flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-900/30 flex items-center gap-2"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Preferences</span>
            </button>
          </div>
        </form>

        {/* Right Column: Demo Profiles Switcher (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#141414] border border-[#222] p-6 rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Instant Demo Student Profiles
              </h4>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Switch between pre-configured candidate profiles with distinct resumes, skills, and target career paths:
            </p>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => switchDemoProfile('alex')}
                className="w-full p-3.5 rounded-xl bg-[#181818] hover:bg-[#202020] border border-[#2a2a2a] hover:border-indigo-500 text-left transition-all group"
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="text-xs font-bold text-white group-hover:text-indigo-300">Sunthari</p>
                  <span className="text-[9px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded font-bold">ML Track</span>
                </div>
                <p className="text-[11px] text-gray-400">UC Berkeley • Strong Python & ML • Target: ML Engineer</p>
              </button>

              <button
                type="button"
                onClick={() => switchDemoProfile('maya')}
                className="w-full p-3.5 rounded-xl bg-[#181818] hover:bg-[#202020] border border-[#2a2a2a] hover:border-purple-500 text-left transition-all group"
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="text-xs font-bold text-white group-hover:text-purple-300">Maya Patel</p>
                  <span className="text-[9px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded font-bold">Full Stack</span>
                </div>
                <p className="text-[11px] text-gray-400">UT Austin • Strong React & Node • Target: Full Stack Dev</p>
              </button>
            </div>

            <div className="pt-3 border-t border-[#222]">
              <button
                type="button"
                onClick={resetToDefaultDemo}
                className="w-full py-2 bg-[#181818] hover:bg-[#222] border border-[#2a2a2a] text-gray-400 hover:text-white rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default Demo State</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
