import { createTheme } from "@mui/material/styles";
import { blue, grey, red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: blue[800],
    },
    secondary: {
      main: "#f4f6fc",
    },
    info: {
      main: grey[500],
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: "Inter, Noto Sans JP , sans-serif",
  },
});

export default theme;
