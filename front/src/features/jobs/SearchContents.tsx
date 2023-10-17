import { Box, Stack, Typography, useTheme } from "@mui/material";
import SortMenu from "./SortMenu";
import JobList from "./JobList";
import BasicPagination from "@/components/BasicPagination";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import fetch from "@/libs/fetch";
import { JobListResponse } from "./job.type";

const SearchContents = () => {
  const { palette } = useTheme();
  const [data, setData] = useState<JobListResponse | null>(null);

  const fetchJobs = async () => {
    const { data } = await fetch.get<JobListResponse>("/api/v1/jobs");
    setData(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (!data) {
    return <Loading open />;
  }
  return (
    <>
      <Typography fontSize={24} mb={2} fontWeight={500} variant="h2">
        求人・開発案件一覧
      </Typography>
      <Stack my={1} justifyContent={"space-between"} direction={"row"}>
        <Typography fontSize={14}>
          全
          <span
            style={{
              color: palette.warning.main,
              fontSize: 24,
              paddingLeft: 4,
              paddingRight: 4,
              fontWeight: 500,
            }}
          >
            {data.meta.count.toLocaleString("ja-JP")}
          </span>
          件中 1~40件を表示中
        </Typography>
        <SortMenu />
      </Stack>
      <JobList jobList={data.jobList} />
      <Box pt={2} pb={8}>
        <BasicPagination />
      </Box>
    </>
  );
};
export default SearchContents;
