import { Stack } from "@mui/material";
import JobCard from "./JobCard";

const JobList = () => {
  const jobs = ["1", "2", "3", "4", "5"];
  return (
    <Stack direction={"column"} pb={4} rowGap={2}>
      {jobs.map((job, i) => (
        <JobCard
          key={i}
          title={"タイトル"}
          description={"説明文"}
          applyLink={""}
        />
      ))}
    </Stack>
  );
};

export default JobList;
