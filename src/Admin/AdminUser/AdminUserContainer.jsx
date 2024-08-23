import React from "react";
import AdminUser from "./AdminUser";
import { connect } from "react-redux";
import {
  addLvtAdminUser,
  editAdminUserStatus,
  getAdminUserData,
} from "../../Api/api-admin";
import { Container } from "@mui/material";

function AdminUserContainer(props) {
  return (
    <Container maxWidth="xl">
      <AdminUser
        dataUser={props.dataUser}
        getAdminUserData={props.getAdminUserData}
        editAdminUserStatus={props.editAdminUserStatus}
        addLvtAdminUser={props.addLvtAdminUser}
      />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    dataUser: state.adminUser.dataUser,
  };
};

const mapDispatchToProps = {
  getAdminUserData,
  editAdminUserStatus,
  addLvtAdminUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserContainer);
