import React from "react";
import TestButtonPayAddScore from "../../pay/test-pogert/TestButtonPayAddScore";
import TestButtonPayRobokassaAnswer from "../../pay/test-pogert/TestButtonPayRobokassaAnswer";

export default function TestPay() {
  return (
    <div>
      <h1>Тестирование платежей</h1>
      <TestButtonPayAddScore />
      <TestButtonPayRobokassaAnswer />
    </div>
  );
}
