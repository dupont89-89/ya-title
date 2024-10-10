import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export default function WhoisTools(props) {
  const {
    fetchApiWhois,
    isAuthenticated,
    subscriptionDomenWhois,
    userId,
    email,
    getSubscriptionDomenUser,
  } = props;
  const [domen, setQuery] = useState("");
  const [dataDomen, setDataDomen] = useState("");
  const [registeredDomen, setregisteredDomen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [freeData, setFreeData] = useState("");
  const [parsedData, setParserData] = useState("");
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      getSubscriptionDomenUser(userId);
    }
  }, []);

  const handleChange = (event) => {
    // Убираем префиксы https:// и http://
    const cleanedDomain = event.target.value.replace(/(^\w+:|^)\/\//, "");
    setQuery(cleanedDomain);
  };

  const handleClickSubscription = async () => {
    setIsLoadingSubscription(true);
    try {
      // Теперь эта функция возвращает промис напрямую
      await subscriptionDomenWhois(domen, userId, freeData, email);
      debugger;
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    } finally {
      debugger;
      setIsLoadingSubscription(false);
    }
  };

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const resultDomen = await fetchApiWhois(domen);
      setDataDomen(resultDomen);
      setregisteredDomen(resultDomen.registered);

      const whoisString = resultDomen.rawdata && resultDomen.rawdata[0];
      const parsedData = whoisString ? parseWhoisData(whoisString) : [];
      setParserData(parsedData);
      // Найдем 'free-date' и обновим состояние
      const freeDateEntry = parsedData.find(
        (entry) => entry.key === "Свободно с"
      );
      if (freeDateEntry) {
        setFreeData(freeDateEntry.value);
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Объект для перевода английских ключей и значений на русский
  const translationMap = {
    domain: "Домен",
    nserver: "Сервер DNS",
    state: "Состояние",
    org: "Организация",
    registrar: "Регистратор",
    created: "Дата регистрации",
    "paid-till": "Оплачено до",
    "free-date": "Свободно с",
    "admin-contact": "Контакт администратора",
    source: "Источник",
    person: "Частное лицо",
    REGISTERED: "Зарегистрирован",
    DELEGATED: "Делегирован",
    UNVERIFIED: "Не проверен",
    VERIFIED: "Проверен",
  };

  // Функция для парсинга данных из строки
  const parseWhoisData = (data) => {
    if (!data) {
      return [];
    }

    const lines = data.split("\n");

    return lines
      .filter((line) => !line.startsWith("%")) // Убираем строки, которые начинаются с %
      .filter((line) => !line.startsWith("Last updated on")) // Убираем строку с "Last updated on"
      .filter((line) => !line.startsWith("taxpayer-id")) // Убираем строку с "Last updated on"
      .filter((line) => line.includes(":")) // Убираем строки без двоеточия
      .map((line) => {
        const indexOfColon = line.indexOf(":");
        const key = line.slice(0, indexOfColon).trim();
        const value = line.slice(indexOfColon + 1).trim();

        // Переводим ключ, если он есть в объекте translationMap
        const translatedKey = translationMap[key] || key;

        // Переводим значение, если оно есть в объекте translationMap
        const translatedValue = value
          .split(", ")
          .map((val) => translationMap[val] || val) // Переводим каждое значение через запятую
          .join(", "); // Собираем обратно строку
        return { key: translatedKey, value: translatedValue };
      });
  };

  return (
    <React.Fragment>
      <Container sx={{ mb: 15 }} maxWidth="md">
        <Box sx={{ marginBottom: "70px" }} component="section">
          <Grid container spacing={2}>
            <Grid
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
              item
              xs={12}
              mb={7}
            >
              <Typography variant="h2" component="h1">
                Whois-сервис проверки домена
              </Typography>
              <Typography variant="h5" component="p">
                Информация о домене и проверить занятость доменного имени
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              direction="row"
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <TextField
                fullWidth
                id="domen"
                label="Введите домен"
                variant="outlined"
                onChange={handleChange}
                sx={{
                  marginRight: "15px",
                }}
              />
              <Button
                onClick={handleClick}
                sx={{
                  height: "100%",
                  width: "250px",
                }}
                variant="contained"
              >
                {isLoading ? (
                  <CircularProgress size={20} sx={{ color: "#fff" }} />
                ) : (
                  "Проверить"
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
        {!registeredDomen && (
          <Box
            sx={{ display: "inline-block", borderRadius: "8px", p: 4 }}
            bgcolor="#f9fafc"
          >
            <Typography
              sx={{ display: "flex", mb: 3 }}
              variant="h5"
              component="p"
            >
              <VerifiedIcon sx={{ mr: 1 }} color="success" fontSize="large" />{" "}
              Домен {dataDomen.idnName} свободен
            </Typography>
            <Typography variant="h6" component="p" gutterBottom>
              от 119 ₽ — зарегистрируйте домен прямо сейчас
            </Typography>
            <Button
              sx={{ mt: 3 }}
              target="_blank"
              component="a"
              variant="contained"
              href="https://www.reg.ru/domain/new/?rlink=reflink-19937483"
            >
              Зарегистрировать
            </Button>
          </Box>
        )}
        {parsedData.length > 0 && (
          <Box bgcolor="#f9fafc" sx={{ p: 6 }} component="section">
            {registeredDomen && (
              <Box
                sx={{ display: "inline-block", borderRadius: "8px", mb: 4 }}
                bgcolor="#f9fafc"
              >
                <Typography
                  sx={{ display: "flex", mb: 3 }}
                  variant="h5"
                  component="p"
                >
                  <HighlightOffIcon
                    sx={{ mr: 1, color: "red" }}
                    color="success"
                    fontSize="large"
                  />{" "}
                  Домен {dataDomen.idnName} занят
                </Typography>
                <Typography variant="h6" component="p" gutterBottom>
                  как только домен не продлят, мы оповестим
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <Button
                    disabled={!isAuthenticated || isLoadingSubscription}
                    sx={{ mt: 3 }}
                    target="_blank"
                    component="a"
                    variant="contained"
                    onClick={handleClickSubscription}
                  >
                    {isLoadingSubscription ? (
                      <span>
                        Идёт сохранение...{" "}
                        <CircularProgress size={20} sx={{ color: "#fff" }} />
                      </span>
                    ) : (
                      "Подписаться на обновление"
                    )}
                  </Button>
                  {!isAuthenticated && (
                    <Button
                      href="/login/"
                      component="a"
                      sx={{ mt: 2 }}
                      variant="contained"
                    >
                      Войти в аккаунт
                    </Button>
                  )}
                </Box>
              </Box>
            )}
            <Typography variant="h5" component="h2" mb={2}>
              Информация о домене в реестре:
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Параметр</TableCell>
                    <TableCell>Значение</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {parsedData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.key}</TableCell>
                      <TableCell>{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Container>
    </React.Fragment>
  );
}
