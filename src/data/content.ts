export const CLIENT = {
  name: 'Lakshya Tyagi',
  initials: 'LT',
  title: 'LLB Candidate',
  college: 'IMS Noida',
  year: 'B.Com LLB Candidate',
  bio: 'Motivated B.Com LLB student at IMS Noida with a strong foundation in contract drafting, legal research, and corporate law. Analytical and result-oriented, with practical internship experience in legal processes and an entrepreneurial background through BigBigger Media.',
  email: 'tyagilakshya739@gmail.com',
  linkedin: 'https://www.linkedin.com/in/lakshya-tyagi-2308bb270?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  phone: '[PHONE — optional]',
  location: 'Ghaziabad, Uttar Pradesh',
  assets: {
    photo: '/assets/images/client-photo.jpeg',
    logo: '/assets/images/logo-lt.jpeg',
    resume: '/assets/resume/Lakshya_Tyagi_CV.pdf'
  },
  hero: {
    eyebrow: 'Law Student | Contract Drafting | Corporate & Litigation Law',
    headline: 'Advocate\nin Training.',
    cta: 'Read My Case',
    quote: '"Justice is not given. It is argued."',
    scroll: 'scroll'
  },
  about: {
    label: 'Profile',
    heading: 'Commercial clarity with a courtroom instinct.',
    body: [
      'Lakshya Tyagi is building a legal practice foundation around contract drafting, legal research, corporate law, and litigation processes.',
      'His experience includes a structured legal internship with The Lawway with Lawyers and client-facing entrepreneurial work as co-founder of BigBigger Media.'
    ]
  },
  nav: ['Home', 'About', 'Education', 'Work', 'Skills', 'Contact'],
  education: [
    {
      degree: 'B.Com LLB — Integrated 5-Year Programme',
      institution: 'IMS Noida, Noida, Uttar Pradesh',
      year: 'Aug 2024 — Present',
      score: '',
      courses: ['Constitutional Law', 'Criminal Procedure', 'Contract Law', 'Legal Research']
    },
    {
      degree: 'Class XII',
      institution: 'Delhi Public School Ghaziabad Vasundhara',
      year: 'Completed 2024',
      score: '',
      courses: []
    },
    {
      degree: 'Class X',
      institution: 'Delhi Public School Ghaziabad Vasundhara',
      year: 'Completed 2022',
      score: '',
      courses: []
    }
  ],
  work: [
    {
      title: 'Startup NDA Drafting',
      client: 'Tech Startup',
      type: 'Contract Drafting',
      description: 'Prepared a practical confidentiality framework for founder conversations, vendor access, and sensitive commercial information.',
      tags: ['NDA', 'Contract', 'Startup Law'],
      year: '2024'
    },
    {
      title: 'IP Research Brief',
      client: 'Individual Client',
      type: 'Legal Research',
      description: 'Mapped statutory positions and case-law angles into a concise research note for business-side decision making.',
      tags: ['IP Law', 'Research', 'Brief Writing'],
      year: '2024'
    },
    {
      title: 'Client Advisory Memo',
      client: 'SME Business',
      type: 'Legal Consulting',
      description: 'Converted facts, risks, and next steps into a structured advisory format that a non-law client could act on quickly.',
      tags: ['Advisory', 'Memo', 'Consulting'],
      year: '2023'
    }
  ],
  skills: [
    { name: 'Legal Research', percent: 90 },
    { name: 'Contract Drafting', percent: 85 },
    { name: 'Case Analysis', percent: 88 },
    { name: 'Mooting', percent: 80 },
    { name: 'Legal Writing', percent: 92 },
    { name: 'Constitutional Law', percent: 85 },
    { name: 'Criminal Law', percent: 78 },
    { name: 'Family Law', percent: 75 }
  ],
  achievements: [
    {
      icon: 'Trophy',
      title: '[Moot Court Competition]',
      description: '[Position/Award]',
      year: '2024'
    },
    {
      icon: 'Briefcase',
      title: 'The Lawway with Lawyers',
      description: 'Legal internship under Advocate Mastar Akash with drafting, legal research, and case analysis exposure.',
      year: '2025'
    },
    {
      icon: 'BookOpen',
      title: 'NCC B-Certificate',
      description: 'Two years of leadership, discipline, teamwork, and service training as an NCC cadet.',
      year: '2024'
    },
    {
      icon: 'Users',
      title: 'Head of Department — Graphic Design',
      description: 'Led design initiatives for The Helping Hand NGO while supporting social campaigns and visual communication.',
      year: '2023'
    }
  ],
  verdict: {
    label: 'Verdict',
    lines: ['Every Case.', 'Every Client.', 'Defended.']
  },
  contact: {
    label: 'Contact',
    heading: ['Let’s', 'Argue', 'a Case', 'Together'],
    subjects: ['Legal Consultation', 'Collaboration', 'Internship Opportunity', 'Other'],
    submit: 'Send Brief',
    success: 'Brief Received.'
  }
} as const;

export type ClientContent = typeof CLIENT;
