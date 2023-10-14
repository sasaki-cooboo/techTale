import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  useTheme,
  Stack,
  Chip,
  Link,
} from "@mui/material";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import RoomIcon from "@mui/icons-material/Room";

type Props = {
  title: string;
  area: string;
  cost: number;
  applyLink: string;
  tags: { name: string; link: string }[];
};

const JobCard = ({ title, area, cost, applyLink, tags }: Props) => {
  const { palette } = useTheme();
  const titleStyle = {
    fontSize: 18,
    color: palette.primary.main,
    fontWeight: "bold",
  };

  const descriptionStyle = {
    fontSize: 14,
    marginTop: "16px",
  };

  const buttonStyle = {
    marginTop: "16px",
    width: 200,
  };

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

  return (
    <Card sx={{ p: 1 }}>
      <CardContent>
        <Link
          variant="h3"
          style={titleStyle}
          href={applyLink}
          underline="hover"
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </Link>
        <Stack direction={"row"} alignItems={"center"}>
          <Typography variant="body2" style={descriptionStyle}>
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
              ~{cost}
            </span>
            円 / 月
          </Typography>
          <Stack ml={4} mt={2} direction={"row"} alignItems={"center"}>
            <RoomIcon color="info" />
            <Typography fontSize={14} ml={1}>
              {area}
            </Typography>
          </Stack>
        </Stack>
        <Stack my={2} direction={"row"} gap={1}>
          {tags.map((tag, i) => (
            <Button variant="text" key={i} sx={tagStyle}>
              {tag.name}
            </Button>
          ))}
        </Stack>
        <Table>
          <TableBody>
            <TableRow sx={{ borderTop: `1px solid rgba(224, 224, 224)` }}>
              <TableCell style={tableHeaderStyle}>言語・スキル</TableCell>
              <TableCell>
                <Stack gap={1} direction={"row"}>
                  {["React", "Python", "TypeScript"].map((item) => (
                    <Chip
                      key={item}
                      label={item}
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
              <TableCell>{"バックエンドエンジニア"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={tableHeaderStyle}>必要なスキル</TableCell>
              <TableCell>
                <ul style={{ margin: 0, paddingLeft: "16px" }}>
                  <li>PHPでの開発経験（4年以上）</li>
                  <li>Dockerの経験</li>
                  <li>GitHubの経験</li>
                </ul>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Stack justifyContent={"center"} alignItems={"center"}>
          <Button
            variant="contained"
            color="primary"
            style={buttonStyle}
            href={applyLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            詳細を見る
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default JobCard;
