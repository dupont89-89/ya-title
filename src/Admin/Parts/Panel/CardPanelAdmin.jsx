import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CardPanelAdmin(props) {
  const { title, data, link } = props;
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ color: "text.secondary", mt: 1 }}>{data}</Typography>
      </CardContent>
      <CardActions>
        <Button href={link} component="a" size="small">
          Управление
        </Button>
      </CardActions>
    </Card>
  );
}
