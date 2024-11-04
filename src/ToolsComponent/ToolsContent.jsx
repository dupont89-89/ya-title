import React from "react";
import { useParams } from "react-router-dom";
import ApiSendYaSearchContainer from "../api-ya-search/ApiSendYaSearchContainer";
import TextBottom from "./TextBottom";
import CommerceKeyToolsContainer from "../CommerceKeyTools/CommerceKeyToolsContainer";
import CountWordKeyContainer from "../countWordkey/CountWordKeyContainer";
import { Alert, Box, Container, Grid, Link, Typography } from "@mui/material";
import MessageNoAuth from "../Auth/MessageNoAuth/MessageNoAuth";
import RatingTools from "./PartsComponentTools/RatingTools";
import CheckIcon from "@mui/icons-material/Check";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import ReviewsTools from "./PartsComponentTools/ReviewsTools";
import WhoisToolsContainer from "../Whois/WhoisToolsContainer";

export default function ToolsContent(props) {
  const { tools } = useParams();
  // const titleSidebar = {
  //   nameDoc: "Документация по тайтл",
  //   nameLinkOne: "Справка Яндекса",
  //   hrefLinkOne:
  //     "https://yandex.ru/support/webmaster/search-results/title.html",
  //   iconLinkOne: iconYandex,
  //   nameLinkTwo: "Справка Google",
  //   hrefLinkTwo:
  //     "https://developers.google.cn/search/docs/appearance/title-link?hl=ru",
  //   iconLinkTwo: iconGoogle,
  //   nameLinkTri: "HTML спецификация",
  //   hrefLinkTri:
  //     "https://html.spec.whatwg.org/multipage/semantics.html#the-title-element",
  //   iconLinkTri: iconHTML,
  //   nameLinkFo: "Видео по теме",
  //   hrefLinkFo:
  //     "https://rutube.ru/video/35ef2307b6a22542b6b53217abdbbc6c/?r=wd",
  //   iconLinkFo: iconRuTube,
  // };

  // const keyCommerceSidebar = {
  //   nameDoc: "Документация по ключевым запросам",
  //   nameLinkOne: "Справка Яндекса.Директ по ключам",
  //   hrefLinkOne:
  //     "https://yandex.ru/support/direct/keywords/building-keyword-list.html",
  //   iconLinkOne: yaDirect,
  //   nameLinkTwo: "Справка Google",
  //   hrefLinkTwo: "https://support.google.com/google-ads/answer/2453981?hl=RU",
  //   iconLinkTwo: iconGoogle,
  //   nameLinkTri: "Статья Ptahini",
  //   hrefLinkTri:
  //     "https://ptahini.ru/seo-prodvizhenie-sajtov/kakie-kljuchevye-zaprosy-byvajut/",
  //   iconLinkTri: iconPtahini,
  //   nameLinkFo: "Видео инструкция",
  //   hrefLinkFo: "https://rutube.ru/video/41b1dac88c6fa9867fd5459ac7e3270e/",
  //   iconLinkFo: iconRuTube,
  // };

  // const keyCountWordstatSidebar = {
  //   nameDoc: "Документация по частотности запросов",
  //   nameLinkOne: "Справка Яндекса.Директ по ключам",
  //   hrefLinkOne:
  //     "https://yandex.ru/support/direct/keywords/building-keyword-list.html",
  //   iconLinkOne: yaDirect,
  //   nameLinkTwo: "Справка Google",
  //   hrefLinkTwo: "https://support.google.com/google-ads/answer/2453981?hl=RU",
  //   iconLinkTwo: iconGoogle,
  //   nameLinkTri: "Яндекс Wordstat",
  //   hrefLinkTri: "https://wordstat.yandex.ru/",
  //   iconLinkTri: iconYandex,
  //   nameLinkFo: "Google Trends",
  //   hrefLinkFo: "https://trends.google.com/trends?geo=&hl=ru",
  //   iconLinkFo: iconGoogle,
  // };

  const getTextForPage = (tools) => {
    switch (tools) {
      case "seo-title":
        return (
          <p>
            <b>Ptahini</b> разработал{" "}
            <strong>инструмент для создания “правильного тайтла”</strong>,
            который помогает SEO-специалистам <strong>автоматически</strong>{" "}
            составлять заголовки Title{" "}
            <strong>на основе поисковой выдачи</strong>. Этот инструмент
            подбирает самые релевантные, связанные и тематические LSI слова и
            фразы, что позволяет создать заголовок, максимально соответствующий
            поисковым запросам пользователей.
          </p>
        );
      case "wordstat":
        return (
          <>
            <h2>
              Ptahini &ndash; Ваш незаменимый помощник в мире SEO и маркетинга
            </h2>
            <h3>Что такое Ptahini Key Count?</h3>
            <p>
              <strong>Ptahini Key Count</strong> &ndash; это мощный и удобный
              инструмент для сбора частотности поисковых запросов, разработанный
              специально для SEO специалистов, специалистов по рекламе и
              бизнесменов. Наш инструмент помогает определить, какие ключевые
              запросы наиболее популярны среди пользователей поисковых систем,
              что позволяет эффективно планировать и реализовывать маркетинговые
              стратегии.
            </p>
            <h3>Зачем использовать Ptahini?</h3>
            <p>Использование Ptahini приносит ряд ощутимых преимуществ:</p>
            <ol>
              <li>
                <strong>Повышение видимости в поисковых системах</strong>:
                Знание популярных ключевых запросов помогает оптимизировать
                контент и рекламные кампании, что приводит к улучшению позиций в
                поисковой выдаче.
              </li>
              <li>
                <strong>Экономия времени и ресурсов</strong>: Ptahini
                автоматизирует процесс сбора данных, позволяя быстро получить
                точные и актуальные сведения о частотности запросов.
              </li>
              <li>
                <strong>Повышение эффективности рекламы</strong>: Понимание
                потребностей и интересов аудитории позволяет создавать более
                целевые и эффективные рекламные кампании.
              </li>
              <li>
                <strong>Улучшение пользовательского опыта</strong>: Адаптация
                контента под популярные запросы улучшает пользовательский опыт,
                увеличивая вероятность конверсии.
              </li>
            </ol>
            <h3>Как работает Ptahini?</h3>
            <p>
              Ptahini использует передовые алгоритмы и технологии для сбора и
              анализа данных из различных поисковых систем. Вот основные шаги
              работы с нашим инструментом:
            </p>
            <ol>
              <li>
                <strong>Ввод ключевых запросов</strong>: Пользователь вводит
                интересующие его ключевые запросы в интерфейс Ptahini.
              </li>
              <li>
                <strong>Анализ и сбор данных</strong>: Инструмент собирает
                данные о частотности запросов, анализируя их популярность и
                конкурентоспособность.
              </li>
              <li>
                <strong>Отчет и рекомендации</strong>: Ptahini генерирует
                подробный отчет, содержащий информацию о частотности запросов,
                трендах и рекомендуемых стратегиях.
              </li>
            </ol>
            <h3>Особенности и преимущества Ptahini</h3>
            <ul>
              <li>
                <strong>Интуитивно понятный интерфейс</strong>: Наш инструмент
                легко использовать даже тем, кто не обладает глубокими знаниями
                в области SEO и маркетинга.
              </li>
              <li>
                <strong>Актуальные данные</strong>: Ptahini регулярно обновляет
                данные, чтобы предоставить вам наиболее точную и актуальную
                информацию.
              </li>
              <li>
                <strong>Гибкость и адаптивность</strong>: Инструмент подходит
                для работы с любыми типами бизнеса и масштабами рекламных
                кампаний.
              </li>
              <li>
                <strong>Поддержка пользователей</strong>: Наша команда поддержки
                всегда готова помочь вам с любыми вопросами и предложениями.
              </li>
            </ul>
            <h3>Начните с Ptahini уже сегодня!</h3>
            <p>
              Присоединяйтесь к числу успешных пользователей Ptahini и начните
              оптимизировать свой бизнес прямо сейчас. Наш инструмент поможет
              вам лучше понять своих клиентов, повысить эффективность
              маркетинговых кампаний и достигнуть новых высот.
            </p>
          </>
        );
      case "commerce-key":
        return (
          <>
            <h2>Какие бывают типы запросов</h2>
            <ul>
              <li>
                Общие запросы - это запросы с нечетким и неясным смыслом, когда
                непонятно, что конкретно пользователь имел ввиду, к примеру,
                «рецепт».
              </li>
              <li>
                Транзакционные - они же целевые, коммерческие, основные запросы,
                по которым продвигается бизнес. Обычно они явно указывают на
                транзакцию: купить, заказать, цена. Пользователи, которые ищут
                информацию по подобным словам, собираются приобрести товары и
                услуги прямо сейчас или в недалеком будущем. Это самые важные
                слова для продвижения;
              </li>
              <li>
                Информационные - запросы типа: как, где, почему, зачем, и т.д.
                обычно добавляются на страницы статей/блога,
              </li>
              <li>
                Навигационные - с привязкой к геолокации, обычно добавляются на
                тематические страницы: контакты, доставка, самовывоз, о
                компании.
              </li>
              <li>Геозависимые и геонезависимые.</li>
              <li>Брендовые - запросы с упоминанием бренда компании</li>
            </ul>
            <h2>Информационный запрос или коммерческий?</h2>
            <p>
              Определение типа запроса для успешной SEO-стратегии. Важно
              понимать намерение пользователя (user intent) и соответствующим
              образом оптимизировать контент. Различение между информационными и
              коммерческими запросами и соответствующая оптимизация контента
              может значительно улучшить ваши маркетинговые и SEO-стратегии,
              привлечь больше трафика и повысить конверсии.
            </p>
            <p>
              Используйте инструмент Ptahini для определения информационный
              запрос или коммерческие (транзакционный). После определения типа
              запроса, у вас будет понимание, писать статью (блог, отдельная
              страница со статьей итд) или продвигать нужно на страницы продаж
              (категория товара, страница услуги итд).
            </p>
            <p>
              Для удобства мы предлагаем воспользоваться массовой проверкой
              запросов на коммерциализацию. Загрузите списком или файлом ваши
              запросы.
            </p>
          </>
        );
      case "whois":
        return (
          <Typography variant="subtitle1" component="div">
            <h2>
              Проверить домен на доступность, а если занят подпишись на
              освобождение
            </h2>
            <p>
              <strong>
                Планируете создать сайт и ищете уникальное доменное имя?
              </strong>{" "}
              Наш инструмент для проверки доменов поможет вам узнать, свободен
              ли интересующий вас домен, или он уже занят. С помощью сервиса
              Whois вы можете моментально получить информацию о любом домене.
            </p>
            <h3>Что предлагает наш инструмент:</h3>
            <ul>
              <li>
                <strong>Проверка домена на занятость.</strong> Узнайте, доступен
                ли ваш выбранный домен для регистрации.
              </li>
              <li>
                <strong>Информация о текущем владельце.</strong> Если домен
                занят, вы сможете увидеть данные о владельце и дату окончания
                регистрации.
              </li>
              <li>
                <strong>Подписка на освобождение домена.</strong> Не хотите
                упустить идеальное доменное имя? Если домен занят, подпишитесь
                на уведомления, и мы сообщим вам на email, когда он освободится
                и станет доступным для регистрации.
              </li>
            </ul>
            <p>
              Наш сервис предоставляет простой и удобный способ контролировать
              ситуацию с доменами и своевременно реагировать на их освобождение.
              Начните проверку доменного имени прямо сейчас!
            </p>
          </Typography>
        );
      case "default":
      default:
        return (
          <p>
            <b>Ptahini</b> разработал{" "}
            <strong>инструмент для создания “правильного тайтла”</strong>,
            который помогает SEO-специалистам <strong>автоматически</strong>{" "}
            составлять заголовки Title{" "}
            <strong>на основе поисковой выдачи</strong>. Этот инструмент
            подбирает самые релевантные, связанные и тематические LSI слова и
            фразы, что позволяет создать заголовок, максимально соответствующий
            поисковым запросам пользователей.
          </p>
        );
    }
  };

  const getToolsPage = (tools) => {
    switch (tools) {
      case "create-title":
        return <ApiSendYaSearchContainer />;
      case "commerce-key":
        return <CommerceKeyToolsContainer />;
      case "wordstat":
        return <CountWordKeyContainer />;
      case "whois":
        return <WhoisToolsContainer />;
      default:
        return <ApiSendYaSearchContainer />;
    }
  };

  return (
    <>
      <Container sx={{ marginBottom: 5 }} maxWidth="xl">
        <Box component="section" sx={{ flexGrow: 1 }}>
          <Grid
            sx={{
              flexDirection: "row",
              flexWrap: "nowrap",
              alignItems: "center",
              justifyContent: "flex-start",
              overflow: "auto",
            }}
            container
            spacing={1}
          >
            <Grid item sx={{ display: "flex" }} md={3} xs={12}>
              <RatingTools />
            </Grid>
            <Grid item md={3} xs={12}>
              <Alert
                sx={{ height: "64px", alignItems: "center" }}
                icon={<CheckIcon fontSize="inherit" />}
                severity="success"
              >
                <Typography>Работает стабильно</Typography>
              </Alert>
            </Grid>
            <Grid item md={3} xs={12}>
              <Alert
                sx={{ height: "64px", alignItems: "center" }}
                action={
                  <Link href="/video/" color="inherit" size="small">
                    Смотреть
                  </Link>
                }
                icon={<OndemandVideoIcon fontSize="inherit" />}
                severity="success"
              >
                Видео инструкция
              </Alert>
            </Grid>
            <Grid item md={3} xs={12}>
              <Alert
                sx={{ height: "64px", alignItems: "center" }}
                action={
                  <Link href="/support/" color="inherit" size="small">
                    Оставить обращение
                  </Link>
                }
                icon={<OndemandVideoIcon fontSize="inherit" />}
                severity="success"
              >
                Поддержка
              </Alert>
            </Grid>
          </Grid>
        </Box>
      </Container>
      {getToolsPage(tools)}
      <Container maxWidth="100vw" sx={{ background: "#eaf6f5" }}>
        <Container maxWidth="xl">
          <Box component="section" pt={6} pb={6}>
            <TextBottom text={getTextForPage(tools)} />
          </Box>
        </Container>
      </Container>
    </>
  );
}
