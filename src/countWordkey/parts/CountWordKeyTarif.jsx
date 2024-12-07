import React from "react";
import { Box, Chip, Stack } from "@mui/material";

export default function CountWordKeyTarif(props) {
  const { lvtUserSpend, frontTarif, ballDirect, queryArray, isLargeScreen } =
    props;
  return (
    <Box mb={2} mt={2}>
      <Stack mb={1} direction={isLargeScreen ? "row" : "column"} spacing={1}>
        <Chip
          size="medium"
          label={`Добавленно: ${queryArray.length} запросов(а)`}
        />
        <Chip size="medium" label={frontTarif} />
        <Chip size="medium" label={`К списанию: ${lvtUserSpend} баллов`} />
        <Chip size="medium" label={`Лимит: ${ballDirect} ключей`} />
      </Stack>
    </Box>
  );
}
