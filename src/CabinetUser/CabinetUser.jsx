// import React from "react";
// import s from "./CabinetUser.module.css";
// import { format } from "date-fns";
// import CabinetApiUser from "./PartsCabinet/CabinetApiUser";
// import { Container, Typography } from "@mui/material";

// export default function CabinetUser(props) {
//   const { tools } = props;
//   let config;

//   if (process.env.NODE_ENV === "development") {
//     config = require("../config.dev");
//   } else {
//     config = require("../config.prod");
//   }
//   const wordstatTools = tools.filter(
//     (tool) => tool.nameTools === "wordstat-count-key"
//   );
//   const tipKeyTools = tools.filter((tool) => tool.nameTools === "tip-key");

//   return (
//     <Container maxWidth="xl">
//       <div className={s.wrapper}>
//         <div className={s.sectionGrid}>
//           <section className={s.cabinetUser}>
//             <div className={s.historyBlockCabinet}>
//               <Typography component="h2" variant="h3">
//                 История работы с инструментами
//               </Typography>
//               <div className={s.sectionContentCabinet}>
//                 <div className={s.blockTools}>
//                   <Typography component="h3" variant="h4">
//                     Определение типа ключевого запроса{" "}
//                   </Typography>
//                   {tipKeyTools && tipKeyTools.length > 0 ? (
//                     <ul>
//                       {tipKeyTools.map((tool, index) => (
//                         <li className={s.blockItemResult} key={index}>
//                           <div className={s.gridList}>
//                             <span>
//                               Дата проверки
//                               <br />
//                               {format(
//                                 new Date(tool.dateAdded),
//                                 "dd-MM-yyyy HH:mm:ss"
//                               )}
//                             </span>
//                             <span>
//                               Результат:{" "}
//                               <a
//                                 href={`${config.REACT_APP_SERVER_URL}${tool.fileTools}`}
//                               >
//                                 Скачать
//                               </a>
//                             </span>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <span className={s.noData}>Нет данных</span>
//                   )}
//                 </div>
//                 <div className={s.blockTools}>
//                   <Typography component="h3" variant="h4">
//                     Определение частотности запроса
//                   </Typography>
//                   {wordstatTools && wordstatTools.length > 0 ? (
//                     <ul>
//                       {wordstatTools.map((tool, index) => (
//                         <li className={s.blockItemResult} key={index}>
//                           <div className={s.gridList}>
//                             <span>
//                               Дата проверки
//                               <br />
//                               {format(
//                                 new Date(tool.dateAdded),
//                                 "dd-MM-yyyy HH:mm:ss"
//                               )}
//                             </span>
//                             <span>
//                               Результат:{" "}
//                               <a
//                                 href={`${config.REACT_APP_SERVER_URL}${tool.fileTools}`}
//                               >
//                                 Скачать
//                               </a>
//                             </span>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <span className={s.noData}>Нет данных</span>
//                   )}
//                 </div>
//               </div>
//             </div>
//             <CabinetApiUser />
//           </section>
//         </div>
//       </div>
//     </Container>
//   );
// }
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import ToolsContentContainer from "../ToolsComponent/ToolsContentContainer";
import BalancePageContainer from "../BalancePage/BalancePageContainer";
import PageContainer from "../Page/PageContainer";
import HistoryIcon from "@mui/icons-material/History";
import TitleIcon from "@mui/icons-material/Title";
import LanguageIcon from "@mui/icons-material/Language";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import AppsIcon from "@mui/icons-material/Apps";

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
    title: "Управление тарифом",
    icon: <ShoppingCartIcon />,
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
    title: "Проверка ключей",
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

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function CabinetUser(props) {
  const { tools } = props;

  const router = useDemoRouter("/dashboard");

  return (
    // preview-start
    <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme}>
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
