import React from "react";
import s from "./Form.module.css";
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
    // <div>
    //   <div className={s.blockForm}>
    //     <label htmlFor="key-get">Введите ключевой запрос</label>
    //     <div className={s.inputBlockForm}>
    //       <input
    //         placeholder="купить птичье молоко оптом"
    //         type="text"
    //         name="key-get"
    //         id="key-get"
    //         value={query}
    //         onChange={handleChange}
    //       />
    //       {query ? <button onClick={handleClick}>Создать тайтл</button> : null}
    //     </div>
    //   </div>
    // </div>

    <>
      {/* <TextField
        value={query}
        onChange={handleChange}
        id="key-get"
        label="Ключевой запрос"
        variant="outlined"
      />
      {query ? (
        <Button onClick={handleClick} variant="contained">
          Создать Title
        </Button>
      ) : null} */}
      <Grid size={6}>
        <TextField
          sx={{ width: "100%" }}
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
