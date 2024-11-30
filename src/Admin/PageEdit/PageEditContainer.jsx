import React, { useEffect, useState } from "react";
import PageEdit from "./PageEdit";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getPageApp } from "../../Api/api-page";

function PageEditContainer(props) {
  const { pageData, getPageApp } = props;
  const { pageId } = useParams();

  const [currentPageData, setCurrentPageData] = useState();

  // Найдем данные страницы по pageId
  useEffect(() => {
    getPageApp();
    const editPage = pageData.find((page) => page.pageId === pageId);
    setCurrentPageData(editPage);
  }, [pageData]);
  // Обработка случая, если данные не найдены
  if (!currentPageData) {
    return <div>Страница не найдена</div>;
  }

  return (
    <PageEdit
      slugState={currentPageData.slug}
      metaTitleState={currentPageData.metaTitle}
      metaDescriptionState={currentPageData.metaDescription}
      pageTitleState={currentPageData.pageTitle}
      textContentState={currentPageData.textContent}
      pageData={currentPageData}
      getPageApp={getPageApp}
      pageId={pageId}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    pageData: state.pageData.pageApp,
  };
};

const mapDispatchToProps = {
  getPageApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageEditContainer);
