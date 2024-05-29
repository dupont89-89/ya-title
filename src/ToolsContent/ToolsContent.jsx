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
        return <p>Это текст для коммерциализации запросов.</p>;
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
        return <ApiSendYaSearchContainer sidebar={titleSidebar} />;
      case "commerce-key":
        return <CommerceKeyToolsContainer />;
      case "default":
      default:
        return <ApiSendYaSearchContainer sidebar={titleSidebar} />;
    }
  };

  return (
    <div>
      <div className={t.sectionGridSK}>
        <aside>
          <ToolsSidebar />
        </aside>
        {getToolsPage(tools)}
      </div>
      <TextBottom text={getTextForPage(tools)} />
    </div>
  );
}
