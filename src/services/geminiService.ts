import { ExtractedResumeData, JobRole, RoadmapWeek, SkillGapAnalysisResult, RequiredSkill } from '../types';
import { parseResumeText } from './pdfParser';
import { analyzeSkillGap, generatePersonalizedRoadmap } from './analyzerService';

/**
 * Calls server-side Gemini API or falls back to smart local NLP parser
 */
export async function extractResumeWithAI(resumeText: string): Promise<ExtractedResumeData> {
  try {
    const response = await fetch('/api/gemini/extract-resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText })
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.skills && data.skills.length > 0) {
        return {
          ...data,
          rawText: resumeText
        };
      }
    }
  } catch (err) {
    console.info('Server AI extraction not reachable, using local NLP extractor:', err);
  }

  // Graceful fallback to client-side rule-based NLP extraction
  return parseResumeText(resumeText);
}

/**
 * Calls server-side Gemini API for deep gap reasoning or generates comprehensive heuristic analysis
 */
export async function getDeepSkillGapAnalysisWithAI(resume: ExtractedResumeData, jobRole: JobRole): Promise<SkillGapAnalysisResult> {
  const baseResult = analyzeSkillGap(resume, jobRole);

  try {
    const response = await fetch('/api/gemini/explain-gap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        roleTitle: jobRole.title,
        userSkills: resume.skills,
        requiredSkills: jobRole.requiredSkills,
        baseScore: baseResult.jobReadinessScore
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.explanation) {
        return {
          ...baseResult,
          aiExplanation: data.explanation,
          aiKeyInsights: data.insights || baseResult.aiKeyInsights
        };
      }
    }
  } catch (err) {
    console.info('Using client analysis engine:', err);
  }

  return baseResult;
}

/**
 * Creates custom job role requirements using AI from a job title and description
 */
export async function parseCustomJobRoleWithAI(title: string, description: string): Promise<JobRole> {
  try {
    const response = await fetch('/api/gemini/parse-custom-job', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.requiredSkills) {
        return {
          id: `custom-${Date.now()}`,
          title: data.title || title,
          category: data.category || 'Custom Role',
          description: data.description || description,
          averageSalary: data.averageSalary || '$100,000 - $140,000',
          experienceLevel: data.experienceLevel || 'Entry-Level',
          marketDemand: data.marketDemand || 'High',
          keyResponsibilities: data.keyResponsibilities || [
            'Design and maintain software features according to specifications',
            'Collaborate with engineering team on system design and code reviews'
          ],
          recommendedCertifications: data.recommendedCertifications || ['Relevant Professional Certificate'],
          requiredSkills: data.requiredSkills,
          isCustom: true
        };
      }
    }
  } catch (err) {
    console.info('Using local role parser:', err);
  }

  // Fallback heuristic extraction of skills from description text
  const detectedSkills: RequiredSkill[] = [
    { name: 'Core Problem Solving', category: 'Core Concepts & AI', importance: 'critical', minimumProficiency: 80 },
    { name: 'Programming Languages', category: 'Programming Languages', importance: 'critical', minimumProficiency: 80 },
    { name: 'Version Control (Git)', category: 'Tools & DevOps', importance: 'important', minimumProficiency: 75 },
    { name: 'Communication & Teamwork', category: 'Soft Skills & Workflow', importance: 'important', minimumProficiency: 80 }
  ];

  if (description.toLowerCase().includes('python')) {
    detectedSkills.unshift({ name: 'Python', category: 'Programming Languages', importance: 'critical', minimumProficiency: 85 });
  }
  if (description.toLowerCase().includes('sql') || description.toLowerCase().includes('database')) {
    detectedSkills.push({ name: 'SQL', category: 'Databases', importance: 'critical', minimumProficiency: 80 });
  }
  if (description.toLowerCase().includes('react') || description.toLowerCase().includes('frontend')) {
    detectedSkills.push({ name: 'React', category: 'Frameworks & Libraries', importance: 'critical', minimumProficiency: 85 });
  }
  if (description.toLowerCase().includes('docker') || description.toLowerCase().includes('cloud')) {
    detectedSkills.push({ name: 'Docker', category: 'Tools & DevOps', importance: 'important', minimumProficiency: 70 });
  }

  return {
    id: `custom-${Date.now()}`,
    title,
    category: 'Custom Role',
    description: description.slice(0, 200) || 'Custom defined job role with targeted industry requirements.',
    averageSalary: '$110,000 - $150,000',
    experienceLevel: 'Entry-Level',
    marketDemand: 'High',
    keyResponsibilities: [
      'Implement technical solutions addressing core job requirements',
      'Collaborate across teams to deploy reliable features'
    ],
    recommendedCertifications: ['Industry Recognized Specialization'],
    requiredSkills: detectedSkills,
    isCustom: true
  };
}

/**
 * AI Mock interview answer evaluation
 */
export async function evaluateInterviewAnswerWithAI(question: string, userAnswer: string): Promise<{
  score: number;
  verdict: 'Strong' | 'Satisfactory' | 'Needs Improvement';
  feedback: string;
  keyStrengths: string[];
  improvementTips: string[];
}> {
  try {
    const response = await fetch('/api/gemini/evaluate-interview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, userAnswer })
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.score) {
        return data;
      }
    }
  } catch (err) {
    console.info('Evaluating locally:', err);
  }

  // Local evaluation heuristic
  const wordCount = userAnswer.trim().split(/\s+/).length;
  let score = 70;
  let verdict: 'Strong' | 'Satisfactory' | 'Needs Improvement' = 'Satisfactory';

  if (wordCount < 15) {
    score = 45;
    verdict = 'Needs Improvement';
  } else if (wordCount >= 40) {
    score = 88;
    verdict = 'Strong';
  }

  return {
    score,
    verdict,
    feedback: `Good technical grasp. Your answer demonstrates solid understanding of the concept. To make it top-tier, explicitly connect theoretical definitions to concrete real-world trade-offs or production incidents.`,
    keyStrengths: ['Directly answered the core question', 'Included relevant technical terminology'],
    improvementTips: ['Provide a 1-sentence concrete production example or numerical metric', 'Structure using the STAR or Definition-Tradeoff-Application format']
  };
}
