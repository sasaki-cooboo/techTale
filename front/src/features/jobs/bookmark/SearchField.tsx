import { jobBookmarkAtom } from "@/atoms/atoms";
import { Box, TextField } from "@mui/material";
import { useSetAtom } from "jotai";
import { ChangeEventHandler } from "react";

const SearchField = () => {
  const setBookmark = useSetAtom(jobBookmarkAtom);
  /**
   * 検索入力イベントハンドラ
   */
  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    //   setBookmark()
    console.log(e.target.value);
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
