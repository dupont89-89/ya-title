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

const NAVIGATION = [
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
    segment: "balance/",
    title: "Тариф/Лимиты",
    icon: <ShoppingCartIcon />,
    action: (
      <Chip
        sx={{ borderRadius: "5px", fontWeight: "600" }}
        label="ТЕСТОВЫЙ"
        color="success"
        size="small"
      />
    ),
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
    ],
  },
];

function CabinetUser(props) {
  const { tools } = props;

  const router = useDemoRouter("/dashboard");

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
  });

  return (
    // preview-start
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
        <Box pt={6}>
          <ToolsContentContainer pathname={router.pathname} />
          <PageContainer tools={tools} pathname={router.pathname} />
        </Box>
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}

export default CabinetUser;
