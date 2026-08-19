import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { AuthModal } from './components/auth/AuthModal';
import { LandingPage } from './components/landing/LandingPage';
import { DashboardView } from './components/dashboard/DashboardView';
import { ResumeUploadView } from './components/resume/ResumeUploadView';
import { SkillGapView } from './components/skillgap/SkillGapView';
import { JobComparisonView } from './components/jobs/JobComparisonView';
import { RoadmapView } from './components/roadmap/RoadmapView';
import { ProjectRecommendationsView } from './components/projects/ProjectRecommendationsView';
import { InterviewPrepView } from './components/interview/InterviewPrepView';
import { ResumeImprovementView } from './components/resume-improve/ResumeImprovementView';
import { ProgressView } from './components/progress/ProgressView';
import { ProfileView } from './components/profile/ProfileView';
import { Sparkles, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, notification } = useApp();

  if (activeTab === 'landing') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-gray-200">
        <LandingPage />
        <AuthModal />
      </div>
    );
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'resume':
        return <ResumeUploadView />;
      case 'skillgap':
        return <SkillGapView />;
      case 'jobs':
        return <JobComparisonView />;
      case 'roadmap':
        return <RoadmapView />;
      case 'projects':
        return <ProjectRecommendationsView />;
      case 'interview':
        return <InterviewPrepView />;
      case 'resume-improve':
        return <ResumeImprovementView />;
      case 'progress':
        return <ProgressView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] font-sans text-gray-200 overflow-hidden select-none">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Container Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-[#0d0d0d]">
        <Navbar />

        {/* Dynamic Page Content */}
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden bg-[#0a0a0a]">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Auth Modal */}
      <AuthModal />

      {/* Global Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
          <div className="bg-[#141414] border border-[#2a2a2a] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs max-w-md">
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : notification.type === 'warning' ? (
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-indigo-400 shrink-0" />
            )}
            <span className="leading-snug">{notification.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
