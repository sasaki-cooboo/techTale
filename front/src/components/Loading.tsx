import React from "react";
import { Backdrop, CircularProgress, useTheme } from "@mui/material";

type Props = {
  open: boolean;
};

const Loading = ({ open }: Props) => {
  const theme = useTheme();
  return open ? (
    <Backdrop
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
      }}
      open={open}
    >
      <CircularProgress
        disableShrink
        sx={{ animationDuration: "500ms" }}
        color="inherit"
      />
    </Backdrop>
  ) : null;
};

export default Loading;
