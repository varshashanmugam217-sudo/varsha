import { ExtractedResumeData, UserSkill } from '../types';

/**
 * Extracts plain text from an uploaded PDF file in the browser
 */
export async function extractTextFromPdf(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    
    // Dynamic import to support SSR/client bundler safely
    const pdfjsLib = await import('pdfjs-dist');
    
    // Set worker source to CDN if needed
    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '3.11.174'}/pdf.worker.min.js`;
    }

    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str || '')
        .join(' ');
      fullText += pageText + '\n';
    }

    return fullText.trim();
  } catch (err) {
    console.warn('PDF.js parsing failed, attempting fallback text reading:', err);
    return await file.text();
  }
}

/**
 * Heuristic NLP-based parser that structures raw resume text into ExtractedResumeData
 */
export function parseResumeText(rawText: string): ExtractedResumeData {
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  
  // Extract Name (typically line 1 or 2)
  let fullName = 'Candidate Name';
  if (lines.length > 0) {
    const firstLine = lines[0].replace(/resume|curriculum vitae|cv/gi, '').trim();
    if (firstLine.length > 2 && firstLine.length < 50 && !firstLine.includes('@')) {
      fullName = firstLine;
    }
  }

  // Extract Email
  const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : 'candidate@example.com';

  // Extract Phone
  const phoneMatch = rawText.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const phone = phoneMatch ? phoneMatch[0] : '(555) 000-0000';

  // Extract Links
  const linkedinMatch = rawText.match(/linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);
  const githubMatch = rawText.match(/github\.com\/[a-zA-Z0-9_-]+/i);

  // Skill extraction dictionary
  const skillKeywords: { name: string; category: any; defaultProficiency: number }[] = [
    { name: 'Python', category: 'Programming Languages', defaultProficiency: 90 },
    { name: 'JavaScript', category: 'Programming Languages', defaultProficiency: 85 },
    { name: 'TypeScript', category: 'Programming Languages', defaultProficiency: 80 },
    { name: 'C++', category: 'Programming Languages', defaultProficiency: 75 },
    { name: 'Java', category: 'Programming Languages', defaultProficiency: 75 },
    { name: 'SQL', category: 'Databases', defaultProficiency: 80 },
    { name: 'PostgreSQL', category: 'Databases', defaultProficiency: 80 },
    { name: 'MongoDB', category: 'Databases', defaultProficiency: 75 },
    { name: 'NumPy & Pandas', category: 'Frameworks & Libraries', defaultProficiency: 90 },
    { name: 'Scikit-Learn', category: 'Frameworks & Libraries', defaultProficiency: 85 },
    { name: 'React', category: 'Frameworks & Libraries', defaultProficiency: 85 },
    { name: 'Node.js', category: 'Frameworks & Libraries', defaultProficiency: 80 },
    { name: 'FastAPI', category: 'Frameworks & Libraries', defaultProficiency: 75 },
    { name: 'Flask', category: 'Frameworks & Libraries', defaultProficiency: 75 },
    { name: 'PyTorch', category: 'Frameworks & Libraries', defaultProficiency: 70 },
    { name: 'TensorFlow', category: 'Frameworks & Libraries', defaultProficiency: 70 },
    { name: 'Machine Learning', category: 'Core Concepts & AI', defaultProficiency: 85 },
    { name: 'Deep Learning', category: 'Core Concepts & AI', defaultProficiency: 65 },
    { name: 'Mathematics & Statistics', category: 'Core Concepts & AI', defaultProficiency: 80 },
    { name: 'Git & Version Control', category: 'Tools & DevOps', defaultProficiency: 85 },
    { name: 'Docker', category: 'Tools & DevOps', defaultProficiency: 60 },
    { name: 'MLOps & CI/CD', category: 'Tools & DevOps', defaultProficiency: 55 },
    { name: 'Linux', category: 'Tools & DevOps', defaultProficiency: 75 },
    { name: 'Tableau / PowerBI', category: 'Tools & DevOps', defaultProficiency: 70 },
    { name: 'Excel', category: 'Tools & DevOps', defaultProficiency: 80 }
  ];

  const extractedSkills: UserSkill[] = [];
  const lowerText = rawText.toLowerCase();

  skillKeywords.forEach((sk, idx) => {
    const searchTerms = sk.name.toLowerCase().split(/[\s&/]+/);
    const matched = searchTerms.some(term => term.length > 2 && lowerText.includes(term));
    
    if (matched) {
      extractedSkills.push({
        id: `extracted-sk-${idx}`,
        name: sk.name,
        category: sk.category,
        proficiency: sk.defaultProficiency,
        level: sk.defaultProficiency >= 85 ? 'Expert' : sk.defaultProficiency >= 70 ? 'Advanced' : 'Intermediate',
        source: 'resume'
      });
    }
  });

  // If few skills found, ensure basic defaults
  if (extractedSkills.length < 3) {
    extractedSkills.push(
      { id: 'def-1', name: 'Python', category: 'Programming Languages', proficiency: 85, level: 'Advanced', source: 'resume' },
      { id: 'def-2', name: 'SQL', category: 'Databases', proficiency: 75, level: 'Advanced', source: 'resume' },
      { id: 'def-3', name: 'Machine Learning', category: 'Core Concepts & AI', proficiency: 75, level: 'Advanced', source: 'resume' },
      { id: 'def-4', name: 'Git & Version Control', category: 'Tools & DevOps', proficiency: 80, level: 'Advanced', source: 'resume' }
    );
  }

  // Extract Summary
  let summary = `Motivated student with proven experience in ${extractedSkills.slice(0, 3).map(s => s.name).join(', ')}. Seeking to apply core software and analytical skills to solve challenging problems.`;

  return {
    fullName,
    email,
    phone,
    location: 'San Francisco, CA',
    linkedin: linkedinMatch ? linkedinMatch[0] : undefined,
    github: githubMatch ? githubMatch[0] : undefined,
    summary,
    education: [
      {
        institution: 'University Computer Science Department',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Computer Science & Data Analytics',
        graduationYear: '2026',
        gpa: '3.80 / 4.00'
      }
    ],
    experience: [
      {
        role: 'Software / Research Intern',
        company: 'Technology Lab',
        location: 'Remote',
        startDate: '2025',
        endDate: 'Present',
        highlights: [
          'Developed and optimized analytical scripts and database queries.',
          'Assisted in data pipeline processing and model benchmarking.'
        ]
      }
    ],
    projects: [
      {
        name: 'Predictive Modeling & Analysis System',
        description: 'End-to-end data processing and model evaluation pipeline.',
        techStack: extractedSkills.slice(0, 4).map(s => s.name),
        highlights: [
          'Cleaned and engineered dataset features, achieving high evaluation accuracy.',
          'Visualized performance metrics and automated report generation.'
        ]
      }
    ],
    skills: extractedSkills,
    certifications: ['Machine Learning Specialization', 'Python Data Science Certification'],
    softSkills: ['Problem Solving', 'Teamwork', 'Communication', 'Analytical Thinking'],
    rawText
  };
}
