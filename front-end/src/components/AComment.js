import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function AComment({ tcCreator, tcSong, tcText, tcTimeStamp }) {
  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
  }
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
        ></Typography>
        <Typography variant="h5" component="div">
          {tcCreator}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          At: {formatDuration(tcTimeStamp)}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>{tcText}</Typography>
      </CardContent>
    </Card>
  );
}
