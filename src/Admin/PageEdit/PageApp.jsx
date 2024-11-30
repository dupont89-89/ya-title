import { Box, Button, Container, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect } from "react";

export default function PageApp(props) {
  const { pageData, getPageApp } = props;

  useEffect(() => {
    getPageApp();
  }, [pageData]);
  return (
    <Container maxWidth>
      <Grid mt={5} container spacing={5}>
        {pageData.length > 0
          ? pageData.map((page) => (
              <Grid key={page.pageId} size={12}>
                <Paper sx={{ padding: "20px 30px" }} elevation={3}>
                  <Typography
                    mb={2}
                    sx={{ display: "block" }}
                    href={`/app/${page.slug}`}
                    variant="h6"
                    component="a"
                  >
                    {page.pageTitle}
                  </Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    href={`edit/${page.pageId}`}
                  >
                    Редактировать
                  </Button>
                </Paper>
              </Grid>
            ))
          : "Страниц не добавлено"}
      </Grid>
    </Container>
  );
}
