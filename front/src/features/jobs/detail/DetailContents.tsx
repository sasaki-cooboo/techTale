import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { useTableStyle } from "../useTableStyle";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import RelatedCard from "./RelatedCard";
import Loading from "@/components/Loading";
import { useGetJobDetailQuery } from "@/store/job";
import { useRouter } from "next/router";

const DetailContents = () => {
  const { tableHeaderStyle } = useTableStyle();
  const { palette } = useTheme();
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useGetJobDetailQuery(Number(id), {
    skip: !id, // idがない時に取得するのを防ぐ
  });

  if (!data || isLoading) {
    return <Loading open />;
  }

  const headingStyle = {
    position: "relative",
    pl: 2,
    flexShrink: 0,
    "&:before": {
      content: '""',
      width: 4,
      height: 18,
      bgcolor: palette.primary.main,
      position: "absolute",
      left: 0,
      top: 4,
    },
  };

  return (
    <>
      <Container sx={{ py: 4, mt: -4, bgcolor: "white" }}>
        <Typography variant="h5">{data.title}</Typography>
        <Box mt={4}>
          <Table>
            <TableBody>
              <TableRow sx={{ borderTop: `1px solid rgba(224, 224, 224)` }}>
                <TableCell style={tableHeaderStyle}>単価</TableCell>
                <TableCell>
                  <Typography variant="body2">
                    <CurrencyYenIcon
                      sx={{ color: palette.warning.main, fontSize: 16 }}
                    />
                    <span
                      style={{
                        color: palette.warning.main,
                        fontSize: 24,
                        paddingLeft: 4,
                        paddingRight: 8,
                        fontWeight: 500,
                      }}
                    >
                      ~{data.cost.toLocaleString("ja-JP")}
                    </span>
                    円 / 月
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={tableHeaderStyle}>地域</TableCell>
                <TableCell>
                  <Chip
                    label={data.area.name}
                    sx={{ fontSize: 14 }}
                    variant="outlined"
                    onClick={() => console.log("clicked")}
                  />
                </TableCell>
              </TableRow>
              <TableRow sx={{ borderTop: `1px solid rgba(224, 224, 224)` }}>
                <TableCell style={tableHeaderStyle}>言語</TableCell>
                <TableCell>
                  <Stack gap={1} direction={"row"}>
                    {data.languages.map((language) => (
                      <Chip
                        key={language.id}
                        label={language.name}
                        sx={{ fontSize: 14 }}
                        variant="outlined"
                        onClick={() => console.log("clicked")}
                      />
                    ))}
                  </Stack>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={tableHeaderStyle}>スキル</TableCell>
                <TableCell>
                  <Stack gap={1} direction={"row"}>
                    {data.skills.map((skill) => (
                      <Chip
                        key={skill.id}
                        label={skill.name}
                        sx={{ fontSize: 14 }}
                        variant="outlined"
                        onClick={() => console.log("clicked")}
                      />
                    ))}
                  </Stack>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={tableHeaderStyle}>職種</TableCell>
                <TableCell>
                  <Stack gap={1} direction={"row"}>
                    {data.engineerTypes.map((engineerType) => (
                      <Chip
                        key={engineerType.id}
                        label={engineerType.name}
                        sx={{ fontSize: 14 }}
                        variant="outlined"
                        onClick={() => console.log("clicked")}
                      />
                    ))}
                  </Stack>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={tableHeaderStyle}>必要なスキル</TableCell>
                <TableCell>
                  <ul style={{ margin: 0, paddingLeft: "16px" }}>
                    {data.requiredSkills.map((requiredSkill, i) => (
                      <li key={i}>{requiredSkill}</li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
        <Box my={4} textAlign={"center"}>
          <Button
            size="large"
            variant="contained"
            color="warning"
            sx={{ width: 300 }}
            onClick={() => alert("応募ありがとう！")}
          >
            この案件に応募する
          </Button>
        </Box>
        <Divider sx={{ my: 4 }} />
        <Stack direction={"row"}>
          <Typography width={300} fontSize={18} variant="h6" sx={headingStyle}>
            業務内容
          </Typography>
          <Typography mt={1} variant="body2">
            {data.description}
          </Typography>
        </Stack>
        <Divider sx={{ my: 4 }} />
        <Stack direction={"row"}>
          <Typography width={300} fontSize={18} variant="h6" sx={headingStyle}>
            こだわりポイント
          </Typography>
          <Box mt={1}>
            <Stack gap={1} direction={"row"}>
              {data.features.map((feature) => (
                <Chip
                  key={feature.id}
                  label={feature.name}
                  sx={{ fontSize: 14 }}
                  variant="outlined"
                  onClick={() => console.log("clicked")}
                />
              ))}
            </Stack>
          </Box>
        </Stack>
        <Divider sx={{ my: 4 }} />
        <Stack direction={"row"}>
          <Typography width={300} fontSize={18} variant="h6" sx={headingStyle}>
            担当者から一言
          </Typography>
          <Typography mt={1} variant="body2">
            {data.message}
          </Typography>
        </Stack>
      </Container>
      <Container sx={{ py: 4, mt: 4, bgcolor: "white" }}>
        <Typography variant="h6" fontWeight={500}>
          条件が似ている案件
        </Typography>
        {/* 工数削減のため、カード並べるのみでカールセルにはしない */}
        {/* 4件のみ表示 */}
        <Grid mt={1} container spacing={2}>
          {[1, 2, 3, 4].map((item) => (
            <Grid key={item} item sm={3}>
              <RelatedCard />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
export default DetailContents;
