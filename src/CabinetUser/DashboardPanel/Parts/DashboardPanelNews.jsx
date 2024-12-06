import { Box, Button, Typography } from "@mui/material";
import React from "react";

export default function DashboardPanelNews(props) {
  const {} = props;
  return (
    <Box
      sx={{
        minHeight: "200px",
        padding: "15px",
        borderRadius: "10px",
        background:
          "linear-gradient(90deg, rgba(25,118,211,1) 0%, rgba(25,176,211,1) 100%)",
      }}
    >
      <Typography color="#fff" gutterBottom variant="h6" component="div">
        Новости сервиса
      </Typography>
      <Typography color="#fff" gutterBottom variant="h6" component="div">
        Дарим на Новый Год 500 баллов каждому!
      </Typography>
      <Button
        sx={{ marginTop: "30px", backgroundColor: "#4CAF50" }}
        color="success"
        variant="contained"
      >
        Спасибо 👍
      </Button>
    </Box>
  );
}
