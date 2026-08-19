import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Target, 
  Map, 
  FolderGit2, 
  HelpCircle, 
  ShieldCheck, 
  FileText, 
  TrendingUp, 
  Zap, 
  BarChart3,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LandingPage: React.FC = () => {
  const { setActiveTab, setIsAuthModalOpen, switchDemoProfile } = useApp();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 selection:bg-indigo-500/30 overflow-y-auto custom-scrollbar">
      {/* Top Navigation */}
      <header className="h-20 border-b border-[#1f1f1f] bg-[#0d0d0d]/80 backdrop-blur-md sticky top-0 z-40 px-6 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-900/40">
            A
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-white">CareerGap</span>
              <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 bg-indigo-500/20 text-indigo-400 rounded border border-indigo-500/30">AI</span>
            </div>
            <p className="text-[10px] text-gray-400">Career & Skill Gap Platform</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-gray-400">
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#skill-analysis" className="hover:text-white transition-colors">Skill Gap Demo</a>
          <a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              switchDemoProfile('alex');
              setActiveTab('dashboard');
            }}
            className="px-3.5 py-2 text-xs font-semibold text-gray-300 hover:text-white bg-[#181818] hover:bg-[#222] border border-[#2a2a2a] rounded-lg transition-colors hidden sm:block"
          >
            Live Demo
          </button>
          <button
            onClick={() => {
              setActiveTab('resume');
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center gap-1.5 shadow-lg shadow-indigo-900/30"
          >
            <span>Analyze Resume</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 sm:px-12 pt-20 pb-24 max-w-6xl mx-auto text-center">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Empowering College Students, Fresh Graduates & Job Seekers</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight sm:leading-tight mb-6">
          Know Your Skills. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200">
            Find Your Career Gap.
          </span>{' '}
          Build Your Future.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
          AI-powered career analysis that compares your resume skills against target dream job requirements, calculates your exact job-readiness score, and builds a personalized step-by-step learning roadmap to get you hired.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              setActiveTab('resume');
            }}
            className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm transition-all duration-200 shadow-xl shadow-indigo-900/40 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
          >
            <FileText className="w-4 h-4" />
            <span>Analyze My Resume (PDF)</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={() => {
              switchDemoProfile('alex');
              setActiveTab('dashboard');
            }}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#161616] hover:bg-[#202020] border border-[#2a2a2a] hover:border-indigo-500/40 text-gray-200 hover:text-white rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Explore Live Dashboard Demo</span>
          </button>
        </div>

        {/* Social Proof Metric Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto text-left">
          <div className="bg-[#121212] border border-[#222] p-4 rounded-xl">
            <p className="text-[10px] uppercase font-bold text-gray-500">Benchmark Accuracy</p>
            <p className="text-xl font-bold text-white mt-1">98.4%</p>
            <p className="text-[10px] text-indigo-400 mt-1">Industry Skill Mapping</p>
          </div>
          <div className="bg-[#121212] border border-[#222] p-4 rounded-xl">
            <p className="text-[10px] uppercase font-bold text-gray-500">Predefined Roles</p>
            <p className="text-xl font-bold text-white mt-1">8+ Tracks</p>
            <p className="text-[10px] text-purple-400 mt-1">Plus Custom Roles</p>
          </div>
          <div className="bg-[#121212] border border-[#222] p-4 rounded-xl">
            <p className="text-[10px] uppercase font-bold text-gray-500">Target Gap Detection</p>
            <p className="text-xl font-bold text-white mt-1">3-Tier</p>
            <p className="text-[10px] text-emerald-400 mt-1">Strong • Moderate • Missing</p>
          </div>
          <div className="bg-[#121212] border border-[#222] p-4 rounded-xl">
            <p className="text-[10px] uppercase font-bold text-gray-500">Personalized Roadmap</p>
            <p className="text-xl font-bold text-white mt-1">6-Week Plan</p>
            <p className="text-[10px] text-amber-400 mt-1">With Real Projects</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-6 sm:px-12 py-20 bg-[#0d0d0d] border-y border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              End-to-End Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
              How CareerGap AI Works
            </h2>
            <p className="text-sm text-gray-400 max-w-xl mx-auto mt-2">
              From uploading your student resume to landing your dream tech offer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-[#141414] border border-[#222] p-6 rounded-2xl relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400 text-sm mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-white mb-2">Upload Resume</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Upload your PDF resume. AI instantly extracts your technical skills, programming languages, coursework, and past projects.
              </p>
            </div>

            <div className="bg-[#141414] border border-[#222] p-6 rounded-2xl relative">
              <div className="w-10 h-10 rounded-xl bg-purple-600/10 border border-purple-500/30 flex items-center justify-center font-bold text-purple-400 text-sm mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-white mb-2">Select Target Job</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Choose from Machine Learning Engineer, Data Scientist, Full Stack Developer, or define any custom role.
              </p>
            </div>

            <div className="bg-[#141414] border border-[#222] p-6 rounded-2xl relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/10 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 text-sm mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-white mb-2">AI Skill Gap Analysis</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                System compares your profile against requirements, calculates your readiness score (e.g. 72%), and tags strong, moderate, and missing skills.
              </p>
            </div>

            <div className="bg-[#141414] border border-[#222] p-6 rounded-2xl relative">
              <div className="w-10 h-10 rounded-xl bg-amber-600/10 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 text-sm mb-4">
                04
              </div>
              <h3 className="text-base font-bold text-white mb-2">Follow Curated Roadmap</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Execute a step-by-step 6-week curriculum with recommended portfolio projects and interview preparation questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Bento Grid */}
      <section id="features" className="px-6 sm:px-12 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Comprehensive Suite
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            Engineered for Job Readiness
          </h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto mt-2">
            Structured algorithms, prediction metrics, and actionable career tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#141414] border border-[#222] p-6 rounded-2xl md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Weighted Job Readiness Scoring Engine</h3>
                <p className="text-xs text-gray-400">Mathematical formulation weighting critical core skills vs peripheral tools</p>
              </div>
            </div>
            <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-white">Machine Learning Engineer Track</p>
                <p className="text-[11px] text-gray-400">Strong in Classical ML & Python • Missing Deep Learning & Docker</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-2xl font-bold text-indigo-400">72%</p>
                  <p className="text-[10px] text-gray-400">Job Readiness</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-400">68%</p>
                  <p className="text-[10px] text-gray-400">Skill Match</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#141414] border border-[#222] p-6 rounded-2xl">
            <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 w-fit mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Multi-Job Comparison Matrix</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Compare your current profile against multiple career paths simultaneously to discover which tech job matches your skills today.
            </p>
          </div>

          <div className="bg-[#141414] border border-[#222] p-6 rounded-2xl">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit mb-4">
              <Map className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Personalized Learning Roadmap</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Week-by-week curriculum targeting only what you lack. Mark milestones completed to watch your score rise dynamically.
            </p>
          </div>

          <div className="bg-[#141414] border border-[#222] p-6 rounded-2xl">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 w-fit mb-4">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Gap-Targeted Project Recommendations</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Concrete showcase projects (e.g. Plant Disease Detection for Deep Learning) with architectural guides and tech stack starter blueprints.
            </p>
          </div>

          <div className="bg-[#141414] border border-[#222] p-6 rounded-2xl">
            <div className="p-2.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 w-fit mb-4">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Technical Interview Prep & Mock AI</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Curated coding problems, system design blueprints, and AI mock questions with instant scoring and actionable feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Footer Section */}
      <section className="px-6 sm:px-12 py-20 bg-gradient-to-b from-[#0d0d0d] to-[#080808] border-t border-[#1f1f1f] text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Ready to Bridge Your Skill Gap?
          </h2>
          <p className="text-base text-gray-400 max-w-xl mx-auto mb-8">
            Upload your resume now to calculate your readiness score and start your personalized 6-week career roadmap.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab('resume')}
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm transition-all shadow-xl shadow-indigo-900/40 flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Upload Resume (PDF)</span>
            </button>
            <button
              onClick={() => {
                switchDemoProfile('alex');
                setActiveTab('dashboard');
              }}
              className="px-8 py-3.5 bg-[#181818] hover:bg-[#222] border border-[#2a2a2a] text-gray-200 rounded-xl font-bold text-sm transition-all"
            >
              <span>Launch Demo Dashboard</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 sm:px-12 py-8 border-t border-[#181818] bg-[#070707] text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center font-bold text-white text-[10px]">
            A
          </div>
          <span className="text-gray-400 font-semibold">CareerGap AI © 2026</span>
          <span className="text-gray-600">|</span>
          <span>AI Career & Skill Gap Analyzer for Students</span>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => setActiveTab('dashboard')} className="hover:text-gray-300">Dashboard</button>
          <button onClick={() => setActiveTab('resume')} className="hover:text-gray-300">Resume Analysis</button>
          <button onClick={() => setActiveTab('jobs')} className="hover:text-gray-300">Job Roles</button>
          <button onClick={() => setActiveTab('roadmap')} className="hover:text-gray-300">Roadmap</button>
        </div>
      </footer>
    </div>
  );
};
