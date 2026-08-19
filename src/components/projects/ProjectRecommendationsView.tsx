import React, { useState } from 'react';
import { 
  FolderGit2, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Layers, 
  Code, 
  Check, 
  Copy, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProjectRecommendation } from '../../types';

export const ProjectRecommendationsView: React.FC = () => {
  const { 
    currentRole, 
    projectRecommendations, 
    toggleProjectStatus, 
    showNotification 
  } = useApp();

  const [selectedProject, setSelectedProject] = useState<ProjectRecommendation>(projectRecommendations[0]);
  const [copiedBulletIdx, setCopiedBulletIdx] = useState<number | null>(null);

  const handleCopyBullet = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedBulletIdx(idx);
    showNotification('Copied resume bullet point to clipboard!');
    setTimeout(() => setCopiedBulletIdx(null), 2000);
  };

  return (
    <div className="p-4 sm:p-8 flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Gap-Targeted Project Recommendations
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Portfolio Builder
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Build real-world production projects designed specifically to eliminate your missing skill gaps for <span className="text-indigo-400 font-semibold">{currentRole.title}</span>.
          </p>
        </div>
      </div>

      {/* Grid: Left List (5 cols), Right Detailed Blueprint (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Left Column: Project Cards List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
            Curated Recommendations ({projectRecommendations.length})
          </div>

          {projectRecommendations.map((project) => {
            const isSelected = project.id === selectedProject?.id;
            const isComp = project.isCompleted;

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer shadow-sm ${
                  isSelected
                    ? 'bg-[#181818] border-indigo-500 ring-1 ring-indigo-500/30'
                    : 'bg-[#141414] border-[#222] hover:border-[#333] hover:bg-[#161616]'
                }`}
              >
                <div className="flex justify-between items-start mb-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-white tracking-tight">
                      {project.title}
                    </h3>
                    {isComp && (
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                        Completed
                      </span>
                    )}
                  </div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    project.difficulty === 'Beginner'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : project.difficulty === 'Intermediate'
                      ? 'bg-indigo-500/10 text-indigo-400'
                      : 'bg-purple-500/10 text-purple-400'
                  }`}>
                    {project.difficulty}
                  </span>
                </div>

                <p className="text-[11px] text-gray-400 leading-normal line-clamp-2 mb-3">
                  {project.shortDescription}
                </p>

                <div className="flex items-center justify-between text-[10px] text-gray-400 border-t border-[#222] pt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-indigo-400" />
                    {project.estimatedDuration}
                  </span>
                  <span className="text-indigo-400 font-semibold truncate max-w-[160px]">
                    {project.skillsLearned.slice(0, 2).join(', ')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Project Blueprint & Architecture */}
        {selectedProject && (
          <div className="lg:col-span-7 bg-[#141414] border border-[#222] p-6 rounded-2xl flex flex-col justify-between gap-6 shadow-sm">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex justify-between items-start gap-4 mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs text-indigo-400 mt-0.5">
                      Target Gap: <span className="font-semibold">{selectedProject.targetMissingSkill}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => toggleProjectStatus(selectedProject.id, 'isCompleted')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                      selectedProject.isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-900/30'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{selectedProject.isCompleted ? 'Completed ✓' : 'Mark as Completed'}</span>
                  </button>
                </div>

                {/* Why this project was recommended */}
                <div className="p-3 bg-indigo-950/20 border border-indigo-500/20 rounded-xl flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-indigo-300 leading-relaxed">
                    <span className="font-bold text-white">Why Recommended:</span> {selectedProject.whyRecommended}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Project Overview & Scope
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {selectedProject.shortDescription}
                </p>
              </div>

              {/* Tech Stack Tags */}
              <div>
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Target Tech Stack & Skills
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedProject.starterTechStack || selectedProject.skillsLearned).map((tech, idx) => (
                    <span key={idx} className="text-xs bg-[#1e1e1e] border border-[#333] text-gray-200 px-2.5 py-1 rounded-lg font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Architecture Guide */}
              <div>
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Core Implementation Features
                </h4>
                <div className="space-y-2">
                  {selectedProject.keyFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-2.5 bg-[#181818] rounded-xl border border-[#262626] text-xs text-gray-300">
                      <span className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-[10px] shrink-0 border border-indigo-500/20">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture Overview */}
              <div>
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Architecture Overview
                </h4>
                <div className="p-3 bg-[#181818] rounded-xl border border-[#262626] text-xs font-mono text-indigo-300">
                  {selectedProject.architectureOverview}
                </div>
              </div>

              {/* Action Links */}
              {selectedProject.githubTemplateUrl && (
                <div>
                  <a
                    href={selectedProject.githubTemplateUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1c1c1c] hover:bg-[#252525] border border-[#333] hover:border-indigo-500/50 rounded-xl text-xs text-white font-semibold transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Explore Open-Source Project Repositories</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
