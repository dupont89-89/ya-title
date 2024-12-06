import React from "react";
import BalancePageContainer from "../BalancePage/BalancePageContainer";
import DashboardComponent from "../CabinetUser/DashboardComponent";
import DashboardPanelContainer from "../CabinetUser/DashboardPanel/DashboardPanelContainer";
import ProfileUserContainer from "../ProfileUser/ProfileUserContainer";

export default function PageContainer(props) {
  const { pathname, tools } = props;

  const getPage = (pathname) => {
    switch (pathname) {
      case "/balance/":
        return <BalancePageContainer />;
      case "/dashboard/history-app/":
        return <DashboardComponent tools={tools} />;
      case "/dashboard/":
        return <DashboardPanelContainer tools={tools} />;
      case "/profile/":
        return <ProfileUserContainer tools={tools} />;
      default:
        return null;
    }
  };
  return <>{getPage(pathname)}</>;
}
