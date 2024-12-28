import React from "react";
import { Box, Chip, Stack } from "@mui/material";

export default function YaIksTarif(props) {
  const { siteArray, isLargeScreen } = props;
  return (
    <Box mb={2} mt={2}>
      <Stack mb={1} direction={isLargeScreen ? "row" : "column"} spacing={1}>
        <Chip
          sx={{ backgroundColor: "#fff", fontSize: "15px" }}
          size="medium"
          label={`Добавленно: ${siteArray ? siteArray.length : 0} домен(а)`}
        />
      </Stack>
    </Box>
  );
}
