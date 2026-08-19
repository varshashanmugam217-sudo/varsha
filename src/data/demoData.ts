import { UserProfile, ExtractedResumeData, InterviewQuestion, InterviewTopic, InterviewChecklistItem } from '../types';

export const SAMPLE_RESUME_TEXT_ALEX = `Sunthari
Email: sunthari@university.edu | Phone: (555) 234-5678
Location: San Francisco, CA | LinkedIn: linkedin.com/in/sunthari-dev | GitHub: github.com/sunthari-ml

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley (2022 - 2026)
GPA: 3.82 / 4.00
Relevant Coursework: Data Structures, Algorithms, Linear Algebra, Multivariable Calculus, Discrete Math, Database Systems, Artificial Intelligence.

TECHNICAL SKILLS
- Programming Languages: Python (Proficient), SQL (Intermediate), C++, JavaScript (Basic)
- Frameworks & Libraries: NumPy, Pandas, Scikit-Learn, Matplotlib, Seaborn, Flask
- Databases & Tools: PostgreSQL, SQLite, Git, GitHub, Jupyter Notebooks, VS Code
- Core Concepts: Supervised Learning, Unsupervised Learning, Regression, Decision Trees, Random Forests, K-Means Clustering, Feature Engineering, Cross-Validation

PROJECTS
1. Customer Churn Prediction Engine (Python, Scikit-Learn, Pandas)
- Built a churn classification pipeline analyzing 10,000+ telecom customer records using Random Forest and XGBoost.
- Performed feature engineering and hyperparameter tuning with GridSearchCV, achieving 88.4% ROC-AUC.
- Created an interactive Flask web dashboard for real-time risk scoring and feature importance visualization.

2. Automated Real Estate Price Estimator (Python, NumPy, Matplotlib)
- Implemented multivariable linear regression and Ridge/Lasso regularization algorithms from scratch.
- Cleaned and normalized messy housing datasets with 40+ attributes using Pandas pipelines.
- Evaluated performance with RMSE and MAE metrics, outperforming baseline models by 19%.

3. University Database Query & Management System (PostgreSQL, Python)
- Designed normalized 3NF database schema supporting 25,000+ student enrollment records.
- Wrote optimized complex SQL queries involving multi-table joins, subqueries, and indexing strategies.

EXPERIENCE
Machine Learning Research Assistant | Berkeley AI Research Lab (May 2025 - Present)
- Assisted graduate researchers in preprocessing large-scale tabular datasets and running statistical validation tests.
- Automated data extraction scripts in Python, reducing pipeline runtime by 35%.

CERTIFICATIONS & SOFT SKILLS
- DeepLearning.AI Machine Learning Specialization (Coursera)
- Analytical Problem Solving, Scientific Writing, Cross-functional Collaboration, Agile Teamwork
`;

export const SAMPLE_RESUME_TEXT_MAYA = `Maya Patel
Email: maya.patel@techmail.io | Phone: (555) 890-1234
Location: Austin, TX | LinkedIn: linkedin.com/in/mayapatel-web | GitHub: github.com/mayapatel-fs

EDUCATION
Bachelor of Science in Information Systems
University of Texas at Austin (2021 - 2025)
GPA: 3.75 / 4.00

TECHNICAL SKILLS
- Programming Languages: JavaScript (ES6+), HTML5, CSS3, Python (Basic)
- Frontend: React, Redux Toolkit, Tailwind CSS, Bootstrap, Responsive Design
- Backend: Node.js, Express.js, RESTful APIs, JWT Authentication
- Databases: MongoDB, Mongoose, Firebase Firestore
- Tools: Git, GitHub, Postman, Vite, npm, Figma

PROJECTS
1. Campus Marketplace Web Platform (React, Node.js, Express, MongoDB)
- Developed full-stack e-commerce portal with user authentication, real-time messaging, and product listings.
- Optimized frontend rendering with React hooks and Tailwind CSS, reducing initial page load time by 40%.

2. Collaborative Task Manager App (React, Redux, Node.js)
- Implemented drag-and-drop Kanban boards with responsive mobile-first UI.
- Integrated JWT-based secure session tokens and role-based permissions.

EXPERIENCE
Frontend Developer Intern | DevNova Studio (June 2024 - August 2024)
- Developed 12+ responsive UI components in React for client web applications.
- Collaborated in daily Agile standups and resolved 25+ frontend cross-browser compatibility bugs.
`;

export const DEMO_USER_ALEX: UserProfile = {
  id: 'user-sunthari-101',
  name: 'Sunthari',
  email: 'sunthari@university.edu',
  avatarUrl: '',
  plan: 'Free',
  targetRoleId: 'ml-engineer',
  customRoles: [],
  completedTaskIds: ['task-w1-1', 'task-w1-2', 'task-w1-3'],
  completedProjectIds: [],
  completedQuestionIds: ['q-ml-1', 'q-ml-2'],
  completedChecklistIds: ['chk-1', 'chk-2', 'chk-3'],
  progressHistory: [
    { date: '2026-08-01', readinessScore: 62, skillMatchScore: 58, completedSkillsCount: 5, completedTasksCount: 0, targetRoleTitle: 'Machine Learning Engineer' },
    { date: '2026-08-08', readinessScore: 67, skillMatchScore: 63, completedSkillsCount: 6, completedTasksCount: 2, targetRoleTitle: 'Machine Learning Engineer' },
    { date: '2026-08-15', readinessScore: 72, skillMatchScore: 68, completedSkillsCount: 8, completedTasksCount: 3, targetRoleTitle: 'Machine Learning Engineer' }
  ],
  resume: {
    fullName: 'Sunthari',
    email: 'sunthari@university.edu',
    phone: '(555) 234-5678',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/sunthari-dev',
    github: 'github.com/sunthari-ml',
    summary: 'Driven Computer Science student at UC Berkeley specializing in Machine Learning, Statistical Analysis, and Python data engineering. Proven hands-on experience building end-to-end predictive pipelines and optimizing tabular machine learning workflows.',
    education: [
      {
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Computer Science',
        graduationYear: '2026',
        gpa: '3.82 / 4.00'
      }
    ],
    experience: [
      {
        role: 'Machine Learning Research Assistant',
        company: 'Berkeley AI Research Lab',
        location: 'Berkeley, CA',
        startDate: 'May 2025',
        endDate: 'Present',
        highlights: [
          'Assisted graduate researchers in preprocessing large-scale tabular datasets and running statistical validation tests.',
          'Automated data extraction scripts in Python, reducing data pipeline runtime by 35% across 10,000+ benchmark trials.',
          'Maintained reproducible experiment logging using Git and shared Jupyter environments.'
        ]
      }
    ],
    projects: [
      {
        name: 'Customer Churn Prediction Engine',
        description: 'Predictive analytics pipeline analyzing telecom customer records to forecast cancellations.',
        techStack: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Flask'],
        highlights: [
          'Trained Random Forest, Gradient Boosting, and Logistic Regression models achieving 88.4% ROC-AUC.',
          'Engineered 14 customer lifetime value features from messy raw usage logs.',
          'Deployed lightweight Flask API for real-time churn probability scoring.'
        ]
      },
      {
        name: 'Automated Real Estate Price Estimator',
        description: 'Algorithmic regression engine comparing custom gradient descent implementations with standard packages.',
        techStack: ['Python', 'NumPy', 'Matplotlib', 'Scikit-Learn'],
        highlights: [
          'Implemented multivariate linear regression and L1/L2 regularization from mathematical first principles.',
          'Conducted exploratory data analysis uncovering non-linear geographic price multipliers.'
        ]
      },
      {
        name: 'University Database Management System',
        description: 'Normalized relational database tracking university course enrollments and grading.',
        techStack: ['PostgreSQL', 'SQL', 'Python'],
        highlights: [
          'Architected 3NF relational schema with foreign key constraints and B-tree indexes.',
          'Authored high-performance analytical queries with window functions and aggregations.'
        ]
      }
    ],
    skills: [
      { id: 'sk-1', name: 'Python', category: 'Programming Languages', proficiency: 95, level: 'Expert', source: 'resume' },
      { id: 'sk-2', name: 'NumPy & Pandas', category: 'Frameworks & Libraries', proficiency: 90, level: 'Advanced', source: 'resume' },
      { id: 'sk-3', name: 'Scikit-Learn', category: 'Frameworks & Libraries', proficiency: 85, level: 'Advanced', source: 'resume' },
      { id: 'sk-4', name: 'SQL', category: 'Databases', proficiency: 80, level: 'Advanced', source: 'resume' },
      { id: 'sk-5', name: 'Machine Learning', category: 'Core Concepts & AI', proficiency: 82, level: 'Advanced', source: 'resume' },
      { id: 'sk-6', name: 'Mathematics & Statistics', category: 'Core Concepts & AI', proficiency: 85, level: 'Advanced', source: 'resume' },
      { id: 'sk-7', name: 'Git & Version Control', category: 'Tools & DevOps', proficiency: 80, level: 'Advanced', source: 'resume' },
      { id: 'sk-8', name: 'FastAPI / REST APIs', category: 'Frameworks & Libraries', proficiency: 65, level: 'Intermediate', source: 'resume' },
      { id: 'sk-9', name: 'Deep Learning', category: 'Core Concepts & AI', proficiency: 38, level: 'Beginner', source: 'manual' },
      { id: 'sk-10', name: 'PyTorch / TensorFlow', category: 'Frameworks & Libraries', proficiency: 30, level: 'Beginner', source: 'manual' },
      { id: 'sk-11', name: 'Docker', category: 'Tools & DevOps', proficiency: 20, level: 'Beginner', source: 'manual' },
      { id: 'sk-12', name: 'MLOps & CI/CD', category: 'Tools & DevOps', proficiency: 15, level: 'Beginner', source: 'manual' }
    ],
    certifications: [
      'DeepLearning.AI Machine Learning Specialization',
      'Python for Data Science Bootcamp'
    ],
    softSkills: [
      'Analytical Problem Solving',
      'Data-Driven Decision Making',
      'Scientific Communication',
      'Collaborative Teamwork',
      'Attention to Detail'
    ],
    rawText: SAMPLE_RESUME_TEXT_ALEX
  }
};

export const DEFAULT_INTERVIEW_TOPICS: Record<string, InterviewTopic[]> = {
  'ml-engineer': [
    {
      id: 'top-1',
      title: 'Machine Learning Fundamentals & Model Evaluation',
      category: 'Core Concepts & AI',
      importance: 'Critical',
      summary: 'Deep understanding of bias-variance tradeoff, overfitting prevention, loss functions, and evaluation metrics.',
      keyPoints: [
        'Difference between Precision, Recall, F1-Score, ROC-AUC and when to prioritize each in imbalanced classification.',
        'L1 (Lasso) vs L2 (Ridge) Regularization mechanics and geometric interpretations.',
        'Cross-validation strategies: K-Fold, Stratified K-Fold, TimeSeriesSplit.',
        'Feature scaling impacts: Standardization (Z-score) vs Min-Max Normalization on gradient-based vs tree-based models.'
      ],
      sampleQuestions: [
        'Explain how the bias-variance tradeoff affects model complexity.',
        'Why might accuracy be a misleading metric for fraud detection models?'
      ]
    },
    {
      id: 'top-2',
      title: 'Deep Learning & Neural Network Architecture',
      category: 'Deep Learning',
      importance: 'Critical',
      summary: 'Architectural principles of feedforward nets, backpropagation, CNNs, RNNs/Transformers, and optimization algorithms.',
      keyPoints: [
        'Vanishing vs Exploding Gradient problem and solutions (ReLU, He/Xavier initialization, Residual connections, LayerNorm).',
        'Convolution operation, pooling layers, receptive fields in Computer Vision.',
        'Self-attention mechanism and Multi-head attention in Transformer encoders/decoders.',
        'Optimizers: SGD with Momentum, RMSprop, Adam, AdamW (weight decay separation).'
      ],
      sampleQuestions: [
        'How does Backpropagation calculate gradients using the chain rule?',
        'What is the purpose of Batch Normalization during training versus inference?'
      ]
    },
    {
      id: 'top-3',
      title: 'Production MLOps & Model Serving',
      category: 'MLOps & DevOps',
      importance: 'High',
      summary: 'Deploying, monitoring, and maintaining production ML systems under data drift and latency constraints.',
      keyPoints: [
        'Data Drift vs Concept Drift detection methods (Kolmogorov-Smirnov test, PSI).',
        'Model serialization formats (ONNX, TorchScript, TensorRT) for fast CPU/GPU inference.',
        'Containerization with Docker and deployment using FastAPI / Triton Inference Server.',
        'A/B testing and Canary deployments for machine learning models.'
      ],
      sampleQuestions: [
        'How would you detect if your production ML model is degrading in performance over time?',
        'Describe the steps to containerize a PyTorch inference service using Docker.'
      ]
    }
  ]
};

export const DEFAULT_INTERVIEW_QUESTIONS: Record<string, InterviewQuestion[]> = {
  'ml-engineer': [
    {
      id: 'q-ml-1',
      category: 'Technical',
      topic: 'Evaluation Metrics',
      question: 'When would you choose ROC-AUC over Precision-Recall AUC for evaluating a binary classification model?',
      difficulty: 'Medium',
      keyConcepts: ['ROC-AUC', 'PR-AUC', 'Class Imbalance', 'True Positive Rate', 'False Positive Rate'],
      modelAnswer: 'ROC-AUC plots True Positive Rate vs False Positive Rate. It is effective and standard when the class distribution is balanced or roughly balanced because FPR reflects the true negatives. However, when classes are severely imbalanced (e.g., fraud detection with 99.9% legitimate transactions and 0.1% fraud), the huge number of true negatives keeps the FPR artificially low, making ROC-AUC look overly optimistic. In heavily skewed datasets, Precision-Recall AUC (PR-AUC) is strictly preferred because it focuses exclusively on the minority positive class without being inflated by true negatives.',
      commonPitfalls: 'Saying ROC-AUC is always best, or confusing Precision with True Positive Rate.'
    },
    {
      id: 'q-ml-2',
      category: 'Technical',
      topic: 'Regularization',
      question: 'What is the mathematical and practical difference between L1 (Lasso) and L2 (Ridge) regularization?',
      difficulty: 'Medium',
      keyConcepts: ['L1 Norm', 'L2 Norm', 'Sparsity', 'Feature Selection', 'Weight Penalty'],
      modelAnswer: 'Mathematically, L1 regularization adds the sum of absolute values of the weights (|w|) to the loss function, while L2 regularization adds the sum of squared weights (w^2). Geometrically, L1 creates diamond-shaped constraint boundaries whose sharp corners intersect parameter axes, forcing unimportant feature weights exactly to zero—effectively performing automated feature selection. L2 creates spherical constraint boundaries that shrink weights towards zero but rarely make them exactly zero, making it ideal when many collinear features contribute collectively.',
      commonPitfalls: 'Forgetting that L1 produces sparse models, or claiming L2 removes features.'
    },
    {
      id: 'q-ml-3',
      category: 'Technical',
      topic: 'Deep Learning',
      question: 'How do Residual Connections in ResNet architectures solve the vanishing gradient problem in deep neural networks?',
      difficulty: 'Hard',
      keyConcepts: ['ResNet', 'Skip Connection', 'Gradient Highway', 'Identity Mapping', 'Vanishing Gradients'],
      modelAnswer: 'In standard deep networks, gradients are multiplied successively during backpropagation according to the chain rule, causing them to decay exponentially toward zero in early layers. Residual networks introduce skip/identity connections: y = F(x) + x. During backpropagation, the derivative of (F(x) + x) with respect to x is (dF/dx + 1). The constant "+1" ensures that a gradient signal can flow unimpeded directly back through the highway to earlier layers without diminishing, allowing networks to train reliably across hundreds of layers.',
      commonPitfalls: 'Thinking residual connections just duplicate data instead of preserving gradient flow.'
    },
    {
      id: 'q-ml-4',
      category: 'Coding',
      topic: 'NumPy Vectorization',
      question: 'Write a vectorized Python function using NumPy to compute the Euclidean distance matrix between two sets of coordinate points without for-loops.',
      difficulty: 'Medium',
      keyConcepts: ['Broadcasting', 'Vectorization', 'L2 Norm', 'NumPy Axis'],
      modelAnswer: `def euclidean_distance_matrix(A, B):
    # A shape: (N, D), B shape: (M, D)
    # Using broadcasting: (N, 1, D) - (1, M, D) -> (N, M, D)
    diff = A[:, np.newaxis, :] - B[np.newaxis, :, :]
    return np.sqrt(np.sum(diff ** 2, axis=-1))

# Alternatively via expansion: ||A - B||^2 = ||A||^2 + ||B||^2 - 2*A@B.T`,
      commonPitfalls: 'Using nested Python for loops, which destroys vector execution speed on millions of points.'
    },
    {
      id: 'q-ml-5',
      category: 'System Design',
      topic: 'Production ML Deployment',
      question: 'Design an end-to-end low-latency recommendation inference system handling 10,000 queries per second.',
      difficulty: 'Hard',
      keyConcepts: ['Two-stage Retrieval', 'ANN Vector Search', 'Feature Store', 'Redis Caching', 'Triton/FastAPI'],
      modelAnswer: 'A production high-scale recommender uses a two-stage architecture: 1) Candidate Generation (Retrieval): Use Approximate Nearest Neighbor (ANN) search like FAISS or HNSW index with precomputed item embeddings in Milvus/Pinecone to reduce millions of items to top ~500 candidates in <10ms. 2) Ranking: A deep ranking model (e.g. DLRM, LightGBM) scores the 500 candidates with real-time user context pulled from a low-latency Redis feature store. 3) Re-ranking / Filtering: Deduplication, business rules, diversity filtering. 4) Infrastructure: Asynchronous FastAPI/Triton inference pods behind an Envoy load balancer with auto-scaling.',
      commonPitfalls: 'Attempting to run a heavy deep neural network over the entire database of millions of items for every single request.'
    }
  ]
};

export const DEFAULT_CHECKLIST_ITEMS: InterviewChecklistItem[] = [
  { id: 'chk-1', category: 'Core Foundations', text: 'Review Linear Algebra (Dot products, Matrix Inversion, Eigenvalues)', completed: true },
  { id: 'chk-2', category: 'Core Foundations', text: 'Review Probability & Statistics (Bayes Rule, Distributions, Central Limit Theorem)', completed: true },
  { id: 'chk-3', category: 'Classical ML', text: 'Be able to derive Linear Regression Normal Equation and Gradient Descent update step', completed: true },
  { id: 'chk-4', category: 'Classical ML', text: 'Explain Decision Tree splitting criteria (Gini Impurity vs Entropy/Information Gain)', completed: false },
  { id: 'chk-5', category: 'Deep Learning', text: 'Implement a Multi-Layer Perceptron from scratch in PyTorch with custom loss function', completed: false },
  { id: 'chk-6', category: 'Deep Learning', text: 'Explain Convolution layers, Stride, Padding, Receptive Field, and Pooling', completed: false },
  { id: 'chk-7', category: 'MLOps & Systems', text: 'Build a Dockerfile to package a FastAPI ML prediction service', completed: false },
  { id: 'chk-8', category: 'Behavioral & STAR', text: 'Prepare 3 STAR stories: Overcoming a data bottleneck, Model trade-off decision, Team conflict', completed: false }
];
