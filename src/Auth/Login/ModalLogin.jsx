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

  const btn = {
    backgroundColor: props.btnBackgroundColor
      ? props.btnBackgroundColor
      : "none",
    width: props.btnWidth ? props.btnWidth : null,
    borderRadius: props.radiusBtn ? props.radiusBtn : null,
    fontSize: props.sizeFontBtn ? props.sizeFontBtn : null,
  };

  return (
    <Popup
      contentStyle={{
        padding: "0px",
        border: "none",
        background: "none",
        width: props.width ? props.width : modalWidth,
      }}
      trigger={
        <button style={btn} className={s.btnLogin}>
          {" "}
          {props.nameBtnPopupLogin}{" "}
        </button>
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
