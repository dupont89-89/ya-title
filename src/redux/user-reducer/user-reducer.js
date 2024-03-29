import avatarNoDataUser from "./../../img/icon/fox.png";

const ACTION_USER_DATA = "ACTION_USER_DATA";
const SET_AUTH_SUCCESS = "SET_AUTH_SUCCESS";
const LOGOUT = "LOGOUT";

export const setDataUser = (dataUser) => ({
  type: ACTION_USER_DATA,
  dataUser: { ...dataUser }, // Глубокое копирование dataUser
});

export const setAuthSuccess = () => ({
  type: SET_AUTH_SUCCESS,
});

export const logout = () => ({
  type: LOGOUT,
});

export const logoutUserThunkCreator = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
  localStorage.removeItem("userId");
  return (dispatch) => {
    dispatch(logout());
  };
};

const initialState = {
  dataUser: {
    firstName: "Привет",
    lastName: "Гость",
    avatar: avatarNoDataUser,
    money: 0,
    lvt: 0,
    lvtPresent: 0,
    notifications: 0,
    referal: {
      quantity: 0,
    },
  },
  isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_USER_DATA:
      return {
        ...state,
        dataUser: {
          ...state.dataUser, // сохраняем текущие значения dataUser
          ...action.dataUser, // обновляем значения из action.dataUser
        },
      };
    case SET_AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        dataUser: { ...initialState.dataUser }, // Восстановление начального состояния dataUser
      };
    default:
      return state;
  }
};

export default userReducer;
