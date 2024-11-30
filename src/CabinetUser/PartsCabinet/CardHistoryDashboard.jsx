import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CardHistoryDashboard(props) {
  const { name } = props;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 120, backgroundSize: "contain" }}
        image="../../../img/dashboard/icon-cloud-history.png"
      />
      <CardContent>
        <Typography
          sx={{ minHeight: "80px" }}
          gutterBottom
          variant="h6"
          component="div"
        >
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          История проверок инструмента
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Перейти</Button>
      </CardActions>
    </Card>
  );
}
