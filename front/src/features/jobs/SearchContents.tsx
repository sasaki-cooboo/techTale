import { Box, Stack, Typography, useTheme } from "@mui/material";
import SortMenu from "./SortMenu";
import JobList from "./JobList";
import BasicPagination from "@/components/BasicPagination";
import { useAtomValue } from "jotai";
import { jobAtom, loadingAtom } from "@/atoms/atoms";
import LoadPage from "@/components/LoadPage";

const SearchContents = () => {
  const { palette } = useTheme();
  const data = useAtomValue(jobAtom);
  const loading = useAtomValue(loadingAtom);

  if (loading || !data) {
    return <LoadPage />;
  }

  return (
    <>
      {data.meta.total ? (
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
                {data.meta.total.toLocaleString("ja-JP")}
              </span>
              {`件中 ${data.meta.from}~${data.meta.to}件を表示中`}
            </Typography>
            <SortMenu />
          </Stack>
          <JobList jobList={data.jobList} />
          <Box pt={2} pb={8}>
            <BasicPagination />
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
