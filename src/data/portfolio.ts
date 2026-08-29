export interface SocialLink {
  name: string;
  url: string;
  icon: 'github' | 'linkedin' | 'leetcode' | 'mail' | 'instagram';
  label: string;
  value?: string;
}

export interface AboutCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: 'graduation-cap' | 'shield-check' | 'building-2' | 'cpu';
}

export interface SkillItem {
  name: string;
  tag?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: 'code' | 'shield' | 'cloud' | 'wrench';
  skills: SkillItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  icon: 'network' | 'shield-alert' | 'lock';
  highlights?: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  type: string;
  period: string;
  status: string;
  location: string;
  description: string;
  responsibilities: string[];
  skillsCovered: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  status: string;
  location: string;
  description: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  certificateUrl: string; // Easily editable URL placeholder
  verificationUrl?: string; // Direct LinkedIn verification URL
  credentialId?: string;
  skillsCovered?: string[];
}

export interface PortfolioData {
  personal: {
    name: string;
    taglines: string[];
    taglineStatic: string;
    program: string;
    university: string;
    startedYear: string;
    status: string;
    location: string;
    email: string;
    profileImage: string;
    flipProfileImage: string;
    shortBio: string;
    aboutParagraph: string;
  };
  socials: SocialLink[];
  aboutCards: AboutCard[];
  skillCategories: SkillCategory[];
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  githubSection: {
    heading: string;
    text: string;
    buttonText: string;
    profileUrl: string;
  };
  contactSection: {
    heading: string;
    description: string;
    inquiryTemplates: {
      label: string;
      subject: string;
      message: string;
    }[];
  };
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "RIYAZ MOHMMAD",
    taglineStatic: "Cyber Security Student | Future Security Professional",
    taglines: [
      "Cyber Security Student",
      "Future Security Professional",
      "Cloud Security Enthusiast",
      "ML Security Researcher",
    ],
    program: "Integrated M.Tech in Cyber Security",
    university: "VIT Bhopal University",
    startedYear: "2024",
    status: "2024 – Present",
    location: "Bhopal, India",
    email: "Riyazmohmmad80@gmail.com",
    profileImage: "https://i.ibb.co/hTFYG2c/file-000000008564720692af5b45ee1b3aac.png",
    flipProfileImage: "https://i.ibb.co/VcBpGHHb/20260829-161444.jpg",
    shortBio:
      "Integrated M.Tech Cyber Security student at VIT Bhopal with an interest in cybersecurity, cloud security, programming, and machine learning-based security solutions.",
    aboutParagraph:
      "I am an Integrated M.Tech Cyber Security student at VIT Bhopal. I am developing my skills in cybersecurity, programming, cloud security, Linux, networking, cryptography, and machine learning. I enjoy building practical projects and continuously improving my technical knowledge.",
  },

  socials: [
    {
      name: "GitHub",
      url: "https://github.com/riyazmohmmad",
      icon: "github",
      label: "GitHub Profile",
      value: "github.com/riyazmohmmad",
    },
    {
      name: "LinkedIn",
      url: "http://www.linkedin.com/in/riyaz-mohmmad-aa66b4328",
      icon: "linkedin",
      label: "LinkedIn Profile",
      value: "linkedin.com/in/riyaz-mohmmad-aa66b4328",
    },
    {
      name: "LeetCode",
      url: "https://leetcode.com/u/RiyazMohmmad/",
      icon: "leetcode",
      label: "LeetCode Profile",
      value: "leetcode.com/u/RiyazMohmmad",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/riaazkhn?igsi=MWp6ZHNteWZ4cXVkaA==",
      icon: "instagram",
      label: "Instagram Profile",
      value: "@riaazkhn",
    },
    {
      name: "Email",
      url: "mailto:Riyazmohmmad80@gmail.com",
      icon: "mail",
      label: "Email Address",
      value: "Riyazmohmmad80@gmail.com",
    },
  ],

  aboutCards: [
    {
      id: "academic-track",
      title: "Integrated M.Tech",
      subtitle: "5-Year Integrated Degree",
      description:
        "Pursuing rigorous integrated postgraduate studies combining advanced computer science foundations with specialized security domains.",
      icon: "graduation-cap",
    },
    {
      id: "specialization",
      title: "Cyber Security",
      subtitle: "Core Focus Area",
      description:
        "Developing strong technical competencies in network defense, cryptographic systems, cloud architecture, and vulnerability assessment.",
      icon: "shield-check",
    },
    {
      id: "institution",
      title: "VIT Bhopal",
      subtitle: "University Campus",
      description:
        "Active student engaged in high-standard academic curriculum, hands-on security labs, technical societies, and collaborative learning.",
      icon: "building-2",
    },
    {
      id: "focus",
      title: "Project Focus",
      subtitle: "Hands-on Implementation",
      description:
        "Building practical implementations at the intersection of security automation, machine learning defenses, and system hardening.",
      icon: "cpu",
    },
  ],

  skillCategories: [
    {
      id: "programming",
      title: "Programming",
      description: "Core languages for systems development, scripting, and algorithmic problem-solving.",
      icon: "code",
      skills: [
        { name: "Python", tag: "Scripting & ML" },
        { name: "Java", tag: "Object-Oriented" },
        { name: "C", tag: "Low-Level / Systems" },
        { name: "JavaScript", tag: "Web & Scripting" },
      ],
    },
    {
      id: "cyber-security",
      title: "Cyber Security",
      description: "Defensive mechanisms, cryptographic algorithms, and security assessment methodologies.",
      icon: "shield",
      skills: [
        { name: "Network Security", tag: "Protocols & Defense" },
        { name: "Cryptography", tag: "Encryption & Ciphers" },
        { name: "Vulnerability Assessment", tag: "Auditing & Analysis" },
        { name: "Security Fundamentals", tag: "CIA Triad & Threat Models" },
      ],
    },
    {
      id: "cloud-systems",
      title: "Cloud & Systems",
      description: "Infrastructure management, virtualization, and cloud security architecture.",
      icon: "cloud",
      skills: [
        { name: "AWS", tag: "Cloud Infrastructure" },
        { name: "Cloud Security", tag: "IAM & Hardening" },
        { name: "Linux", tag: "OS & Shell Administration" },
        { name: "Virtual Machines", tag: "Hypervisors & Sandboxing" },
      ],
    },
    {
      id: "tools",
      title: "Tools",
      description: "Industry-standard development, version control, and packet inspection utilities.",
      icon: "wrench",
      skills: [
        { name: "Git", tag: "Version Control" },
        { name: "GitHub", tag: "Collaboration" },
        { name: "VS Code", tag: "IDE / Environment" },
        { name: "Wireshark", tag: "Packet Analysis" },
      ],
    },
  ],

  projects: [
    {
      id: "ml-anomaly-detection",
      title: "Machine Learning-Based Anomaly Detection System",
      description:
        "A security-focused machine learning project for detecting anomalous behavior using a hybrid GNN and LSTM Autoencoder approach.",
      technologies: ["Python", "PyTorch", "GNN", "LSTM", "Machine Learning"],
      category: "AI / Machine Learning Security",
      icon: "network",
      highlights: [
        "Hybrid architecture combining Graph Neural Networks (GNN) with LSTM Autoencoders",
        "Spatial graph topology modeling paired with temporal sequence anomaly detection",
        "Designed for robust behavior classification and intrusion detection patterns",
      ],
    },
    {
      id: "cyber-security-projects",
      title: "Cyber Security Projects",
      description:
        "A collection of practical cybersecurity projects focused on security concepts, Linux, networking, automation, and vulnerability analysis.",
      technologies: ["Python", "Linux", "Networking", "Cyber Security"],
      category: "Defensive Security & Automation",
      icon: "shield-alert",
      highlights: [
        "Modular Linux administration and security hardening scripts",
        "Network packet inspection, port analysis, and baseline monitoring utilities",
        "Systematic vulnerability assessment workflows and cryptographic implementations",
      ],
    },
    {
      id: "cloud-security-hardening",
      title: "Cloud Security & Infrastructure Hardening",
      description:
        "Exploration of cloud defense strategies, IAM least-privilege configurations, network security groups, and automated security audit tooling across AWS and virtualized environments.",
      technologies: ["AWS", "Cloud Security", "Linux", "Cryptography", "Network Security"],
      category: "Cloud Security & Architecture",
      icon: "lock",
      highlights: [
        "Cloud resource posture evaluation and credential lifecycle management",
        "Network perimeter defense and access control policy enforcement",
        "Secure shell bastion and encrypted data-in-transit configurations",
      ],
    },
  ],

  experiences: [
    {
      id: "matrix-club-event-management",
      role: "Core Member (Event Management Team)",
      organization: "Matrix Club",
      type: "Technical Student Society & Cyber Community",
      period: "July 2026 – Present",
      status: "Active Core Team",
      location: "VIT Bhopal University",
      description:
        "Active core member of the Event Management Team in Matrix Club at VIT Bhopal University. Responsible for end-to-end event planning, operational coordination, guest management, stage and venue logistics, and organizing university-level cybersecurity workshops, technical bootcamps, and hackathons.",
      responsibilities: [
        "Spearheading event planning, scheduling, and live operational execution for university tech symposiums, workshops, and hackathons.",
        "Coordinating cross-functional team workflows, venue logistics, technical requirements, and participant registration.",
        "Facilitating smooth flow of cybersecurity seminars, CTF competitions, and interactive developer meetups on campus.",
        "Managing crowd operations, guest speaker hosting, technical stage readiness, and post-event reporting.",
      ],
      skillsCovered: [
        "Event Management",
        "Operations & Logistics",
        "Team Leadership",
        "Event Coordination",
        "Public Relations",
        "Cybersecurity Events",
      ],
    },
  ],

  education: [
    {
      institution: "VIT Bhopal University",
      degree: "Integrated M.Tech in Cyber Security",
      period: "2024 – Present",
      status: "Currently Enrolled",
      location: "Bhopal, Madhya Pradesh",
      description:
        "Comprehensive 5-year integrated curriculum emphasizing advanced cybersecurity paradigms, applied cryptography, network engineering, systems security, and algorithmic intelligence.",
    },
    {
      institution: "S DEVI VIDYA NIKETAN GHEERA PUNHANA DIST NUH HRY",
      degree: "Senior Secondary / Class 12, Science ( PCMB )",
      period: "Jun 2009 – May 2023",
      status: "Completed",
      location: "Punhana, Dist. Nuh, Haryana",
      description:
        "Foundational senior secondary schooling with a rigorous curriculum in Science (Physics, Chemistry, Mathematics, Biology - PCMB), developing strong analytical, computational, and scientific reasoning skills.",
    },
  ],

  certifications: [
    {
      id: "cert-java",
      title: "Programming in Java",
      issuer: "Vityarti",
      issueDate: "April 2025",
      certificateUrl: "#",
      verificationUrl: "http://www.linkedin.com/in/riyaz-mohmmad-aa66b4328",
      credentialId: "VIT-JAVA-2025",
      skillsCovered: ["Java Core", "OOP Architecture", "Data Structures", "Exception Handling"],
    },
    {
      id: "cert-python",
      title: "Python Essentials",
      issuer: "Vityarti",
      issueDate: "December 2024",
      certificateUrl: "#",
      verificationUrl: "http://www.linkedin.com/in/riyaz-mohmmad-aa66b4328",
      credentialId: "VIT-PY-2024",
      skillsCovered: ["Python 3", "Automation Scripts", "Algorithms", "File I/O"],
    },
    {
      id: "cert-blockchain",
      title: "Blockchain and its Application",
      issuer: "NPTEL",
      issueDate: "April 2025",
      certificateUrl: "#",
      verificationUrl: "http://www.linkedin.com/in/riyaz-mohmmad-aa66b4328",
      credentialId: "NPTEL-BC-2025",
      skillsCovered: ["Distributed Ledgers", "Consensus Algorithms", "Smart Contracts", "Cryptographic Hashing"],
    },
    {
      id: "cert-oss",
      title: "Open Source Software",
      issuer: "Vityarti",
      issueDate: "April 2026",
      certificateUrl: "#",
      verificationUrl: "http://www.linkedin.com/in/riyaz-mohmmad-aa66b4328",
      credentialId: "VIT-OSS-2026",
      skillsCovered: ["Git Workflows", "Open Source Licensing", "Collaboration", "Linux Tools"],
    },
    {
      id: "cert-networking",
      title: "The Bits and Bytes of Computer Networking",
      issuer: "Google / Coursera",
      issueDate: "July 2026",
      certificateUrl: "#",
      verificationUrl: "http://www.linkedin.com/in/riyaz-mohmmad-aa66b4328",
      credentialId: "COURSERA-NET-2026",
      skillsCovered: ["TCP/IP Model", "Routing & Switching", "DNS/DHCP", "Network Security & Subnets"],
    },
  ],

  githubSection: {
    heading: "Explore My Work",
    text: "Explore my projects, experiments, and cybersecurity work on GitHub.",
    buttonText: "View GitHub Profile",
    profileUrl: "https://github.com/riyazmohmmad",
  },

  contactSection: {
    heading: "Let's Connect & Inquire",
    description:
      "Interested in cybersecurity internships, research collaborations, cloud defense projects, or technical inquiries? Reach out directly via email or message.",
    inquiryTemplates: [
      {
        label: "Cybersecurity Internship",
        subject: "Cybersecurity Internship Opportunity for Riyaz Mohmmad",
        message: "Hi Riyaz, I reviewed your cybersecurity portfolio and would like to discuss an internship / placement opportunity with our security team...",
      },
      {
        label: "Research / Project Collaboration",
        subject: "Collaboration Inquiry: ML Anomaly Detection / Cloud Defense",
        message: "Hi Riyaz, I came across your GNN + LSTM anomaly detection research and would like to connect regarding collaborative work...",
      },
      {
        label: "General Technical Inquiry",
        subject: "General Inquiry via Portfolio: Riyaz Mohmmad",
        message: "Hi Riyaz, I would love to connect with you regarding your cybersecurity competencies and background...",
      },
    ],
  },
};
