import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Sparkles, 
  Filter, 
  ArrowRight, 
  Sliders, 
  HelpCircle,
  TrendingUp,
  Layers
} from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useApp } from '../../context/AppContext';

export const SkillGapView: React.FC = () => {
  const { 
    currentRole, 
    analysisResult, 
    updateSkillProficiency, 
    addUserSkill,
    setActiveTab, 
    showNotification 
  } = useApp();

  const [filterStatus, setFilterStatus] = useState<'all' | 'strong' | 'moderate' | 'missing'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredSkills = analysisResult.skills.filter(s => {
    if (filterStatus !== 'all' && s.status !== filterStatus) return false;
    if (selectedCategory !== 'all' && s.category !== selectedCategory) return false;
    return true;
  });

  const categories = Array.from(new Set(analysisResult.skills.map(s => s.category)));

  // Radar data
  const radarData = analysisResult.categoryBreakdown.map(cat => ({
    category: cat.category.length > 15 ? cat.category.slice(0, 15) : cat.category,
    user: cat.userScore,
    required: cat.requiredScore,
    fullMark: 100
  }));

  const handleSimulateSkillBoost = (skillName: string, category: any) => {
    // Add or boost skill to 85%
    addUserSkill({
      name: skillName,
      category,
      proficiency: 85,
      level: 'Advanced',
      source: 'assessed'
    });
    showNotification(`Simulated mastery in ${skillName}! Your Job Readiness Score has increased.`);
  };

  return (
    <div className="p-4 sm:p-8 flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              AI Skill Gap Analysis
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {currentRole.title}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Granular 3-tier classification comparing your resume against industry benchmarks for {currentRole.title}.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('roadmap')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-900/30 flex items-center gap-2 self-start sm:self-auto"
        >
          <span>Generate Roadmap from Gaps</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Overview 3-Tier Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#141414] border border-[#222] p-5 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
            ✓
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Strong Skills</p>
            <h3 className="text-2xl font-bold text-white">{analysisResult.strongSkillsCount}</h3>
            <p className="text-[10px] text-emerald-400">Meets or exceeds 85% requirement</p>
          </div>
        </div>

        <div className="bg-[#141414] border border-[#222] p-5 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
            ◐
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Moderate Skills</p>
            <h3 className="text-2xl font-bold text-white">{analysisResult.moderateSkillsCount}</h3>
            <p className="text-[10px] text-amber-400">Needs proficiency deepening</p>
          </div>
        </div>

        <div className="bg-[#141414] border border-[#222] p-5 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-lg">
            ✗
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Missing Gaps</p>
            <h3 className="text-2xl font-bold text-white">{analysisResult.missingSkillsCount}</h3>
            <p className="text-[10px] text-rose-400">Primary hiring blockers</p>
          </div>
        </div>
      </div>

      {/* AI Explanation Banner */}
      <div className="p-5 bg-[#141414] rounded-2xl border border-[#222] border-l-4 border-l-indigo-500 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            AI Readiness Score Explanation ({analysisResult.jobReadinessScore}%)
          </h4>
        </div>
        <p className="text-xs leading-relaxed text-gray-300">
          {analysisResult.aiExplanation}
        </p>

        <div className="pt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
          {analysisResult.aiKeyInsights.map((insight, idx) => (
            <div key={idx} className="bg-[#1a1a1a] p-2.5 rounded-lg border border-[#262626] text-[11px] text-gray-400">
              <span className="text-indigo-400 font-bold mr-1">•</span>
              {insight}
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Category Selection Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#141414] p-3 rounded-xl border border-[#222]">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          <span className="text-[10px] font-bold uppercase text-gray-400 mr-2 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Status:
          </span>
          {(['all', 'strong', 'moderate', 'missing'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase text-[10px] transition-colors ${
                filterStatus === st
                  ? 'bg-indigo-600 text-white'
                  : 'bg-[#1e1e1e] text-gray-400 hover:text-white'
              }`}
            >
              {st} ({st === 'all' ? analysisResult.skills.length : analysisResult.skills.filter(s => s.status === st).length})
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-[10px] font-bold uppercase text-gray-400">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#1e1e1e] border border-[#333] text-white text-xs rounded-lg px-2.5 py-1 focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Skill Comparison Table & Simulator */}
      <div className="bg-[#141414] border border-[#222] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0f0f0f] border-b border-[#222] text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Required Skill</th>
                <th className="py-3.5 px-4">Importance</th>
                <th className="py-3.5 px-4">Your Level</th>
                <th className="py-3.5 px-4">Industry Req</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Action / Simulation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f1f1f]">
              {filteredSkills.map((skill) => {
                const isStrong = skill.status === 'strong';
                const isModerate = skill.status === 'moderate';
                const isMissing = skill.status === 'missing';

                return (
                  <tr key={skill.name} className="hover:bg-[#181818] transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-white">{skill.name}</p>
                      <p className="text-[10px] text-gray-400">{skill.category}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                        skill.importance === 'critical'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : skill.importance === 'important'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-gray-500/10 text-gray-400'
                      }`}>
                        {skill.importance.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-[#222] rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              isStrong ? 'bg-indigo-500' : isModerate ? 'bg-amber-500' : 'bg-rose-500/50'
                            }`}
                            style={{ width: `${skill.userProficiency}%` }}
                          />
                        </div>
                        <span className="font-bold text-white text-[11px]">{skill.userProficiency}%</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-gray-400 font-medium">
                      {skill.requiredProficiency}%
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isStrong
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : isModerate
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {isStrong ? '✓ Strong' : isModerate ? '◐ Moderate' : '✗ Missing'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {isMissing || isModerate ? (
                        <button
                          onClick={() => handleSimulateSkillBoost(skill.name, skill.category)}
                          className="px-2.5 py-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded text-[10px] font-semibold transition-colors flex items-center gap-1"
                          title="Simulate mastering this skill to see score impact"
                        >
                          <Sliders className="w-3 h-3" />
                          <span>Simulate +Mastery</span>
                        </button>
                      ) : (
                        <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Verified
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
