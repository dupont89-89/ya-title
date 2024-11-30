import s from "./../css/Tools.module.css";
import ModalNoLvtContainer from "../Modal/ModalNoLvtContainer";
import CountWordKeyForm from "./parts/CountWordKeyForm";
import Loading from "../app-function/Loading";
import CountWordKeyResult from "./parts/CountWordKeyResult";
import CountWordKeyTarif from "./parts/CountWordKeyTarif";
import HistoryToolsUser from "../ToolsComponent/PartsComponentTools/HistoryToolsUser";
import RegionSelectSearch from "../ToolsComponent/PartsComponentTools/RegionSelectSearch";
import { Box, Container, Typography } from "@mui/material";

export default function CountWordKey(props) {
  const {
    handleChangeQuery,
    queryArray,
    handleFetchKey,
    lvtUserSpend,
    sumLvt,
    massKey,
    setShowModal,
    showModal,
    result,
    csvDownloadLink,
    handleClickMassClear,
    isLoading,
    frontTarif,
    handleFileChange,
    tools,
    fileInputRef,
    handleClear,
    isAuthenticated,
    noLvtUser,
    handleCitySelect,
    region,
    ballDirect,
    exceedsBallDirect,
    isLargeScreen,
  } = props;

  return (
    <Container maxWidth="lg">
      <Box component="section">
        {isLoading ? ( // Показываем "ЗАГРУЗКА" во время загрузки
          <Loading height="300px" />
        ) : (
          <>
            {showModal && (
              <ModalNoLvtContainer
                isAuthenticated={props.isAuthenticated}
                onClose={() => setShowModal(false)}
                sumLvt={sumLvt}
              />
            )}
            <Typography
              gutterBottom
              textAlign="center"
              component="h1"
              variant={isLargeScreen ? "h3" : "h4"}
            >
              Проверить частотность запросов
            </Typography>
            <Box mt={3} mb={3} sx={{ width: "200px" }} component="div">
              <Box component="label">Выбор региональности</Box>
              <RegionSelectSearch
                defaultRegion={region}
                onSelect={handleCitySelect}
                nameLabel="Регион проверки:"
              />
            </Box>
            <CountWordKeyTarif
              massKey={massKey}
              queryArray={queryArray}
              lvtUserSpend={lvtUserSpend}
              frontTarif={frontTarif}
              ballDirect={ballDirect}
              isLargeScreen={isLargeScreen}
            />
            <Box>
              <CountWordKeyForm
                queryArray={queryArray}
                handleChangeQuery={handleChangeQuery}
                result={result}
                fileInputRef={fileInputRef}
                handleFileChange={handleFileChange}
                handleClickMassClear={handleClickMassClear}
                handleFetchKey={handleFetchKey}
                handleClear={handleClear}
                isAuthenticated={isAuthenticated}
                noLvtUser={noLvtUser}
                exceedsBallDirect={exceedsBallDirect}
              />
              <CountWordKeyResult
                result={result}
                csvDownloadLink={csvDownloadLink}
                lvtUserSpend={lvtUserSpend}
                queryArray={queryArray}
                massKey={massKey}
                handleClear={handleClear}
              />
            </Box>
          </>
        )}
        <HistoryToolsUser
          tools={tools}
          nameTools="wordstat-count-key"
          titleTools="История результатов проверки частотностей"
        />
      </Box>
    </Container>
  );
}
