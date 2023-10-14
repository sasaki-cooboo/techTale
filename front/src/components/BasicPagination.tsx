import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function BasicPagination() {
  return (
    <Stack alignItems={"center"}>
      <Pagination count={10} color="primary" />
      {/* 実装時には下記を使用予定 */}
      {/* <Pagination count={10} color="primary" page={page} onChange={handleChange} /> */}
    </Stack>
  );
}
