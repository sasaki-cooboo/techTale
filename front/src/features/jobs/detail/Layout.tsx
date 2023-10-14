import React, { ReactNode } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "@/features/jobs/Header";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { palette } = useTheme();

  return (
    <div>
      <Header isDetail />
      <Box py={6} bgcolor={palette.secondary.main}>
        {children}
      </Box>
    </div>
  );
};

export default Layout;
