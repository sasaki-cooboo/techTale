import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import SideNavItem from "./SideNavItem";
import { JobAttributesType, JobListResponse } from "@/features/jobs/job.type";
import { useSetAtom } from "jotai";
import { jobAtom, loadingAtom } from "@/atoms/atoms";
import fetch from "@/libs/fetch";

type Props = {
  jobAttributes: JobAttributesType;
};

export const SideNav = ({ jobAttributes }: Props) => {
  const {
    areas,
    languages,
    engineerTypes,
    features,
    skills: { frameworks, databases, clouds },
  } = jobAttributes;
  const { palette } = useTheme();
  const setData = useSetAtom(jobAtom);
  const setLoading = useSetAtom(loadingAtom);
  const handleClick = async () => {
    try {
      setLoading(true);
      const { data } = await fetch.get<JobListResponse>(
        "/api/v1/jobs?language=2"
      );
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper>
      <List>
        <ListItem sx={{ display: "block", pb: 2 }}>
          <Typography fontSize={16} variant="h6" mb={1}>
            フリーワード検索
          </Typography>
          <TextField
            type="search"
            size="small"
            label="エリア 言語 リモート等"
            fullWidth
          />
        </ListItem>
        <Divider sx={{ mx: 2 }} />
        <SideNavItem title="地域" details={areas} />
        <Divider sx={{ mx: 2 }} />
        <SideNavItem title="言語" details={languages} />
        <Divider sx={{ mx: 2 }} />
        <SideNavItem title="フレームワーク" details={frameworks} />
        <Divider sx={{ mx: 2 }} />
        <SideNavItem title="データベース" details={databases} />
        <Divider sx={{ mx: 2 }} />
        <SideNavItem title="クラウド" details={clouds} />
        <Divider sx={{ mx: 2 }} />
        <SideNavItem title="職種" details={engineerTypes} />
        <Divider sx={{ mx: 2 }} />
        {/* TODO:単価はラジオボタン */}
        {/* <SideNavItem title="単価" details={features} />
        <Divider sx={{ mx: 2 }} /> */}
        <SideNavItem title="特徴" details={features} />
        <Divider sx={{ mx: 2 }} />
      </List>
      <Box pt={2}>
        <Typography textAlign={"center"} fontSize={16} variant="h6" mb={1}>
          この条件の案件数
          <span
            style={{
              color: palette.warning.main,
              fontSize: 24,
              paddingLeft: 4,
              paddingRight: 4,
              fontWeight: 500,
            }}
          >
            1127
          </span>
          件
        </Typography>
        <Box pb={2} textAlign={"center"}>
          <Button
            onClick={handleClick}
            size="large"
            variant="contained"
            sx={{ width: 200 }}
          >
            検索する
          </Button>
        </Box>
        <Box pb={2} textAlign={"center"}>
          <Button size="large" variant="outlined" sx={{ width: 200 }}>
            条件をクリア
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
