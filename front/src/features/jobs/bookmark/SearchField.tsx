import { jobBookmarkAtom } from "@/atoms/atoms";
import fetch from "@/libs/fetch";
import { Box, TextField } from "@mui/material";
import { useSetAtom } from "jotai";
import { ChangeEventHandler } from "react";
import { JobListResponse } from "../job.type";

const SearchField = () => {
  const setBookmark = useSetAtom(jobBookmarkAtom);
  /**
   * 検索入力イベントハンドラ
   */
  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = async (e) => {
    const { data: bookmark } = await fetch.get<JobListResponse>(
      "/api/v1/jobBookmarkList",
      {
        params: {
          q: e.target.value,
        },
      }
    );
    console.log(bookmark);
  };

  return (
    <Box width={300}>
      <TextField
        label="検索"
        fullWidth
        size="small"
        onChange={handleChange}
        InputProps={{
          type: "search",
        }}
      />
    </Box>
  );
};

export default SearchField;
