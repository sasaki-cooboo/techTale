import { Chip, Paper, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { initialJobCondition, jobConditionAtom } from "@/atoms/atoms";
import { useAtom } from "jotai";

const SearchCondition = () => {
  const [condition, setCondition] = useAtom(jobConditionAtom);
  const handleClickClear = () => {
    setCondition(initialJobCondition);
    console.log(condition);
  };
  // 条件なしの場合、非表示
  if (Object.values(condition).every((item) => item.length === 0)) {
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
          ...condition.areas,
          ...condition.engineerTypes,
          ...condition.features,
          ...condition.languages,
          ...condition.skills,
        ].map((item, i) => (
          <Chip key={i} label={item} variant="outlined" onDelete={() => {}} />
        ))}
      </Stack>
    </Paper>
  );
};
export default SearchCondition;
