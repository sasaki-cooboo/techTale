import React, { ReactNode } from "react";
import { Container, Grid, Box, useTheme } from "@mui/material";
import { SideNav } from "./SideNav";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { palette } = useTheme();

  return (
    <div>
      <Header />
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
