import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { JobListResponse } from "@/features/jobs/job.type";

type Props = {
  jobData: JobListResponse;
  handleChange: (_: React.ChangeEvent<unknown>, value: number) => Promise<void>;
};

const BasicPagination = ({ jobData, handleChange }: Props) => {
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
