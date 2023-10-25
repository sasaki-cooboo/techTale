import React, { ReactNode } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "@/features/jobs/Header";

type Props = {
  jobName?: string;
  children: ReactNode;
};

const Layout = ({ jobName, children }: Props) => {
  const { palette } = useTheme();

  return (
    <div>
      <Header jobName={jobName} />
      <Box py={6} bgcolor={palette.secondary.main}>
        {children}
      </Box>
    </div>
  );
};

export default Layout;
