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
          {...job}
          area={job.area.name}
          applyLink={`/job/detail/${job.id}`}
        />
      ))}
    </Stack>
  );
};

export default JobList;
