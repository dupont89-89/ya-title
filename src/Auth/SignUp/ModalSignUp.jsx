import React, { useLayoutEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import s from "./styles.module.css";
import SignUpContainer from "./SignUpContainer";

export default function ModalSignUp(props) {
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

  const styleButtonTrigger = {
    display: props.display,
    border: "none",
    cursor: "pointer",
    width: "100%",
    borderRadius: "0 0 5px 5px",
    fontSize: "15px",
    padding: "7px 0",
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
        <button style={styleButtonTrigger} className={s.btnSignUp}>
          {" "}
          {props.nameBtnPopup}{" "}
        </button>
      }
      modal
      nested
      open={props.isOpen}
      onClose={props.closePopup}
    >
      {(close) => (
        <div>
          <SignUpContainer
            close={close}
            closeButton={
              <div className={s.closeBtnPopup}>
                <button onClick={() => close()}>✖</button>
              </div>
            }
          />
        </div>
      )}
    </Popup>
  );
}
