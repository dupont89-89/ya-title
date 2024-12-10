import React, { useEffect } from "react";
import PostAddIcon from "@mui/icons-material/PostAdd";
import MessageNoAuth from "../../Auth/MessageNoAuth/MessageNoAuth";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Box, Button, TextareaAutosize } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function CountWordKeyForm(props) {
  const {
    queryArray,
    handleChangeQuery,
    fileInputRef,
    handleFileChange,
    handleFetchKey,
    handleClear,
    isAuthenticated,
  } = props;

  useEffect(() => {
    // Проверяем, если queryArray определен и не пустой
    if (queryArray && queryArray.length > 0 && queryArray[0].trim() === "") {
      handleClear(); // Вызываем очистку, если textarea была очищена
    }
  }, [queryArray, handleClear]);

  return (
    <>
      <Box
        color="#fff"
        sx={{ fontSize: "18px" }}
        component="label"
        htmlFor="key-get"
      >
        Каждый запрос с новой строки
      </Box>
      <TextareaAutosize
        placeholder="Добавьте ключевые запросы..."
        name="key-get"
        id="key-get"
        value={queryArray.join("\n")}
        minRows="7"
        maxRows="15"
        onChange={handleChangeQuery}
        ref={fileInputRef}
        style={{
          borderRadius: "8px",
          backgroundColor: "#ffffff",
          width: "100%",
          fontSize: "18px",
          maxWidth: "100%",
          minWidth: "100%",
          padding: "10px",
        }}
      />
      <Grid mb={2} spacing={1} container>
        <Grid>
          <Button
            disabled={!queryArray.length > 0 || !isAuthenticated}
            startIcon={<PlayCircleOutlineIcon />}
            variant="contained"
            sx={{ backgroundColor: "#4CAF50" }}
            onClick={handleFetchKey}
          >
            Запустить проверку
          </Button>
        </Grid>
        <Grid>
          <Button
            disabled={!queryArray.length > 0}
            startIcon={<DeleteIcon />}
            onClick={handleClear}
            variant="contained"
            color="error"
          >
            Очистить
          </Button>
        </Grid>
        <Grid>
          <Button
            disabled={queryArray.length > 0}
            startIcon={<PostAddIcon />}
            variant="contained"
            component="label"
          >
            Загрузить файл .txt
            <input
              type="file"
              name="keyFile"
              id="input__file"
              accept=".txt"
              onChange={handleFileChange}
              hidden
              ref={fileInputRef}
            />
          </Button>
        </Grid>
      </Grid>
      {!isAuthenticated ? <MessageNoAuth /> : null}
    </>
  );
}
