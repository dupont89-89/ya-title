import { Box, Button, ButtonGroup, Container } from "@mui/material";
import React from "react";
import PageNewApp from "./PageNewApp";

export default function PageEdit(props) {
  const { page } = props;

  return (
    <Container maxWidth="xl">
      <Box component="div">
        <ButtonGroup variant="outlined" aria-label="Управление страницами">
          <Button>Новая стр. инструмента</Button>
          <Button>Новая стр. блога</Button>
          <Button>Новая рубрика блога</Button>
        </ButtonGroup>
      </Box>
      <PageNewApp />
    </Container>
  );
}
