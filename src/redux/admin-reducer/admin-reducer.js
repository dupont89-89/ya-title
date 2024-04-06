const ACTION_SET_USER_DATA = "ACTION_SET_USER_DATA";

export const setAdminDataUser = (dataUser) => ({
  type: ACTION_SET_USER_DATA,
  dataUser: dataUser,
});

const initialState = {
  dataUser: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_SET_USER_DATA:
      return {
        ...state,
        dataUser: action.dataUser, // Просто устанавливаем новое значение для dataUser
      };
    default:
      return state;
  }
};

export default adminReducer;
