import { Stack } from "@mui/material";
import JobCard from "./JobCard";
import { JobType } from "./job.type";

type Props = {
  jobList: JobType[];
  showBookmark?: boolean;
};

const JobList = ({ jobList, showBookmark }: Props) => {
  return (
    <Stack direction={"column"} pb={4} rowGap={2}>
      {jobList.map((job, i) => (
        <JobCard
          key={i}
          {...job}
          area={job.area.name}
          applyLink={`/job/detail/${job.id}`}
          showBookmark={showBookmark}
        />
      ))}
    </Stack>
  );
};

export default JobList;
