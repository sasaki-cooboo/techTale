import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Breadcrumbs,
  useTheme,
  Link,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

type Props = {
  jobName?: string; // 案件名
};

const Header = ({ jobName }: Props) => {
  const { palette } = useTheme();

  const breadcrumbs = [
    <Link
      sx={{ fontSize: 14 }}
      underline="hover"
      key="1"
      color="inherit"
      href="/"
    >
      HOME
    </Link>,
    jobName ? (
      <Link
        sx={{ fontSize: 14 }}
        underline="hover"
        key="1"
        color="inherit"
        href="/job/search"
      >
        案件一覧
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
        position="static"
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
      <Box mt={0} py={1}>
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
