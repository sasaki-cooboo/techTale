import { Chip, Paper, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  initialJobCondition,
  jobAttributesAtom,
  jobConditionAtom,
  jobConditionDisplayAtom,
} from "@/atoms/atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

const SearchCondition = () => {
  const setCondition = useSetAtom(jobConditionAtom);
  const jobAttributes = useAtomValue(jobAttributesAtom);
  const [conditionDisplay, setConditionDisplay] = useAtom(
    jobConditionDisplayAtom
  );

  const handleClickClear = () => {
    setCondition(initialJobCondition);
    setConditionDisplay(initialJobCondition);
    //   リセット後に再取得
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
      <Stack pt={1.5} gap={1} direction={"row"} flexWrap={"wrap"}>
        {Object.keys(conditionDisplay).map((conditionKey) => {
          // 型キャストする
          const castConditionKey =
            conditionKey as keyof typeof conditionDisplay;
          return conditionDisplay[castConditionKey].map((id, i) => (
            <Chip
              key={i}
              label={createLabel(castConditionKey, id)}
              variant="outlined"
              onDelete={() => {
                console.log(conditionKey);
              }}
            />
          ));
        })}
      </Stack>
    </Paper>
  );
};
export default SearchCondition;
