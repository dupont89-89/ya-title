import React from "react";
import s from "./../css/Tools.module.css";
import Loading from "../app-function/Loading";
import ModalNoLvtContainer from "../Modal/ModalNoLvtContainer";
import FormOneKey from "./parts/FormOneKey";
import FormMassKey from "./parts/FormMassKey";

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
  } = props;

  return (
    <div className={s.sectionGridSK}>
      <aside>{props.toolsSidebar}</aside>
      <section className={s.commerceKey}>
        <div className={s.sectionBlockTools}>
          <div>
            {/* Ваш JSX код здесь */}
            {showModal && (
              <ModalNoLvtContainer
                isAuthenticated={props.isAuthenticated}
                onClose={() => setShowModal(false)}
                sumLvt={sumLvt}
              />
            )}
          </div>
          <div className={s.title}>
            <h1>Определение типа ключевого запроса</h1>
            <span className={s.tarifLvt}>
              {massKey ? "10 lvt / 100 запросов" : "Бесплатно"}
            </span>
            {queryArray && massKey && (
              <span className={s.spendUserFront}>
                К списанию: {lvtUserSpend} Lvt
              </span>
            )}
          </div>
          {isLoading ? ( // Показываем "ЗАГРУЗКА" во время загрузки
            <Loading />
          ) : (
            <div className={s.blockForm}>
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
                />
              )}
            </div>
          )}
          <div className={s.keySum}>
            <p>
              {massKey
                ? "Можете воспользоваться бесплатным инструментом. Он работает одинаково качественно, но не доступна массовая проверка ключевых запросов."
                : "Если вам требуется проверить много ключей, вы можете воспользоваться массовой проверкой."}
            </p>
            <button onClick={handleClickMass}>
              {massKey ? "Вернуться" : "Массовая проверка"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
