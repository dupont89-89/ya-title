import React from "react";
import BalancePageContainer from "../BalancePage/BalancePageContainer";
import DashboardComponent from "../CabinetUser/DashboardComponent";

export default function PageContainer(props) {
  const { pathname, tools } = props;

  const getPage = (pathname) => {
    switch (pathname) {
      case "/balance/":
        return <BalancePageContainer />;
      case "/dashboard/history-app/":
        return <DashboardComponent tools={tools} />;
      default:
        return "Дашборд";
    }
  };
  return <>{getPage(pathname)}</>;
}
