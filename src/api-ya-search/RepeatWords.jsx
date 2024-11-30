import React, { useState } from "react";
import t from "../css/Tools.module.css";
import {
  Box,
  Button,
  Container,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ReplayIcon from "@mui/icons-material/Replay";

export default function RepeatWords({ repeatWords }) {
  const [textWords, setAddWordsState] = useState([]);
  if (!repeatWords) return null;

  const wordsWithCount = repeatWords.filter(
    ([word, count]) => count !== undefined
  );
  const wordsWithoutCount = repeatWords.map(([word, count]) => word);

  const generateDownloadFile = (wordsArray) => {
    const textToDownload = wordsArray
      .map(([word, count]) => (count !== undefined ? `${word},${count}` : word))
      .join("\n");
    const blob = new Blob([textToDownload], { type: "text/csv" });
    return URL.createObjectURL(blob);
  };

  const generateDownloadFileWithoutCount = (wordsArray) => {
    const textToDownload = wordsArray.join("\n");
    const blob = new Blob([textToDownload], { type: "text/csv" });
    return URL.createObjectURL(blob);
  };

  const generateDownloadFileWordSelected = (textWords) => {
    const textToDownload = textWords.join("\n");
    const blob = new Blob([textToDownload], { type: "text/txt" });
    return URL.createObjectURL(blob);
  };

  const downloadUrlSelectedWords = generateDownloadFileWordSelected(textWords);
  const downloadUrlWithCount = generateDownloadFile(wordsWithCount);
  const downloadUrlWithoutCount =
    generateDownloadFileWithoutCount(wordsWithoutCount);

  const handleClick = (textWord) => {
    setAddWordsState((prevState) => [...prevState, textWord]); // Добавление нового значения к предыдущему состоянию
  };

  const cleanHandleClick = () => {
    setAddWordsState([]);
  };

  const isWordSelected = (word) => {
    return textWords.includes(word);
  };

  return (
    <Container maxWidth="lg">
      <Grid
        mt={3}
        sx={{
          backgroundColor: "#fbfbfb",
          borderRadius: "15px",
          padding: "15px",
        }}
        container
        spacing={3}
      >
        <Grid sx={{ position: "relative" }} size={12}>
          {textWords.length > 0 && (
            <Tooltip title="Очистить выбранное">
              <IconButton
                onClick={cleanHandleClick}
                sx={{ position: "absolute", top: 10, left: 30 }}
                aria-label="Очистить выбранное"
              >
                <ReplayIcon />
              </IconButton>
            </Tooltip>
          )}

          <Typography
            textAlign="center"
            gutterBottom
            component="h2"
            variant="h4"
          >
            Повторяющиеся слова
          </Typography>
        </Grid>
        <Grid size={12}>
          <Box sx={{ listStyleType: "none", columns: "3" }} component="ul">
            {repeatWords.map(([word, count], index) => (
              <Box mb={1} component="li" key={index}>
                <Button
                  size="small"
                  sx={{ color: "#4c4c4c", backgroundColor: "#cfcfcf" }}
                  disabled={isWordSelected(word)}
                  variant="contained"
                  onClick={() => handleClick(word)}
                >
                  {count !== undefined ? `${word}: ${count}` : word}
                </Button>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid spacing={2} container>
          <Grid size="auto">
            <Button
              component="a"
              variant="contained"
              href={downloadUrlWithCount}
              download="word_with_count.csv"
            >
              Скачать (с количеством)
            </Button>
          </Grid>
          <Grid size="auto">
            <Button
              component="a"
              variant="contained"
              href={downloadUrlWithoutCount}
              download="word_without_count.txt"
            >
              Скачать (без количества)
            </Button>
          </Grid>
          <Grid size="auto">
            {textWords.length > 0 && (
              <Button
                component="a"
                variant="contained"
                href={downloadUrlSelectedWords}
                download="selected-word.txt"
              >
                Скачать выбранные
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
