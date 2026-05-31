export interface BasicInfo {
  avatar: string;
  name: string;
  phone: string;
  email: string;
  target: string;
  city: string;
}

export interface Advantage {
  id: string;
  title: string;
  description: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  department: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Project {
  id: string;
  name: string;
  location: string;
  link: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Education {
  id: string;
  school: string;
  major: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  courses: string[];
  certificates: string[];
}

export type ModuleKey = 'basicInfo' | 'advantages' | 'workExperience' | 'projects' | 'education';

export interface ModuleConfig {
  key: ModuleKey;
  name: string;
  visible: boolean;
  pageBreakBefore: boolean;
}

export interface ResumeData {
  basicInfo: BasicInfo;
  advantages: Advantage[];
  workExperience: WorkExperience[];
  projects: Project[];
  education: Education[];
  moduleOrder: ModuleConfig[];
}
