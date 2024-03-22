const ACTION_USER_DATA = "ACTION_USER_DATA";
const ACTION_ALL_USER_DATA = "ACTION_ALL_USER_DATA";
const SET_AUTH_SUCCESS = "SET_AUTH_SUCCESS";
const LOGOUT = "LOGOUT";
const UPDATE_USER_ONLINE_STATUS = "UPDATE_USER_ONLINE_STATUS";

export const setDataUser = (dataUser) => ({
  type: ACTION_USER_DATA,
  dataUser: { ...dataUser }, // Глубокое копирование dataUser
});

export const setAllDataUser = (allUser) => ({
  type: ACTION_ALL_USER_DATA,
  allUser: [...allUser], // Глубокое копирование массива allUser
});

export const setAuthSuccess = () => ({
  type: SET_AUTH_SUCCESS,
});

export const logout = () => ({
  type: LOGOUT,
});

export const updateUserOnlineStatus = (userId, isOnline) => ({
  type: UPDATE_USER_ONLINE_STATUS,
  payload: { userId, isOnline },
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
    vip: false,
  },
  allUser: [],
  isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_USER_DATA:
      return {
        ...state,
        dataUser: { ...action.dataUser }, // Глубокое копирование action.dataUser
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
