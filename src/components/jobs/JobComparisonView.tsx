import React, { useState } from 'react';
import { 
  GitCompare, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Plus, 
  Briefcase, 
  TrendingUp, 
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { analyzeSkillGap } from '../../services/analyzerService';
import { parseCustomJobRoleWithAI } from '../../services/geminiService';
import { JobRole } from '../../types';

export const JobComparisonView: React.FC = () => {
  const { 
    user, 
    allRoles, 
    currentRole, 
    setCurrentRoleId, 
    addCustomRole, 
    setActiveTab, 
    showNotification 
  } = useApp();

  const [isCreatingCustom, setIsCreatingCustom] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [isParsingRole, setIsParsingRole] = useState(false);

  // Compute match score for all roles
  const roleComparisons = allRoles.map((role) => {
    const analysis = analyzeSkillGap(user.resume, role);
    return {
      role,
      readinessScore: analysis.jobReadinessScore,
      skillMatchScore: analysis.skillMatchScore,
      strongCount: analysis.strongSkillsCount,
      missingCount: analysis.missingSkillsCount,
      isCurrent: role.id === currentRole.id
    };
  }).sort((a, b) => b.readinessScore - a.readinessScore);

  const bestMatch = roleComparisons[0];

  const handleCreateCustomRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    setIsParsingRole(true);
    showNotification('AI analyzing job requirements & extracting key competencies...', 'info');

    try {
      const newRole = await parseCustomJobRoleWithAI(customTitle, customDescription);
      addCustomRole(newRole);
      setCustomTitle('');
      setCustomDescription('');
      setIsCreatingCustom(false);
    } catch (e) {
      showNotification('Failed to create custom role', 'warning');
    } finally {
      setIsParsingRole(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Multi-Job Career Comparison Matrix
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Compare your resume against multiple career tracks simultaneously to identify which industry roles best match your current skills.
          </p>
        </div>

        <button
          onClick={() => setIsCreatingCustom(!isCreatingCustom)}
          className="px-4 py-2.5 bg-[#1a1a1a] hover:bg-[#252525] border border-[#333] hover:border-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-3.5 h-3.5 text-indigo-400" />
          <span>Add Custom Target Role</span>
        </button>
      </div>

      {/* Highest Immediate Match Callout */}
      {bestMatch && (
        <div className="bg-gradient-to-r from-indigo-950/30 to-purple-950/20 border border-indigo-500/30 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center font-bold text-xl">
              ★
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                Highest Immediate Market Match
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                {bestMatch.role.title} ({bestMatch.readinessScore}% Match)
              </h3>
              <p className="text-xs text-gray-400">
                Your current technical background has the lowest hiring friction for this role ({bestMatch.strongCount} strong skills matched).
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setCurrentRoleId(bestMatch.role.id);
              setActiveTab('dashboard');
            }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 shadow-md shadow-indigo-900/30"
          >
            <span>Switch Target to {bestMatch.role.title.split(' ')[0]}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Custom Job Role Creator Modal / Drawer */}
      {isCreatingCustom && (
        <form onSubmit={handleCreateCustomRole} className="p-6 bg-[#141414] border border-[#2a2a2a] rounded-2xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <h4 className="text-sm font-bold text-white">Create Custom Target Role with AI</h4>
            </div>
            <button
              type="button"
              onClick={() => setIsCreatingCustom(false)}
              className="text-xs text-gray-500 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Job Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Computer Vision Researcher, Robotics Engineer, Solutions Architect..."
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full bg-[#181818] border border-[#333] focus:border-indigo-500 rounded-lg p-2.5 text-xs text-white placeholder-gray-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Job Description or Required Skills List
              </label>
              <textarea
                rows={4}
                placeholder="Paste the job description or bullet points from a job listing here..."
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
                className="w-full bg-[#181818] border border-[#333] focus:border-indigo-500 rounded-lg p-2.5 text-xs text-white placeholder-gray-600 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isParsingRole}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2"
          >
            {isParsingRole ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Extracting Requirements with AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Create Role & Compute Gap</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* Role Comparison Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roleComparisons.map(({ role, readinessScore, skillMatchScore, strongCount, missingCount, isCurrent }) => {
          return (
            <div 
              key={role.id}
              className={`bg-[#141414] border p-5 rounded-2xl flex flex-col justify-between gap-4 transition-all duration-200 ${
                isCurrent
                  ? 'border-indigo-500 bg-indigo-950/10 shadow-lg shadow-indigo-950/40 ring-1 ring-indigo-500/30'
                  : 'border-[#222] hover:border-[#333]'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-tight">{role.title}</h4>
                    <p className="text-[10px] text-gray-400">{role.category} • {role.experienceLevel}</p>
                  </div>
                  {isCurrent ? (
                    <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-indigo-500 text-white shadow-sm">
                      Active
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#222] text-gray-400">
                      {role.marketDemand} Demand
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed mb-4">
                  {role.description}
                </p>

                {/* Score meters */}
                <div className="space-y-2 bg-[#181818] p-3 rounded-xl border border-[#262626]">
                  <div>
                    <div className="flex justify-between text-[11px] font-semibold mb-1">
                      <span className="text-gray-400">Job Readiness Score</span>
                      <span className="text-white font-bold">{readinessScore}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#262626] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${readinessScore}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] font-medium mb-1">
                      <span className="text-gray-400">Skill Match</span>
                      <span className="text-purple-400 font-bold">{skillMatchScore}%</span>
                    </div>
                    <div className="h-1 w-full bg-[#262626] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${skillMatchScore}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between text-[10px] text-gray-400 pt-1 border-t border-[#262626]">
                    <span className="text-emerald-400 font-medium">✓ {strongCount} Strong</span>
                    <span className="text-rose-400 font-medium">✗ {missingCount} Gaps</span>
                    <span className="text-gray-400 font-medium">{role.averageSalary.split(' - ')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-[#1f1f1f] flex items-center justify-between">
                {isCurrent ? (
                  <span className="text-[11px] font-bold text-indigo-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Current Target
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      setCurrentRoleId(role.id);
                      setActiveTab('dashboard');
                    }}
                    className="w-full py-2 bg-[#1c1c1c] hover:bg-indigo-600 hover:text-white text-gray-300 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Set as Active Target Role</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
