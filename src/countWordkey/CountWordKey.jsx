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
    massKey,
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
            <Typography
              mr={1}
              sx={{ fontWeight: "600", fontSize: { xs: "16px", md: "25px" } }}
              color="#fff"
              component="span"
            >
              Яндекс
            </Typography>
            <Typography
              sx={{ fontWeight: "600", fontSize: { xs: "16px", md: "25px" } }}
              color="#fff"
              component="span"
            >
              Вордстат
            </Typography>
          </Box>
        </Box>
        {isLoading ? ( // Показываем "ЗАГРУЗКА" во время загрузки
          <Loading height="300px" />
        ) : (
          <>
            <Typography
              color="#fff"
              variant={isLargeScreen ? "h4" : "h5"}
              component="h1"
              textAlign="center"
              gutterBottom
            >
              Проверить частотность запросов
            </Typography>
            {!Array.isArray(result) && (
              <Box>
                <Box mt={3} mb={3} sx={{ width: "200px" }} component="div">
                  <Box
                    sx={{ fontSize: "15px", color: "#fff" }}
                    component="label"
                  >
                    Выбор региональности
                  </Box>
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
              </Box>
            )}
            <CountWordKeyResult
              result={result}
              csvDownloadLink={csvDownloadLink}
              lvtUserSpend={lvtUserSpend}
              queryArray={queryArray}
              massKey={massKey}
              handleClear={handleClear}
            />
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
