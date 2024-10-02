import React, { useState } from "react";
import axios from "axios";
import s from "./Form.module.css";
import RegionSelectSearch from "../ToolsComponent/PartsComponentTools/RegionSelectSearch";
import Loading from "../app-function/Loading";
import TitleValues from "./TitleValues";
import RepeatWords from "./RepeatWords";
import InputKey from "./InputKey";
import { Box, Container, Grid, Typography } from "@mui/material";
import MessageNoAuth from "../Auth/MessageNoAuth/MessageNoAuth";

let config;

if (process.env.NODE_ENV === "development") {
  config = require("../config.dev");
} else {
  config = require("../config.prod");
}

const serverUrl = `${config.REACT_APP_SERVER_URL}`;

export default function ApiSendYaSearch(props) {
  const [query, setQuery] = useState("");
  const [titleValues, setTitleValues] = useState(null);
  const [repeatWords, setRepeatWords] = useState(null);
  const [resultString, setResultString] = useState("");
  const [selectedCity, setSelectedCity] = useState(213);
  const [isLoading, setIsLoading] = useState(false);
  const [topFriLink, setResultWordsLink] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [urlPage, setUrlPage] = useState([]);

  const sumLvt = 1;

  const handleClick = async () => {
    setIsLoading(true);

    if (props.totalLvt === 0) {
      console.log("Баланс равен 0");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${serverUrl}/api/tools/get-title`, {
        query,
        selectedCity,
      });

      // Деструктурируем данные из ответа
      const { title, topWordsLink, titleValues, repeatWords, urlPage } =
        response.data;

      // Выполняем запрос после получения ответа от сервера
      // const titleGpt = await props.getTitleGpt(title);
      // setResultString(titleGpt);
      setResultString(title);
      // Устанавливаем полученные данные в состояние
      setResultWordsLink(topWordsLink);
      setTitleValues(titleValues);
      setRepeatWords(repeatWords);
      setUrlPage(urlPage);
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    } finally {
      setIsLoading(false);
      props.spendLvt(props.userId, sumLvt);
    }
  }; // <-- Закрываем handleClick

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleCitySelect = (selectedOption) => {
    setSelectedCity(selectedOption.value);
  };

  const copyTextOnClick = () => {
    navigator.clipboard.writeText(resultString);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 3000);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Box sx={{ marginBottom: "70px" }} component="section">
          <Grid
            sx={{ alignItems: "center", justifyContent: "center" }}
            container
            spacing={1}
          >
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 5,
              }}
              xs={12}
              item
            >
              <Typography variant="h2" component="h1">
                Создай правильный Title
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              item
              xs={12}
            >
              {!props.isAuthenticated ? <MessageNoAuth /> : null}
            </Grid>
          </Grid>
        </Box>
        <Box component="section" sx={{ flexGrow: 1, marginBottom: "70px" }}>
          <Grid spacing={1} container>
            <Grid xs={3} item>
              <RegionSelectSearch
                defaultRegion={selectedCity}
                onSelect={handleCitySelect}
              />
            </Grid>
            <InputKey
              handleChange={handleChange}
              query={query}
              handleClick={handleClick}
              isLoading={isLoading}
              isAuthenticated={props.isAuthenticated}
            />
          </Grid>
        </Box>
      </Container>
      {isLoading ? (
        <Loading />
      ) : (
        resultString && (
          <div className={s.wrapperBoxTitle}>
            <span className={s.faviconTitle}></span>
            <div className={s.boxTitle}>
              <h2>{resultString}</h2>
              <span className={s.linkTopKey}>
                ptahini.ru›search/{topFriLink}
              </span>
              <p>
                Это лучший тайтл для твоего SEO продвижения сайта. Приведи его к
                читаемому виду. Добавь его в соответствующий раздел мета-тегов в
                своей CMS.
              </p>
              <button className={s.btnCopyTitle} onClick={copyTextOnClick}>
                Копировать Title
              </button>
              {copySuccess && (
                <span className={s.copyMessage}>Title скопирован!</span>
              )}
            </div>
          </div>
        )
      )}
      <TitleValues urlPage={urlPage} titleValues={titleValues} />
      <RepeatWords repeatWords={repeatWords} />
    </>
  );
}

// import React, { useState } from "react";
// import axios from "axios";
// import s from "./Form.module.css";
// import t from "./../css/Tools.module.css";
// import RegionSelectSearch from "../ToolsComponent/PartsComponentTools/RegionSelectSearch";
// import Loading from "../app-function/Loading";
// import TitleValues from "./TitleValues";
// import RepeatWords from "./RepeatWords";
// import InputKey from "./InputKey";
// import MessageNoAuth from "../Auth/MessageNoAuth/MessageNoAuth";
// import ModalNoLvt from "../Modal/ModalNoLvt";
// import { Box, Container, Grid, Typography } from "@mui/material";

// let config;

// if (process.env.NODE_ENV === "development") {
//   config = require("../config.dev");
// } else {
//   config = require("../config.prod");
// }

// const serverUrl = `${config.REACT_APP_SERVER_URL}`;

// export default function ApiSendYaSearch(props) {
//   const [query, setQuery] = useState("");
//   const [titleValues, setTitleValues] = useState(null);
//   const [repeatWords, setRepeatWords] = useState(null);
//   const [resultString, setResultString] = useState("");
//   const [selectedCity, setSelectedCity] = useState(213);
//   const [isLoading, setIsLoading] = useState(false);
//   const [topFriLink, setResultWordsLink] = useState("");
//   const [copySuccess, setCopySuccess] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [urlPage, setUrlPage] = useState([]);

//   const sumLvt = 1;

//   const handleClick = async () => {
//     setIsLoading(true);

//     if (props.totalLvt === 0) {
//       console.log("Баланс равен 0");
//       setIsLoading(false);
//       setShowModal(true);
//       return;
//     }

//     try {
//       const response = await axios.post(`${serverUrl}/api/tools/get-title`, {
//         query,
//         selectedCity,
//       });

//       // Деструктурируем данные из ответа
//       const { title, topWordsLink, titleValues, repeatWords, urlPage } =
//         response.data;

//       // Выполняем запрос после получения ответа от сервера
//       // const titleGpt = await props.getTitleGpt(title);
//       // setResultString(titleGpt);
//       setResultString(title);
//       debugger;
//       // Устанавливаем полученные данные в состояние
//       setResultWordsLink(topWordsLink);
//       setTitleValues(titleValues);
//       setRepeatWords(repeatWords);
//       setUrlPage(urlPage);
//     } catch (error) {
//       console.error("Ошибка при отправке данных:", error);
//     } finally {
//       setIsLoading(false);
//       props.spendLvt(props.userId, sumLvt);
//     }
//   }; // <-- Закрываем handleClick

//   const handleChange = (event) => {
//     setQuery(event.target.value);
//   };

//   const handleCitySelect = (selectedOption) => {
//     setSelectedCity(selectedOption.value);
//   };

//   const copyTextOnClick = () => {
//     navigator.clipboard.writeText(resultString);
//     setCopySuccess(true);
//     setTimeout(() => {
//       setCopySuccess(false);
//     }, 3000);
//   };

//   return (
//     <>
//       <Container maxWidth="xl">
//         <Box sx={{ marginBottom: "70px" }} component="section">
//           <Grid
//             sx={{ alignItems: "center", justifyContent: "center" }}
//             container
//             spacing={1}
//           >
//             <Typography variant="h2" component="h1">
//               Создай правильный Title
//             </Typography>
//           </Grid>
//           <Grid>
//             <InputKey
//               handleChange={handleChange}
//               query={query}
//               handleClick={handleClick}
//             />
//             <RegionSelectSearch
//               defaultRegion={selectedCity}
//               onSelect={handleCitySelect}
//               nameLabel="Регион продвижения:"
//             />
//           </Grid>
//         </Box>
//       </Container>
//       <div className={t.sectionGridSK}>
//         <section className={t.sectionTools}>
//           <div className={t.sectionBlockTools}>
//             <div>
//               {showModal && (
//                 <ModalNoLvt
//                   isAuthenticated={props.isAuthenticated}
//                   onClose={() => setShowModal(false)}
//                   totalLvt={props.totalLvt}
//                   sumLvt={props.sumLvt}
//                 />
//               )}
//             </div>
//             <div className={t.title}>
//               <div className={t.titleTools}></div>
//               {props.isAuthenticated && (
//                 <div className={t.tarifBlock}>
//                   <span className={t.tarifLvt}>Будет списано: 1 lvt</span>
//                 </div>
//               )}
//             </div>
//             <Box sx={{ flexGrow: 1 }}>
//               <Grid spacing={2} container>
//                 <Grid xs={3} item>
//                   <RegionSelectSearch
//                     defaultRegion={selectedCity}
//                     onSelect={handleCitySelect}
//                     nameLabel="Регион продвижения:"
//                   />
//                 </Grid>
//                 <InputKey
//                   handleChange={handleChange}
//                   query={query}
//                   handleClick={handleClick}
//                   isLoading={isLoading}
//                 />
//               </Grid>
//             </Box>
//             <Box sx={{ flexGrow: 1 }}>
//               <Grid container spacing={2}>
//                 <Grid item xs={8}>
//                   <RegionSelectSearch
//                     defaultRegion={selectedCity}
//                     onSelect={handleCitySelect}
//                     nameLabel="Регион продвижения:"
//                   />
//                 </Grid>
//                 <Grid item xs={4}>
//                   xs=4
//                 </Grid>
//                 <Grid item xs={4}>
//                   xs=4
//                 </Grid>
//                 <Grid item xs={8}>
//                   xs=8
//                 </Grid>
//               </Grid>
//             </Box>

//             {!props.isAuthenticated ? <MessageNoAuth /> : null}
//             {isLoading ? (
//               <Loading />
//             ) : (
//               resultString && (
//                 <div className={s.wrapperBoxTitle}>
//                   <span className={s.faviconTitle}></span>
//                   <div className={s.boxTitle}>
//                     <h2>{resultString}</h2>
//                     <span className={s.linkTopKey}>
//                       ptahini.ru›search/{topFriLink}
//                     </span>
//                     <p>
//                       Это лучший тайтл для твоего SEO продвижения сайта. Приведи
//                       его к читаемому виду. Добавь его в соответствующий раздел
//                       мета-тегов в своей CMS.
//                     </p>
//                     <button
//                       className={s.btnCopyTitle}
//                       onClick={copyTextOnClick}
//                     >
//                       Копировать Title
//                     </button>
//                     {copySuccess && (
//                       <span className={s.copyMessage}>Title скопирован!</span>
//                     )}
//                   </div>
//                 </div>
//               )
//             )}
//           </div>
//         </section>
//       </div>
//       <TitleValues urlPage={urlPage} titleValues={titleValues} />
//       <RepeatWords repeatWords={repeatWords} />
//     </>
//   );
// }
