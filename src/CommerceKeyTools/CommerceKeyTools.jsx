import React from "react";
import s from "./../css/Tools.module.css";
import Loading from "../app-function/Loading";
import ModalNoLvtContainer from "../Modal/ModalNoLvtContainer";
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
} from "@mui/material";

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
    showModal,
    text,
    sumLvt,
    csvDownloadLink,
    massKey,
    setShowModal,
    lvtUserSpend,
    tools,
  } = props;

  return (
    <Container maxWidth="md">
      {showModal && (
        <ModalNoLvtContainer
          isAuthenticated={props.isAuthenticated}
          onClose={() => setShowModal(false)}
          sumLvt={sumLvt}
        />
      )}
      <Box component="section">
        <Typography gutterBottom textAlign="center" component="h1" variant="h3">
          Определение типа ключевого запроса
        </Typography>
        <Box mb={3} textAlign="center">
          <Chip
            color="success"
            label={!massKey ? "Бесплатный инструмент" : "Массовая проверка"}
            variant="outlined"
          />
        </Box>
        <ButtonGroup variant="contained" aria-label="Basic button group">
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
                />
              ) : (
                <FormMassKey
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
                />
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}
