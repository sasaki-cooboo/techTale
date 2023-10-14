import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  ListItem,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Props = {
  title: string;
  details: { name: string }[];
};

/**
 * サイドナビコンポーネント、チェックボックス形式
 *
 * @param {}
 * @returns SideNavItem
 */
/** */
const SideNavItem = ({ title, details }: Props) => {
  return (
    <ListItem sx={{ p: 0, border: 0, my: 1 }}>
      <Accordion sx={{ boxShadow: "none" }}>
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
              control={<Checkbox />}
              label={detail.name}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </ListItem>
  );
};
export default SideNavItem;
