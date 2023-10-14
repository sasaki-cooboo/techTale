import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link, Stack, useTheme } from "@mui/material";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import RoomIcon from "@mui/icons-material/Room";
import CodeIcon from "@mui/icons-material/Code";
/**
 * 関連する案件のカードコンポーネント
 *
 **/
export default function RelatedCard() {
  const { palette } = useTheme();
  const cost = 700000;

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Link
          underline="hover"
          fontWeight={500}
          fontSize={16}
          href="/job/detail/2"
        >
          【PHP/高単価】業務システムバックエンド開発の求人・案件
        </Link>
        <Typography mt={1} variant="body2">
          <CurrencyYenIcon sx={{ color: palette.warning.main, fontSize: 16 }} />
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
        <Stack mt={1} direction={"row"} alignItems={"center"}>
          <CodeIcon color="info" />
          <Typography fontSize={14} ml={1}>
            {"Python"}
          </Typography>
        </Stack>
        <Stack mt={1} direction={"row"} alignItems={"center"}>
          <RoomIcon color="info" />
          <Typography fontSize={14} ml={1}>
            {"新宿"}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
