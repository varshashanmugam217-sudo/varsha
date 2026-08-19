export type SkillCategory = 
  | 'Programming Languages'
  | 'Frameworks & Libraries'
  | 'Databases'
  | 'Tools & DevOps'
  | 'Core Concepts & AI'
  | 'Soft Skills & Workflow';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export type SkillStatus = 'strong' | 'moderate' | 'missing';

export interface UserSkill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number; // 0 to 100
  yearsOfExperience?: number;
  level: SkillLevel;
  source?: 'resume' | 'manual' | 'assessed';
}

export interface RequiredSkill {
  name: string;
  category: SkillCategory;
  importance: 'critical' | 'important' | 'nice_to_have'; // critical = high weight
  minimumProficiency: number; // e.g. 70
  description?: string;
}

export interface SkillComparisonItem {
  name: string;
  category: SkillCategory;
  userProficiency: number; // 0 if missing
  requiredProficiency: number;
  importance: 'critical' | 'important' | 'nice_to_have';
  status: SkillStatus;
  gap: number; // required - user (or 0 if user >= required)
  recommendation?: string;
}

export interface JobRole {
  id: string;
  title: string;
  category: string;
  description: string;
  averageSalary: string;
  experienceLevel: 'Entry-Level' | 'Mid-Level' | 'Senior';
  marketDemand: 'Very High' | 'High' | 'Moderate';
  requiredSkills: RequiredSkill[];
  keyResponsibilities: string[];
  recommendedCertifications: string[];
  isCustom?: boolean;
}

export interface ExtractedResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  summary: string;
  education: {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    graduationYear: string;
    gpa?: string;
  }[];
  experience: {
    role: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    highlights: string[];
  }[];
  projects: {
    name: string;
    description: string;
    techStack: string[];
    link?: string;
    highlights: string[];
  }[];
  skills: UserSkill[];
  certifications: string[];
  softSkills: string[];
  rawText?: string;
}

export interface SkillGapAnalysisResult {
  jobRole: JobRole;
  jobReadinessScore: number; // 0 - 100%
  skillMatchScore: number; // 0 - 100%
  strongSkillsCount: number;
  moderateSkillsCount: number;
  missingSkillsCount: number;
  totalRequiredSkillsCount: number;
  skills: SkillComparisonItem[];
  categoryBreakdown: {
    category: SkillCategory;
    userScore: number;
    requiredScore: number;
    matchPercentage: number;
  }[];
  aiExplanation: string;
  aiKeyInsights: string[];
  strengthsSummary: string[];
  weaknessesSummary: string[];
  updatedAt: string;
}

export interface RoadmapTask {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  completed: boolean;
  resourceType: 'documentation' | 'tutorial' | 'project' | 'course' | 'practice';
  resourceTitle: string;
  resourceLink?: string;
  relatedSkill: string;
}

export interface RoadmapWeek {
  weekNumber: number;
  title: string;
  theme: string;
  description: string;
  status: 'completed' | 'in_progress' | 'planned';
  focusSkills: string[];
  tasks: RoadmapTask[];
}

export interface ProjectRecommendation {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedDuration: string; // e.g. "1-2 Weeks"
  skillsLearned: string[];
  shortDescription: string;
  whyRecommended: string;
  targetMissingSkill: string;
  keyFeatures: string[];
  architectureOverview: string;
  starterTechStack: string[];
  githubTemplateUrl?: string;
  isStarted?: boolean;
  isCompleted?: boolean;
}

export interface InterviewQuestion {
  id: string;
  category: 'Technical' | 'Coding' | 'System Design' | 'Behavioral';
  topic: string;
  question: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  keyConcepts: string[];
  modelAnswer: string;
  commonPitfalls?: string;
  userCompleted?: boolean;
}

export interface InterviewTopic {
  id: string;
  title: string;
  category: string;
  importance: 'High' | 'Medium' | 'Critical';
  summary: string;
  keyPoints: string[];
  sampleQuestions: string[];
}

export interface InterviewChecklistItem {
  id: string;
  category: string;
  text: string;
  completed: boolean;
}

export interface ResumeImprovementSuggestion {
  category: 'Missing Technical Skills' | 'ATS Keywords' | 'Quantifiable Achievements' | 'Formatting & Clarity' | 'Project Enhancement';
  severity: 'high' | 'medium' | 'low';
  title: string;
  currentIssue: string;
  suggestedAction: string;
  exampleDiff?: {
    before: string;
    after: string;
  };
}

export interface ProgressEntry {
  date: string;
  readinessScore: number;
  skillMatchScore: number;
  completedSkillsCount: number;
  completedTasksCount: number;
  targetRoleTitle: string;
  notes?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  plan: 'Free' | 'Student Pro' | 'Career Accelerator';
  targetRoleId: string;
  customRoles: JobRole[];
  resume: ExtractedResumeData;
  completedTaskIds: string[];
  completedProjectIds: string[];
  completedQuestionIds: string[];
  completedChecklistIds: string[];
  progressHistory: ProgressEntry[];
}
