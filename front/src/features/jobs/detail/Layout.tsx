import React, { ReactNode } from "react";
import { Container, Box, useTheme } from "@mui/material";
import Header from "@/features/jobs/Header";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { palette } = useTheme();

  return (
    <div>
      <Header isDetail />
      <Box mt={4} bgcolor={palette.secondary.main}>
        <Container sx={{ py: 4, mt: -4 }}>{children}</Container>
      </Box>
    </div>
  );
};

export default Layout;
