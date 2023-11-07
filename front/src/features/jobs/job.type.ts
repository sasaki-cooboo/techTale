export type JobType = {
  id: number;
  title: string;
  cost: number;
  description: string;
  requiredSkills: string[];
  message: string;
  area: Area;
  languages: Language[];
  features: Feature[];
  skills: Skill[];
  engineerTypes: EngineerType[];
};

export type JobDetailResponse = {
  detail: JobType;
  relatedJobs: JobType[];
  historyJobs: JobType[];
};

export type JobListResponse = {
  jobList: JobType[];
  meta: {
    per_page: number;
    current_page: number;
    total: number;
    from: number;
    to: number;
  };
};

export type Area = {
  id: number;
  name: string;
};

export type Language = {
  id: number;
  name: string;
};

export type Feature = {
  id: number;
  name: string;
};

export type Skill = {
  id: number;
  name: string;
};

export type EngineerType = {
  id: number;
  name: string;
};

export type JobAttributesType = {
  areas: Area[];
  languages: Language[];
  features: Feature[];
  skills: {
    frameworks: Skill[];
    databases: Skill[];
    clouds: Skill[];
  };
  engineerTypes: EngineerType[];
};

export type JobConditionType = {
  areas: number[];
  languages: number[];
  features: number[];
  skills: number[];
  engineerTypes: number[];
};
