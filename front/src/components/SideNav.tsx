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

export const SideNav = () => {
  const areas = [{ name: "東京" }, { name: "神奈川" }, { name: "埼玉" }];
  const languages = [
    { name: "TypeScript" },
    { name: "Python" },
    { name: "Java" },
  ];
  const frameWork = [
    { name: "React" },
    { name: "Laravel" },
    { name: "Spring" },
  ];
  const databases = [
    { name: "MySQL" },
    { name: "PostgreSQL" },
    { name: "Oracle Database" },
  ];
  const cloud = [{ name: "AWS" }, { name: "GCP" }, { name: "Azure" }];
  const engineerTypes = [
    { name: "フロントエンジニア" },
    { name: "バックエンドエンジニア" },
    { name: "インフラエンジニア" },
  ];
  const features = [
    { name: "高単価" },
    { name: "リモート可" },
    { name: "服装カジュアル" },
  ];
  const { palette } = useTheme();

  return (
    <Paper>
      <List>
        <ListItem sx={{ display: "block", pb: 2 }}>
          <Typography fontSize={16} variant="h6" mb={1}>
            フリーワード検索
          </Typography>
          <TextField
            type="search"
            size="small"
            label="エリア 言語 リモート等"
            fullWidth
          />
        </ListItem>
        <Divider sx={{ mx: 2 }} />
        <SideNavItem title="地域" details={areas} />
        <Divider sx={{ mx: 2 }} />
        <SideNavItem title="言語" details={languages} />
        <Divider sx={{ mx: 2 }} />
        <SideNavItem title="フレームワーク" details={frameWork} />
        <Divider sx={{ mx: 2 }} />
        <SideNavItem title="データベース" details={databases} />
        <Divider sx={{ mx: 2 }} />
        <SideNavItem title="クラウド" details={cloud} />
        <Divider sx={{ mx: 2 }} />
        <SideNavItem title="職種" details={engineerTypes} />
        <Divider sx={{ mx: 2 }} />
        <SideNavItem title="特徴" details={features} />
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
            1127
          </span>
          件
        </Typography>
        <Box pb={2} textAlign={"center"}>
          <Button size="large" variant="contained" sx={{ width: 200 }}>
            検索する
          </Button>
        </Box>
        <Box pb={2} textAlign={"center"}>
          <Button size="large" variant="outlined" sx={{ width: 200 }}>
            条件をクリア
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
