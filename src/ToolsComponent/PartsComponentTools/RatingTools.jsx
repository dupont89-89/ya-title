import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { Alert } from "@mui/material";

export default function RatingTools() {
  const [value, setValue] = React.useState(0);

  return (
    <Alert
      sx={{
        display: "flex", // Добавляем это
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
      severity="success"
    >
      <Typography sx={{ textAlign: "center" }} component="legend">
        Оценка инструмента
      </Typography>

      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </Alert>
  );
}
