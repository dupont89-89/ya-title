import * as React from "react";
import Box from "@mui/material/Box";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import ToolsContentContainer from "../ToolsComponent/ToolsContentContainer";
import PageContainer from "../Page/PageContainer";
import HistoryIcon from "@mui/icons-material/History";
import TitleIcon from "@mui/icons-material/Title";
import LanguageIcon from "@mui/icons-material/Language";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import AppsIcon from "@mui/icons-material/Apps";
import { Chip, createTheme } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { ruRU } from "@mui/x-data-grid/locales";

function CabinetUser(props) {
  const { tools, money, lvt, currentTariff } = props;

  const NAVIGATION = [
    {
      segment: "balance/",
      title: "Ваш баланс",
      icon: <CurrencyRubleIcon />,
      action: (
        <Chip
          sx={{
            borderRadius: "5px",
            fontWeight: "600",
            backgroundColor: "#FFC107",
          }}
          label={`${money} руб`}
          size="small"
        />
      ),
    },
    {
      segment: "balance/",
      title: "Остаток баллов",
      icon: <WbCloudyIcon />,
      action: (
        <Chip
          sx={{
            borderRadius: "5px",
            fontWeight: "600",
            backgroundColor: "#FFC107",
          }}
          label={`${lvt} баллов`}
          size="small"
        />
      ),
    },
    {
      segment: "balance/",
      title: "Тариф",
      icon: <ShoppingCartIcon />,
      action: (
        <Chip
          sx={{
            borderRadius: "5px",
            fontWeight: "600",
            backgroundColor: "#4CAF50",
            color: "#fff",
          }}
          label={currentTariff}
          size="small"
        />
      ),
    },
    {
      kind: "header",
      title: "Управление приложением",
    },
    {
      segment: "dashboard/",
      title: "Панель управления",
      icon: <DashboardIcon />,
    },
    {
      segment: "profile/",
      title: "Мой профиль",
      icon: <AccountCircleIcon />,
    },
    {
      segment: "dashboard/history-app/",
      title: "История проверок",
      icon: <HistoryIcon />,
    },
    {
      kind: "divider",
    },
    {
      kind: "header",
      title: "Аналитика",
    },
    {
      segment: "app",
      title: "Анализ сайта",
      icon: <QueryStatsIcon />,
      children: [
        {
          segment: "yandex-iks/",
          title: "Проверка Яндекс ИКС",
          icon: <AppsIcon />,
        },
      ],
    },
    {
      kind: "divider",
    },
    {
      kind: "header",
      title: "Техническая часть",
    },
    {
      segment: "app",
      title: "Работа с мета-тегами",
      icon: <TitleIcon />,
      children: [
        {
          segment: "seo-title/",
          title: "Создание Title",
          icon: <AppsIcon />,
        },
      ],
    },
    {
      kind: "divider",
    },
    {
      kind: "header",
      title: "Ключевые запросы",
    },
    {
      segment: "app",
      title: "Анализ ключей",
      icon: <VpnKeyIcon />,
      children: [
        {
          segment: "commerce-key/",
          title: "Коммерциализация запроса",
          icon: <AppsIcon />,
        },
        {
          segment: "wordstat/",
          title: "Частотность запроса Wordstat",
          icon: <AppsIcon />,
        },
      ],
    },
    {
      kind: "divider",
    },
    {
      kind: "header",
      title: "Дополнительные инструменты",
    },
    {
      segment: "app",
      title: "Работа с доменами",
      icon: <LanguageIcon />,
      children: [
        {
          segment: "whois/",
          title: "Whois проверка",
          icon: <AppsIcon />,
        },
        {
          segment: "del-list/",
          title: "Освобождающиеся домены",
          icon: <AppsIcon />,
        },
      ],
    },
  ];

  const router = useDemoRouter("dashboard/");

  const theme = createTheme({
    typography: {
      fontFamily: ["Raleway", "Arial", "sans-serif"].join(","),
    },
    palette: {
      success: {
        main: "#009688",
      },
      white: {
        main: "#fff",
      },
      mat: {
        main: "#21b5ae",
      },
    },
    ruRU,
  });

  return (
    <AppProvider
      branding={{
        logo: (
          <span style={{ cursor: "default" }}>
            <img src="/img/dashboard/seo.png" alt="" />
          </span>
        ),
        title: <span style={{ cursor: "default" }}>ПАНЕЛЬ ИНСТРУМЕНТОВ</span>,
      }}
      navigation={NAVIGATION}
      router={router}
      theme={theme}
    >
      <DashboardLayout>
        <Box>
          <ToolsContentContainer pathname={router.pathname} />
          <PageContainer tools={tools} pathname={router.pathname} />
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}

export default CabinetUser;
