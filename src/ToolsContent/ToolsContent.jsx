import React from "react";
import { useParams } from "react-router-dom";
import ApiSendYaSearchContainer from "../api-ya-search/ApiSendYaSearchContainer";
import t from "./../css/Tools.module.css";
import ToolsSidebar from "../Sidebar/ToolSidebar";
import TextBottom from "./TextBottom";
import CommerceKeyToolsContainer from "../CommerceKeyTools/CommerceKeyToolsContainer";

export default function ToolsContent(props) {
  const { tools } = useParams();
  const titleSidebar = {
    nameDoc: "Документация по тайтл",
    nameLinkOne: "Справка Яндекса",
    hrefLinkOne:
      "https://yandex.ru/support/webmaster/search-results/title.html",
    nameLinkTwo: "Справка Google",
    hrefLinkTwo:
      "https://developers.google.cn/search/docs/appearance/title-link?hl=ru",
    nameLinkTri: "HTML спецификация",
    hrefLinkTri:
      "https://html.spec.whatwg.org/multipage/semantics.html#the-title-element",
    nameLinkFo: "Видео по теме",
    hrefLinkFO:
      "https://rutube.ru/video/35ef2307b6a22542b6b53217abdbbc6c/?r=wd",
  };

  const keyCommerceSidebar = {
    nameDoc: "Документация по ключевым запросам",
    nameLinkOne: "Справка Яндекса по ключам",
    hrefLinkOne:
      "https://yandex.ru/support/webmaster/search-results/title.html",
    nameLinkTwo: "Справка Google",
    hrefLinkTwo:
      "https://developers.google.cn/search/docs/appearance/title-link?hl=ru",
    nameLinkTri: "HTML спецификация",
    hrefLinkTri:
      "https://html.spec.whatwg.org/multipage/semantics.html#the-title-element",
    nameLinkFo: "Видео по теме",
    hrefLinkFO:
      "https://rutube.ru/video/35ef2307b6a22542b6b53217abdbbc6c/?r=wd",
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
