import React from "react";
import { connect } from "react-redux";
import Admin from "./Admin";
import { getAdminUserData } from "../Api/api-admin";

function AdminContainer(props) {
  let countUser = props.dataUser.length;

  const dataPanelAdmin = [
    {
      title: "Пользователи",
      link: "/admin/user/",
      data: `Пользователей ${countUser}`,
    },
    {
      title: "Счета",
      link: "/admin/score/",
      data: "",
    },
    {
      title: "Тестирование",
      link: "/admin/test/",
      data: "",
    },
  ];

  return (
    <Admin
      dataPanelAdmin={dataPanelAdmin}
      getAdminUserData={props.getAdminUserData}
      countUser={countUser}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    dataUser: state.adminUser.dataUser,
  };
};

const mapDispatchToProps = {
  getAdminUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer);
