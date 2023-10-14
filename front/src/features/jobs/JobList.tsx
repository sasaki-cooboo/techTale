import { Stack } from "@mui/material";
import JobCard from "./JobCard";

const JobList = () => {
  const jobs = ["1", "2", "3", "4", "5"];
  return (
    <Stack direction={"column"} pb={4} rowGap={2}>
      {jobs.map((job, i) => (
        <JobCard
          key={i}
          title={
            "【PHP/AWS/長期/高単価】エンタメ業界向けアプリケーション開発の求人・案件"
          }
          cost={700000}
          applyLink={""}
          area="東京"
          tags={[
            { name: "高単価", link: "" },
            { name: "長期プロジェクト", link: "" },
            { name: "参画実績あり", link: "" },
          ]}
        />
      ))}
    </Stack>
  );
};

export default JobList;
