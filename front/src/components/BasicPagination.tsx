import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useAtomValue } from "jotai";
import { jobAtom } from "@/atoms/atoms";

export default function BasicPagination() {
  const jobAtomValue = useAtomValue(jobAtom);

  const handleChange = () => {
    console.log("a");
  };

  if (!jobAtomValue) {
    return null;
  }
  return (
    <Stack alignItems={"center"}>
      <Pagination
        count={Math.ceil(jobAtomValue.meta.total / jobAtomValue.meta.per_page)}
        color="primary"
        page={jobAtomValue.meta.current_page}
        onChange={handleChange}
      />
    </Stack>
  );
}
