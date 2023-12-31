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
import JobCardSmall from "./JobCardSmall";
import { JobDetailResponse } from "../job.type";
import useJobs from "../useJobs";
import { BookmarkAdd, BookmarkAdded } from "@mui/icons-material";
import { useAtom } from "jotai";
import { jobBookmarkIdsAtom } from "@/atoms/atoms";
import { useRouter } from "next/router";
import fetch from "@/libs/fetch";

const DetailContents = ({
  detail,
  relatedJobs,
  historyJobs,
}: JobDetailResponse) => {
  const {
    title,
    cost,
    description,
    requiredSkills,
    message,
    area,
    languages,
    skills,
    engineerTypes,
    features,
  } = detail;
  const { tableHeaderStyle } = useTableStyle();
  const { palette } = useTheme();

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

  const buttonStyle = {
    width: 200,
    flexShrink: 0,
    marginLeft: "8px",
  };

  const buttonBookmarkStyle = {
    ...buttonStyle,
    backgroundColor: "#f8b500",
  };

  const {
    handleClickFeature,
    handleClickLanguage,
    handleClickSkill,
    handleClickEngineerType,
    handleClickArea,
  } = useJobs();

  const [bookmarkIds, setBookMarkIds] = useAtom(jobBookmarkIdsAtom);
  const router = useRouter();
  const id = Number(router.query.id);
  const hasBoookMark = bookmarkIds.includes(id);

  /**
   * ブックマーククリック時
   */
  const handleClickBookmark = async () => {
    // ブックマーク済みなら削除、そうでなければ追加
    const newBookmarkIds = hasBoookMark
      ? bookmarkIds.filter((bookmarkId) => bookmarkId !== id)
      : [...bookmarkIds, id];
    // サーバー側の処理待たずにUIを変更
    setBookMarkIds(newBookmarkIds);
    try {
      await fetch.post<number[]>("/api/v1/jobBookmark", {
        id,
      });
    } catch (error) {
      alert("bookmark failed");
    }
  };

  return (
    <>
      <Container sx={{ py: 4, mt: -4, bgcolor: "white" }}>
        <Stack
          direction={"row"}
          alignItems={"start"}
          justifyContent={"space-between"}
        >
          <Typography variant="h5">{title}</Typography>
          <Button
            variant={hasBoookMark ? "contained" : "outlined"}
            color="primary"
            style={hasBoookMark ? buttonBookmarkStyle : buttonStyle}
            onClick={handleClickBookmark}
            startIcon={hasBoookMark ? <BookmarkAdded /> : <BookmarkAdd />}
          >
            {hasBoookMark ? "ブックマーク済み" : "ブックマークする"}
          </Button>
        </Stack>
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
                      ~{cost.toLocaleString("ja-JP")}
                    </span>
                    円 / 月
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={tableHeaderStyle}>地域</TableCell>
                <TableCell>
                  <Chip
                    label={area.name}
                    sx={{ fontSize: 14 }}
                    variant="outlined"
                    onClick={() => handleClickArea(area.id)}
                  />
                </TableCell>
              </TableRow>
              <TableRow sx={{ borderTop: `1px solid rgba(224, 224, 224)` }}>
                <TableCell style={tableHeaderStyle}>言語</TableCell>
                <TableCell>
                  <Stack gap={1} direction={"row"}>
                    {languages.map((language) => (
                      <Chip
                        key={language.id}
                        label={language.name}
                        sx={{ fontSize: 14 }}
                        variant="outlined"
                        onClick={() => handleClickLanguage(language.id)}
                      />
                    ))}
                  </Stack>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={tableHeaderStyle}>スキル</TableCell>
                <TableCell>
                  <Stack gap={1} direction={"row"}>
                    {skills.map((skill) => (
                      <Chip
                        key={skill.id}
                        label={skill.name}
                        sx={{ fontSize: 14 }}
                        variant="outlined"
                        onClick={() => handleClickSkill(skill.id)}
                      />
                    ))}
                  </Stack>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={tableHeaderStyle}>職種</TableCell>
                <TableCell>
                  <Stack gap={1} direction={"row"}>
                    {engineerTypes.map((engineerType) => (
                      <Chip
                        key={engineerType.id}
                        label={engineerType.name}
                        sx={{ fontSize: 14 }}
                        variant="outlined"
                        onClick={() => handleClickEngineerType(engineerType.id)}
                      />
                    ))}
                  </Stack>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={tableHeaderStyle}>必要なスキル</TableCell>
                <TableCell>
                  <ul style={{ margin: 0, paddingLeft: "16px" }}>
                    {requiredSkills.map((requiredSkill, i) => (
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
            onClick={() => alert("応募処理は後日実装予定です！")}
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
            {description}
          </Typography>
        </Stack>
        <Divider sx={{ my: 4 }} />
        <Stack direction={"row"}>
          <Typography width={300} fontSize={18} variant="h6" sx={headingStyle}>
            こだわりポイント
          </Typography>
          <Box mt={1}>
            <Stack gap={1} direction={"row"}>
              {features.map((feature) => (
                <Chip
                  key={feature.id}
                  label={feature.name}
                  sx={{ fontSize: 14 }}
                  variant="outlined"
                  onClick={() => handleClickFeature(feature.id)}
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
            {message}
          </Typography>
        </Stack>
      </Container>
      {historyJobs.length ? (
        <Container sx={{ py: 4, mt: 4, bgcolor: "white" }}>
          <Typography variant="h6" fontWeight={500}>
            閲覧した案件(直近4件)
          </Typography>
          {/* 4件のみ表示 */}
          <Grid mt={1} container spacing={2}>
            {historyJobs.map((item, i) => (
              <Grid key={i} item sm={3}>
                <JobCardSmall
                  {...item}
                  languages={item.languages.map((language) => language.name)}
                  area={item.area.name}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      ) : null}
      <Container sx={{ py: 4, mt: 4, bgcolor: "white" }}>
        <Typography variant="h6" fontWeight={500}>
          条件が似ている案件
        </Typography>
        {/* 工数削減のため、カード並べるのみでカールセルにはしない */}
        {/* 4件のみ表示 */}
        <Grid mt={1} container spacing={2}>
          {relatedJobs.map((item, i) => (
            <Grid key={i} item sm={3}>
              <JobCardSmall
                {...item}
                languages={item.languages.map((language) => language.name)}
                area={item.area.name}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
export default DetailContents;
