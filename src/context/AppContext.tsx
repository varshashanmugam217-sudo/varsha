import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { 
  UserProfile, 
  JobRole, 
  SkillGapAnalysisResult, 
  RoadmapWeek, 
  ProjectRecommendation, 
  ExtractedResumeData,
  UserSkill
} from '../types';
import { PREDEFINED_JOB_ROLES } from '../data/rolesData';
import { DEMO_USER_ALEX, DEFAULT_CHECKLIST_ITEMS } from '../data/demoData';
import { 
  analyzeSkillGap, 
  generatePersonalizedRoadmap, 
  generateProjectRecommendations, 
  analyzeResumeImprovements 
} from '../services/analyzerService';

export type NavigationTab = 
  | 'landing'
  | 'dashboard'
  | 'resume'
  | 'skillgap'
  | 'jobs'
  | 'roadmap'
  | 'projects'
  | 'interview'
  | 'progress'
  | 'resume-improve'
  | 'profile';

interface AppContextType {
  // Navigation & View
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;

  // User & Auth
  user: UserProfile;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  login: (email: string, name?: string) => void;
  register: (name: string, email: string, targetRole: string) => void;
  logout: () => void;
  switchDemoProfile: (profileKey: 'alex' | 'maya' | 'fresh') => void;

  // Roles
  allRoles: JobRole[];
  currentRole: JobRole;
  setCurrentRoleId: (roleId: string) => void;
  addCustomRole: (role: JobRole) => void;

  // Resume & Skills
  resumeData: ExtractedResumeData;
  updateResumeData: (data: Partial<ExtractedResumeData>) => void;
  addUserSkill: (skill: Omit<UserSkill, 'id'>) => void;
  removeUserSkill: (skillId: string) => void;
  updateSkillProficiency: (skillId: string, proficiency: number) => void;

  // Gap Analysis & Recommendations
  analysisResult: SkillGapAnalysisResult;
  roadmapWeeks: RoadmapWeek[];
  toggleTaskCompletion: (weekNum: number, taskId: string) => void;
  projectRecommendations: ProjectRecommendation[];
  toggleProjectStatus: (projectId: string, field: 'isStarted' | 'isCompleted') => void;

  // Interview Prep
  completedQuestionIds: string[];
  toggleQuestionCompleted: (questionId: string) => void;
  checklistItems: typeof DEFAULT_CHECKLIST_ITEMS;
  toggleChecklistItem: (itemId: string) => void;

  // Notifications
  notification: { message: string; type: 'success' | 'info' | 'warning' } | null;
  showNotification: (message: string, type?: 'success' | 'info' | 'warning') => void;

  // Actions
  triggerConfetti: () => void;
  resetToDefaultDemo: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_USER = 'career_gap_user_profile_v2';
const STORAGE_KEY_CUSTOM_ROLES = 'career_gap_custom_roles_v2';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // Notifications
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(prev => prev?.message === message ? null : prev);
    }, 4000);
  };

  const triggerConfetti = () => {
    try {
      if (typeof window !== 'undefined') {
        import('canvas-confetti').then((confettiModule) => {
          const confettiFunc = (confettiModule && (confettiModule.default || confettiModule)) as any;
          if (typeof confettiFunc === 'function') {
            confettiFunc({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#6366f1', '#a855f7', '#10b981', '#f59e0b', '#ec4899']
            });
          }
        }).catch(() => {});
      }
    } catch (e) {
      // ignore
    }
  };

  // Custom Roles
  const [customRoles, setCustomRoles] = useState<JobRole[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CUSTOM_ROLES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [];
  });

  const allRoles = useMemo(() => {
    return [...PREDEFINED_JOB_ROLES, ...customRoles];
  }, [customRoles]);

  // User Profile
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.resume && Array.isArray(parsed.resume.skills) && parsed.resume.skills.length > 0) {
          return {
            ...DEMO_USER_ALEX,
            ...parsed,
            completedTaskIds: Array.isArray(parsed.completedTaskIds) ? parsed.completedTaskIds : [],
            completedProjectIds: Array.isArray(parsed.completedProjectIds) ? parsed.completedProjectIds : [],
            completedQuestionIds: Array.isArray(parsed.completedQuestionIds) ? parsed.completedQuestionIds : []
          };
        }
      }
    } catch (err) {
      console.warn('Failed to load saved user profile:', err);
    }
    return DEMO_USER_ALEX;
  });

  // Save user profile changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [user]);

  // Current Target Role
  const currentRole = useMemo(() => {
    const found = allRoles.find(r => r.id === user.targetRoleId);
    return found || PREDEFINED_JOB_ROLES[0];
  }, [allRoles, user.targetRoleId]);

  const setCurrentRoleId = (roleId: string) => {
    setUser(prev => ({
      ...prev,
      targetRoleId: roleId
    }));
    showNotification(`Target job role updated to ${allRoles.find(r => r.id === roleId)?.title || 'Selected Role'}`);
  };

  const addCustomRole = (newRole: JobRole) => {
    setCustomRoles(prev => {
      const updated = [newRole, ...prev.filter(r => r.id !== newRole.id)];
      try {
        localStorage.setItem(STORAGE_KEY_CUSTOM_ROLES, JSON.stringify(updated));
      } catch {}
      return updated;
    });
    setUser(prev => ({ ...prev, targetRoleId: newRole.id }));
    showNotification(`Created and switched to custom role "${newRole.title}"!`);
  };

  // Computed Skill Gap Analysis
  const analysisResult = useMemo(() => {
    return analyzeSkillGap(user.resume, currentRole);
  }, [user.resume, currentRole]);

  // Dynamic Personalized Roadmap
  const [roadmapWeeks, setRoadmapWeeks] = useState<RoadmapWeek[]>(() => {
    const generated = generatePersonalizedRoadmap(analyzeSkillGap(user.resume, currentRole));
    return generated.map(w => ({
      ...w,
      tasks: w.tasks.map(t => ({
        ...t,
        completed: (user.completedTaskIds || []).includes(t.id)
      }))
    }));
  });

  // Update roadmap when target role or skills change
  useEffect(() => {
    const fresh = generatePersonalizedRoadmap(analysisResult);
    setRoadmapWeeks(fresh.map(w => ({
      ...w,
      tasks: w.tasks.map(t => ({
        ...t,
        completed: (user.completedTaskIds || []).includes(t.id)
      }))
    })));
  }, [analysisResult.jobRole.id, user.resume.skills.length]);

  const toggleTaskCompletion = (weekNum: number, taskId: string) => {
    let nowCompleted = false;
    setRoadmapWeeks(prev => {
      return prev.map(w => {
        if (w.weekNumber !== weekNum) return w;
        return {
          ...w,
          tasks: w.tasks.map(t => {
            if (t.id === taskId) {
              nowCompleted = !t.completed;
              return { ...t, completed: nowCompleted };
            }
            return t;
          })
        };
      });
    });

    setUser(prev => {
      const existing = prev.completedTaskIds || [];
      const newIds = nowCompleted
        ? [...existing, taskId]
        : existing.filter(id => id !== taskId);
      return { ...prev, completedTaskIds: newIds };
    });

    if (nowCompleted) {
      triggerConfetti();
      showNotification('Milestone completed! Your readiness score has increased.');
    }
  };

  // Project Recommendations
  const projectRecommendations = useMemo(() => {
    const rawProjects = generateProjectRecommendations(analysisResult);
    const completed = user.completedProjectIds || [];
    return rawProjects.map(p => ({
      ...p,
      isCompleted: completed.includes(p.id),
      isStarted: completed.includes(p.id) || p.id === 'proj-plant-disease'
    }));
  }, [analysisResult, user.completedProjectIds]);

  const toggleProjectStatus = (projectId: string, field: 'isStarted' | 'isCompleted') => {
    if (field === 'isCompleted') {
      const completed = user.completedProjectIds || [];
      const isCurrently = completed.includes(projectId);
      setUser(prev => ({
        ...prev,
        completedProjectIds: isCurrently
          ? (prev.completedProjectIds || []).filter(id => id !== projectId)
          : [...(prev.completedProjectIds || []), projectId]
      }));
      if (!isCurrently) {
        triggerConfetti();
        showNotification('Project marked as completed! Added to your verified portfolio.');
      }
    }
  };

  // Interview Checklist & Questions
  const [checklistItems, setChecklistItems] = useState(DEFAULT_CHECKLIST_ITEMS);

  const toggleChecklistItem = (itemId: string) => {
    setChecklistItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const next = !item.completed;
        if (next) triggerConfetti();
        return { ...item, completed: next };
      }
      return item;
    }));
  };

  const toggleQuestionCompleted = (questionId: string) => {
    setUser(prev => {
      const existing = prev.completedQuestionIds || [];
      const isComp = existing.includes(questionId);
      const updated = isComp
        ? existing.filter(id => id !== questionId)
        : [...existing, questionId];
      return { ...prev, completedQuestionIds: updated };
    });
  };

  // Resume Updates
  const updateResumeData = (newData: Partial<ExtractedResumeData>) => {
    setUser(prev => ({
      ...prev,
      resume: {
        ...prev.resume,
        ...newData
      }
    }));
    showNotification('Resume profile updated successfully!');
  };

  const addUserSkill = (skill: Omit<UserSkill, 'id'>) => {
    const newSkill: UserSkill = {
      ...skill,
      id: `sk-${Date.now()}`
    };
    setUser(prev => ({
      ...prev,
      resume: {
        ...prev.resume,
        skills: [newSkill, ...prev.resume.skills]
      }
    }));
    showNotification(`Added skill "${skill.name}" with ${skill.proficiency}% proficiency!`);
  };

  const removeUserSkill = (skillId: string) => {
    setUser(prev => ({
      ...prev,
      resume: {
        ...prev.resume,
        skills: prev.resume.skills.filter(s => s.id !== skillId)
      }
    }));
    showNotification('Skill removed from profile.');
  };

  const updateSkillProficiency = (skillId: string, proficiency: number) => {
    setUser(prev => ({
      ...prev,
      resume: {
        ...prev.resume,
        skills: prev.resume.skills.map(s => {
          if (s.id === skillId) {
            return {
              ...s,
              proficiency,
              level: proficiency >= 85 ? 'Expert' : proficiency >= 70 ? 'Advanced' : proficiency >= 40 ? 'Intermediate' : 'Beginner'
            };
          }
          return s;
        })
      }
    }));
  };

  // Auth Handlers
  const login = (email: string, name: string = 'Sunthari') => {
    setUser(prev => ({
      ...prev,
      email,
      name
    }));
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    showNotification(`Welcome back, ${name}!`);
  };

  const register = (name: string, email: string, targetRoleId: string) => {
    setUser(prev => ({
      ...prev,
      name,
      email,
      targetRoleId: targetRoleId || 'ml-engineer'
    }));
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    showNotification(`Account created! Ready to analyze your career roadmap.`);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setActiveTab('landing');
    showNotification('Logged out successfully.', 'info');
  };

  const switchDemoProfile = (profileKey: 'alex' | 'maya' | 'fresh') => {
    if (profileKey === 'alex') {
      setUser(DEMO_USER_ALEX);
      showNotification('Loaded demo profile: Sunthari (Machine Learning Track)');
    } else if (profileKey === 'maya') {
      setUser({
        ...DEMO_USER_ALEX,
        id: 'user-maya-102',
        name: 'Maya Patel',
        email: 'maya.patel@techmail.io',
        targetRoleId: 'full-stack-dev',
        resume: {
          ...DEMO_USER_ALEX.resume,
          fullName: 'Maya Patel',
          email: 'maya.patel@techmail.io',
          skills: [
            { id: 'sk-m1', name: 'JavaScript & TypeScript', category: 'Programming Languages', proficiency: 85, level: 'Advanced', source: 'resume' },
            { id: 'sk-m2', name: 'React', category: 'Frameworks & Libraries', proficiency: 90, level: 'Expert', source: 'resume' },
            { id: 'sk-m3', name: 'HTML5 & CSS3 / Tailwind', category: 'Frameworks & Libraries', proficiency: 92, level: 'Expert', source: 'resume' },
            { id: 'sk-m4', name: 'Node.js / Express or Python', category: 'Frameworks & Libraries', proficiency: 78, level: 'Advanced', source: 'resume' },
            { id: 'sk-m5', name: 'Git & Version Control', category: 'Tools & DevOps', proficiency: 85, level: 'Advanced', source: 'resume' },
            { id: 'sk-m6', name: 'REST APIs & WebSockets', category: 'Frameworks & Libraries', proficiency: 80, level: 'Advanced', source: 'resume' },
            { id: 'sk-m7', name: 'SQL & NoSQL Databases', category: 'Databases', proficiency: 45, level: 'Intermediate', source: 'resume' },
            { id: 'sk-m8', name: 'Docker & Basic Cloud Hosting', category: 'Tools & DevOps', proficiency: 25, level: 'Beginner', source: 'manual' },
            { id: 'sk-m9', name: 'Authentication & Security', category: 'Core Concepts & AI', proficiency: 60, level: 'Intermediate', source: 'resume' }
          ]
        }
      });
      showNotification('Loaded demo profile: Maya Patel (Full Stack Track)');
    } else {
      resetToDefaultDemo();
    }
  };

  const resetToDefaultDemo = () => {
    try {
      localStorage.removeItem(STORAGE_KEY_USER);
      localStorage.removeItem(STORAGE_KEY_CUSTOM_ROLES);
    } catch {}
    setUser(DEMO_USER_ALEX);
    showNotification('Profile reset to default demo dataset.');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isSidebarOpen,
        setIsSidebarOpen,
        user,
        isAuthenticated,
        isAuthModalOpen,
        setIsAuthModalOpen,
        login,
        register,
        logout,
        switchDemoProfile,
        allRoles,
        currentRole,
        setCurrentRoleId,
        addCustomRole,
        resumeData: user.resume,
        updateResumeData,
        addUserSkill,
        removeUserSkill,
        updateSkillProficiency,
        analysisResult,
        roadmapWeeks,
        toggleTaskCompletion,
        projectRecommendations,
        toggleProjectStatus,
        completedQuestionIds: user.completedQuestionIds || [],
        toggleQuestionCompleted,
        checklistItems,
        toggleChecklistItem,
        notification,
        showNotification,
        triggerConfetti,
        resetToDefaultDemo
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
