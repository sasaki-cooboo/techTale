import React, { ReactNode } from "react";
import { Container, Grid, Box, useTheme } from "@mui/material";
import Header from "@/features/jobs/Header";
import { SideNav } from "@/components/SideNav";
import { JobAttributesType } from "./job.type";

type Props = {
  children: ReactNode;
  jobAttributes?: JobAttributesType;
};

const Layout = ({ children, jobAttributes }: Props) => {
  const { palette } = useTheme();

  return (
    <div>
      <Header />
      <Box pt={4} bgcolor={palette.secondary.main}>
        <Container>
          {jobAttributes ? (
            <Grid container spacing={4}>
              <Grid item xs={12} sm={3}>
                <Box>
                  <SideNav jobAttributes={jobAttributes} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={9}>
                {children}
              </Grid>
            </Grid>
          ) : (
            <>{children}</>
          )}
        </Container>
      </Box>
    </div>
  );
};

export default Layout;
