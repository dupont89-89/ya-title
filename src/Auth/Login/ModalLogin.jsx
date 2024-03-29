import React from "react";
import LoginContainer from "./LoginContainer";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import s from "./styles.module.css";

export default function ModalLogin(props) {
  return (
    <Popup
      contentStyle={{ padding: "0px", border: "none", background: "none" }}
      trigger={
        <button className={s.btnLogin}> {props.nameBtnPopupLogin} </button>
      }
      modal
      nested
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
          />
        </div>
      )}
    </Popup>
  );
}
