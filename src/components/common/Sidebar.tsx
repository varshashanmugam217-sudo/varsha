import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Target, 
  GitCompare, 
  Map, 
  FolderGit2, 
  HelpCircle, 
  TrendingUp, 
  Sparkles, 
  UserCheck, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Home
} from 'lucide-react';
import { useApp, NavigationTab } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    user, 
    analysisResult,
    isSidebarOpen,
    setIsAuthModalOpen
  } = useApp();

  const navItems: { id: NavigationTab; label: string; icon: React.FC<{ className?: string }>; badge?: string | number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'resume', label: 'Resume Analysis', icon: FileText, badge: `${user.resume.skills.length} skills` },
    { id: 'skillgap', label: 'Skill Gap', icon: Target, badge: `${analysisResult.missingSkillsCount} gap` },
    { id: 'jobs', label: 'Job Comparison', icon: GitCompare },
    { id: 'roadmap', label: 'Learning Roadmap', icon: Map, badge: '6 Wks' },
    { id: 'projects', label: 'Project Recommendations', icon: FolderGit2, badge: '5 projects' },
    { id: 'interview', label: 'Interview Preparation', icon: HelpCircle },
    { id: 'resume-improve', label: 'Resume Optimizer', icon: Sparkles, badge: 'ATS' },
    { id: 'progress', label: 'Progress Tracking', icon: TrendingUp },
    { id: 'profile', label: 'Student Profile', icon: UserCheck }
  ];

  if (!isSidebarOpen) return null;

  return (
    <aside className="w-64 bg-[#111111] border-r border-[#222] flex flex-col h-full shrink-0 select-none z-30 transition-all duration-200">
      {/* Brand Header */}
      <div className="p-5 pb-3">
        <div 
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg flex items-center justify-center font-bold text-white shadow-md shadow-indigo-900/30 group-hover:scale-105 transition-transform">
            A
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold tracking-tight text-white">CareerGap</span>
              <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.2 bg-indigo-500/20 text-indigo-400 rounded border border-indigo-500/30">AI</span>
            </div>
            <p className="text-[10px] text-gray-400 font-medium">Skill & Job Readiness Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-2 space-y-1 overflow-y-auto custom-scrollbar">
        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          Core Workflows
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 shadow-sm shadow-indigo-950/50'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#161616]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-indigo-400' : 'text-gray-500 group-hover:text-gray-300'}`} />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold transition-colors ${
                    isActive
                      ? 'bg-indigo-500/20 text-indigo-300'
                      : 'bg-[#1e1e1e] text-gray-500 group-hover:text-gray-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Public Landing Link */}
        <div className="pt-3 border-t border-[#1e1e1e] mt-2">
          <button
            onClick={() => setActiveTab('landing')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'landing'
                ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30'
                : 'text-gray-400 hover:text-gray-200 hover:bg-[#161616]'
            }`}
          >
            <Home className="w-4 h-4 text-gray-500" />
            <span>Landing Page</span>
          </button>
        </div>
      </div>

      {/* Target Role Readiness Card */}
      <div className="p-3 mx-3 mb-2 bg-[#161616] border border-[#262626] rounded-xl">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] uppercase font-bold text-gray-400">Target Readiness</span>
          <span className="text-xs font-bold text-indigo-400">{analysisResult.jobReadinessScore}%</span>
        </div>
        <div className="h-1.5 w-full bg-[#262626] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${analysisResult.jobReadinessScore}%` }}
          />
        </div>
        <p className="text-[10px] text-gray-400 mt-2 flex items-center justify-between">
          <span>{analysisResult.strongSkillsCount} Strong</span>
          <span className="text-rose-400">{analysisResult.missingSkillsCount} Missing Gaps</span>
        </p>
      </div>

      {/* User Footer Profile */}
      <div className="p-3 border-t border-[#222] bg-[#0f0f0f]">
        <div 
          onClick={() => setActiveTab('profile')}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#181818] cursor-pointer transition-colors"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border border-[#333] flex items-center justify-center text-white font-bold text-xs shrink-0 shadow">
            {user.name.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-white truncate">{user.name}</p>
            <p className="text-[10px] text-gray-400 truncate">UC Berkeley • 2026</p>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600 shrink-0" />
        </div>
      </div>
    </aside>
  );
};
