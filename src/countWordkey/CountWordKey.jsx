import s from "./../css/Tools.module.css";
import ModalNoLvtContainer from "../Modal/ModalNoLvtContainer";
import CountWordKeyForm from "./parts/CountWordKeyForm";
import Loading from "../app-function/Loading";
import CountWordKeyResult from "./parts/CountWordKeyResult";
import CountWordKeyTarif from "./parts/CountWordKeyTarif";
import HistoryToolsUser from "../ToolsComponent/PartsComponentTools/HistoryToolsUser";
import RegionSelectSearch from "../ToolsComponent/PartsComponentTools/RegionSelectSearch";

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
  } = props;

  return (
    <div className={s.sectionGridSK}>
      <aside>{props.toolsSidebar}</aside>
      <section className={s.commerceKey}>
        <div className={s.sectionBlockTools}>
          {isLoading ? ( // Показываем "ЗАГРУЗКА" во время загрузки
            <Loading height="300px" />
          ) : (
            <>
              <div>
                {showModal && (
                  <ModalNoLvtContainer
                    isAuthenticated={props.isAuthenticated}
                    onClose={() => setShowModal(false)}
                    sumLvt={sumLvt}
                  />
                )}
              </div>
              <div className={s.title}>
                <div className={s.titleTools}>
                  <h1>Проверить частотность запросов</h1>
                </div>
                <CountWordKeyTarif
                  massKey={massKey}
                  queryArray={queryArray}
                  lvtUserSpend={lvtUserSpend}
                  frontTarif={frontTarif}
                  ballDirect={ballDirect}
                />
              </div>
              <RegionSelectSearch
                defaultRegion={region}
                onSelect={handleCitySelect}
                nameLabel="Регион проверки:"
              />
              <div className={s.blockForm}>
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
              </div>
            </>
          )}
          <HistoryToolsUser
            tools={tools}
            nameTools="wordstat-count-key"
            titleTools="История результатов проверки частотностей"
          />
        </div>
      </section>
    </div>
  );
}
