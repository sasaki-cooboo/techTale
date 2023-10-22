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
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  initialJobCondition,
  jobAtom,
  jobConditionAtom,
  jobConditionDisplayAtom,
  jobSearchKeywordAtom,
  jobSortAtom,
  jobTotalCountAtom,
  loadingAtom,
} from "@/atoms/atoms";
import fetch from "@/libs/fetch";
import { convertObjectToQueryString } from "@/libs/convertQuery";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect } from "react";

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
  const [jobData, setJobData] = useAtom(jobAtom);
  const setLoading = useSetAtom(loadingAtom);
  const [condition, setCondition] = useAtom(jobConditionAtom);
  const setConditionDisplay = useSetAtom(jobConditionDisplayAtom);
  const sortOption = useAtomValue(jobSortAtom);
  const [totalCount, setTotalCount] = useAtom(jobTotalCountAtom);
  const [searchKeyword, setSearchKeyword] = useAtom(jobSearchKeywordAtom);
  const router = useRouter();

  /**
   * 検索する
   */
  const handleClickSearch = async () => {
    try {
      setLoading(true);
      const queryString = convertObjectToQueryString(condition);
      const sortQuery =
        sortOption === "高単価順"
          ? "&sort=cost"
          : sortOption === "新着順"
          ? "&sort=latest"
          : "";
      const keywordParam = searchKeyword ? `q=${searchKeyword}` : "";
      const { data } = await fetch.get<JobListResponse>(
        `/api/v1/jobs?${keywordParam}${queryString}${sortQuery}`
      );
      setJobData(data);
      setConditionDisplay(condition);
      router.push(
        `/job/search?${keywordParam}${queryString}${sortQuery}`,
        undefined,
        {
          shallow: true,
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0 });
    }
  };

  /**
   * 条件をクリア
   */
  const handleClickClear = async () => {
    setCondition(initialJobCondition);
    setSearchKeyword("");
  };

  /**
   * フリーワード検索
   */
  const handleChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  useEffect(() => {
    const setCount = async () => {
      // TODO:atom内部に移行できない？？
      // 条件が変わるたびに求人再取得、個数だけ返すAPI作成していいかも
      const queryString = convertObjectToQueryString(condition);
      const { data: jobs } = await fetch.get<JobListResponse>(
        `/api/v1/jobs?${queryString}`
      );
      setTotalCount(jobs.meta.total);
    };
    setCount();
  }, [condition, setTotalCount]);

  return (
    <Paper>
      <List>
        <ListItem sx={{ display: "block", pb: 2 }}>
          <Typography fontSize={16} variant="h6" mb={1}>
            フリーワード検索
          </Typography>
          <TextField
            onChange={handleChangeKeyword}
            value={searchKeyword || ""}
            type="search"
            size="small"
            label="エリア 言語 リモート等"
            fullWidth
          />
        </ListItem>
        <Divider sx={{ mx: 2 }} />
        <SideNavItem title="地域" details={areas} conditionKey="areas" />
        <Divider sx={{ mx: 2 }} />
        <SideNavItem
          title="言語"
          details={languages}
          conditionKey="languages"
        />
        <Divider sx={{ mx: 2 }} />
        <SideNavItem
          title="フレームワーク"
          details={frameworks}
          conditionKey="skills"
        />
        <Divider sx={{ mx: 2 }} />
        <SideNavItem
          title="データベース"
          details={databases}
          conditionKey="skills"
        />
        <Divider sx={{ mx: 2 }} />
        <SideNavItem title="クラウド" details={clouds} conditionKey="skills" />
        <Divider sx={{ mx: 2 }} />
        <SideNavItem
          title="職種"
          details={engineerTypes}
          conditionKey="engineerTypes"
        />
        <Divider sx={{ mx: 2 }} />
        {/* TODO:単価はラジオボタン */}
        {/* <SideNavItem title="単価" details={features} />
        <Divider sx={{ mx: 2 }} /> */}
        <SideNavItem title="特徴" details={features} conditionKey="features" />
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
            {totalCount}
          </span>
          件
        </Typography>
        <Box pb={2} textAlign={"center"}>
          <Button
            onClick={handleClickSearch}
            size="large"
            variant="contained"
            sx={{ width: 200 }}
            disabled={!totalCount}
          >
            検索する
          </Button>
        </Box>
        <Box pb={2} textAlign={"center"}>
          <Button
            onClick={handleClickClear}
            size="large"
            variant="outlined"
            sx={{ width: 200 }}
          >
            条件をクリア
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
