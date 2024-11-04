import { Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

export default function PageEditOne(props) {
  const { title, slug } = props;

  const [pageSlug, setEditSlug] = useState(slug);
  const [pageTitle, setEditPageTitle] = useState(title);

  return (
    <Container maxWidth="xl">
      <Typography variant="h2" component="h1">
        {pageTitle}
      </Typography>
      <TextField
        onChange={(e) => setEditPageTitle(e.target.value)}
        value={pageTitle}
      />
      <TextField
        onChange={(e) => setEditSlug(e.target.value)}
        value={pageSlug}
      />
    </Container>
  );
}
