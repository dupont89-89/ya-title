import React, { useEffect, useRef, useState } from "react";
import CountWordKey from "./CountWordKey";
import {
  getCountWord,
  getDirectBall,
  loadFileUserTools,
} from "../Api/api-tools";
import { connect } from "react-redux";
import { spendLvt } from "../Api/api-lvt";
import Papa from "papaparse";
import { TitleComponent } from "../Function/TitleComponent";

function CountWordKeyContainer({
  getCountWord,
  getDirectBall,
  loadFileUserTools,
  spendLvt,
  userId,
  isAuthenticated,
  totalLvt,
  toolsSidebar,
  tools,
  ballDirect,
}) {
  const [queryArray, setQueryArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState(null);
  const [csvDownloadLink, setCsvDownloadLink] = useState("");
  const [lvtUserSpend, setLvtUserSpend] = useState(0);
  const [sumKeyLvt, setSumKeyLvt] = useState(0);
  const [region, setSelectedCity] = useState(225);
  const [sumLvt, setSumLvt] = useState(0);
  const [noLvtUser, setNoLvtUserFetching] = useState(false);
  const [exceedsBallDirect, setExceedsBallDirect] = useState(false);

  const tarif = 0.1;
  const frontTarif = "10 lvt / 100 запросов";
  const fileInputRef = useRef(null);

  const handleClear = () => {
    handleClickMassClear();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChangeQuery = (event) => {
    const text = event.target.value;
    const words = text.split("\n");
    setQueryArray(words);
    console.log("handleChangeMass:", words);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const words = text.split("\n").filter((word) => word.trim() !== "");
      setQueryArray(words);
    };
    reader.readAsText(file);
  };

  const handleClickMassClear = () => {
    setQueryArray([]);
    setResult(null);
  };

  const handleCitySelect = (selectedOption) => {
    setSelectedCity(selectedOption.value);
  };

  const handleFetchKey = async () => {
    try {
      setIsLoading(true);

      if (totalLvt < sumKeyLvt) {
        console.log("Баланс равен 0");
        setIsLoading(false);
        setShowModal(true);
        return;
      }

      const response = await getCountWord(queryArray, region, userId);
      setResult(response);

      const data = response.map((item) => [item.phrase, item.shows]);
      data.unshift(["Ключевой запрос", "Частотность"]);

      const csv = Papa.unparse(data);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      setCsvDownloadLink(url);

      const formData = new FormData();
      formData.append("toolFile", blob, "result.csv");

      await loadFileUserTools(formData, userId, "wordstat-count-key");
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    } finally {
      await spendLvt(userId, lvtUserSpend);
      setQueryArray([]);
      getDirectBall();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDirectBall();
  }, [getDirectBall]);

  useEffect(() => {
    const filteredQueryArray = queryArray.filter((word) => word.trim() !== "");
    if (filteredQueryArray.length > 0) {
      if (filteredQueryArray.length > ballDirect) {
        setExceedsBallDirect(true);
      } else {
        setExceedsBallDirect(false);
      }
      const sumLvtToolsKey = tarif * filteredQueryArray.length;
      setLvtUserSpend(sumLvtToolsKey.toFixed(1));

      if (totalLvt < sumLvtToolsKey) {
        setShowModal(true);
        setNoLvtUserFetching(true);
        const sumLvt = Math.abs(totalLvt - sumLvtToolsKey);
        setSumLvt(sumLvt.toFixed(1));
      } else {
        setShowModal(false);
        setNoLvtUserFetching(false);
        setSumLvt(0);
      }
      setSumKeyLvt(sumLvtToolsKey.toFixed(1));
      console.log("sumKeyLvt:", sumLvtToolsKey.toFixed(1));
    } else {
      setLvtUserSpend(0);
      setSumLvt(0);
      setSumKeyLvt(0);
      setShowModal(false);
    }
  }, [queryArray, totalLvt]);

  return (
    <>
      <TitleComponent
        description="Проверьте частотность запроса из сервиса Wordstat. Массовая проверка онлайн поисковых слов на частоту по статистике."
        title="Частотность запросов проверить онлайн в Wordstat статистику поисковых слов посмотреть"
      />
      <CountWordKey
        handleChangeQuery={handleChangeQuery}
        queryArray={queryArray}
        getCountWord={getCountWord}
        isAuthenticated={isAuthenticated}
        handleFetchKey={handleFetchKey}
        toolsSidebar={toolsSidebar}
        result={result}
        showModal={showModal}
        isLoading={isLoading}
        frontTarif={frontTarif}
        tarif={tarif}
        handleFileChange={handleFileChange}
        csvDownloadLink={csvDownloadLink}
        tools={tools}
        handleClickMassClear={handleClickMassClear}
        handleClear={handleClear}
        fileInputRef={fileInputRef}
        sumLvt={sumLvt}
        lvtUserSpend={lvtUserSpend}
        setShowModal={setShowModal}
        noLvtUser={noLvtUser}
        handleCitySelect={handleCitySelect}
        region={region}
        ballDirect={ballDirect}
        exceedsBallDirect={exceedsBallDirect}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  userId: state.user.dataUser.userId,
  isAuthenticated: state.user.isAuthenticated,
  lvt: state.user.dataUser.lvt,
  totalLvt: state.user.dataUser.totalLvt,
  tools: state.user.dataUser.tools,
  ballDirect: state.toolsData.countWordKey.ballDirect,
});

const mapDispatchToProps = {
  getCountWord,
  spendLvt,
  loadFileUserTools,
  getDirectBall,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountWordKeyContainer);
