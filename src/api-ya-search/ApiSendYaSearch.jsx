import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useSnackbar } from "notistack"; // Импортируем SnackbarProvider и useSnackbar
import RegionSelectSearch from "../ToolsComponent/PartsComponentTools/RegionSelectSearch";
import Loading from "../app-function/Loading";
import TitleValues from "./TitleValues";
import RepeatWords from "./RepeatWords";
import InputKey from "./InputKey";
import MessageNoAuth from "../Auth/MessageNoAuth/MessageNoAuth";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

let config;

if (process.env.NODE_ENV === "development") {
  config = require("../config.dev");
} else {
  config = require("../config.prod");
}

const serverUrl = `${config.REACT_APP_SERVER_URL}`;

export default function ApiSendYaSearch(props) {
  const [query, setQuery] = useState("");
  const [titleValues, setTitleValues] = useState(null);
  const [repeatWords, setRepeatWords] = useState(null);
  const [resultString, setResultString] = useState("");
  const [selectedCity, setSelectedCity] = useState(213);
  const [isLoading, setIsLoading] = useState(false);
  const [topFriLink, setResultWordsLink] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [urlPage, setUrlPage] = useState([]);

  const sumLvt = 1;

  const { enqueueSnackbar } = useSnackbar(); // Получаем функцию enqueueSnackbar

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const handleSuccessFinishTools = (variant) => {
    enqueueSnackbar("Title заголовок успешно создан.", { variant });
  };

  const handleClick = async () => {
    setIsLoading(true);

    if (props.totalLvt === 0) {
      console.log("Баланс равен 0");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${serverUrl}/api/tools/get-title`, {
        query,
        selectedCity,
      });

      const { title, topWordsLink, titleValues, repeatWords, urlPage } =
        response.data;

      setResultString(title);
      setResultWordsLink(topWordsLink);
      setTitleValues(titleValues);
      setRepeatWords(repeatWords);
      setUrlPage(urlPage);
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    } finally {
      setIsLoading(false);
      props.spendLvt(props.userId, sumLvt);
      handleSuccessFinishTools("success"); // Вызов уведомления при завершении
    }
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleCitySelect = (selectedOption) => {
    setSelectedCity(selectedOption.value);
  };

  const copyTextOnClick = () => {
    navigator.clipboard.writeText(resultString);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 3000);
  };

  return (
    <>
        <Box
          component="section"
          p={{ xs: 1, md: 12 }}
          pt={{ xs: 10 }}
          mt={2}
          mb={10}
          sx={{
            background:
              "linear-gradient(90deg, rgba(25, 118, 211, 1) 0%, rgba(25, 176, 211, 1) 100%)",
            borderRadius: "15px",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              position: "absolute",
              top: "30px",
              left: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                mr={1}
                mt={"-5px"}
                sx={{ width: "72px" }}
                src="/img/dashboard/yandex_logo_icon.png"
                component="img"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                mr={1}
                sx={{ width: "21px" }}
                src="/img/dashboard/chat-gpt-fff.png"
                component="img"
              />
              <Typography color="#fff" component="span" variant="h6">
                Помощь AI
              </Typography>
            </Box>
          </Box>
          <Grid
            sx={{ alignItems: "center", justifyContent: "center" }}
            container
            spacing={1}
          >
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 5,
              }}
              size={12}
            >
              <Typography
                color="#fff"
                variant={isLargeScreen ? "h3" : "h4"}
                component="h1"
                textAlign="center"
              >
                Создай правильный Title
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              size={12}
            ></Grid>
          </Grid>
          <Box component="section" sx={{ flexGrow: 1, marginBottom: "70px" }}>
            <Grid spacing={1} container sx={{ justifyContent: "center" }}>
              <Grid size={{ xs: 12, md: 3 }}>
                <RegionSelectSearch
                  defaultRegion={selectedCity}
                  onSelect={handleCitySelect}
                />
              </Grid>
              <InputKey
                handleChange={handleChange}
                query={query}
                handleClick={handleClick}
                isLoading={isLoading}
                isAuthenticated={props.isAuthenticated}
              />
            </Grid>
          </Box>
          {!props.isAuthenticated ? <MessageNoAuth /> : null}
        </Box>
      {isLoading ? (
        <Loading />
      ) : (
        resultString && (
          <Box sx={{ marginBottom: "70px" }} component="section">
            <Grid
              sx={{ alignItems: "center", justifyContent: "center" }}
              container
              spacing={1}
            >
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 5,
                }}
                size={12}
              >
                <Grid
                  sx={{
                    backgroundColor: "#fbfbfb",
                    borderRadius: "15px;",
                    padding: "15px;",
                  }}
                  spacing={2}
                  container
                >
                  <Grid>
                    <Box
                      display={{ xs: "none", md: "block" }}
                      width={40}
                      mr={3}
                      src="/img/logo/blue-logo-ptahini.png"
                      component="img"
                    />
                  </Grid>
                  <Grid
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: "15px;",
                      padding: "15px;",
                    }}
                    size={12}
                  >
                    <Typography gutterBottom variant="h5" component="h2">
                      {resultString}
                    </Typography>
                    <Typography
                      variant="p"
                      gutterBottom
                      sx={{ display: "block", fontWeight: "600" }}
                      component="span"
                    >
                      ptahini.ru›search/{topFriLink}
                    </Typography>
                    <Typography gutterBottom>
                      Это лучший тайтл для твоего SEO продвижения сайта. Приведи
                      его к читаемому виду. Добавь его в соответствующий раздел
                      мета-тегов в своей CMS.
                    </Typography>
                    <Button onClick={copyTextOnClick} variant="text">
                      Копировать Title
                    </Button>
                    {copySuccess && (
                      <Typography
                        variant="body1"
                        ml={2}
                        p={1}
                        sx={{
                          color: "#ffffff",
                          backgroundColor: "#1976d3",
                          display: "inline",
                          borderRadius: "5px;",
                        }}
                        component="span"
                      >
                        Title скопирован!
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )
      )}
      <TitleValues urlPage={urlPage} titleValues={titleValues} />
      <RepeatWords repeatWords={repeatWords} />
    </>
  );
}

// export default withSnackbarProvider(ApiSendYaSearch);
