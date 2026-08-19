import { JobRole } from '../types';

export const PREDEFINED_JOB_ROLES: JobRole[] = [
  {
    id: 'ml-engineer',
    title: 'Machine Learning Engineer',
    category: 'AI & Data Science',
    description: 'Design, build, and deploy production-grade machine learning models and data pipelines that power intelligent applications.',
    averageSalary: '$135,000 - $175,000',
    experienceLevel: 'Entry-Level',
    marketDemand: 'Very High',
    keyResponsibilities: [
      'Implement scalable ML training and inference pipelines',
      'Optimize neural networks and classical algorithms for latency and accuracy',
      'Deploy and monitor containerized models in cloud production environments',
      'Collaborate with data engineers to structure feature stores and datasets'
    ],
    recommendedCertifications: [
      'AWS Certified Machine Learning - Specialty',
      'TensorFlow Developer Certificate',
      'DeepLearning.AI Machine Learning Specialization'
    ],
    requiredSkills: [
      { name: 'Python', category: 'Programming Languages', importance: 'critical', minimumProficiency: 85, description: 'Core OOP, NumPy, vectorization, and data structures' },
      { name: 'NumPy & Pandas', category: 'Frameworks & Libraries', importance: 'critical', minimumProficiency: 80, description: 'High-performance tabular data manipulation and array math' },
      { name: 'Scikit-Learn', category: 'Frameworks & Libraries', importance: 'critical', minimumProficiency: 80, description: 'Regression, classification, clustering, cross-validation' },
      { name: 'SQL', category: 'Databases', importance: 'critical', minimumProficiency: 75, description: 'Complex joins, aggregations, window functions, and indexing' },
      { name: 'Machine Learning', category: 'Core Concepts & AI', importance: 'critical', minimumProficiency: 80, description: 'Supervised, unsupervised algorithms, bias-variance tradeoff' },
      { name: 'Deep Learning', category: 'Core Concepts & AI', importance: 'critical', minimumProficiency: 75, description: 'Neural networks, backprop, CNNs, transformers' },
      { name: 'PyTorch / TensorFlow', category: 'Frameworks & Libraries', importance: 'critical', minimumProficiency: 75, description: 'Model training, autograd, custom layers, transfer learning' },
      { name: 'Docker', category: 'Tools & DevOps', importance: 'important', minimumProficiency: 70, description: 'Containerizing model training and inference APIs' },
      { name: 'MLOps & CI/CD', category: 'Tools & DevOps', importance: 'important', minimumProficiency: 65, description: 'MLflow, model versioning, experiment tracking, pipeline automation' },
      { name: 'Git & Version Control', category: 'Tools & DevOps', importance: 'important', minimumProficiency: 75, description: 'Branching, PRs, collaborative software development' },
      { name: 'FastAPI / REST APIs', category: 'Frameworks & Libraries', importance: 'important', minimumProficiency: 70, description: 'Serving low-latency inference endpoints with asynchronous IO' },
      { name: 'Cloud Computing (AWS/GCP)', category: 'Tools & DevOps', importance: 'nice_to_have', minimumProficiency: 60, description: 'Deploying workloads on SageMaker, Vertex AI, or EC2' },
      { name: 'Mathematics & Statistics', category: 'Core Concepts & AI', importance: 'critical', minimumProficiency: 75, description: 'Linear algebra, calculus, probability distributions, hypothesis testing' },
      { name: 'Problem Solving & Communication', category: 'Soft Skills & Workflow', importance: 'important', minimumProficiency: 80, description: 'Explaining model metrics and business impact to stakeholders' }
    ]
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    category: 'AI & Data Science',
    description: 'Extract business insights and build predictive statistical models from complex unstructured and structured datasets.',
    averageSalary: '$120,000 - $160,000',
    experienceLevel: 'Entry-Level',
    marketDemand: 'Very High',
    keyResponsibilities: [
      'Formulate analytical hypotheses and conduct A/B tests to drive decisions',
      'Clean, transform, and engineer features from massive raw datasets',
      'Develop predictive machine learning models for forecasting and classification',
      'Create executive storytelling dashboards and stakeholder reports'
    ],
    recommendedCertifications: [
      'IBM Data Science Professional Certificate',
      'Google Advanced Data Analytics Certificate'
    ],
    requiredSkills: [
      { name: 'Python', category: 'Programming Languages', importance: 'critical', minimumProficiency: 85, description: 'Statistical programming, scripting, data manipulation' },
      { name: 'SQL', category: 'Databases', importance: 'critical', minimumProficiency: 85, description: 'Complex aggregations, CTEs, subqueries, feature extraction' },
      { name: 'Statistics & Probability', category: 'Core Concepts & AI', importance: 'critical', minimumProficiency: 85, description: 'Hypothesis testing, distributions, regression modeling, Bayesian analysis' },
      { name: 'NumPy & Pandas', category: 'Frameworks & Libraries', importance: 'critical', minimumProficiency: 85, description: 'Exploratory data analysis, cleaning, feature engineering' },
      { name: 'Scikit-Learn', category: 'Frameworks & Libraries', importance: 'critical', minimumProficiency: 75, description: 'Supervised & unsupervised learning pipelines' },
      { name: 'Data Visualization (Matplotlib/Seaborn)', category: 'Frameworks & Libraries', importance: 'critical', minimumProficiency: 80, description: 'Creating insightful statistical plots and exploratory visual summaries' },
      { name: 'A/B Testing & Experimentation', category: 'Core Concepts & AI', importance: 'important', minimumProficiency: 75, description: 'Sample sizing, statistical significance, power analysis' },
      { name: 'Tableau / PowerBI', category: 'Tools & DevOps', importance: 'important', minimumProficiency: 70, description: 'Interactive executive reporting dashboards' },
      { name: 'Big Data (Spark / PySpark)', category: 'Frameworks & Libraries', importance: 'nice_to_have', minimumProficiency: 60, description: 'Distributed data processing' },
      { name: 'Business Acumen & Storytelling', category: 'Soft Skills & Workflow', importance: 'critical', minimumProficiency: 85, description: 'Translating quantitative findings into actionable executive strategy' }
    ]
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'Analytics',
    description: 'Transform raw data into actionable dashboards, KPIs, and reports to guide strategic business operations.',
    averageSalary: '$85,000 - $115,000',
    experienceLevel: 'Entry-Level',
    marketDemand: 'High',
    keyResponsibilities: [
      'Query relational databases using SQL to build scheduled reporting tables',
      'Design and maintain interactive Power BI or Tableau dashboards',
      'Identify operational trends, outliers, and cost-reduction opportunities',
      'Conduct cohort analysis and KPI tracking for product and marketing teams'
    ],
    recommendedCertifications: [
      'Google Data Analytics Professional Certificate',
      'Microsoft Certified: Power BI Data Analyst Associate'
    ],
    requiredSkills: [
      { name: 'SQL', category: 'Databases', importance: 'critical', minimumProficiency: 90, description: 'Advanced joins, window functions, pivoting, schema design' },
      { name: 'Excel & Advanced Formulas', category: 'Tools & DevOps', importance: 'critical', minimumProficiency: 85, description: 'Pivot tables, VLOOKUP/XLOOKUP, Power Query, financial modeling' },
      { name: 'Tableau / PowerBI', category: 'Tools & DevOps', importance: 'critical', minimumProficiency: 85, description: 'Data modeling, DAX, calculated fields, dashboard design' },
      { name: 'Python', category: 'Programming Languages', importance: 'important', minimumProficiency: 70, description: 'Pandas for data cleaning and automation scripts' },
      { name: 'NumPy & Pandas', category: 'Frameworks & Libraries', importance: 'important', minimumProficiency: 70, description: 'Data wrangling and ETL' },
      { name: 'Descriptive Statistics', category: 'Core Concepts & AI', importance: 'critical', minimumProficiency: 75, description: 'Mean, median, variance, standard deviation, correlation' },
      { name: 'Data Storytelling & Presentation', category: 'Soft Skills & Workflow', importance: 'critical', minimumProficiency: 85, description: 'Presenting metrics clearly to non-technical business leaders' }
    ]
  },
  {
    id: 'software-developer',
    title: 'Software Developer (Backend / Systems)',
    category: 'Software Engineering',
    description: 'Build robust, scalable server-side systems, microservices, database architectures, and RESTful APIs.',
    averageSalary: '$110,000 - $150,000',
    experienceLevel: 'Entry-Level',
    marketDemand: 'Very High',
    keyResponsibilities: [
      'Architect and implement scalable REST and GraphQL backend services',
      'Design relational and NoSQL database schemas with high concurrency',
      'Write comprehensive unit, integration, and load tests',
      'Implement authentication, caching, and rate limiting mechanisms'
    ],
    recommendedCertifications: [
      'AWS Certified Developer - Associate',
      'Oracle Certified Professional: Java SE Programmer'
    ],
    requiredSkills: [
      { name: 'Data Structures & Algorithms', category: 'Core Concepts & AI', importance: 'critical', minimumProficiency: 85, description: 'Arrays, hash maps, trees, graphs, dynamic programming, complexity' },
      { name: 'Python / Java / Go / Node.js', category: 'Programming Languages', importance: 'critical', minimumProficiency: 85, description: 'Object-oriented programming, concurrency, memory management' },
      { name: 'SQL & Database Design', category: 'Databases', importance: 'critical', minimumProficiency: 80, description: 'PostgreSQL, MySQL, query optimization, ACID transactions, migrations' },
      { name: 'RESTful API Design', category: 'Frameworks & Libraries', importance: 'critical', minimumProficiency: 85, description: 'HTTP verbs, status codes, JWT auth, schema validation' },
      { name: 'Git & Version Control', category: 'Tools & DevOps', importance: 'critical', minimumProficiency: 80, description: 'Git workflow, merge resolution, PR reviews' },
      { name: 'Docker', category: 'Tools & DevOps', importance: 'important', minimumProficiency: 70, description: 'Containerizing services and managing multi-container compose setups' },
      { name: 'System Design Fundamentals', category: 'Core Concepts & AI', importance: 'important', minimumProficiency: 70, description: 'Caching (Redis), load balancing, queues, horizontal scaling' },
      { name: 'CI/CD Pipelines', category: 'Tools & DevOps', importance: 'important', minimumProficiency: 65, description: 'GitHub Actions, automated testing, continuous deployment' },
      { name: 'Unit & Integration Testing', category: 'Tools & DevOps', importance: 'important', minimumProficiency: 75, description: 'PyTest, Jest, or JUnit with high coverage standards' }
    ]
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer (GenAI & LLMs)',
    category: 'AI & Data Science',
    description: 'Build production-ready applications powered by Large Language Models, Retrieval-Augmented Generation (RAG), and autonomous AI agents.',
    averageSalary: '$140,000 - $185,000',
    experienceLevel: 'Entry-Level',
    marketDemand: 'Very High',
    keyResponsibilities: [
      'Design and deploy RAG architectures with vector databases',
      'Develop multi-agent workflows and function-calling integrations',
      'Fine-tune open-source models and optimize inference costs/latency',
      'Implement prompt engineering, guardrails, and automated evaluation frameworks'
    ],
    recommendedCertifications: [
      'DeepLearning.AI Generative AI with LLMs',
      'Google Cloud Generative AI Leader'
    ],
    requiredSkills: [
      { name: 'Python', category: 'Programming Languages', importance: 'critical', minimumProficiency: 85, description: 'Async programming, API wrappers, agentic pipelines' },
      { name: 'LLM APIs & Prompt Engineering', category: 'Core Concepts & AI', importance: 'critical', minimumProficiency: 90, description: 'Gemini, OpenAI, Claude, system prompts, structured JSON output' },
      { name: 'RAG & Vector Search', category: 'Core Concepts & AI', importance: 'critical', minimumProficiency: 85, description: 'Embeddings, FAISS, Pinecone, chunking strategies, hybrid search' },
      { name: 'LangChain / LlamaIndex', category: 'Frameworks & Libraries', importance: 'critical', minimumProficiency: 80, description: 'Orchestrating multi-step chains, memory, and tools' },
      { name: 'PyTorch / Hugging Face', category: 'Frameworks & Libraries', importance: 'important', minimumProficiency: 75, description: 'Transformers, LoRA fine-tuning, tokenization, model loading' },
      { name: 'FastAPI / Backend', category: 'Frameworks & Libraries', importance: 'critical', minimumProficiency: 80, description: 'Streaming SSE responses, WebSocket connections, async endpoints' },
      { name: 'Docker & Cloud Deployment', category: 'Tools & DevOps', importance: 'important', minimumProficiency: 70, description: 'Containerizing LLM services, GPU inference setups' },
      { name: 'AI Evaluation & Guardrails', category: 'Core Concepts & AI', importance: 'important', minimumProficiency: 70, description: 'Hallucination detection, RAGAS metrics, safety filters' }
    ]
  },
  {
    id: 'full-stack-dev',
    title: 'Full Stack Developer',
    category: 'Software Engineering',
    description: 'Build complete end-to-end web applications combining responsive, dynamic user interfaces with robust backend services and databases.',
    averageSalary: '$105,000 - $145,000',
    experienceLevel: 'Entry-Level',
    marketDemand: 'Very High',
    keyResponsibilities: [
      'Develop modern client-side UIs using React, TypeScript, and Tailwind CSS',
      'Build resilient backend microservices and database queries',
      'Integrate third-party APIs, authentication, and payment gateways',
      'Maintain responsive design, web performance, and accessibility standards'
    ],
    recommendedCertifications: [
      'Meta Front-End & Back-End Developer Professional Certificate',
      'AWS Certified Solutions Architect - Associate'
    ],
    requiredSkills: [
      { name: 'JavaScript & TypeScript', category: 'Programming Languages', importance: 'critical', minimumProficiency: 85, description: 'ESNext, async/await, strong typing, DOM manipulation' },
      { name: 'React', category: 'Frameworks & Libraries', importance: 'critical', minimumProficiency: 85, description: 'Hooks, state management, components, lifecycle' },
      { name: 'HTML5 & CSS3 / Tailwind', category: 'Frameworks & Libraries', importance: 'critical', minimumProficiency: 85, description: 'Flexbox, CSS Grid, mobile responsiveness, utility styling' },
      { name: 'Node.js / Express or Python', category: 'Frameworks & Libraries', importance: 'critical', minimumProficiency: 80, description: 'REST APIs, middleware, routing, server logic' },
      { name: 'SQL & NoSQL Databases', category: 'Databases', importance: 'critical', minimumProficiency: 75, description: 'PostgreSQL, MongoDB, ORMs (Prisma, Drizzle, Mongoose)' },
      { name: 'Git & Version Control', category: 'Tools & DevOps', importance: 'critical', minimumProficiency: 80, description: 'Branching, PRs, team code collaboration' },
      { name: 'REST APIs & WebSockets', category: 'Frameworks & Libraries', importance: 'important', minimumProficiency: 80, description: 'Client-server communications, JSON payloads, live data' },
      { name: 'Authentication & Security', category: 'Core Concepts & AI', importance: 'important', minimumProficiency: 70, description: 'OAuth2, JWT, bcrypt, CORS, CSRF prevention' },
      { name: 'Docker & Basic Cloud Hosting', category: 'Tools & DevOps', importance: 'nice_to_have', minimumProficiency: 65, description: 'Vercel, Cloud Run, AWS deploy workflows' }
    ]
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps Engineer',
    category: 'Cloud & Infrastructure',
    description: 'Automate infrastructure provisioning, build reliable CI/CD pipelines, and ensure high availability of cloud architectures.',
    averageSalary: '$125,000 - $165,000',
    experienceLevel: 'Entry-Level',
    marketDemand: 'Very High',
    keyResponsibilities: [
      'Manage Infrastructure as Code (IaC) using Terraform or CloudFormation',
      'Build automated CI/CD build, test, and deployment pipelines',
      'Orchestrate containerized services with Kubernetes and Docker',
      'Implement Prometheus/Grafana monitoring, alerting, and log analysis'
    ],
    recommendedCertifications: [
      'AWS Certified Solutions Architect - Associate',
      'Certified Kubernetes Administrator (CKA)',
      'HashiCorp Certified: Terraform Associate'
    ],
    requiredSkills: [
      { name: 'Linux & Shell Scripting', category: 'Programming Languages', importance: 'critical', minimumProficiency: 85, description: 'Bash, system administration, permissions, networking commands' },
      { name: 'Docker & Containerization', category: 'Tools & DevOps', importance: 'critical', minimumProficiency: 90, description: 'Multi-stage builds, networking, image optimization' },
      { name: 'Kubernetes (K8s)', category: 'Tools & DevOps', importance: 'critical', minimumProficiency: 75, description: 'Deployments, Services, Ingress, Pods, Helm charts' },
      { name: 'Cloud Provider (AWS/GCP/Azure)', category: 'Tools & DevOps', importance: 'critical', minimumProficiency: 85, description: 'IAM, VPC, EC2/Compute, S3/Storage, RDS, CloudWatch' },
      { name: 'CI/CD Pipelines', category: 'Tools & DevOps', importance: 'critical', minimumProficiency: 85, description: 'GitHub Actions, GitLab CI, Jenkins automated pipelines' },
      { name: 'Infrastructure as Code (Terraform)', category: 'Tools & DevOps', importance: 'important', minimumProficiency: 75, description: 'HCL, state management, modular cloud provisioning' },
      { name: 'Networking & Security', category: 'Core Concepts & AI', importance: 'important', minimumProficiency: 75, description: 'TCP/IP, DNS, SSL/TLS, firewalls, reverse proxies (Nginx)' },
      { name: 'Monitoring & Observability', category: 'Tools & DevOps', importance: 'important', minimumProficiency: 70, description: 'Prometheus, Grafana, ELK stack, Datadog' }
    ]
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    category: 'Security',
    description: 'Monitor networks, assess security vulnerabilities, detect intrusions, and implement threat mitigation strategies.',
    averageSalary: '$100,000 - $140,000',
    experienceLevel: 'Entry-Level',
    marketDemand: 'High',
    keyResponsibilities: [
      'Conduct vulnerability scans, threat assessments, and security audits',
      'Analyze SIEM logs to identify anomalous network activity and breaches',
      'Assist in incident response drills and security documentation',
      'Configure firewalls, endpoint detection, and access control policies'
    ],
    recommendedCertifications: [
      'CompTIA Security+',
      'Certified Ethical Hacker (CEH)',
      'CompTIA CySA+'
    ],
    requiredSkills: [
      { name: 'Network Security & Protocols', category: 'Core Concepts & AI', importance: 'critical', minimumProficiency: 85, description: 'OSI model, TCP/IP, Wireshark packet analysis, VPNs, firewalls' },
      { name: 'SIEM & Log Analysis', category: 'Tools & DevOps', importance: 'critical', minimumProficiency: 80, description: 'Splunk, Elastic SIEM, incident detection, alert triage' },
      { name: 'Linux & Scripting (Python/Bash)', category: 'Programming Languages', importance: 'critical', minimumProficiency: 75, description: 'Security automation, log parsing, command line forensics' },
      { name: 'Vulnerability Management', category: 'Tools & DevOps', importance: 'important', minimumProficiency: 75, description: 'Nessus, Nmap, CVE databases, penetration testing basics' },
      { name: 'Identity & Access Management (IAM)', category: 'Core Concepts & AI', importance: 'important', minimumProficiency: 70, description: 'RBAC, MFA, zero trust principles, Active Directory' },
      { name: 'Incident Response & Forensics', category: 'Core Concepts & AI', importance: 'important', minimumProficiency: 70, description: 'MITRE ATT&CK framework, root cause analysis, containment' }
    ]
  }
];
