import React, { ReactNode } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Box,
  useTheme,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { SideNav } from "./SideNav";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { palette } = useTheme();
  const breadcrumbs = [
    <Link
      sx={{ fontSize: 14 }}
      underline="hover"
      key="1"
      color="inherit"
      href="/"
    >
      HOME
    </Link>,
    <Typography sx={{ fontSize: 14 }} key="2" color="text.primary">
      案件一覧
    </Typography>,
  ];
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
        <Container>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Container>
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
              {children}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Layout;
