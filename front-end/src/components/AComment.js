import react from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function AComment(tcCreator, tcSong, tcText, tcTimeStamp) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {tcSong}
        </Typography>
        <Typography variant="h5" component="div">
          {tcCreator}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {tcTimeStamp}
        </Typography>
        <Typography variant="body2">{tcText}</Typography>
      </CardContent>
    </Card>
  );
}
