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
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          sx={{ width: "100%", background: "#fff" }}
          id="title"
          label="Ключевой запрос"
          variant="filled"
          onChange={handleChange}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <Button
          onClick={handleClick}
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "#4CAF50",
            color: "#fff",
          }}
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
