import { jobBookmarkAtom, loadingAtom } from "@/atoms/atoms";
import { Bookmark } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";
import { useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/router";

const BookmarListButton = () => {
  const bookmarkList = useAtomValue(jobBookmarkAtom);
  const setLoading = useSetAtom(loadingAtom);
  const router = useRouter();
  const handleClick = () => {
    setLoading(true);
    router.push("/job/bookmark").finally(() => {
      setLoading(false);
    });
  };

  return (
    <IconButton
      sx={{ borderRadius: "4px" }}
      onClick={handleClick}
      aria-label="bookmark"
    >
      <Badge
        badgeContent={bookmarkList.length}
        color="error"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Bookmark sx={{ color: "#f8b500", fontSize: 32 }} />
      </Badge>
    </IconButton>
  );
};
export default BookmarListButton;
