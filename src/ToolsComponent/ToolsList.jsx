import React from "react";
import CartToolsBlock from "../Page/Parts/CartToolsBlock";
import { Container, Typography } from "@mui/material";
import { TitleComponent } from "../Function/TitleComponent";

export default function ToolsList() {
  return (
    <>
      <TitleComponent
        description="Полный список онлайн инструментов Ptahini. От создания Title заголовка до аналитики данных. Новые инструменты постоянно добавляются."
        title="Список инструментов сервиса Ptahini"
      />
      <Container maxWidth="xl">
        <Typography gutterBottom variant="h4" component="h1">
          Онлайн инструменты Ptahini
        </Typography>
        <CartToolsBlock />
      </Container>
    </>
  );
}
