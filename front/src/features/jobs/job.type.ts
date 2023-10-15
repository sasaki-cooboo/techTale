export type JobType = {
  id: number;
  title: string;
  cost: number;
  description: string;
  requiredSkills: string[];
  message: string;
  area: {
    id: number;
    name: string;
  };
  languages: {
    id: number;
    name: string;
  }[];
  features: {
    id: number;
    name: string;
  }[];
  skills: {
    id: number;
    name: string;
  }[];
  engineerTypes: {
    id: number;
    name: string;
  }[];
};

export type JobListResponse = {
  jobList: JobType[];
  meta: {
    count: number;
  };
};
