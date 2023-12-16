import { Stack } from "@mui/material";
import JobCard from "./JobCard";
import { JobType } from "./job.type";

type Props = {
  jobList: JobType[];
  showBookmark?: boolean;
  showDeleteBookmark?: boolean;
};

const JobList = ({ jobList, showBookmark, showDeleteBookmark }: Props) => {
  return (
    <Stack direction={"column"} pb={4} rowGap={2}>
      {jobList.map((job, i) => (
        <JobCard
          key={i}
          {...job}
          area={job.area.name}
          applyLink={`/job/detail/${job.id}`}
          showBookmark={showBookmark}
          showDeleteBookmark={showDeleteBookmark}
        />
      ))}
    </Stack>
  );
};

export default JobList;
