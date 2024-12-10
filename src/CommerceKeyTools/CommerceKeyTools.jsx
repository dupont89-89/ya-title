import React from "react";
import Loading from "../app-function/Loading";
import FormOneKey from "./parts/FormOneKey";
import FormMassKey from "./parts/FormMassKey";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MessageNoAuth from "../Auth/MessageNoAuth/MessageNoAuth";

export default function CommerceKeyTools(props) {
  const {
    handleChange,
    handleChangeMass,
    handleClickMass,
    handleKeyDown,
    handleClickMassClear,
    handleFetchKey,
    handleFileChange,
    query,
    queryArray,
    result,
    isLoading,
    text,
    csvDownloadLink,
    massKey,
    lvtUserSpend,
    tools,
    isAuthenticated,
  } = props;

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Container maxWidth="lg">
      <Box
        p={{ xs: 1, md: 12 }}
        pt={{ xs: 10 }}
        mt={2}
        mb={2}
        sx={{
          background:
            "linear-gradient(90deg, rgba(25, 118, 211, 1) 0%, rgba(25, 176, 211, 1) 100%)",
          borderRadius: "15px",
          position: "relative",
        }}
        component="section"
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
              mt={"-9px"}
              sx={{ width: "75px" }}
              src="/img/dashboard/yandex_logo_icon.png"
              component="img"
            />
          </Box>
        </Box>
        <Typography
          color="#fff"
          variant={isLargeScreen ? "h4" : "h5"}
          component="h1"
          textAlign="center"
          gutterBottom
        >
          Определение типа ключевого запроса
        </Typography>
        <Box mb={3} textAlign="center">
          <Chip
            sx={{
              color: "#fff",
              backgroundColor: "#4CAF50",
              border: "1px solid #2283cf",
            }}
            label={!massKey ? "Бесплатный инструмент" : "Массовая проверка"}
            variant="outlined"
          />
        </Box>
        <ButtonGroup
          variant="contained"
          aria-label="Массовая проверка или по одному ключу"
        >
          <Button
            startIcon={<OpenInNewIcon />}
            disabled={!massKey}
            onClick={handleClickMass}
          >
            Бесплатная проверка
          </Button>
          <Button
            startIcon={<OpenInNewIcon />}
            disabled={massKey}
            onClick={handleClickMass}
          >
            Массовая проверка
          </Button>
        </ButtonGroup>
        <Box component="div">
          {isLoading ? ( // Показываем "ЗАГРУЗКА" во время загрузки
            <Loading />
          ) : (
            <Box mt={3} mb={15} component="div">
              {!massKey ? (
                <FormOneKey
                  handleChange={handleChange}
                  handleKeyDown={handleKeyDown}
                  query={query}
                  result={result}
                  text={text}
                  handleFetchKey={handleFetchKey}
                  isAuthenticated={isAuthenticated}
                />
              ) : (
                <FormMassKey
                  isLargeScreen={isLargeScreen}
                  queryArray={queryArray}
                  handleChangeMass={handleChangeMass}
                  result={result}
                  csvDownloadLink={csvDownloadLink}
                  handleFetchKey={handleFetchKey}
                  handleClickMassClear={handleClickMassClear}
                  handleFileChange={handleFileChange}
                  lvtUserSpend={lvtUserSpend}
                  tools={tools}
                  massKey={massKey}
                  isAuthenticated={isAuthenticated}
                />
              )}
            </Box>
          )}
        </Box>
        {!isAuthenticated ? <MessageNoAuth /> : null}
      </Box>
    </Container>
  );
}
