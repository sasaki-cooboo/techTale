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

const Header = () => {
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
    <Typography sx={{ fontSize: 14 }} key="2" color="text.primary">
      案件一覧
    </Typography>,
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
