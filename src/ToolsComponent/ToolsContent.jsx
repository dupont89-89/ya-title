import React from "react";
import { useParams } from "react-router-dom";
import ApiSendYaSearchContainer from "../api-ya-search/ApiSendYaSearchContainer";
import ToolsSidebar from "../Sidebar/ToolSidebar";
import TextBottom from "./TextBottom";
import CommerceKeyToolsContainer from "../CommerceKeyTools/CommerceKeyToolsContainer";
import iconGoogle from "./../img/icon/google-icon-nav.png";
import iconYandex from "./../img/icon/ya-icon.png";
import iconHTML from "./../img/icon/html-specificaciya-logo.svg";
import iconRuTube from "./../img/icon/rutube-icon.png";
import yaDirect from "./../img/icon/ya-direct.png";
import iconPtahini from "./../img/icon/ptahini-icon.png";
import CountWordKeyContainer from "../countWordkey/CountWordKeyContainer";

export default function ToolsContent(props) {
  const { tools } = useParams();
  const titleSidebar = {
    nameDoc: "Документация по тайтл",
    nameLinkOne: "Справка Яндекса",
    hrefLinkOne:
      "https://yandex.ru/support/webmaster/search-results/title.html",
    iconLinkOne: iconYandex,
    nameLinkTwo: "Справка Google",
    hrefLinkTwo:
      "https://developers.google.cn/search/docs/appearance/title-link?hl=ru",
    iconLinkTwo: iconGoogle,
    nameLinkTri: "HTML спецификация",
    hrefLinkTri:
      "https://html.spec.whatwg.org/multipage/semantics.html#the-title-element",
    iconLinkTri: iconHTML,
    nameLinkFo: "Видео по теме",
    hrefLinkFo:
      "https://rutube.ru/video/35ef2307b6a22542b6b53217abdbbc6c/?r=wd",
    iconLinkFo: iconRuTube,
  };

  const keyCommerceSidebar = {
    nameDoc: "Документация по ключевым запросам",
    nameLinkOne: "Справка Яндекса.Директ по ключам",
    hrefLinkOne:
      "https://yandex.ru/support/direct/keywords/building-keyword-list.html",
    iconLinkOne: yaDirect,
    nameLinkTwo: "Справка Google",
    hrefLinkTwo: "https://support.google.com/google-ads/answer/2453981?hl=RU",
    iconLinkTwo: iconGoogle,
    nameLinkTri: "Статья Ptahini",
    hrefLinkTri:
      "https://ptahini.ru/seo-prodvizhenie-sajtov/kakie-kljuchevye-zaprosy-byvajut/",
    iconLinkTri: iconPtahini,
    nameLinkFo: "Видео инструкция",
    hrefLinkFo: "https://rutube.ru/video/41b1dac88c6fa9867fd5459ac7e3270e/",
    iconLinkFo: iconRuTube,
  };

  const keyCountWordstatSidebar = {
    nameDoc: "Документация по частотности запросов",
    nameLinkOne: "Справка Яндекса.Директ по ключам",
    hrefLinkOne:
      "https://yandex.ru/support/direct/keywords/building-keyword-list.html",
    iconLinkOne: yaDirect,
    nameLinkTwo: "Справка Google",
    hrefLinkTwo: "https://support.google.com/google-ads/answer/2453981?hl=RU",
    iconLinkTwo: iconGoogle,
    nameLinkTri: "Яндекс Wordstat",
    hrefLinkTri: "https://wordstat.yandex.ru/",
    iconLinkTri: iconYandex,
    nameLinkFo: "Google Trends",
    hrefLinkFo: "https://trends.google.com/trends?geo=&hl=ru",
    iconLinkFo: iconGoogle,
  };

  const getTextForPage = (tools) => {
    switch (tools) {
      case "create-title":
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
          <div>
            <h2>Определение частотности в Wordstat онлайн</h2>
            <p>Это текст про частотность запросов</p>
          </div>
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
        return (
          <ApiSendYaSearchContainer
            toolsSidebar={<ToolsSidebar sidebar={titleSidebar} />}
          />
        );
      case "commerce-key":
        return (
          <CommerceKeyToolsContainer
            toolsSidebar={<ToolsSidebar sidebar={keyCommerceSidebar} />}
          />
        );
      case "wordstat":
        return (
          <CountWordKeyContainer
            toolsSidebar={<ToolsSidebar sidebar={keyCountWordstatSidebar} />}
          />
        );
      default:
        return (
          <ApiSendYaSearchContainer
            toolsSidebar={<ToolsSidebar sidebar={titleSidebar} />}
          />
        );
    }
  };

  return (
    <>
      {getToolsPage(tools)}
      <TextBottom text={getTextForPage(tools)} />
    </>
  );
}
