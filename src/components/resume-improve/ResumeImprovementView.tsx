import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Copy, 
  Check, 
  ArrowRight, 
  Plus, 
  RefreshCw, 
  FileText,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { analyzeResumeImprovements } from '../../services/analyzerService';

export const ResumeImprovementView: React.FC = () => {
  const { 
    user, 
    currentRole, 
    analysisResult, 
    addUserSkill, 
    showNotification 
  } = useApp();

  const atsAnalysis = analyzeResumeImprovements(user.resume, currentRole);

  const [bulletToRewrite, setBulletToRewrite] = useState('Worked on machine learning model for data classification');
  const [isRewriting, setIsRewriting] = useState(false);
  const [rewrittenBullets, setRewrittenBullets] = useState<string[]>([
    'Architected and deployed a multi-class Random Forest & XGBoost pipeline on 500k+ tabular records, achieving 94.2% F1-score and reducing manual triage time by 35%.',
    'Engineered automated feature extraction scripts using Pandas and Scikit-Learn, streamlining data preprocessing cycle from 4 hours to under 25 minutes.'
  ]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleRewrite = () => {
    if (!bulletToRewrite.trim()) return;
    setIsRewriting(true);
    showNotification('AI rewriting bullet point with quantifiable metrics...', 'info');

    setTimeout(() => {
      setRewrittenBullets([
        `Engineered an end-to-end ${currentRole.title} workflow leveraging ${analysisResult.strengthsSummary.slice(0, 2).join(' & ')}, improving benchmark accuracy by 18.4% and cutting inference latency by 40ms.`,
        `Spearheaded data preprocessing and optimization for ${bulletToRewrite.trim()}, scaling throughput to 10,000+ operations/sec while reducing error rates by 22%.`
      ]);
      setIsRewriting(false);
      showNotification('Generated 2 high-impact quantifiable bullet variations!');
    }, 600);
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    showNotification('Copied to clipboard!');
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="p-4 sm:p-8 flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              ATS Resume Optimization & Keyword Match
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              ATS Score {atsAnalysis.overallAtsScore}%
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Optimize your resume keyword density and bullet points to pass automated Applicant Tracking Systems for <span className="text-indigo-400 font-semibold">{currentRole.title}</span>.
          </p>
        </div>
      </div>

      {/* Top ATS Score Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#141414] border border-[#222] p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">ATS Match Score</p>
            <h3 className="text-3xl font-extrabold text-white mt-0.5">{atsAnalysis.overallAtsScore}%</h3>
            <p className="text-[10px] text-emerald-400">Competitive candidate tier</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold text-lg">
            {atsAnalysis.overallAtsScore}%
          </div>
        </div>

        <div className="bg-[#141414] border border-[#222] p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Keywords Detected</p>
            <h3 className="text-3xl font-extrabold text-white mt-0.5">{atsAnalysis.presentKeywords.length}</h3>
            <p className="text-[10px] text-indigo-400">Found in resume text</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-[#141414] border border-[#222] p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Missing ATS Keywords</p>
            <h3 className="text-3xl font-extrabold text-white mt-0.5">{atsAnalysis.missingKeywords.length}</h3>
            <p className="text-[10px] text-rose-400">Add to boost scan rates</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
            <XCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Grid: Left Column Keywords (6 cols), Right Column Bullet Rewriter (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Left Column: ATS Keywords */}
        <div className="lg:col-span-6 space-y-6">
          {/* Missing Keywords Box */}
          <div className="bg-[#141414] border border-[#222] p-6 rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Missing ATS Keywords for {currentRole.title}
              </h4>
              <span className="text-[10px] text-gray-400">Click to add to skills</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {atsAnalysis.missingKeywords.map((kw, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    addUserSkill({
                      name: kw,
                      category: 'Core Concepts & AI',
                      proficiency: 75,
                      level: 'Intermediate',
                      source: 'manual'
                    });
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#1c1c1c] hover:bg-indigo-600 hover:text-white border border-[#2a2a2a] hover:border-indigo-500 text-gray-300 text-xs font-medium transition-all flex items-center gap-1.5 group cursor-pointer"
                >
                  <span>{kw}</span>
                  <Plus className="w-3 h-3 text-indigo-400 group-hover:text-white" />
                </button>
              ))}
            </div>
          </div>

          {/* Detected Keywords Box */}
          <div className="bg-[#141414] border border-[#222] p-6 rounded-2xl space-y-4 shadow-sm">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Successfully Detected Keywords
            </h4>

            <div className="flex flex-wrap gap-2">
              {atsAnalysis.presentKeywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>{kw}</span>
                </span>
              ))}
            </div>
          </div>

          {/* ATS Improvement Suggestions */}
          <div className="bg-[#141414] border border-[#222] p-6 rounded-2xl space-y-3 shadow-sm">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Structural & Content Suggestions
            </h4>
            <div className="space-y-3">
              {atsAnalysis.suggestions.map((sug, idx) => (
                <div key={idx} className="p-3 bg-[#181818] rounded-xl border border-[#262626] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{sug.title}</span>
                    <span className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded ${
                      sug.severity === 'high' ? 'bg-rose-500/20 text-rose-400' :
                      sug.severity === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {sug.severity}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-normal">{sug.suggestedAction}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Quantifiable Bullet Rewriter */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-[#141414] border border-[#222] p-6 rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                AI Quantifiable Bullet Rewriter
              </h4>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Transform generic duty descriptions into impactful, metric-driven achievements following the XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]".
            </p>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Enter your existing resume bullet point:
              </label>
              <textarea
                rows={3}
                value={bulletToRewrite}
                onChange={(e) => setBulletToRewrite(e.target.value)}
                className="w-full bg-[#181818] border border-[#2a2a2a] focus:border-indigo-500 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none leading-relaxed"
              />
            </div>

            <button
              onClick={handleRewrite}
              disabled={isRewriting || !bulletToRewrite.trim()}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-900/30 cursor-pointer"
            >
              {isRewriting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>AI Generating Metric Variations...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Rewrite with Metrics & Tech Stack</span>
                </>
              )}
            </button>

            {/* Output Variations */}
            <div className="space-y-3 pt-2">
              <h5 className="text-[10px] font-bold uppercase text-gray-400">
                Recommended ATS-Optimized Bullet Points:
              </h5>

              {rewrittenBullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[#181818] rounded-xl border border-[#262626] flex items-start justify-between gap-3 text-xs text-gray-200"
                >
                  <p className="leading-relaxed font-mono text-[11px]">
                    • {bullet}
                  </p>
                  <button
                    onClick={() => handleCopy(bullet, idx)}
                    className="p-1.5 rounded-lg bg-[#222] hover:bg-[#333] text-gray-400 hover:text-white transition-colors shrink-0 cursor-pointer"
                    title="Copy bullet"
                  >
                    {copiedIdx === idx ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
