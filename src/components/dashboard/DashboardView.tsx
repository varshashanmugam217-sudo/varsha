import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ExternalLink,
  Target,
  FileText,
  Map,
  FolderGit2,
  HelpCircle,
  BarChart3,
  Layers,
  ChevronRight
} from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../common/StatCard';

export const DashboardView: React.FC = () => {
  const { 
    user, 
    currentRole, 
    analysisResult, 
    roadmapWeeks, 
    projectRecommendations, 
    setActiveTab, 
    toggleTaskCompletion,
    toggleProjectStatus
  } = useApp();

  const [activeVisualTab, setActiveVisualTab] = useState<'bars' | 'radar'>('bars');

  // Calculate Roadmap completed percentage
  const totalTasks = roadmapWeeks.reduce((sum, w) => sum + w.tasks.length, 0);
  const completedTasks = roadmapWeeks.reduce((sum, w) => sum + w.tasks.filter(t => t.completed).length, 0);
  const roadmapProgressPct = Math.round((completedTasks / Math.max(1, totalTasks)) * 100);

  // Data for radar chart
  const radarData = analysisResult.categoryBreakdown.map(cat => ({
    category: cat.category.replace('&', '\n&').slice(0, 16),
    user: cat.userScore,
    required: cat.requiredScore,
    fullMark: 100
  }));

  // Top 5 skills for bar chart
  const topSkillsData = analysisResult.skills.slice(0, 6).map(s => ({
    name: s.name.length > 15 ? s.name.slice(0, 15) + '...' : s.name,
    user: s.userProficiency,
    required: s.requiredProficiency,
    status: s.status
  }));

  const nextProject = projectRecommendations[0];

  return (
    <div className="p-4 sm:p-8 flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
      {/* Welcome Banner */}
      <div className="bg-[#121212] border border-[#222] rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden shadow-sm">
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Welcome back, {user.name.split(' ')[0]}
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Student Track
            </span>
          </div>
          <p className="text-xs text-gray-400 max-w-2xl">
            Targeting <span className="text-white font-semibold">{currentRole.title}</span>. Your resume has been analyzed across {analysisResult.totalRequiredSkillsCount} required industry competencies.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 z-10">
          <button
            onClick={() => setActiveTab('resume')}
            className="px-3.5 py-2 rounded-xl bg-[#1c1c1c] hover:bg-[#252525] border border-[#333] text-xs font-semibold text-gray-200 transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>Update Resume</span>
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all shadow-md shadow-indigo-900/30 flex items-center gap-1.5"
          >
            <span>Continue Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4 Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#141414] border border-[#222] p-4 rounded-xl shadow-sm">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Job Readiness</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-white">{analysisResult.jobReadinessScore}%</h3>
            <div className="text-[10px] font-semibold text-emerald-400 mb-1 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />
              +5% this week
            </div>
          </div>
          <div className="mt-2 h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${analysisResult.jobReadinessScore}%` }}
            />
          </div>
        </div>

        <div className="bg-[#141414] border border-[#222] p-4 rounded-xl shadow-sm">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Skill Match</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-white">{analysisResult.skillMatchScore}%</h3>
            <span className="text-[10px] text-gray-400 mb-1">{analysisResult.strongSkillsCount}/{analysisResult.totalRequiredSkillsCount} skills matched</span>
          </div>
          <div className="mt-2 h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${analysisResult.skillMatchScore}%` }}
            />
          </div>
        </div>

        <div className="bg-[#141414] border border-[#222] p-4 rounded-xl shadow-sm">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Strong Skills</p>
          <h3 className="text-2xl font-bold text-white">
            {analysisResult.strongSkillsCount < 10 ? `0${analysisResult.strongSkillsCount}` : analysisResult.strongSkillsCount}
          </h3>
          <p className="text-[10px] text-gray-400 mt-2 truncate font-medium">
            {analysisResult.strengthsSummary.slice(0, 3).join(', ')}
            {analysisResult.strengthsSummary.length > 3 ? `, +${analysisResult.strengthsSummary.length - 3} more` : ''}
          </p>
        </div>

        <div className="bg-[#141414] border border-[#222] p-4 rounded-xl shadow-sm">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Roadmap Progress</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-white">{roadmapProgressPct}%</h3>
            <span className="text-[10px] text-gray-400 mb-1">{completedTasks}/{totalTasks} tasks</span>
          </div>
          <div className="mt-2.5 flex gap-1.5">
            {roadmapWeeks.map((week) => {
              const isComp = week.status === 'completed';
              const isInProg = week.status === 'in_progress';
              return (
                <div 
                  key={week.weekNumber}
                  className={`h-1.5 flex-1 rounded-full ${
                    isComp ? 'bg-indigo-500' : isInProg ? 'bg-indigo-400/60 animate-pulse' : 'bg-gray-800'
                  }`}
                  title={`Week ${week.weekNumber}: ${week.title}`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Main 12-column lower grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Left 7 Columns: Skill Competency Map & AI Insight */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-[#141414] border border-[#222] rounded-xl p-6 flex-1 flex flex-col shadow-sm">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide">Skill Competency Map</h4>
                <p className="text-[11px] text-gray-400">Comparing your proficiency vs {currentRole.title} requirements</p>
              </div>

              <div className="flex items-center gap-3">
                {/* Visual view toggler */}
                <div className="bg-[#1a1a1a] p-1 rounded-lg border border-[#262626] flex items-center text-[10px] font-semibold">
                  <button
                    onClick={() => setActiveVisualTab('bars')}
                    className={`px-2 py-1 rounded transition-colors ${
                      activeVisualTab === 'bars' ? 'bg-[#2a2a2a] text-white' : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    Bars
                  </button>
                  <button
                    onClick={() => setActiveVisualTab('radar')}
                    className={`px-2 py-1 rounded transition-colors ${
                      activeVisualTab === 'radar' ? 'bg-[#2a2a2a] text-white' : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    Radar
                  </button>
                </div>

                <div className="flex items-center gap-3 text-[10px]">
                  <span className="flex items-center gap-1.5 text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Yours
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-gray-600"></span> Required
                  </span>
                </div>
              </div>
            </div>

            {/* Visuals */}
            {activeVisualTab === 'bars' ? (
              <div className="flex-1 space-y-4">
                {analysisResult.skills.slice(0, 5).map((skill) => {
                  const isMissing = skill.status === 'missing';
                  const isModerate = skill.status === 'moderate';
                  const isStrong = skill.status === 'strong';

                  return (
                    <div 
                      key={skill.name} 
                      className={`space-y-1.5 transition-opacity ${
                        isMissing ? 'opacity-50 hover:opacity-80' : isModerate ? 'opacity-80' : ''
                      }`}
                    >
                      <div className="flex justify-between items-center text-[11px] font-medium">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-200 font-semibold">{skill.name}</span>
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                            isStrong ? 'bg-emerald-500/10 text-emerald-400' : isModerate ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'
                          }`}>
                            {skill.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 text-[10px]">Req: {skill.requiredProficiency}%</span>
                          <span className={`font-bold ${isStrong ? 'text-indigo-400' : isModerate ? 'text-amber-400' : 'text-gray-400'}`}>
                            {skill.userProficiency}%
                          </span>
                        </div>
                      </div>

                      {/* Stacked bar showing user vs target */}
                      <div className="h-2 bg-[#222] rounded-full overflow-hidden relative">
                        {/* Target line indicator */}
                        <div 
                          className="absolute top-0 bottom-0 w-0.5 bg-gray-400 z-10" 
                          style={{ left: `${skill.requiredProficiency}%` }}
                          title={`Required: ${skill.requiredProficiency}%`}
                        />
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            isStrong ? 'bg-indigo-500' : isModerate ? 'bg-amber-500/80' : 'bg-rose-500/60'
                          }`}
                          style={{ width: `${skill.userProficiency}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-56 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                    <PolarGrid stroke="#262626" />
                    <PolarAngleAxis dataKey="category" stroke="#888" tick={{ fill: '#888', fontSize: 10 }} />
                    <PolarRadiusAxis stroke="#333" domain={[0, 100]} tick={false} />
                    <Radar name="Your Skills" dataKey="user" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
                    <Radar name="Required Level" dataKey="required" stroke="#4b5563" fill="#4b5563" fillOpacity={0.15} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* AI Insight Box matching design template */}
            <div className="mt-6 p-4 bg-[#1a1a1a] rounded-lg border-l-2 border-indigo-500 shadow-sm">
              <p className="text-[11px] leading-relaxed text-gray-400">
                <span className="text-indigo-400 font-bold">AI INSIGHT:</span> {analysisResult.aiExplanation}
              </p>
            </div>

            {/* Quick Action Footer */}
            <div className="mt-4 pt-3 border-t border-[#1f1f1f] flex items-center justify-between text-xs">
              <button
                onClick={() => setActiveTab('skillgap')}
                className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors"
              >
                <span>View Full 3-Tier Skill Gap Table ({analysisResult.skills.length} skills)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Curated Learning Roadmap & Next Recommended Project */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-[#141414] border border-[#222] rounded-xl p-6 flex-1 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-white tracking-wide">Curated Learning Roadmap</h4>
                <button
                  onClick={() => setActiveTab('roadmap')}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                >
                  <span>Full 6 Weeks</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* Vertical timeline matching theme */}
              <div className="space-y-4 relative py-1">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#262626]"></div>

                {roadmapWeeks.slice(0, 3).map((week) => {
                  const isCompleted = week.status === 'completed';
                  const isInProgress = week.status === 'in_progress';

                  return (
                    <div key={week.weekNumber} className="flex gap-4 relative">
                      <div 
                        className={`w-3.5 h-3.5 rounded-full mt-1 z-10 border-2 border-[#141414] shrink-0 ${
                          isCompleted
                            ? 'bg-emerald-500'
                            : isInProgress
                            ? 'bg-indigo-500 animate-pulse ring-2 ring-indigo-500/30'
                            : 'bg-[#333]'
                        }`}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <p className={`text-[11px] font-bold ${isCompleted || isInProgress ? 'text-white' : 'text-gray-500'}`}>
                            Week {week.weekNumber}: {week.title}
                          </p>
                          <span className={`text-[9px] font-semibold uppercase ${
                            isCompleted ? 'text-emerald-400' : isInProgress ? 'text-indigo-400' : 'text-gray-600'
                          }`}>
                            {week.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className={`text-[10px] leading-tight mt-0.5 ${
                          isCompleted ? 'text-gray-400' : isInProgress ? 'text-indigo-300' : 'text-gray-400'
                        }`}>
                          {week.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Recommended Project Section */}
            {nextProject && (
              <div className="mt-6 pt-6 border-t border-[#222]">
                <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Next Recommended Project
                </h5>
                <div 
                  onClick={() => setActiveTab('projects')}
                  className="bg-[#1c1c1c] hover:bg-[#202020] p-3.5 rounded-xl border border-[#333] hover:border-indigo-500/60 transition-all cursor-pointer group shadow-sm"
                >
                  <div className="flex justify-between items-start mb-1.5">
                    <p className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {nextProject.title}
                    </p>
                    <span className="text-[9px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.5 rounded">
                      {nextProject.difficulty}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-normal mb-2.5 line-clamp-2">
                    {nextProject.shortDescription}
                  </p>
                  <div className="flex justify-between items-center text-[9px] text-gray-400 border-t border-[#262626] pt-2">
                    <span className="truncate max-w-[200px]">Focus: {nextProject.skillsLearned.slice(0, 3).join(', ')}</span>
                    <span className="text-[10px] text-indigo-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      <span>View Blueprint</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
