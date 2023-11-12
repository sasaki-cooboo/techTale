import { jobBookmarkAtom } from "@/atoms/atoms";
import { StarBorderOutlined } from "@mui/icons-material";
import { Badge, IconButton, Typography } from "@mui/material";
import { useAtomValue } from "jotai";

const BookmarListButton = () => {
  const bookmarkList = useAtomValue(jobBookmarkAtom);
  const handleClick = () => {
    alert("clicked");
  };

  return (
    <IconButton
      sx={{ borderRadius: "4px" }}
      onClick={handleClick}
      aria-label="bookmark"
    >
      <Typography pr={0.5} fontSize={12}>
        ブックマーク
      </Typography>
      <Badge
        badgeContent={bookmarkList.length}
        color="error"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <StarBorderOutlined sx={{ color: "#f8b500", fontSize: 32 }} />
      </Badge>
    </IconButton>
  );
};
export default BookmarListButton;
