import React from "react";
import { Box, Chip, Stack } from "@mui/material";

export default function CountWordKeyTarif(props) {
  const { lvtUserSpend, frontTarif, ballDirect, queryArray, isLargeScreen } =
    props;
  return (
    <Box mb={2} mt={2}>
      <Stack mb={1} direction={isLargeScreen ? "row" : "column"} spacing={1}>
        <Chip
          sx={{ backgroundColor: "#fff", fontSize: "15px" }}
          size="medium"
          label={`Добавленно: ${queryArray.length} запросов(а)`}
        />
        <Chip
          sx={{ backgroundColor: "#fff", fontSize: "15px" }}
          size="medium"
          label={frontTarif}
        />
        <Chip
          sx={{ backgroundColor: "#fff", fontSize: "15px" }}
          size="medium"
          label={`К списанию: ${lvtUserSpend} баллов`}
        />
        <Chip
          sx={{ backgroundColor: "#fff", fontSize: "15px" }}
          size="medium"
          label={`Лимит: ${ballDirect} ключей`}
        />
      </Stack>
    </Box>
  );
}
