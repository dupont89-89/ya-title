import { Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import s from "../css/Tools.module.css";

export default function TextBottom(props) {
  return (
    <Container maxWidth="lg">
      <Grid
        mt={2}
        sx={{ background: "#c9c9c91a", borderRadius: "15px" }}
        container
      >
        <Grid className={s.textApp} p={{ xs: 2, md: 6 }} size={12}>
          {props.text}
        </Grid>
      </Grid>
    </Container>
  );
}
