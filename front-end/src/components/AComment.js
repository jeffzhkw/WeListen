import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function AComment({ tcCreator, tcSong, tcText, tcTimeStamp }) {
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
          At: {tcTimeStamp} s.
        </Typography>
        <Typography sx={{ mb: 1.5 }}>{tcText}</Typography>
      </CardContent>
    </Card>
  );
}
