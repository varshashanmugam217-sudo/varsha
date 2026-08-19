import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Sparkles, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  ArrowRight, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Award, 
  RefreshCw,
  Layers,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { extractTextFromPdf } from '../../services/pdfParser';
import { extractResumeWithAI } from '../../services/geminiService';
import { SAMPLE_RESUME_TEXT_ALEX, SAMPLE_RESUME_TEXT_MAYA } from '../../data/demoData';
import { SkillCategory, UserSkill } from '../../types';

export const ResumeUploadView: React.FC = () => {
  const { 
    user, 
    updateResumeData, 
    addUserSkill, 
    removeUserSkill, 
    updateSkillProficiency, 
    currentRole, 
    setActiveTab, 
    showNotification 
  } = useApp();

  const [activeTab, setActiveTabLocal] = useState<'skills' | 'info' | 'education' | 'experience' | 'projects' | 'raw'>('skills');
  const [isExtracting, setIsExtracting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [pastedText, setPastedText] = useState('');

  // Skill Add Modal State
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<SkillCategory>('Programming Languages');
  const [newSkillProficiency, setNewSkillProficiency] = useState(80);

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setIsExtracting(true);
    showNotification('Extracting text and analyzing resume structure...', 'info');

    try {
      let text = '';
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        text = await extractTextFromPdf(file);
      } else {
        text = await file.text();
      }

      if (!text || text.trim().length === 0) {
        throw new Error('No readable text found in file');
      }

      const extracted = await extractResumeWithAI(text);
      updateResumeData(extracted);
      showNotification(`Successfully extracted resume for ${extracted.fullName}! Detected ${extracted.skills.length} technical skills.`);
    } catch (err: any) {
      console.error('Extraction error:', err);
      showNotification('Failed to parse document. Please paste resume text directly.', 'warning');
    } finally {
      setIsExtracting(false);
    }
  };

  const handlePasteExtract = async () => {
    if (!pastedText.trim()) return;
    setIsExtracting(true);
    try {
      const extracted = await extractResumeWithAI(pastedText);
      updateResumeData(extracted);
      showNotification(`Extracted ${extracted.skills.length} skills from pasted text!`);
    } catch (e) {
      showNotification('Error processing text', 'warning');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    addUserSkill({
      name: newSkillName.trim(),
      category: newSkillCategory,
      proficiency: newSkillProficiency,
      level: newSkillProficiency >= 85 ? 'Expert' : newSkillProficiency >= 70 ? 'Advanced' : newSkillProficiency >= 40 ? 'Intermediate' : 'Beginner',
      source: 'manual'
    });

    setNewSkillName('');
    setNewSkillProficiency(80);
  };

  return (
    <div className="p-4 sm:p-8 flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Resume Intelligence & Extraction
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Upload PDF resume or edit extracted profile data to recalculate readiness for <span className="text-indigo-400 font-semibold">{currentRole.title}</span>.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('skillgap')}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-900/30 flex items-center gap-2 self-start sm:self-auto"
        >
          <span>Calculate Skill Gap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Upload Zone & Quick Sample Loaders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dropzone (2 cols) */}
        <div className="lg:col-span-2 bg-[#141414] border border-[#222] rounded-2xl p-6 relative">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0]);
            }}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
              dragOver
                ? 'border-indigo-500 bg-indigo-950/20'
                : 'border-[#2a2a2a] hover:border-[#444] bg-[#111111]'
            }`}
          >
            <input
              type="file"
              id="resume-file-input"
              accept=".pdf,.txt,.docx"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
              }}
            />
            <label htmlFor="resume-file-input" className="cursor-pointer block">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-3">
                <UploadCloud className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">
                Drop your Resume PDF here, or <span className="text-indigo-400 underline">browse</span>
              </h4>
              <p className="text-[11px] text-gray-400">
                Supports PDF, TXT, DOCX formats (Up to 10MB)
              </p>
            </label>
          </div>

          {isExtracting && (
            <div className="absolute inset-0 bg-[#141414]/90 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center gap-3 z-20">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-semibold text-white animate-pulse">
                AI Extracting Skills, Experience, and Coursework...
              </p>
            </div>
          )}
        </div>

        {/* Quick Sample Presets (1 col) */}
        <div className="bg-[#141414] border border-[#222] rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Instant Sample Resumes
              </h4>
            </div>
            <p className="text-[11px] text-gray-400 mb-4">
              Test the extraction engine with realistic student resumes:
            </p>

            <div className="space-y-2.5">
              <button
                onClick={async () => {
                  setIsExtracting(true);
                  const data = await extractResumeWithAI(SAMPLE_RESUME_TEXT_ALEX);
                  updateResumeData(data);
                  setIsExtracting(false);
                  showNotification('Loaded Sunthari ML & Python resume!');
                }}
                className="w-full text-left p-3 rounded-xl bg-[#1a1a1a] hover:bg-[#222] border border-[#2a2a2a] hover:border-indigo-500/50 transition-all group"
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="text-xs font-bold text-white group-hover:text-indigo-300">Sunthari</p>
                  <span className="text-[9px] bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded font-semibold">ML Track</span>
                </div>
                <p className="text-[10px] text-gray-400">UC Berkeley CS • Classical ML & Python</p>
              </button>

              <button
                onClick={async () => {
                  setIsExtracting(true);
                  const data = await extractResumeWithAI(SAMPLE_RESUME_TEXT_MAYA);
                  updateResumeData(data);
                  setIsExtracting(false);
                  showNotification('Loaded Maya Patel Full Stack React resume!');
                }}
                className="w-full text-left p-3 rounded-xl bg-[#1a1a1a] hover:bg-[#222] border border-[#2a2a2a] hover:border-purple-500/50 transition-all group"
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="text-xs font-bold text-white group-hover:text-purple-300">Maya Patel</p>
                  <span className="text-[9px] bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded font-semibold">Full Stack</span>
                </div>
                <p className="text-[10px] text-gray-400">UT Austin IS • React & Node.js</p>
              </button>
            </div>
          </div>

          <p className="text-[10px] text-gray-400 mt-4 border-t border-[#222] pt-3">
            All extracted profiles are editable below.
          </p>
        </div>
      </div>

      {/* Extracted Profile Workspace */}
      <div className="bg-[#141414] border border-[#222] rounded-2xl overflow-hidden shadow-sm">
        {/* Navigation Tabs for Sections */}
        <div className="flex items-center gap-1 p-3 bg-[#0f0f0f] border-b border-[#222] overflow-x-auto">
          {[
            { id: 'skills', label: `Technical Skills (${user.resume.skills.length})`, icon: Code },
            { id: 'info', label: 'Contact & Summary', icon: Edit3 },
            { id: 'education', label: `Education (${user.resume.education.length})`, icon: GraduationCap },
            { id: 'experience', label: `Experience (${user.resume.experience.length})`, icon: Briefcase },
            { id: 'projects', label: `Projects (${user.resume.projects.length})`, icon: Layers },
            { id: 'raw', label: 'Paste Raw Text', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            const isA = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabLocal(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium shrink-0 transition-colors ${
                  isA
                    ? 'bg-[#1c1c1c] text-white border border-[#333] shadow-sm'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-[#161616]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isA ? 'text-indigo-400' : 'text-gray-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Technical Skills Management */}
        {activeTab === 'skills' && (
          <div className="p-6 space-y-6">
            {/* Add New Skill Bar */}
            <form onSubmit={handleAddSkill} className="p-4 bg-[#181818] border border-[#262626] rounded-xl flex flex-col sm:flex-row items-center gap-3">
              <div className="flex-1 w-full">
                <input
                  type="text"
                  placeholder="Add skill (e.g. PyTorch, Docker, Kubernetes, SQL)..."
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="w-full bg-[#111] border border-[#333] focus:border-indigo-500 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none"
                />
              </div>

              <div className="w-full sm:w-48">
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value as any)}
                  className="w-full bg-[#111] border border-[#333] focus:border-indigo-500 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="Programming Languages">Programming Languages</option>
                  <option value="Frameworks & Libraries">Frameworks & Libraries</option>
                  <option value="Databases">Databases</option>
                  <option value="Tools & DevOps">Tools & DevOps</option>
                  <option value="Core Concepts & AI">Core Concepts & AI</option>
                  <option value="Soft Skills & Workflow">Soft Skills & Workflow</option>
                </select>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-36">
                <span className="text-[10px] text-gray-400 font-bold">{newSkillProficiency}%</span>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={newSkillProficiency}
                  onChange={(e) => setNewSkillProficiency(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Skill</span>
              </button>
            </form>

            {/* Current Skills Grid with Editable Proficiencies */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {user.resume.skills.map((skill) => (
                <div 
                  key={skill.id} 
                  className="bg-[#181818] border border-[#262626] hover:border-[#333] p-3.5 rounded-xl flex flex-col justify-between gap-2 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">{skill.name}</p>
                      <p className="text-[10px] text-gray-400">{skill.category}</p>
                    </div>
                    <button
                      onClick={() => removeUserSkill(skill.id)}
                      className="text-gray-500 hover:text-rose-400 p-1 transition-colors"
                      title="Remove skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-medium">
                      <span className="text-gray-400">Proficiency</span>
                      <span className="text-indigo-400 font-bold">{skill.proficiency}% ({skill.level})</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="5"
                      value={skill.proficiency}
                      onChange={(e) => updateSkillProficiency(skill.id, Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-[#262626] rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Contact & Summary */}
        {activeTab === 'info' && (
          <div className="p-6 space-y-4 max-w-2xl">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  value={user.resume.fullName}
                  onChange={(e) => updateResumeData({ fullName: e.target.value })}
                  className="w-full bg-[#181818] border border-[#2a2a2a] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</label>
                <input
                  type="email"
                  value={user.resume.email}
                  onChange={(e) => updateResumeData({ email: e.target.value })}
                  className="w-full bg-[#181818] border border-[#2a2a2a] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Professional Summary</label>
              <textarea
                rows={4}
                value={user.resume.summary}
                onChange={(e) => updateResumeData({ summary: e.target.value })}
                className="w-full bg-[#181818] border border-[#2a2a2a] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Education */}
        {activeTab === 'education' && (
          <div className="p-6 space-y-4">
            {user.resume.education.map((edu, idx) => (
              <div key={idx} className="bg-[#181818] border border-[#262626] p-4 rounded-xl space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-white">{edu.degree} in {edu.fieldOfStudy}</p>
                    <p className="text-[11px] text-indigo-400">{edu.institution}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 bg-[#222] px-2 py-0.5 rounded">
                    Graduating {edu.graduationYear} {edu.gpa ? `• GPA: ${edu.gpa}` : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Experience */}
        {activeTab === 'experience' && (
          <div className="p-6 space-y-4">
            {user.resume.experience.map((exp, idx) => (
              <div key={idx} className="bg-[#181818] border border-[#262626] p-4 rounded-xl space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-white">{exp.role}</p>
                    <p className="text-[11px] text-indigo-400">{exp.company} • {exp.location}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 bg-[#222] px-2 py-0.5 rounded">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-gray-400 pt-1">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Tab 5: Projects */}
        {activeTab === 'projects' && (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.resume.projects.map((proj, idx) => (
                <div key={idx} className="bg-[#181818] border border-[#262626] p-4 rounded-xl space-y-2">
                  <p className="text-xs font-bold text-white">{proj.name}</p>
                  <p className="text-[11px] text-gray-400">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.techStack.map((tech, i) => (
                      <span key={i} className="text-[9px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Paste Raw Text */}
        {activeTab === 'raw' && (
          <div className="p-6 space-y-4">
            <p className="text-xs text-gray-400">
              Paste the text content from any resume to automatically trigger NLP extraction.
            </p>
            <textarea
              rows={8}
              placeholder="Paste full resume text here..."
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              className="w-full bg-[#181818] border border-[#2a2a2a] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
            />
            <button
              onClick={handlePasteExtract}
              disabled={!pastedText.trim()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-colors"
            >
              Parse Text
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
