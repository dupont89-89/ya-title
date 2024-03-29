import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Signup from "./SignUp";
import s from "./styles.module.css";

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
          <Signup
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
