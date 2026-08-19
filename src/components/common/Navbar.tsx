import React, { useState } from 'react';
import { 
  Bell, 
  ChevronDown, 
  Sparkles, 
  Briefcase, 
  User, 
  LogOut, 
  Menu, 
  RotateCcw, 
  CheckCircle2, 
  ExternalLink,
  Layers
} from 'lucide-react';
import { useApp, NavigationTab } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    user, 
    currentRole, 
    allRoles, 
    setCurrentRoleId, 
    switchDemoProfile,
    setIsAuthModalOpen,
    isSidebarOpen,
    setIsSidebarOpen,
    analysisResult
  } = useApp();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const getBreadcrumbTitle = (tab: NavigationTab) => {
    switch (tab) {
      case 'dashboard': return 'Student Dashboard';
      case 'resume': return 'Resume AI Analysis';
      case 'skillgap': return 'Skill Gap Breakdown';
      case 'jobs': return 'Job Role Comparison';
      case 'roadmap': return 'Personalized Roadmap';
      case 'projects': return 'Project Recommendations';
      case 'interview': return 'Interview Preparation';
      case 'progress': return 'Career Progress Tracking';
      case 'resume-improve': return 'ATS Resume Optimization';
      case 'profile': return 'Student Profile & Goals';
      default: return 'Overview';
    }
  };

  return (
    <header className="h-16 border-b border-[#222] bg-[#0d0d0d] flex items-center justify-between px-4 sm:px-8 shrink-0 z-20 select-none">
      {/* Left: Hamburger & Breadcrumbs */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition-colors"
          title="Toggle Navigation Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
          <span className="text-gray-400 hidden md:inline">CareerGap AI</span>
          <span className="text-gray-700 hidden md:inline">/</span>
          <h1 className="text-white tracking-wide font-semibold">{getBreadcrumbTitle(activeTab)}</h1>
        </div>
      </div>

      {/* Right: Target Role Selector, Quick Switcher, Notifications, User Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Role Selector Pill */}
        <div className="relative">
          <button
            onClick={() => {
              setIsRoleDropdownOpen(!isRoleDropdownOpen);
              setIsUserDropdownOpen(false);
            }}
            className="bg-[#161616] hover:bg-[#1f1f1f] border border-[#2a2a2a] hover:border-indigo-500/50 px-3 py-1.5 rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider hidden sm:inline">Target Role</span>
            <span className="text-xs font-semibold text-indigo-400 px-2 py-0.5 bg-indigo-500/10 rounded-full flex items-center gap-1 border border-indigo-500/20">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              {currentRole.title}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {isRoleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-[#141414] border border-[#2a2a2a] rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-2 border-b border-[#222] text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Select Target Career Path
              </div>
              <div className="max-h-80 overflow-y-auto py-1">
                {allRoles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => {
                      setCurrentRoleId(role.id);
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs hover:bg-[#1c1c1c] transition-colors ${
                      role.id === currentRole.id ? 'text-indigo-400 font-bold bg-indigo-500/10' : 'text-gray-300'
                    }`}
                  >
                    <div>
                      <p className="font-medium text-white">{role.title}</p>
                      <p className="text-[10px] text-gray-500">{role.category}</p>
                    </div>
                    {role.id === currentRole.id && (
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
              <div className="p-2 border-t border-[#222]">
                <button
                  onClick={() => {
                    setActiveTab('jobs');
                    setIsRoleDropdownOpen(false);
                  }}
                  className="w-full text-center text-xs text-indigo-400 hover:text-indigo-300 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors font-medium flex items-center justify-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5" />
                  Compare All Roles & Create Custom
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Readiness Metric Pill */}
        <div className="hidden lg:flex items-center gap-2 bg-[#141414] border border-[#222] px-2.5 py-1 rounded-full text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-gray-400 text-[11px]">Readiness:</span>
          <span className="text-white font-bold">{analysisResult.jobReadinessScore}%</span>
        </div>

        {/* Demo Switcher Quick Dropdown */}
        <div className="hidden sm:flex items-center">
          <button
            onClick={() => switchDemoProfile(user.name.includes('Sunthari') ? 'maya' : 'alex')}
            className="text-[11px] font-medium text-gray-400 hover:text-gray-200 bg-[#161616] hover:bg-[#202020] border border-[#262626] px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors"
            title="Switch Demo Student Track"
          >
            <RotateCcw className="w-3 h-3 text-indigo-400" />
            Switch Demo ({user.name.includes('Sunthari') ? 'ML' : 'FullStack'})
          </button>
        </div>

        {/* User Account Avatar Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setIsUserDropdownOpen(!isUserDropdownOpen);
              setIsRoleDropdownOpen(false);
            }}
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 border border-[#333] flex items-center justify-center text-white text-xs font-bold shadow hover:scale-105 transition-transform cursor-pointer"
          >
            {user.name.charAt(0)}
          </button>

          {isUserDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[#141414] border border-[#2a2a2a] rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 py-2 border-b border-[#222]">
                <p className="text-xs font-bold text-white truncate">{user.name}</p>
                <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                <span className="inline-block mt-1 text-[9px] font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                  {user.plan} Plan
                </span>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setActiveTab('profile');
                    setIsUserDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-[#1c1c1c] hover:text-white flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  My Profile & Career Goals
                </button>
                <button
                  onClick={() => {
                    switchDemoProfile('alex');
                    setIsUserDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-[#1c1c1c] hover:text-white flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  Load Sunthari (ML Track)
                </button>
                <button
                  onClick={() => {
                    switchDemoProfile('maya');
                    setIsUserDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-[#1c1c1c] hover:text-white flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  Load Maya (Full Stack Track)
                </button>
              </div>

              <div className="border-t border-[#222] pt-1">
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setIsUserDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-[#1c1c1c] hover:text-white flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  Login / Switch Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
