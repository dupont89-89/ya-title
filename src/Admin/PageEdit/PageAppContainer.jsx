import React from "react";
import PageApp from "./PageApp";
import { connect } from "react-redux";
import { getPageApp } from "../../Api/api-page";

function PageAppContainer(props) {
  const { pageData, getPageApp } = props;
  return <PageApp pageData={pageData} getPageApp={getPageApp} />;
}

const mapStateToProps = (state) => {
  return {
    pageData: state.pageData.pageApp,
  };
};

const mapDispatchToProps = {
  getPageApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageAppContainer);
