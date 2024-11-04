import React from "react";
import s from "../../css/Tools.module.css";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

export default function FormOneKey(props) {
  const { handleChange, handleKeyDown, query, result, text, handleFetchKey } =
    props;
  return (
    <>
      <Grid mt={4} mb={4} spacing={2} container>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            label="Введите ключевой запрос"
            variant="outlined"
            type="text"
            name="key-get"
            id="key-get"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            disabled={!query}
            variant="contained"
            onClick={handleFetchKey}
            fullWidth
            sx={{ height: "100%" }}
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
