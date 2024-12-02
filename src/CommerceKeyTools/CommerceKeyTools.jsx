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
        p={5}
        sx={{ background: "#c9c9c91a", borderRadius: "15px" }}
        component="section"
      >
        <Typography
          gutterBottom
          textAlign="center"
          component="h1"
          variant={isLargeScreen ? "h3" : "h4"}
        >
          Определение типа ключевого запроса
        </Typography>
        <Box mb={3} textAlign="center">
          <Chip
            color="success"
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
