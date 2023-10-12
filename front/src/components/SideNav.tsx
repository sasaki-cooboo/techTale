import {
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export const SideNav = () => {
  return (
    <Paper>
      <Box p={4}>
        <Typography fontSize={16} variant="h6">
          検索
        </Typography>
        <TextField size="small" label="キーワード" fullWidth />
        <Typography fontSize={16} variant="h6" mt={4}>
          プログラミング言語
        </Typography>
        <Box>
          <FormControlLabel control={<Checkbox />} label="JavaScript" />
          <FormControlLabel control={<Checkbox />} label="Python" />
          <FormControlLabel control={<Checkbox />} label="Java" />
        </Box>
      </Box>
      {/* 他のプログラミング言語のチェックボックスも追加 */}
    </Paper>
  );
};
