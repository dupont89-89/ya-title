import React, { useEffect, useRef } from "react";
import s from "../../css/Tools.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import HistoryToolsUser from "../../ToolsComponent/PartsComponentTools/HistoryToolsUser";
import {
  Box,
  Button,
  Chip,
  Grid,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";

export default function FormMassKey(props) {
  const {
    queryArray,
    handleChangeMass,
    result,
    csvDownloadLink,
    handleFetchKey,
    handleClickMassClear,
    handleFileChange,
    lvtUserSpend,
    massKey,
    tools, // Новый пропс для обработки изменения файла
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
      {!result && (
        <>
          {queryArray.length > 0 && (
            <Box mb={2} mt={2}>
              <Stack mb={1} direction="row" spacing={1}>
                <Chip
                  size="medium"
                  label={`Добавленно: ${queryArray.length} запросов(а)`}
                />
                <Chip
                  size="medium"
                  label={massKey && "Тариф: 10 баллов / 100 запросов"}
                />
                {queryArray && massKey && (
                  <Chip
                    size="medium"
                    label={`К списанию: ${lvtUserSpend} Lvt`}
                  />
                )}
              </Stack>
            </Box>
          )}
          <label htmlFor="key-get">Каждый запрос с новой строки</label>
          <TextareaAutosize
            borderRadius="8px"
            sx={{ borderRadius: "8px" }}
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
      {queryArray.length > 0 &&
        queryArray.some((item) => item.trim() !== "") && (
          <Grid alignItems="center" mt={1} container spacing={2}>
            <Grid item>
              <Button
                startIcon={<PlayCircleOutlineIcon />}
                color="success"
                variant="contained"
                onClick={handleFetchKey}
              >
                Запустить проверку
              </Button>
            </Grid>
            <Grid item>
              <Button
                startIcon={<DeleteIcon />}
                color="error"
                variant="contained"
                onClick={handleClear}
              >
                Очистить
              </Button>
            </Grid>
          </Grid>
        )}
      {(!queryArray.length > 0) & !result ? (
        <Button
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
            className={`${s.input} ${s.input__file}`}
            ref={fileInputRef} // Присваиваем реф input файлу
          />
        </Button>
      ) : null}

      {Array.isArray(result) && (
        <Box>
          <Typography variant="h5" component="h2">
            Результат проверки:
          </Typography>
          <table>
            <tbody>
              {result.slice(0, 5).map((item, index) => (
                <tr key={index}>
                  <td>
                    <span className={s.resultTextKey}>
                      Запрос: {item.query}
                    </span>
                  </td>
                  <td>
                    <span className={s.resultKeyTextMass}>{item.result}</span>
                  </td>
                </tr>
              ))}
              <tr>
                <td>...</td>
                <td>...</td>
              </tr>
            </tbody>
          </table>
          <Typography gutterBottom variant="subtitle2" component="p">
            Полный результат проверки находится в файле. Скачайте результат.
          </Typography>
          {csvDownloadLink && (
            <>
              <Grid container spacing={1}>
                <Grid item>
                  <Button
                    startIcon={<ArrowCircleDownIcon />}
                    variant="contained"
                    color="success"
                    component="a"
                    className={s.resultMassFile}
                    href={csvDownloadLink}
                    download="results.csv"
                  >
                    Скачать результат
                  </Button>
                </Grid>
                <Grid item>
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
