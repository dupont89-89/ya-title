import React from "react";
import { Alert, Link, Typography } from "@mui/material";

export default function MessageNoAuth(props) {
  return (
    <Alert severity="error">
      <Typography component="p">
        Чтобы использовать сервис вам нужно{" "}
        <Link href="/login/">войти в аккаунт</Link>.
      </Typography>
    </Alert>
  );
}

// import React, { useLayoutEffect, useState } from "react";
// import s from "./MessageNoAuth.module.css";
// import { Link } from "react-router-dom";
// import ModalLogin from "../Login/ModalLogin";
// import LinkTextReg from "../../parts/Full/LinkTextReg";

// export default function MessageNoAuth(props) {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [modalWidth, setModalWidth] = useState("50%");
//   const [modalInputWidth, setModalInputWidth] = useState(null);
//   const [modalBlockFormPadding, setModalBlockFormPadding] = useState(null);
//   const [modalFontSizeTitle, setModalFontSizeTitle] = useState(null);

//   const link = {
//     borderBotom: "1px solid",
//   };

//   const openPopup = () => {
//     setIsPopupOpen(true);
//   };

//   useLayoutEffect(() => {
//     // Определяем ширину модального окна в зависимости от ширины экрана
//     const width = window.innerWidth;
//     if (width >= 768) {
//       setModalWidth("50%");
//     } else {
//       setModalWidth("80%");
//       setModalInputWidth("100%");
//       setModalBlockFormPadding("10px");
//       setModalFontSizeTitle("25px");
//     }
//   }, []);
//   return (
//     <div className={s.messageNoAuthBlock}>
//       <p>
//         Чтобы использовать сервис вам нужно{" "}
//         <Link style={link} onClick={openPopup}>
//           войти в аккаунт
//         </Link>
//         . Вы можете пройти{" "}
//         <LinkTextReg color="#000" linkRehName="регистрацию" /> и получить{" "}
//         <Link to="/balance">подарки</Link>.
//       </p>
//       <ModalLogin
//         isOpen={isPopupOpen}
//         closePopup={() => setIsPopupOpen(false)}
//         width={modalWidth}
//         inputWidth={modalInputWidth}
//         blockFormPadding={modalBlockFormPadding}
//         fontSizeTitle={modalFontSizeTitle}
//       />
//     </div>
//   );
// }
