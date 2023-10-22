import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { jobAtom, jobConditionAtom, loadingAtom } from "@/atoms/atoms";
import { useRouter } from "next/router";
import { convertObjectToQueryString } from "@/libs/convertQuery";
import { JobListResponse } from "@/features/jobs/job.type";
import fetch from "@/libs/fetch";

const BasicPagination = () => {
  const [jobData, setJobData] = useAtom(jobAtom);
  const setLoading = useSetAtom(loadingAtom);
  const condition = useAtomValue(jobConditionAtom);
  const router = useRouter();

  const handleChange = async (_: React.ChangeEvent<unknown>, value: number) => {
    try {
      setLoading(true);
      const queryString = convertObjectToQueryString(condition);
      const { data } = await fetch.get<JobListResponse>(
        `/api/v1/jobs?page=${value}&${queryString}`
      );
      setJobData(data);
      router.push(`/job/search?page=${value}&${queryString}`, undefined, {
        shallow: true,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0 });
    }
  };

  if (!jobData) {
    return null;
  }
  return (
    <Stack alignItems={"center"}>
      <Pagination
        count={Math.ceil(jobData.meta.total / jobData.meta.per_page)}
        color="primary"
        page={jobData.meta.current_page}
        onChange={handleChange}
      />
    </Stack>
  );
};
export default BasicPagination;
