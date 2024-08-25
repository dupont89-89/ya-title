import React from "react";
import CartToolsBlock from "../Page/Parts/CartToolsBlock";
import { Container, Typography } from "@mui/material";

export default function ToolsList() {
  return (
    <Container maxWidth="xl">
      <Typography gutterBottom variant="h4" component="h1">
        Онлайн инструменты Ptahini
      </Typography>
      <CartToolsBlock />
    </Container>
  );
}
