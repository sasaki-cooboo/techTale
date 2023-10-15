import React from "react";
import { CircularProgress, Backdrop, useTheme } from "@mui/material";

type Props = {
  open: boolean;
};

const Loading = ({ open }: Props) => {
  const theme = useTheme();
  return (
    <Backdrop
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
