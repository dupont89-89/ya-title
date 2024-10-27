import React from "react";
import WhoisTools from "./WhoisTools";
import {
  deleteSubscriptionDomenWhois,
  fetchApiWhois,
  getSubscriptionDomenUser,
  subscriptionDomenWhois,
} from "../Api/api-whois";
import { connect } from "react-redux";
import { TitleComponent } from "../Function/TitleComponent";

function WhoisToolsContainer(props) {
  return (
    <>
      <TitleComponent
        description="Проверка домена Whois. Узнать IP адрес, NS сервера, дату освобождения. Подписаться на отслеживание когда домен осовободится."
        title="Проверка домена Whois, проверить занятость, узнать дату освобождения"
      />
      <WhoisTools
        isAuthenticated={props.isAuthenticated}
        fetchApiWhois={props.fetchApiWhois}
        subscriptionDomenWhois={props.subscriptionDomenWhois}
        userId={props.userId}
        email={props.email}
        getSubscriptionDomenUser={props.getSubscriptionDomenUser}
        domenSubscription={props.domenSubscription}
        deleteSubscriptionDomenWhois={props.deleteSubscriptionDomenWhois}
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    userId: state.user.dataUser.userId,
    email: state.user.dataUser.email,
    domenSubscription: state.toolsData.whoisDomenSubscription,
  };
};
const mapDispatchToProps = {
  fetchApiWhois,
  subscriptionDomenWhois,
  getSubscriptionDomenUser,
  deleteSubscriptionDomenWhois,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WhoisToolsContainer);
