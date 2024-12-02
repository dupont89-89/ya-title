import React from "react";
import { Box, Link, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function SocialContact() {
  return (
    <Link variant="body2" sx={{ color: "#fff" }} href="https://vk.com/ptahini">
      <Grid container spacing={2}>
        <Grid size={{ xs: "auto" }}>
          <Box
            component="img"
            sx={{
              height: 50,
              width: 50,
            }}
            alt="Группа Вк Ptahini"
            src="/img/icon/icon-vk.png"
          />
        </Grid>
        <Grid size={{ xs: "auto" }}>
          <Typography
            variant="body2"
            sx={{ display: "block" }}
            component="span"
          >
            SEO PTAHINI
          </Typography>
          <Typography
            variant="body2"
            sx={{ display: "block" }}
            component="span"
          >
            Группа ВК
          </Typography>
        </Grid>
      </Grid>
    </Link>
  );
}
