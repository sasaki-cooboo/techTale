import { Chip, Paper, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  initialJobCondition,
  jobConditionAtom,
  jobConditionDisplayAtom,
} from "@/atoms/atoms";
import { useAtom, useSetAtom } from "jotai";

const SearchCondition = () => {
  const setCondition = useSetAtom(jobConditionAtom);
  const [conditionDisplay, setConditionDisplay] = useAtom(
    jobConditionDisplayAtom
  );

  const handleClickClear = () => {
    setCondition(initialJobCondition);
    setConditionDisplay(initialJobCondition);
    //   リセット後に再取得
  };

  // 条件なしの場合、非表示
  if (Object.values(conditionDisplay).every((item) => item.length === 0)) {
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
      <Stack pt={1.5} gap={1} direction={"row"}>
        {[
          ...conditionDisplay.areas,
          ...conditionDisplay.engineerTypes,
          ...conditionDisplay.features,
          ...conditionDisplay.languages,
          ...conditionDisplay.skills,
        ].map((item, i) => (
          <Chip key={i} label={item} variant="outlined" onDelete={() => {}} />
        ))}
      </Stack>
    </Paper>
  );
};
export default SearchCondition;
