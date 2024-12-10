import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function FormOneKey(props) {
  const {
    handleChange,
    handleKeyDown,
    query,
    result,
    text,
    handleFetchKey,
    isAuthenticated,
  } = props;
  return (
    <>
      <Grid mt={4} mb={4} spacing={2} container>
        <Grid size={{ xs: 12, md: 8 }}>
          <TextField
            fullWidth
            label="Введите ключевой запрос"
            variant="filled"
            type="text"
            name="key-get"
            id="key-get"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            sx={{ background: "#fff" }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Button
            disabled={!query || !isAuthenticated}
            variant="contained"
            onClick={handleFetchKey}
            fullWidth
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: "#4CAF50",
              color: "#fff",
            }}
          >
            Запустить проверку
          </Button>
        </Grid>
      </Grid>
      {result && !Array.isArray(result) && (
        <Box borderRadius={2} p={3} sx={{ background: "#f7f7f7" }} mt={2}>
          <Typography gutterBottom component="h2" variant="h5">
            Результат проверки:{" "}
            <Typography
              sx={{ textTransform: "uppercase" }}
              variant="h5"
              component="span"
              color="#3e8d41"
            >
              {result}
            </Typography>
          </Typography>
          <Typography gutterBottom variant="body1">
            {text}
          </Typography>
        </Box>
      )}
    </>
  );
}
