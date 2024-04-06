import React from "react";
import AdminUser from "./AdminUser";
import { connect } from "react-redux";
import { editAdminUserStatus, getAdminUserData } from "../../Api/api-admin";

function AdminUserContainer(props) {
  return (
    <AdminUser
      dataUser={props.dataUser}
      getAdminUserData={props.getAdminUserData}
      editAdminUserStatus={props.editAdminUserStatus}
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
  editAdminUserStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserContainer);
