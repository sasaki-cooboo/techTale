import React, { ReactNode } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Box,
  useTheme,
} from "@mui/material";
import { SideNav } from "./SideNav";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { palette } = useTheme();
  return (
    <div>
      <AppBar
        position="static"
        sx={{
          background: "white",
        }}
      >
        <Container>
          <Toolbar>
            <Typography color={palette.primary.main} ml={-4} variant="h6">
              エンジニア求人サイト
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Box mt={0} py={1}>
        <Container>ここにぱんくず</Container>
      </Box>
      <Box mt={4} bgcolor={palette.secondary.main}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={3}>
              <Box>
                <SideNav />
              </Box>
            </Grid>
            <Grid item xs={12} sm={9}>
              {/* 右側のメインエリアに案件一覧を表示するコンポーネントをここに配置 */}
              {children}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Layout;
