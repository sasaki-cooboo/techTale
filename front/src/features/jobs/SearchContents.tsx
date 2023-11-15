import { Box, Stack, Typography, useTheme } from "@mui/material";
import SortMenu from "./SortMenu";
import JobList from "./JobList";
import BasicPagination from "@/components/BasicPagination";
import { useAtom, useAtomValue } from "jotai";
import {
  jobAtom,
  jobConditionAtom,
  jobSortAtom,
  loadingAtom,
} from "@/atoms/atoms";
import LoadPage from "@/components/LoadPage";
import { convertObjectToQueryString } from "@/libs/convertQuery";
import { JobListResponse } from "./job.type";
import fetch from "@/libs/fetch";
import { useRouter } from "next/router";

const SearchContents = () => {
  const { palette } = useTheme();
  const [isLoading, setLoading] = useAtom(loadingAtom);
  const [jobData, setJobData] = useAtom(jobAtom);
  const condition = useAtomValue(jobConditionAtom);
  const sortOption = useAtomValue(jobSortAtom);
  const router = useRouter();

  const handleChangePagination = async (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    try {
      setLoading(true);
      const queryString = convertObjectToQueryString(condition);
      const sortQuery =
        sortOption === "高単価順"
          ? "&sort=cost"
          : sortOption === "新着順"
          ? "&sort=latest"
          : "";
      const { data } = await fetch.get<JobListResponse>(
        `/api/v1/jobs?page=${value}&${queryString}${sortQuery}`
      );
      setJobData(data);
      router.push(
        `/job/search?page=${value}&${queryString}${sortQuery}`,
        undefined,
        {
          shallow: true,
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0 });
    }
  };

  if (isLoading || !jobData) {
    return <LoadPage />;
  }

  return (
    <>
      {jobData.meta.total ? (
        <>
          <Stack my={1} justifyContent={"space-between"} direction={"row"}>
            <Typography fontSize={14}>
              全
              <span
                style={{
                  color: palette.warning.main,
                  fontSize: 24,
                  paddingLeft: 4,
                  paddingRight: 4,
                  fontWeight: 600,
                }}
              >
                {jobData.meta.total.toLocaleString("ja-JP")}
              </span>
              {`件中 ${jobData.meta.from}~${jobData.meta.to}件を表示中`}
            </Typography>
            <SortMenu />
          </Stack>
          <JobList jobList={jobData.jobList} />
          <Box pt={2} pb={8}>
            <BasicPagination
              jobData={jobData}
              handleChange={handleChangePagination}
            />
          </Box>
        </>
      ) : (
        <Typography
          textAlign={"center"}
          fontSize={18}
          mt={10}
          fontWeight={500}
          variant="h3"
        >
          お探しの案件はありません
        </Typography>
      )}
    </>
  );
};
export default SearchContents;
