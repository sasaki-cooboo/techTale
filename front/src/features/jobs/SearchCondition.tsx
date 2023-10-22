import { Chip, Paper, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  initialJobCondition,
  jobAtom,
  jobAttributesAtom,
  jobConditionAtom,
  jobConditionDisplayAtom,
  jobSearchKeywordAtom,
  jobSortAtom,
  loadingAtom,
} from "@/atoms/atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/router";
import fetch from "@/libs/fetch";
import { JobConditionType, JobListResponse } from "./job.type";
import { convertObjectToQueryString } from "@/libs/convertQuery";

const SearchCondition = () => {
  const setCondition = useSetAtom(jobConditionAtom);
  const jobAttributes = useAtomValue(jobAttributesAtom);
  const [conditionDisplay, setConditionDisplay] = useAtom(
    jobConditionDisplayAtom
  );
  const sortOption = useAtomValue(jobSortAtom);
  const setJobData = useSetAtom(jobAtom);
  const setLoading = useSetAtom(loadingAtom);
  const searchKeyword = useAtomValue(jobSearchKeywordAtom);
  const router = useRouter();

  /**
   * リセット押下時の処理
   */
  const handleClickClear = async () => {
    setCondition(initialJobCondition);
    setConditionDisplay(initialJobCondition);
    const sortQuery =
      sortOption === "高単価順"
        ? "?sort=cost"
        : sortOption === "新着順"
        ? "?sort=latest"
        : "";
    try {
      setLoading(true);
      // リセット後に再取得
      const { data } = await fetch.get<JobListResponse>(
        `/api/v1/jobs${sortQuery}`
      );
      setJobData(data);
      router.push(`/job/search${sortQuery}`, undefined, {
        shallow: true,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 検索条件削除時の処理
   */
  const handleClickDelete = async (
    conditionKey: keyof JobConditionType,
    id: number
  ) => {
    const newCondition = {
      // setConditionの表示用のstoreの値を使用して問題なし
      ...conditionDisplay,
      // クリックされたもの以外をstoreに保存
      [conditionKey]: conditionDisplay[conditionKey].filter(
        (item) => item !== id
      ),
    };
    setCondition(newCondition);
    setConditionDisplay(newCondition);
    const queryString = convertObjectToQueryString(newCondition);
    const sortQuery =
      sortOption === "高単価順"
        ? "&sort=cost"
        : sortOption === "新着順"
        ? "&sort=latest"
        : "";
    const keywordParam = searchKeyword ? `&q=${searchKeyword}` : "";
    try {
      setLoading(true);
      // 求人情報を再取得
      const { data } = await fetch.get<JobListResponse>(
        `/api/v1/jobs?${queryString}${sortQuery}${keywordParam}`
      );
      setJobData(data);
      router.push(
        `/job/search?${queryString}${sortQuery}${keywordParam}`,
        undefined,
        {
          shallow: true,
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createLabel = (
    conditionKey: keyof typeof conditionDisplay,
    id: number
  ) => {
    if (conditionKey !== "skills") {
      return jobAttributes[conditionKey].find((item) => item.id === id)?.name;
    }
    // スキルは3つに分かれているので別で記述
    const targetSkill =
      jobAttributes.skills.frameworks.find((item) => item.id === id) ||
      jobAttributes.skills.databases.find((item) => item.id === id) ||
      jobAttributes.skills.clouds.find((item) => item.id === id);
    return targetSkill?.name;
  };

  const keyword = router.query.q;

  if (
    Object.values(conditionDisplay).every((item) => item.length === 0) &&
    !keyword
  ) {
    return null;
  }

  return (
    <Paper sx={{ p: 2, my: 2 }}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"row"}>
          <SearchIcon />
          <Typography ml={1} fontWeight={500} fontSize={16}>
            検索条件
          </Typography>
        </Stack>
        <Chip
          label="リセット"
          color="primary"
          variant="outlined"
          onClick={handleClickClear}
          icon={<DeleteForeverIcon />}
        />
      </Stack>
      {keyword ? (
        <Typography mt={1} fontSize={16}>
          フリーワード: {keyword}
        </Typography>
      ) : null}
      <Stack pt={1.5} gap={1} direction={"row"} flexWrap={"wrap"}>
        {Object.keys(conditionDisplay).map((conditionKey) => {
          // 型キャストする
          const castConditionKey = conditionKey as keyof JobConditionType;
          return conditionDisplay[castConditionKey].map((id, i) => {
            const label = createLabel(castConditionKey, id);
            return label ? (
              <Chip
                key={i}
                label={label}
                variant="outlined"
                onDelete={() => handleClickDelete(castConditionKey, id)}
              />
            ) : null;
          });
        })}
      </Stack>
    </Paper>
  );
};
export default SearchCondition;
