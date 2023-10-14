import {
  Divider,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
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
  return (
    <Paper>
      <List>
        <ListItem sx={{ display: "block" }}>
          <Typography fontSize={16} variant="h6" mb={1}>
            フリーワード検索
          </Typography>
          <TextField size="small" label="エリア 言語 リモート等" fullWidth />
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
      </List>
    </Paper>
  );
};
