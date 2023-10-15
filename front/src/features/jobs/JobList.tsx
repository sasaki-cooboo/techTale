import { Stack } from "@mui/material";
import JobCard from "./JobCard";
import { JobType } from "./job.type";

type Props = {
  jobList: JobType[];
};

const JobList = ({ jobList }: Props) => {
  return (
    <Stack direction={"column"} pb={4} rowGap={2}>
      {jobList.map((job, i) => (
        <JobCard
          key={i}
          title={job.title}
          cost={job.cost}
          applyLink={`/job/detail/${job.id}`}
          area={job.area.name}
          tags={job.features}
          languages={job.languages}
          engineerTypes={job.engineerTypes}
        />
      ))}
    </Stack>
  );
};

export default JobList;
