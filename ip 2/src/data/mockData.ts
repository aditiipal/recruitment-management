// ===== MOCK DATA FOR HIRENEST =====

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  salary: string;
  experience: string;
  department: string;
  skills: string[];
  postedDate: string;
  deadline: string;
  applicants: number;
  interviews: number;
  status: 'Published' | 'Draft' | 'Paused' | 'Closed' | 'Filled';
  description: string;
  responsibilities: string[];
  qualifications: string[];
  preferredSkills: string[];
  benefits: string[];
  aboutCompany: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  headline: string;
  location: string;
  experience: string;
  skills: string[];
  education: string;
  appliedRole: string;
  appliedDate: string;
  stage: 'Applied' | 'Screening' | 'Shortlisted' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';
  matchScore: number;
  recruiter: string;
  resumeUrl: string;
  lastActivity: string;
}

export interface Interview {
  id: string;
  candidateName: string;
  candidateAvatar: string;
  jobRole: string;
  interviewer: string;
  interviewerAvatar: string;
  type: 'Technical' | 'HR' | 'Cultural Fit' | 'Final' | 'Panel';
  date: string;
  time: string;
  duration: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'Rescheduled';
  meetingLink: string;
  instructions?: string;
  feedback?: {
    technical: number;
    communication: number;
    problemSolving: number;
    roleSuitability: number;
    overall: number;
    recommendation: string;
    notes: string;
  };
}

export interface Message {
  id: string;
  sender: string;
  senderAvatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  role: string;
}

export interface Activity {
  id: string;
  text: string;
  time: string;
  type: 'shortlist' | 'publish' | 'interview' | 'offer' | 'resume' | 'hire' | 'apply';
}

// ===== AVATAR INITIALS HELPER =====
export const getInitials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

export const getAvatarColor = (name: string) => {
  const colors = ['#5E8FA3', '#C65D3B', '#7C5CFC', '#22A06B', '#E8A838', '#17324D', '#DC524B'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

// ===== JOBS =====
export const mockJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Frontend Developer',
    company: 'NovaTech Solutions',
    companyLogo: 'NT',
    location: 'Bangalore, India',
    workMode: 'Hybrid',
    type: 'Full-time',
    salary: '₹18L – ₹28L',
    experience: '4–7 years',
    department: 'Engineering',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL'],
    postedDate: '2 days ago',
    deadline: 'Nov 15, 2026',
    applicants: 48,
    interviews: 6,
    status: 'Published',
    description: 'We are looking for a talented Senior Frontend Developer to join our product team. You will be responsible for building beautiful, performant user interfaces that delight our customers and scale with our growing user base.',
    responsibilities: [
      'Architect and build complex UI components using React and TypeScript',
      'Collaborate with designers to implement pixel-perfect interfaces',
      'Write clean, maintainable, and well-tested code',
      'Mentor junior developers and review code',
      'Participate in product discussions and contribute technical insights',
      'Optimize application performance and Core Web Vitals',
    ],
    qualifications: [
      'B.Tech/B.E. in Computer Science or related field',
      '4+ years of experience with React ecosystem',
      'Strong proficiency in TypeScript and modern JavaScript',
      'Experience with state management (Redux, Zustand, or similar)',
      'Familiarity with CI/CD pipelines and Git workflows',
    ],
    preferredSkills: ['Next.js', 'GraphQL', 'Storybook', 'Figma', 'Testing (Jest/Cypress)'],
    benefits: ['Health insurance', 'Flexible work hours', 'Learning budget', 'Stock options', 'Work from home 2 days/week'],
    aboutCompany: 'NovaTech Solutions is a fast-growing B2B SaaS company building the next generation of workflow automation tools. With 200+ employees across India and Southeast Asia, we serve 500+ enterprise clients.',
  },
  {
    id: 'job-2',
    title: 'Product Designer',
    company: 'PixelCraft Studio',
    companyLogo: 'PC',
    location: 'Mumbai, India',
    workMode: 'Remote',
    type: 'Full-time',
    salary: '₹15L – ₹24L',
    experience: '3–5 years',
    department: 'Design',
    skills: ['Figma', 'UI/UX', 'Prototyping', 'Design Systems', 'User Research'],
    postedDate: '5 days ago',
    deadline: 'Nov 20, 2026',
    applicants: 72,
    interviews: 8,
    status: 'Published',
    description: 'Join our world-class design team to craft intuitive and delightful product experiences. As a Product Designer, you will drive design strategy from discovery to delivery.',
    responsibilities: [
      'Lead end-to-end product design from research to handoff',
      'Create wireframes, prototypes, and high-fidelity designs',
      'Conduct user research and usability testing',
      'Build and maintain a scalable design system',
      'Collaborate closely with engineering and product teams',
    ],
    qualifications: [
      'Bachelor\'s in Design, HCI, or related field',
      '3+ years of product design experience',
      'Expert-level proficiency in Figma',
      'Strong portfolio showcasing end-to-end design work',
      'Experience with data-driven design decisions',
    ],
    preferredSkills: ['Motion design', 'Illustration', 'HTML/CSS', 'Analytics tools'],
    benefits: ['Unlimited PTO', 'Home office budget', 'Annual retreats', 'Mental health support'],
    aboutCompany: 'PixelCraft Studio is an award-winning design agency turned product company, known for creating beautiful digital experiences for Fortune 500 clients.',
  },
  {
    id: 'job-3',
    title: 'Data Analyst',
    company: 'InsightEdge Analytics',
    companyLogo: 'IE',
    location: 'Hyderabad, India',
    workMode: 'On-site',
    type: 'Full-time',
    salary: '₹10L – ₹16L',
    experience: '2–4 years',
    department: 'Analytics',
    skills: ['Python', 'SQL', 'Tableau', 'Excel', 'Statistics'],
    postedDate: '1 week ago',
    deadline: 'Nov 10, 2026',
    applicants: 93,
    interviews: 12,
    status: 'Published',
    description: 'We need a detail-oriented Data Analyst to transform raw data into actionable business insights. You\'ll work with cross-functional teams to build dashboards and reports that drive strategic decisions.',
    responsibilities: [
      'Analyze large datasets to identify trends and insights',
      'Build and maintain dashboards in Tableau and Power BI',
      'Write complex SQL queries for data extraction',
      'Present findings to stakeholders with clear visualizations',
      'Collaborate with data engineers on pipeline improvements',
    ],
    qualifications: [
      'B.Tech/B.Sc. in Statistics, Mathematics, or related field',
      '2+ years of experience in data analysis',
      'Strong SQL and Python skills',
      'Experience with visualization tools',
      'Excellent communication skills',
    ],
    preferredSkills: ['R', 'Power BI', 'Machine Learning basics', 'A/B Testing'],
    benefits: ['Health insurance', 'Performance bonus', 'Learning stipend', 'Gym membership'],
    aboutCompany: 'InsightEdge Analytics helps mid-size companies make data-driven decisions through advanced analytics and AI solutions.',
  },
  {
    id: 'job-4',
    title: 'Marketing Manager',
    company: 'GrowthLoop',
    companyLogo: 'GL',
    location: 'Delhi, India',
    workMode: 'Hybrid',
    type: 'Full-time',
    salary: '₹14L – ₹22L',
    experience: '5–8 years',
    department: 'Marketing',
    skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Google Ads', 'Analytics'],
    postedDate: '3 days ago',
    deadline: 'Dec 01, 2026',
    applicants: 35,
    interviews: 4,
    status: 'Published',
    description: 'Lead our marketing efforts to drive brand awareness, pipeline growth, and revenue. You will own the marketing strategy and manage a team of specialists.',
    responsibilities: [
      'Develop and execute comprehensive marketing strategies',
      'Manage digital advertising campaigns across channels',
      'Lead content marketing and SEO initiatives',
      'Analyze marketing metrics and optimize performance',
      'Build and mentor a high-performing marketing team',
    ],
    qualifications: [
      'MBA in Marketing or equivalent',
      '5+ years in B2B/B2C marketing',
      'Experience managing marketing budgets of ₹50L+',
      'Strong analytical and leadership skills',
      'Proven track record of driving growth',
    ],
    preferredSkills: ['HubSpot', 'Salesforce', 'ABM strategies', 'Video marketing'],
    benefits: ['ESOPs', 'Flexible hours', 'Health coverage', 'Travel allowance'],
    aboutCompany: 'GrowthLoop is a revenue acceleration platform that helps SaaS companies scale from Series A to IPO.',
  },
  {
    id: 'job-5',
    title: 'HR Executive',
    company: 'PeopleFirst HR',
    companyLogo: 'PF',
    location: 'Pune, India',
    workMode: 'On-site',
    type: 'Full-time',
    salary: '₹6L – ₹10L',
    experience: '1–3 years',
    department: 'Human Resources',
    skills: ['Recruitment', 'Employee Relations', 'HRIS', 'Compliance', 'Onboarding'],
    postedDate: '1 day ago',
    deadline: 'Nov 25, 2026',
    applicants: 28,
    interviews: 3,
    status: 'Published',
    description: 'We are looking for an energetic HR Executive to support our growing team with recruitment, onboarding, and employee engagement activities.',
    responsibilities: [
      'Manage end-to-end recruitment for various departments',
      'Coordinate onboarding and induction programs',
      'Handle employee queries and grievances',
      'Maintain HR records and HRIS systems',
      'Support performance review processes',
    ],
    qualifications: [
      'MBA in HR or equivalent',
      '1+ year in HR operations',
      'Knowledge of labor laws and compliance',
      'Excellent interpersonal skills',
      'Proficiency in MS Office and HR tools',
    ],
    preferredSkills: ['SAP HR', 'BambooHR', 'Employee engagement', 'Training & development'],
    benefits: ['Medical insurance', 'Annual bonus', 'Team outings', 'Career growth'],
    aboutCompany: 'PeopleFirst HR is a people-centric HR consulting firm that helps startups build amazing workplace cultures.',
  },
  {
    id: 'job-6',
    title: 'Machine Learning Intern',
    company: 'DeepSignal AI',
    companyLogo: 'DS',
    location: 'Bangalore, India',
    workMode: 'Remote',
    type: 'Internship',
    salary: '₹25K – ₹40K/month',
    experience: '0–1 years',
    department: 'AI/ML',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'Computer Vision'],
    postedDate: '4 days ago',
    deadline: 'Nov 30, 2026',
    applicants: 156,
    interviews: 5,
    status: 'Published',
    description: 'Exciting internship opportunity for aspiring ML engineers! Work on real-world AI projects in NLP and computer vision alongside experienced researchers.',
    responsibilities: [
      'Assist in developing and training ML models',
      'Preprocess and analyze datasets',
      'Implement research papers and prototypes',
      'Document experiments and results',
      'Present findings to the team',
    ],
    qualifications: [
      'Currently pursuing B.Tech/M.Tech in CS or related field',
      'Strong foundation in mathematics and statistics',
      'Proficiency in Python',
      'Familiarity with ML frameworks',
      'Passion for AI and research',
    ],
    preferredSkills: ['Hugging Face', 'Docker', 'Git', 'Linux'],
    benefits: ['Mentorship', 'Certificate', 'Pre-placement offer possibility', 'Flexible hours'],
    aboutCompany: 'DeepSignal AI is a cutting-edge AI research lab focused on building interpretable and ethical AI systems for healthcare and climate science.',
  },
];

// ===== CANDIDATES =====
export const mockCandidates: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Aarav Shah',
    email: 'aarav.shah@email.com',
    phone: '+91 98765 43210',
    avatar: '',
    headline: 'Senior Frontend Developer | React & TypeScript',
    location: 'Bangalore, India',
    experience: '5 years',
    skills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'GraphQL'],
    education: 'B.Tech, Computer Science — IIT Bombay',
    appliedRole: 'Senior Frontend Developer',
    appliedDate: 'Oct 10, 2026',
    stage: 'Interview',
    matchScore: 92,
    recruiter: 'Priya Sharma',
    resumeUrl: '#',
    lastActivity: '2 hours ago',
  },
  {
    id: 'cand-2',
    name: 'Riya Patil',
    email: 'riya.patil@email.com',
    phone: '+91 87654 32109',
    avatar: '',
    headline: 'Product Designer | UI/UX Specialist',
    location: 'Mumbai, India',
    experience: '4 years',
    skills: ['Figma', 'UI/UX', 'Prototyping', 'User Research', 'Design Systems'],
    education: 'B.Des, Interaction Design — NID Ahmedabad',
    appliedRole: 'Product Designer',
    appliedDate: 'Oct 8, 2026',
    stage: 'Shortlisted',
    matchScore: 88,
    recruiter: 'Priya Sharma',
    resumeUrl: '#',
    lastActivity: '5 hours ago',
  },
  {
    id: 'cand-3',
    name: 'Kabir Mehta',
    email: 'kabir.mehta@email.com',
    phone: '+91 76543 21098',
    avatar: '',
    headline: 'Data Analyst | Python & SQL Expert',
    location: 'Hyderabad, India',
    experience: '3 years',
    skills: ['Python', 'SQL', 'Tableau', 'Power BI', 'Statistics'],
    education: 'M.Sc, Statistics — ISI Kolkata',
    appliedRole: 'Data Analyst',
    appliedDate: 'Oct 12, 2026',
    stage: 'Screening',
    matchScore: 85,
    recruiter: 'Arjun Nair',
    resumeUrl: '#',
    lastActivity: '1 day ago',
  },
  {
    id: 'cand-4',
    name: 'Ananya Deshmukh',
    email: 'ananya.d@email.com',
    phone: '+91 65432 10987',
    avatar: '',
    headline: 'Marketing Manager | Growth Hacker',
    location: 'Delhi, India',
    experience: '6 years',
    skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Google Ads', 'HubSpot'],
    education: 'MBA, Marketing — ISB Hyderabad',
    appliedRole: 'Marketing Manager',
    appliedDate: 'Oct 11, 2026',
    stage: 'Applied',
    matchScore: 79,
    recruiter: 'Priya Sharma',
    resumeUrl: '#',
    lastActivity: '3 days ago',
  },
  {
    id: 'cand-5',
    name: 'Vikram Joshi',
    email: 'vikram.j@email.com',
    phone: '+91 54321 09876',
    avatar: '',
    headline: 'Full Stack Developer | MERN Stack',
    location: 'Pune, India',
    experience: '4 years',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'AWS'],
    education: 'B.Tech, IT — COEP Pune',
    appliedRole: 'Senior Frontend Developer',
    appliedDate: 'Oct 9, 2026',
    stage: 'Offer',
    matchScore: 90,
    recruiter: 'Arjun Nair',
    resumeUrl: '#',
    lastActivity: '6 hours ago',
  },
  {
    id: 'cand-6',
    name: 'Meera Krishnan',
    email: 'meera.k@email.com',
    phone: '+91 43210 98765',
    avatar: '',
    headline: 'ML Engineer | Deep Learning Researcher',
    location: 'Chennai, India',
    experience: '2 years',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'Computer Vision'],
    education: 'M.Tech, AI — IIT Madras',
    appliedRole: 'Machine Learning Intern',
    appliedDate: 'Oct 13, 2026',
    stage: 'Hired',
    matchScore: 95,
    recruiter: 'Priya Sharma',
    resumeUrl: '#',
    lastActivity: '1 hour ago',
  },
  {
    id: 'cand-7',
    name: 'Rohan Gupta',
    email: 'rohan.g@email.com',
    phone: '+91 32109 87654',
    avatar: '',
    headline: 'HR Specialist | Talent Acquisition',
    location: 'Pune, India',
    experience: '2 years',
    skills: ['Recruitment', 'Onboarding', 'HRIS', 'Employee Relations'],
    education: 'MBA, HR — XLRI Jamshedpur',
    appliedRole: 'HR Executive',
    appliedDate: 'Oct 14, 2026',
    stage: 'Applied',
    matchScore: 82,
    recruiter: 'Arjun Nair',
    resumeUrl: '#',
    lastActivity: '12 hours ago',
  },
  {
    id: 'cand-8',
    name: 'Priya Nair',
    email: 'priya.nair@email.com',
    phone: '+91 21098 76543',
    avatar: '',
    headline: 'UX Researcher | Human-Centered Design',
    location: 'Bangalore, India',
    experience: '3 years',
    skills: ['User Research', 'Usability Testing', 'Figma', 'Surveys', 'Accessibility'],
    education: 'M.Des, HCI — IDC IIT Bombay',
    appliedRole: 'Product Designer',
    appliedDate: 'Oct 7, 2026',
    stage: 'Rejected',
    matchScore: 68,
    recruiter: 'Priya Sharma',
    resumeUrl: '#',
    lastActivity: '4 days ago',
  },
];

// ===== INTERVIEWS =====
export const mockInterviews: Interview[] = [
  {
    id: 'int-1',
    candidateName: 'Aarav Shah',
    candidateAvatar: '',
    jobRole: 'Senior Frontend Developer',
    interviewer: 'Rajesh Kumar',
    interviewerAvatar: '',
    type: 'Technical',
    date: 'Oct 17, 2026',
    time: '10:00 AM',
    duration: '60 min',
    status: 'Scheduled',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    instructions: 'Please prepare a 20-min system design walkthrough and review your previous React projects. Have a stable internet connection ready.',
  },
  {
    id: 'int-2',
    candidateName: 'Riya Patil',
    candidateAvatar: '',
    jobRole: 'Product Designer',
    interviewer: 'Sneha Reddy',
    interviewerAvatar: '',
    type: 'Panel',
    date: 'Oct 18, 2026',
    time: '2:00 PM',
    duration: '45 min',
    status: 'Scheduled',
    meetingLink: 'https://meet.google.com/klm-nopq-rst',
    instructions: 'Bring your portfolio and be ready to walk through your design process for 2 recent projects.',
  },
  {
    id: 'int-3',
    candidateName: 'Kabir Mehta',
    candidateAvatar: '',
    jobRole: 'Data Analyst',
    interviewer: 'Amit Patel',
    interviewerAvatar: '',
    type: 'Technical',
    date: 'Oct 16, 2026',
    time: '11:00 AM',
    duration: '60 min',
    status: 'Completed',
    meetingLink: '',
    feedback: {
      technical: 4,
      communication: 3,
      problemSolving: 4,
      roleSuitability: 4,
      overall: 4,
      recommendation: 'Strongly Recommend',
      notes: 'Excellent SQL skills and analytical thinking. Could improve on communication of complex findings to non-technical stakeholders.',
    },
  },
  {
    id: 'int-4',
    candidateName: 'Vikram Joshi',
    candidateAvatar: '',
    jobRole: 'Senior Frontend Developer',
    interviewer: 'Priya Sharma',
    interviewerAvatar: '',
    type: 'HR',
    date: 'Oct 19, 2026',
    time: '3:30 PM',
    duration: '30 min',
    status: 'Scheduled',
    meetingLink: 'https://meet.google.com/uvw-xyza-bcd',
  },
  {
    id: 'int-5',
    candidateName: 'Meera Krishnan',
    candidateAvatar: '',
    jobRole: 'Machine Learning Intern',
    interviewer: 'Dr. Sundar Rajan',
    interviewerAvatar: '',
    type: 'Final',
    date: 'Oct 15, 2026',
    time: '4:00 PM',
    duration: '45 min',
    status: 'Completed',
    meetingLink: '',
    feedback: {
      technical: 5,
      communication: 5,
      problemSolving: 5,
      roleSuitability: 5,
      overall: 5,
      recommendation: 'Strongly Recommend',
      notes: 'Outstanding candidate. Deep understanding of ML concepts. Published research in NLP. Strong cultural fit. Immediate hire recommended.',
    },
  },
  {
    id: 'int-6',
    candidateName: 'Ananya Deshmukh',
    candidateAvatar: '',
    jobRole: 'Marketing Manager',
    interviewer: 'Kavita Iyer',
    interviewerAvatar: '',
    type: 'Cultural Fit',
    date: 'Oct 20, 2026',
    time: '10:30 AM',
    duration: '30 min',
    status: 'Scheduled',
    meetingLink: 'https://meet.google.com/efg-hijk-lmn',
  },
];

// ===== MESSAGES =====
export const mockMessages: Message[] = [
  { id: 'msg-1', sender: 'Aarav Shah', senderAvatar: '', lastMessage: 'Thank you for the interview invitation. I will confirm shortly.', time: '10:32 AM', unread: true, role: 'Candidate' },
  { id: 'msg-2', sender: 'Riya Patil', senderAvatar: '', lastMessage: 'Could you share more details about the design challenge?', time: '9:15 AM', unread: true, role: 'Candidate' },
  { id: 'msg-3', sender: 'Rajesh Kumar', senderAvatar: '', lastMessage: 'Interview feedback submitted for Aarav Shah.', time: 'Yesterday', unread: false, role: 'Interviewer' },
  { id: 'msg-4', sender: 'Vikram Joshi', senderAvatar: '', lastMessage: 'I have accepted the offer. Looking forward to joining!', time: 'Yesterday', unread: false, role: 'Candidate' },
  { id: 'msg-5', sender: 'Sneha Reddy', senderAvatar: '', lastMessage: 'Panel interview availability confirmed for Thursday.', time: '2 days ago', unread: false, role: 'Interviewer' },
];

// ===== ACTIVITY FEED =====
export const mockActivities: Activity[] = [
  { id: 'act-1', text: 'Aarav Shah moved to Interview stage', time: '2 hours ago', type: 'interview' },
  { id: 'act-2', text: 'New job "Senior Frontend Developer" published', time: '5 hours ago', type: 'publish' },
  { id: 'act-3', text: 'Kabir Mehta\'s interview completed', time: '1 day ago', type: 'interview' },
  { id: 'act-4', text: 'Vikram Joshi accepted the offer', time: '1 day ago', type: 'offer' },
  { id: 'act-5', text: 'Meera Krishnan\'s resume uploaded', time: '2 days ago', type: 'resume' },
  { id: 'act-6', text: 'Rohan Gupta applied for HR Executive', time: '2 days ago', type: 'apply' },
  { id: 'act-7', text: 'Riya Patil shortlisted for Product Designer', time: '3 days ago', type: 'shortlist' },
  { id: 'act-8', text: 'Meera Krishnan hired as ML Intern', time: '3 days ago', type: 'hire' },
];

// ===== CHART DATA =====
export const applicationsOverTime = [
  { month: 'May', applications: 120 },
  { month: 'Jun', applications: 180 },
  { month: 'Jul', applications: 156 },
  { month: 'Aug', applications: 210 },
  { month: 'Sep', applications: 248 },
  { month: 'Oct', applications: 195 },
];

export const candidatesByStage = [
  { name: 'Applied', value: 85, color: '#5E8FA3' },
  { name: 'Screening', value: 42, color: '#7BA8B8' },
  { name: 'Shortlisted', value: 45, color: '#C65D3B' },
  { name: 'Interview', value: 32, color: '#7C5CFC' },
  { name: 'Offer', value: 12, color: '#E8A838' },
  { name: 'Hired', value: 8, color: '#22A06B' },
];

export const applicationsBySource = [
  { source: 'LinkedIn', count: 85 },
  { source: 'Website', count: 62 },
  { source: 'Referral', count: 45 },
  { source: 'Indeed', count: 32 },
  { source: 'Naukri', count: 28 },
  { source: 'Other', count: 16 },
];

export const timeToHireByDept = [
  { dept: 'Engineering', days: 22 },
  { dept: 'Design', days: 18 },
  { dept: 'Marketing', days: 15 },
  { dept: 'HR', days: 12 },
  { dept: 'Analytics', days: 20 },
  { dept: 'AI/ML', days: 25 },
];

export const hiringActivityMonthly = [
  { month: 'May', hired: 5, offers: 8 },
  { month: 'Jun', hired: 7, offers: 12 },
  { month: 'Jul', hired: 4, offers: 9 },
  { month: 'Aug', hired: 8, offers: 14 },
  { month: 'Sep', hired: 6, offers: 10 },
  { month: 'Oct', hired: 8, offers: 11 },
];

// ===== TESTIMONIALS =====
export const testimonials = [
  {
    name: 'Nisha Agarwal',
    role: 'Head of Talent, CloudSync Technologies',
    text: 'HireNest transformed our hiring process completely. We reduced our time-to-hire by 40% and the collaboration features keep our entire team aligned.',
    rating: 5,
  },
  {
    name: 'Dev Kapoor',
    role: 'Software Engineer, Hired via HireNest',
    text: 'The application process was seamless. I could track my progress in real time and the interview scheduling was so smooth. Highly recommend for job seekers.',
    rating: 5,
  },
  {
    name: 'Sunita Menon',
    role: 'HR Director, FinEdge Solutions',
    text: 'The analytics dashboard gives us incredible visibility into our hiring pipeline. The AI screening suggestions save us hours every week while keeping decisions human.',
    rating: 5,
  },
];

// ===== FEATURES =====
export const features = [
  { title: 'Smart Candidate Management', description: 'Organize, track, and manage all candidates in one unified pipeline with powerful filtering and search.', icon: 'Users' },
  { title: 'Resume Organization', description: 'Automatically parse and organize resumes with smart tagging, keyword extraction, and instant search.', icon: 'FileText' },
  { title: 'Interview Scheduling', description: 'Schedule interviews effortlessly with calendar sync, automated reminders, and video meeting integration.', icon: 'Calendar' },
  { title: 'Team Collaboration', description: 'Share feedback, leave notes, and make hiring decisions together with real-time team collaboration tools.', icon: 'MessageSquare' },
  { title: 'Automated Communication', description: 'Send personalized emails and updates to candidates automatically at each stage of the recruitment process.', icon: 'Mail' },
  { title: 'Hiring Analytics', description: 'Track key metrics like time-to-hire, source effectiveness, and pipeline health with beautiful dashboards.', icon: 'BarChart3' },
];

// ===== PIPELINE STEPS =====
export const pipelineSteps = ['Applied', 'Screening', 'Shortlisted', 'Interview', 'Offer', 'Hired'];

// ===== HOW IT WORKS =====
export const howItWorks = [
  { step: 1, title: 'Create a Job', description: 'Post your open position with details about the role, requirements, and your team culture.' },
  { step: 2, title: 'Discover Candidates', description: 'Review applications, search talent pools, and let AI help surface the best matches.' },
  { step: 3, title: 'Schedule Interviews', description: 'Coordinate seamlessly with candidates and interviewers through integrated scheduling.' },
  { step: 4, title: 'Hire the Right Person', description: 'Make confident decisions with structured feedback, analytics, and collaborative evaluation.' },
];
