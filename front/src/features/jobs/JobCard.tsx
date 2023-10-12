import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

type Props = {
  title: string;
  description: string;
  applyLink: string;
};

const JobCard = ({ title, description, applyLink }: Props) => {
  const titleStyle = {
    fontSize: 18,
    fontWeight: "bold",
  };

  const descriptionStyle = {
    fontSize: 14,
    marginTop: "8px",
  };

  const buttonStyle = {
    marginTop: "16px",
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" style={titleStyle}>
          {title}
        </Typography>
        <Typography variant="body2" style={descriptionStyle}>
          {description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={buttonStyle}
          href={applyLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          応募する
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobCard;
