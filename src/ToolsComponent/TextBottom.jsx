import { Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";

export default function TextBottom(props) {
  return (
    <Container maxWidth="lg">
      <Grid
        mt={2}
        sx={{ background: "#c9c9c91a", borderRadius: "15px" }}
        container
      >
        <Grid p={6} size={12}>
          {props.text}
        </Grid>
      </Grid>
    </Container>
  );
}
