import React, { useState } from 'react';
import { 
  Map, 
  CheckCircle2, 
  Circle, 
  ExternalLink, 
  Clock, 
  Sparkles, 
  BookOpen, 
  Plus, 
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RoadmapView: React.FC = () => {
  const { 
    currentRole, 
    roadmapWeeks, 
    toggleTaskCompletion, 
    setActiveTab, 
    triggerConfetti 
  } = useApp();

  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(roadmapWeeks[0]?.weekNumber || 1);

  const selectedWeek = roadmapWeeks.find(w => w.weekNumber === selectedWeekNum) || roadmapWeeks[0];

  // Overall calculations
  const totalTasks = roadmapWeeks.reduce((sum, w) => sum + w.tasks.length, 0);
  const completedTasks = roadmapWeeks.reduce((sum, w) => sum + w.tasks.filter(t => t.completed).length, 0);
  const totalHours = roadmapWeeks.reduce((sum, w) => sum + w.tasks.reduce((ts, t) => ts + (t.estimatedHours || 3), 0), 0);
  const progressPercent = Math.round((completedTasks / Math.max(1, totalTasks)) * 100);

  return (
    <div className="p-4 sm:p-8 flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Personalized Learning Roadmap
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              6-Week Curriculum
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Custom-tailored to bridge your exact skill gaps for <span className="text-indigo-400 font-semibold">{currentRole.title}</span>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('projects')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-900/30 flex items-center gap-2"
          >
            <span>View Recommended Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress & Milestone Overview Banner */}
      <div className="bg-[#141414] border border-[#222] p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
            Overall Curriculum Progress
          </span>
          <div className="flex items-baseline gap-3">
            <h3 className="text-3xl font-extrabold text-white">{progressPercent}%</h3>
            <span className="text-xs text-gray-400 font-medium">{completedTasks} of {totalTasks} milestones completed</span>
          </div>
          <p className="text-[11px] text-indigo-400">
            Estimated time investment: ~{totalHours} hours across 6 weeks
          </p>
        </div>

        {/* Week Selector Chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {roadmapWeeks.map((week) => {
            const isCompleted = week.tasks.every(t => t.completed);
            const isSelected = week.weekNumber === selectedWeekNum;
            const completedCount = week.tasks.filter(t => t.completed).length;

            return (
              <button
                key={week.weekNumber}
                onClick={() => setSelectedWeekNum(week.weekNumber)}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950 ring-2 ring-indigo-400/30'
                    : isCompleted
                    ? 'bg-emerald-950/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-950/30'
                    : 'bg-[#1a1a1a] text-gray-400 hover:text-white hover:bg-[#222] border border-[#2a2a2a]'
                }`}
              >
                <span>W{week.weekNumber}</span>
                <span className="text-[9px] font-normal opacity-80">{completedCount}/{week.tasks.length}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Week Deep Dive Workspace */}
      {selectedWeek && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
          {/* Left 8 Cols: Week Tasks & Interactive Milestones */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-[#141414] border border-[#222] p-6 rounded-2xl shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      Week {selectedWeek.weekNumber}
                    </span>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {selectedWeek.title}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    {selectedWeek.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-[#1a1a1a] px-3 py-1.5 rounded-lg border border-[#262626] shrink-0">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{selectedWeek.tasks.reduce((sum, t) => sum + (t.estimatedHours || 3), 0)} Hours</span>
                </div>
              </div>

              {/* Skills Targeted */}
              <div className="mb-6 pb-4 border-b border-[#222]">
                <span className="text-[10px] uppercase font-bold text-gray-400 mr-2">Skills Targeted:</span>
                <div className="inline-flex flex-wrap gap-1.5 mt-1 sm:mt-0">
                  {(selectedWeek.focusSkills || []).map((s, idx) => (
                    <span key={idx} className="text-[10px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded-full font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interactive Checklist Tasks */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Weekly Milestones & Hands-On Exercises
                </h4>

                {selectedWeek.tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTaskCompletion(selectedWeek.weekNumber, task.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                      task.completed
                        ? 'bg-emerald-950/10 border-emerald-500/30 text-gray-300'
                        : 'bg-[#181818] border-[#2a2a2a] hover:border-indigo-500/50 hover:bg-[#1c1c1c] text-white'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {task.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-gray-500 hover:text-indigo-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                        {task.title}
                      </p>
                      <p className="text-[11px] text-gray-400 leading-normal mt-0.5">
                        {task.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 4 Cols: Curated Free Learning Resources */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#141414] border border-[#222] p-6 rounded-2xl shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Curated Learning Resources
                </h4>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Hand-picked high-quality documentation, open-source tutorials, and videos for Week {selectedWeek.weekNumber}:
              </p>

              <div className="space-y-3">
                {selectedWeek.tasks.map((task, idx) => (
                  <a
                    key={idx}
                    href={task.resourceLink || `https://www.google.com/search?q=${encodeURIComponent(task.resourceTitle + ' tutorial documentation')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block p-3 rounded-xl bg-[#181818] hover:bg-[#202020] border border-[#2a2a2a] hover:border-indigo-500/50 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-xs font-bold text-white group-hover:text-indigo-300">
                        {task.resourceTitle}
                      </p>
                      <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-indigo-400 shrink-0" />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-400">
                      <span className="capitalize">{task.resourceType || 'Documentation'}</span>
                      <span className="text-emerald-400 font-semibold">Free</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
