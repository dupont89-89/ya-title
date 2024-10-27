import React, { useEffect, useState } from "react";
import punycode from "punycode";
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
  Alert,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DomenDataUser from "./Parts/DomenDataUser";
import ListDomenSubcription from "./Parts/ListDomenSubcription";
import decodePunycode from "./Parts/PunycodeConverter";
import { useSnackbar } from "notistack";

export default function WhoisTools(props) {
  const {
    fetchApiWhois,
    isAuthenticated,
    subscriptionDomenWhois,
    userId,
    email,
    getSubscriptionDomenUser,
    domenSubscription,
    deleteSubscriptionDomenWhois,
  } = props;
  const [domen, setQuery] = useState("");
  const [dataDomen, setDataDomen] = useState("");
  const [registeredDomen, setRegisteredDomen] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [freeData, setFreeData] = useState("");
  const [parsedData, setParserData] = useState("");
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(false);
  const [displayListDomen, setDisplayListDomen] = useState(false);
  const [getWhoisFail, setGetWhoisFail] = useState(false);

  const { enqueueSnackbar } = useSnackbar(); // Получаем функцию enqueueSnackbar

  const handleSuccessFinishTools = (variant) => {
    console.log("handleSuccessFinishTools вызвана");
    enqueueSnackbar("Данные домена успешно получены.", { variant });
  };

  const handleErrorFinishTools = (variant) => {
    console.log("handleSuccessFinishTools вызвана");
    enqueueSnackbar("Ошибка получения данных о домене.", { variant });
  };

  useEffect(() => {
    if (isAuthenticated) {
      getSubscriptionDomenUser(userId);
    }
  }, [domenSubscription]);

  const handleChange = (event) => {
    // Получаем введенное значение
    const url = event.target.value;
    let domenHost;

    try {
      // Используем объект URL для разбора домена (если введён URL)
      domenHost = new URL(url).hostname;
      if (domenHost.startsWith("xn--")) {
        domenHost = decodePunycode(domenHost); // Преобразуем домен
      }
    } catch (e) {
      // Если это не валидный URL, обрабатываем как домен без протокола
      domenHost = url.replace(/(^\w+:|^)\/\//, "");
    }

    // Убираем любые конечные слеши после домена
    domenHost = domenHost.replace(/\/+$/, "");

    setQuery(domenHost);

    // Если требуется, можно также обработать кириллические символы
    // const containsCyrillic = /[а-яё]/i.test(domenHost);
    // if (containsCyrillic) {
    //   domenHost = punycode.toASCII(domenHost); // Преобразуем домен в Punycode, если нужно
    // }

    // Устанавливаем преобразованный (или исходный) домен
  };

  const handleClickSubscription = async () => {
    setIsLoadingSubscription(true);
    let processedDomen = dataDomen.idnName; // Изначально используем исходный домен
    // Проверяем, является ли домен Punycode
    if (processedDomen.startsWith("xn--")) {
      processedDomen = decodePunycode(dataDomen.idnName); // Преобразуем домен
      setQuery(processedDomen); // Сохраняем преобразованный домен, если нужно
    }
    try {
      // Теперь отправляем преобразованный или исходный домен
      await subscriptionDomenWhois(processedDomen, userId, freeData, email);
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    } finally {
      setIsLoadingSubscription(false);
    }
  };

  const handleClick = async () => {
    setIsLoading(true);
    let domain = domen;
    let localWhoisFail = false; // Локальная переменная для отслеживания ошибки

    try {
      // Проверяем, содержит ли домен русские символы
      const containsCyrillic = /[а-яё]/i.test(domen);
      if (containsCyrillic) {
        domain = punycode.toASCII(domen);
      }
      const resultDomen = await fetchApiWhois(domain);
      debugger;
      if (resultDomen.status === "fail") {
        localWhoisFail = true; // Устанавливаем локальную переменную в случае ошибки
        setGetWhoisFail(true);
        handleErrorFinishTools("error");
      }
      setDataDomen(resultDomen);
      setRegisteredDomen(resultDomen.registered);
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

      // Используем локальную переменную для проверки состояния ошибки
      if (!localWhoisFail) {
        handleSuccessFinishTools("success");
      }
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
    "Registry Expiry Date": "Свободно с",
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
            >
              <Typography variant="h2" component="h1">
                Whois-сервис проверки домена
              </Typography>
              <Typography variant="h5" component="p">
                Информация о домене и проверить занятость доменного имени
              </Typography>
            </Grid>
            <Grid xs={12} item>
              <DomenDataUser
                isAuthenticated={isAuthenticated}
                domenSubscription={domenSubscription}
                displayListDomen={displayListDomen}
                setDisplayListDomen={setDisplayListDomen}
              />
            </Grid>
            {displayListDomen && (
              <Grid mb={2} xs={12} item>
                <ListDomenSubcription
                  deleteSubscriptionDomenWhois={deleteSubscriptionDomenWhois}
                  domenList={domenSubscription}
                  userId={userId}
                />
              </Grid>
            )}
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
        </Box>
        {getWhoisFail & (dataDomen.status === "fail") ? (
          <Alert
            sx={{ alignItems: "center", gap: "20px" }}
            variant="filled"
            severity="warning"
          >
            <Typography gutterBottom variant="h6" color="#fff">
              Ошибка
            </Typography>
            <Typography
              gutterBottom
              color="#fff"
              variant="subtitle1"
              component="p"
            >
              Скорее всего вы допустили ошибку при вводе домена. Обычно это
              связанно с этим.
            </Typography>
            <Typography mt={2} color="#fff" component="p">
              Правильный вариант:{" "}
              <Typography variant="subtitle1">
                exempel.ru или https://exempel.ru
              </Typography>
            </Typography>
          </Alert>
        ) : null}
        {(parsedData.length > 0 && !dataDomen.expires) ||
        dataDomen.expires === null ? (
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
        ) : null}

        {parsedData.length > 0 && (
          <Box bgcolor="#f9fafc" sx={{ p: 6 }} component="section">
            {dataDomen.expires && (
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
                  Домен {dataDomen.name} занят
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
