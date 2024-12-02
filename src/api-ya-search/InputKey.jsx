import React from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function InputKey({
  handleChange,
  query,
  handleClick,
  isLoading,
  isAuthenticated,
}) {
  return (
    <>
      <Grid size={6}>
        <TextField
          sx={{ width: "100%", backgroundColor: "#fff" }}
          id="title"
          label="Ключевой запрос"
          variant="outlined"
          onChange={handleChange}
        />
      </Grid>
      <Grid size={3}>
        <Button
          onClick={handleClick}
          sx={{ width: "100%", height: "100%" }}
          variant="contained"
          disabled={!query || isLoading || !isAuthenticated}
        >
          {isLoading ? (
            <CircularProgress size={20} sx={{ color: "#fff" }} />
          ) : (
            "Создать Title"
          )}
        </Button>
      </Grid>
    </>
  );
}
