import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import s from "./styles.module.css";
import SignUpContainer from "./SignUpContainer";

export default function ModalSignUp(props) {
  return (
    <Popup
      contentStyle={{ padding: "0px", border: "none", background: "none" }}
      trigger={<button className={s.btnSignUp}> {props.nameBtnPopup} </button>}
      modal
      nested
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
