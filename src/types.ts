export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    location: string;
  };
  summary: string;
  skills: string[];
  education: EducationItem[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  certifications: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string; // Markdown or plain text
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field: string;
  graduationDate: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  link: string;
}

export const INITIAL_RESUME: ResumeData = {
  personalInfo: {
    fullName: "Alex Taylor",
    email: "alex.taylor@example.com",
    phone: "(555) 123-4567",
    linkedin: "linkedin.com/in/alextaylor",
    github: "github.com/alextaylor",
    location: "San Francisco, CA",
  },
  summary: "Results-oriented Software Engineer with 5+ years of experience in full-stack development. Proven track record of improving system performance and leading cross-functional teams. Expert in React, Node.js, and Cloud Architecture.",
  skills: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "AWS", "Docker", "Git", "SQL", "Agile"],
  education: [
    {
      id: "1",
      school: "University of Technology",
      degree: "Bachelor of Science",
      field: "Computer Science",
      graduationDate: "2018-05",
    },
  ],
  projects: [],
  experience: [
    {
      id: "1",
      company: "TechFlow Solutions",
      position: "Senior Software Engineer",
      startDate: "2021-03",
      endDate: "",
      current: true,
      description: "• Led a team of 5 engineers to migrate a legacy monolith to microservices, reducing deployment time by 40%.\n• Implemented CI/CD pipelines using GitHub Actions, increasing release frequency from monthly to weekly.\n• Optimized database queries, resulting in a 30% reduction in API latency.",
    },
    {
      id: "2",
      company: "Innovate Corp",
      position: "Software Developer",
      startDate: "2018-06",
      endDate: "2021-02",
      current: false,
      description: "• Developed and maintained customer-facing web applications using React and TypeScript.\n• Collaborated with UX designers to implement responsive and accessible user interfaces.\n• Mentored junior developers and conducted code reviews to ensure high code quality.",
    },
  ],
  certifications: ["AWS Certified Solutions Architect", "Google Cloud Professional Developer"],
};
