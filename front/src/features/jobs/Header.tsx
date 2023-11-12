import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Breadcrumbs,
  useTheme,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";
import { css } from "@emotion/react";

type Props = {
  jobName?: string; // 案件名
};

const Header = ({ jobName }: Props) => {
  const { palette } = useTheme();

  const linkStyle = css({
    font: "14px",
    fontSize: "14px",
    color: "inherit",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  });

  const breadcrumbs = [
    <Link key="1" href="/" passHref>
      <a css={linkStyle}>HOME</a>
    </Link>,
    jobName ? (
      <Link key="2" href="/job/search" passHref>
        <a css={linkStyle}>案件一覧</a>
      </Link>
    ) : (
      <Typography sx={{ fontSize: 14 }} key="2" color="text.primary">
        案件一覧
      </Typography>
    ),
    jobName ? (
      <Typography sx={{ fontSize: 14 }} key="3" color="text.primary">
        {jobName}
      </Typography>
    ) : null,
  ];
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: "white",
        }}
      >
        <Container>
          <Toolbar>
            <Typography color={palette.primary.main} ml={-4} variant="h6">
              エンジニア求人サイト
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Box mt={8} py={1}>
        <Container>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Container>
      </Box>
    </>
  );
};

export default Header;
