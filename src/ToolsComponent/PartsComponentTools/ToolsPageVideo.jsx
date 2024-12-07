import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";

export default function ToolsPageVideo(props) {
  const { src, title } = props;
  return (
    <Grid mt={2} sx={{ justifyContent: "center" }} container>
      <Grid size={12}>
        <Box
          title={title}
          src={src}
          width={{ xs: "100%", md: "853px" }}
          height={{ xs: "100%", md: "480px" }}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
          frameBorder="0"
          allowFullScreen
          component="iframe"
        ></Box>
      </Grid>
    </Grid>
  );
}
