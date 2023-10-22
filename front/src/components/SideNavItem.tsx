import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  ListItem,
  Typography,
  Checkbox,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { JobConditionType, JobListResponse } from "@/features/jobs/job.type";
import { useAtom } from "jotai";
import { jobConditionAtom, jobTotalCountAtom } from "@/atoms/atoms";
import fetch from "@/libs/fetch";
import { convertObjectToQueryString } from "@/libs/convertQuery";

type Props = {
  title: string;
  conditionKey: keyof JobConditionType;
  details: { id: number; name: string }[];
};

/**
 * サイドナビコンポーネント、チェックボックス形式
 *
 * @param {}
 * @returns SideNavItem
 */
/** */
const SideNavItem = ({ title, details, conditionKey }: Props) => {
  const [condition, setCondition] = useAtom(jobConditionAtom);
  const [totalCount, setTotalCount] = useAtom(jobTotalCountAtom);

  /**
   * チェック変更時
   */
  const handleChange = async (checked: boolean, id: number) => {
    const newCondition = {
      ...condition,
      // チェックされたidを追加し、重複削除
      [conditionKey]: [...new Set([...condition[conditionKey], id])].filter(
        (num) => {
          if (num === id) {
            // チェックない場合削除
            return checked;
          }
          return true;
        }
      ),
    };
    setCondition(newCondition);
    // 求人取得
    const queryString = convertObjectToQueryString(newCondition);
    const { data: jobs } = await fetch.get<JobListResponse>(
      `/api/v1/jobs?${queryString}`
    );
    setTotalCount(jobs.meta.total);
  };

  return (
    <ListItem sx={{ p: 0, border: 0, my: 1 }}>
      <Accordion defaultExpanded={false} sx={{ boxShadow: "none" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="primary" />}
          aria-controls="panel1a-content"
        >
          <Typography fontSize={16} fontWeight={500}>
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ mt: "-16px" }}>
          {details.map((detail, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  checked={condition[conditionKey].includes(detail.id)}
                  size="small"
                  onChange={(_, checked) => handleChange(checked, detail.id)}
                />
              }
              label={
                <Typography pt={0.25} fontSize={14}>
                  {detail.name}
                </Typography>
              }
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </ListItem>
  );
};
export default SideNavItem;
