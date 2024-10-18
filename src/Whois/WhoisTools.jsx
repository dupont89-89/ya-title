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
import DomenDataUser from "./Parts/DomenDataUser";

export default function WhoisTools(props) {
  const {
    fetchApiWhois,
    isAuthenticated,
    subscriptionDomenWhois,
    userId,
    email,
    getSubscriptionDomenUser,
    domenSubscription,
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
  }, [domenSubscription]);

  const handleChange = (event) => {
    // Получаем введенное значение
    const url = event.target.value;

    try {
      // Используем объект URL для разбора домена
      const domain = new URL(url).hostname;

      // Устанавливаем только домен
      setQuery(domain);
    } catch (e) {
      // Если это не валидный URL, сохраняем как есть (например, если пользователь вводит просто домен)
      setQuery(url.replace(/(^\w+:|^)\/\//, ""));
    }
  };

  const handleClickSubscription = async () => {
    setIsLoadingSubscription(true);
    try {
      // Теперь эта функция возвращает промис напрямую
      await subscriptionDomenWhois(domen, userId, freeData, email);
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    } finally {
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
    "Domain Name": "Доменное имя",
    "Registry Domain ID": "Регистрационный идентификатор домена",
    "Registrar WHOIS Server": "Сервер WHOIS регистратора",
    "Registrar URL": "URL-адрес регистратора",
    "Updated Date": "Дата обновления",
    "Creation Date": "Дата создания",
    "Registry Expiry Date": "Дата истечения срока действия реестра",
    Registrar: "Регистратор",
    "Registrar IANA ID": "Идентификатор регистратора IANA",
    "Registrar Abuse Contact Email":
      "Контактный адрес электронной почты при нарушениях",
    "Registrar Abuse Contact Phone": "Контактный телефон при нарушениях",
    "Domain Status": "Статус домена",
    "Name Server": "Сервер DNS",
    "URL of the ICANN Whois Inaccuracy Complaint Form":
      "URL-адрес формы жалобы ICANN на неточность в Whois",
    ">>> Last update of whois database":
      "Последнее обновление базы данных whois",
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
      .filter((line) => !line.startsWith("by the following terms of use")) // Убираем строку с "Last updated on"
      .filter((line) => !line.startsWith("TERMS OF USE")) // Убираем строку с "Last updated on"
      .filter((line) => !line.startsWith("NOTICE")) // Убираем строку с "Last updated on"
      .filter((line) => !line.startsWith("to")) // Убираем строку с "Last updated on"
      .filter(
        (line) =>
          !line.startsWith(
            "For more information on Whois status codes, please visit https"
          )
      ) // Убираем строку с "Last updated on"
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
                disabled={!domen || isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={20} sx={{ color: "#fff" }} />
                ) : (
                  "Проверить"
                )}
              </Button>
            </Grid>
          </Grid>
          <DomenDataUser
            isAuthenticated={isAuthenticated}
            domenSubscription={domenSubscription}
          />
        </Box>
        {(!registeredDomen || parsedData.length > 0) && !dataDomen.expires && (
          <Box
            sx={{ display: "inline-block", borderRadius: "8px", p: 4 }}
            bgcolor="#f9fafc"
          >
            <Typography
              sx={{ display: "flex", mb: 3 }}
              variant="h5"
              component="p"
            >
              <VerifiedIcon sx={{ mr: 1 }} color="success" fontSize="large" />
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
            {registeredDomen ||
              (dataDomen.ips && (
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
              ))}
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
