import LoadPage from "@/components/LoadPage";
import { Box, Stack, Typography } from "@mui/material";
import JobList from "../JobList";
import BasicPagination from "@/components/BasicPagination";
import {
  jobBookmarkAtom,
  jobBookmarkIdsAtom,
  loadingAtom,
} from "@/atoms/atoms";
import { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import fetch from "@/libs/fetch";
import { JobListResponse } from "@/features/jobs/job.type";
import { useRouter } from "next/router";
import SearchField from "./SearchField";

const BookmarkContent = () => {
  const [isLoading, setLoading] = useAtom(loadingAtom);
  const setBookMarkIds = useSetAtom(jobBookmarkIdsAtom);
  const [bookmark, setBookMark] = useAtom(jobBookmarkAtom);
  const router = useRouter();

  const handleChangePagination = async (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    try {
      setLoading(true);
      const { data } = await fetch.get<JobListResponse>(
        `/api/v1/jobBookmarkList?page=${value}`
      );
      setBookMark(data);
      router.push(`/job/bookmark?page=${value}`, undefined, {
        shallow: true,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0 });
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: bookmark } = await fetch.get<JobListResponse>(
        "/api/v1/jobBookmarkList"
      );
      const { data: bookmarkIds } = await fetch.get<number[]>(
        `/api/v1/jobBookmarkIds`
      );
      setBookMark(bookmark);
      setBookMarkIds(Object.values(bookmarkIds));
    })().finally(() => {
      setLoading(false);
    });
  }, [setLoading, setBookMarkIds, setBookMark]);
  return (
    <>
      <Stack pb={1} direction={"row"} justifyContent={"space-between"}>
        <Typography fontSize={24} pb={2} fontWeight={500} variant="h2">
          ブックマークした求人
        </Typography>
        <SearchField />
      </Stack>
      {isLoading ? (
        <LoadPage />
      ) : bookmark && bookmark.jobList.length ? (
        <>
          <JobList
            jobList={bookmark.jobList}
            showBookmark={false}
            showDeleteBookmark
          />
          <Box pt={2} pb={8}>
            <BasicPagination
              jobData={bookmark}
              handleChange={handleChangePagination}
            />
          </Box>
        </>
      ) : (
        <Typography
          textAlign={"center"}
          fontSize={20}
          fontWeight={600}
          pt={4}
          pb={20}
        >
          ブックマークがありません。
        </Typography>
      )}
    </>
  );
};
export default BookmarkContent;
