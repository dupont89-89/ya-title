import React, { useEffect, useRef } from "react";
import s from "../../css/Tools.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import HistoryToolsUser from "../../ToolsComponent/PartsComponentTools/HistoryToolsUser";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TextareaAutosize from "@mui/material/TextareaAutosize";

export default function FormMassKey(props) {
  const {
    queryArray,
    handleChangeMass,
    result,
    isAuthenticated,
    csvDownloadLink,
    handleFetchKey,
    handleClickMassClear,
    handleFileChange,
    lvtUserSpend,
    massKey,
    tools,
    isLargeScreen, // Новый пропс для обработки изменения файла
  } = props;

  const fileInputRef = useRef(null); // Создаем реф для input файла

  const handleClear = () => {
    handleClickMassClear(); // Вызываем функцию очистки
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Сбрасываем значение input файла
    }
  };

  useEffect(() => {
    // Проверяем, если queryArray определен и не пустой
    if (queryArray && queryArray.length > 0 && queryArray[0].trim() === "") {
      handleClear(); // Вызываем очистку, если textarea была очищена
    }
  }, [queryArray]);

  return (
    <>
      {!result.length > 0 && (
        <>
          <Box mb={4} mt={2}>
            <Stack
              mb={1}
              direction={isLargeScreen ? "row" : "column"}
              spacing={1}
            >
              <Chip
                sx={{ backgroundColor: "#fff", fontSize: "15px" }}
                size="medium"
                label={`Добавленно: ${queryArray.length} запросов(а)`}
              />
              <Chip
                sx={{ backgroundColor: "#fff", fontSize: "15px" }}
                size="medium"
                label={massKey && "Тариф: 10 баллов / 100 запросов"}
              />
              {queryArray && massKey && (
                <Chip
                  sx={{ backgroundColor: "#fff", fontSize: "15px" }}
                  size="medium"
                  label={`К списанию: ${lvtUserSpend} баллов`}
                />
              )}
            </Stack>
          </Box>
          <Box
            color="#fff"
            sx={{ fontSize: "18px" }}
            component="label"
            htmlFor="key-get"
          >
            Каждый запрос с новой строки
          </Box>
          <TextareaAutosize
            style={{
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              width: "100%",
              fontSize: "18px",
              maxWidth: "100%", // Ограничивает максимальную ширину
              minWidth: "100%", // Ограничивает минимальную ширину
              padding: "10px",
            }}
            name="key-get"
            id="key-get"
            value={queryArray.join("\n")}
            onChange={handleChangeMass}
            placeholder="Добавьте ключевые запросы..."
            minRows={7}
            maxRows={15}
          />
        </>
      )}
      {!result.length > 0 && (
        <Grid alignItems="center" mt={1} container spacing={1}>
          <Grid>
            <Button
              disabled={!queryArray.length > 0 || !isAuthenticated}
              startIcon={<PlayCircleOutlineIcon />}
              sx={{ backgroundColor: "#4CAF50", color: "#fff" }}
              variant="contained"
              onClick={handleFetchKey}
            >
              Запустить проверку
            </Button>
          </Grid>
          <Grid>
            <Button
              disabled={!queryArray.length > 0}
              startIcon={<DeleteIcon />}
              color="error"
              variant="contained"
              onClick={handleClear}
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
                hidden
                name="keyFile"
                id="input__file"
                accept=".txt" // Указываем что принимаем только .txt файлы
                onChange={handleFileChange} // Обработчик изменения файла
                ref={fileInputRef} // Присваиваем реф input файлу
              />
            </Button>
          </Grid>
        </Grid>
      )}

      {result.length > 0 && (
        <Box mt={3}>
          <Typography color="#fff" gutterBottom variant="h5" component="h2">
            Результат проверки:
          </Typography>
          <Box component="table">
            <Box component="tbody">
              {result.slice(0, 5).map((item, index) => (
                <Box component="tr" key={index}>
                  <Box backgroundColor="#fff" component="td">
                    <Typography component="span">
                      Запрос: {item.query}
                    </Typography>
                  </Box>
                  <Box backgroundColor="#fff" component="td">
                    <Typography
                      component="span"
                      className={s.resultKeyTextMass}
                    >
                      {item.result}
                    </Typography>
                  </Box>
                </Box>
              ))}
              <Box component="tr">
                <Box backgroundColor="#fff" component="td">
                  ...
                </Box>
                <Box backgroundColor="#fff" component="td">
                  ...
                </Box>
              </Box>
            </Box>
          </Box>
          <Typography
            color="#fff"
            gutterBottom
            variant="subtitle2"
            component="p"
          >
            Полный результат проверки находится в файле. Скачайте результат.
          </Typography>
          {csvDownloadLink && (
            <>
              <Grid container spacing={1}>
                <Grid>
                  <Button
                    startIcon={<ArrowCircleDownIcon />}
                    variant="contained"
                    sx={{ backgroundColor: "#4CAF50" }}
                    component="a"
                    className={s.resultMassFile}
                    href={csvDownloadLink}
                    download="result.xlsx"
                  >
                    Скачать результат
                  </Button>
                </Grid>
                <Grid>
                  <Button
                    startIcon={<AutorenewIcon />}
                    variant="contained"
                    onClick={() => handleClear()}
                  >
                    Новая проверка
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      )}
      <HistoryToolsUser
        tools={tools}
        nameTools="tip-key"
        titleTools="История результатов проверки коммерциализации запроса"
      />
    </>
  );
}
