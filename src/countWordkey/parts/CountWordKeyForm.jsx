import React, { useEffect } from "react";
import s from "./../../css/Tools.module.css";
import PostAddIcon from "@mui/icons-material/PostAdd";
import iconVopros from "../../img/icon/mark_13709623.png";
import MessageNoAuth from "../../Auth/MessageNoAuth/MessageNoAuth";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Button, Grid, TextareaAutosize } from "@mui/material";

export default function CountWordKeyForm(props) {
  const {
    queryArray,
    handleChangeQuery,
    result,
    fileInputRef,
    handleFileChange,
    handleFetchKey,
    handleClear,
    isAuthenticated,
    noLvtUser,
    exceedsBallDirect,
  } = props;

  useEffect(() => {
    // Проверяем, если queryArray определен и не пустой
    if (queryArray && queryArray.length > 0 && queryArray[0].trim() === "") {
      handleClear(); // Вызываем очистку, если textarea была очищена
    }
  }, [queryArray, handleClear]);

  return (
    <>
      <label htmlFor="key-get">Каждый запрос с новой строки</label>
      <TextareaAutosize
        placeholder="Добавьте ключевые запросы..."
        name="key-get"
        id="key-get"
        value={queryArray.join("\n")}
        minRows="7"
        maxRows="15"
        onChange={handleChangeQuery}
        ref={fileInputRef}
      />
      <Grid spacing={1} container>
        <Grid item>
          <Button
            disabled={!queryArray.length > 0}
            startIcon={<PlayCircleOutlineIcon />}
            variant="contained"
            color="success"
            onClick={handleFetchKey}
          >
            Запустить проверку
          </Button>
        </Grid>
        <Grid item>
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
        <Grid item>
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
              className={`${s.input} ${s.input__file}`}
              ref={fileInputRef}
            />
          </Button>
        </Grid>
      </Grid>
      {!isAuthenticated ? <MessageNoAuth /> : null}
    </>
  );
}
