import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { useTableStyle } from "../useTableStyle";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";

const DetailContents = () => {
  const { tableHeaderStyle, tagStyle } = useTableStyle();
  const { palette } = useTheme();

  const cost = 1000000;

  return (
    <Box>
      <Typography variant="h5">
        【PHP/AWS/長期/高単価】エンタメ業界向けアプリケーション開発の求人・案件
      </Typography>
      <Box mt={4}>
        <Table>
          <TableBody>
            <TableRow sx={{ borderTop: `1px solid rgba(224, 224, 224)` }}>
              <TableCell style={tableHeaderStyle}>単価</TableCell>
              <TableCell>
                <Typography variant="body2">
                  <CurrencyYenIcon
                    sx={{ color: palette.warning.main, fontSize: 16 }}
                  />
                  <span
                    style={{
                      color: palette.warning.main,
                      fontSize: 24,
                      paddingLeft: 4,
                      paddingRight: 8,
                      fontWeight: 500,
                    }}
                  >
                    ~{cost.toLocaleString("ja-JP")}
                  </span>
                  円 / 月
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={tableHeaderStyle}>地域</TableCell>
              <TableCell>{"渋谷"}</TableCell>
            </TableRow>
            <TableRow sx={{ borderTop: `1px solid rgba(224, 224, 224)` }}>
              <TableCell style={tableHeaderStyle}>言語</TableCell>
              <TableCell>
                <Stack gap={1} direction={"row"}>
                  {["React", "Python", "TypeScript"].map((item) => (
                    <Chip
                      key={item}
                      label={item}
                      sx={{ fontSize: 14 }}
                      variant="outlined"
                      onClick={() => console.log("clicked")}
                    />
                  ))}
                </Stack>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={tableHeaderStyle}>スキル</TableCell>
              <TableCell>
                <Stack gap={1} direction={"row"}>
                  {["Docker", "Laravel", "MySQL"].map((item) => (
                    <Chip
                      key={item}
                      label={item}
                      sx={{ fontSize: 14 }}
                      variant="outlined"
                      onClick={() => console.log("clicked")}
                    />
                  ))}
                </Stack>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={tableHeaderStyle}>職種</TableCell>
              <TableCell>{"バックエンドエンジニア"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={tableHeaderStyle}>必要なスキル</TableCell>
              <TableCell>
                <ul style={{ margin: 0, paddingLeft: "16px" }}>
                  <li>PHPでの開発経験（4年以上）</li>
                  <li>Dockerの経験</li>
                  <li>GitHubの経験</li>
                </ul>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
      <Box my={4} textAlign={"center"}>
        <Button
          size="large"
          variant="contained"
          color="warning"
          sx={{ width: 300 }}
          onClick={() => alert("応募ありがとう！")}
        >
          この案件に応募する
        </Button>
      </Box>
      <Divider sx={{ my: 4 }} />
      <Stack direction={"row"}>
        <Typography width={300} variant="h6">
          業務内容
        </Typography>
        <Typography mt={1} ml={4} variant="body2">
          エンタメ業界向けのサービス開発をご担当いただきます。
          エンタメ業界向けのサービス開発をご担当いただきます。
          エンタメ業界向けのサービス開発をご担当いただきます。
          エンタメ業界向けのサービス開発をご担当いただきます。
        </Typography>
      </Stack>
      <Divider sx={{ my: 4 }} />
      <Stack direction={"row"}>
        <Typography width={300} variant="h6">
          こだわりポイント
        </Typography>
        <Typography mt={1} ml={4} variant="body2">
          エンタメ業界向けのサービス開発をご担当いただきます。
          エンタメ業界向けのサービス開発をご担当いただきます。
          エンタメ業界向けのサービス開発をご担当いただきます。
          エンタメ業界向けのサービス開発をご担当いただきます。
        </Typography>
      </Stack>
      <Divider sx={{ my: 4 }} />
      <Stack direction={"row"}>
        <Typography width={300} variant="h6">
          担当者から一言
        </Typography>
        <Typography mt={1} ml={4} variant="body2">
          エンタメ業界向けのサービス開発をご担当いただきます。
          エンタメ業界向けのサービス開発をご担当いただきます。
          エンタメ業界向けのサービス開発をご担当いただきます。
          エンタメ業界向けのサービス開発をご担当いただきます。
        </Typography>
      </Stack>
    </Box>
  );
};
export default DetailContents;
