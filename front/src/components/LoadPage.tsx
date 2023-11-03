import { Typography } from "@mui/material";

const LoadPage = () => {
  return (
    <Typography
      textAlign={"center"}
      fontSize={18}
      mt={10}
      fontWeight={500}
      height={"100vh"}
      variant="h3"
    >
      読み込み中...
    </Typography>
  );
};

export default LoadPage;
