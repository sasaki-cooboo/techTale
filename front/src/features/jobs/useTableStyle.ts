import { useTheme } from "@mui/material";

/**
 * 表の共通スタイルhooks
 */
/** */
export const useTableStyle = () => {
  const { palette } = useTheme();
  const tableHeaderStyle = {
    background: palette.secondary.main, // 青色の背景色
    width: 200,
  };

  const tagStyle = {
    background: palette.secondary.main, // 青色の背景色
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    color: "rgba(0, 0, 0, 0.87)",
    "&:hover": {
      opacity: 0.7,
    },
  };

  return { tableHeaderStyle, tagStyle };
};
