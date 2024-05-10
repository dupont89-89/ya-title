import React, { useLayoutEffect, useState } from "react";
import LoginContainer from "./LoginContainer";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import s from "./styles.module.css";

export default function ModalLogin(props) {
  const [modalWidth, setModalWidth] = useState("50%");

  useLayoutEffect(() => {
    // Определяем ширину модального окна в зависимости от ширины экрана
    const width = window.innerWidth;
    if (width >= 768) {
      setModalWidth("50%");
    } else {
      setModalWidth("80%");
    }
  }, []);
  return (
    <Popup
      contentStyle={{
        padding: "0px",
        border: "none",
        background: "none",
        width: props.width ? props.width : modalWidth,
      }}
      trigger={
        <button className={s.btnLogin}> {props.nameBtnPopupLogin} </button>
      }
      modal
      nested
      open={props.isOpen}
      onClose={props.closePopup}
    >
      {(close) => (
        <div>
          <LoginContainer
            close={close}
            closeButton={
              <div className={s.closeBtnPopup}>
                <button onClick={() => close()}>✖</button>
              </div>
            }
            inputWidth={props.inputWidth}
            blockFormPadding={props.blockFormPadding}
            fontSizeTitle={props.fontSizeTitle}
          />
        </div>
      )}
    </Popup>
  );
}
