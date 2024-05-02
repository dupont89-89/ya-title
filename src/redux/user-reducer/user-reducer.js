const ACTION_USER_DATA = "ACTION_USER_DATA";
const SET_AUTH_SUCCESS = "SET_AUTH_SUCCESS";
const LOGOUT = "LOGOUT";
const ACTION_SET_NOTIFICATIONS = "ACTION_SET_NOTIFICATIONS";
const ACTION_SET_AVATAR = "ACTION_SET_AVATAR";

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

export const setNotifications = (notifications) => ({
  type: ACTION_SET_NOTIFICATIONS,
  notifications: notifications,
});

export const setAvatarUser = (avatar) => ({
  type: ACTION_SET_AVATAR,
  avatar: avatar,
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
    firstName: "Ты",
    lastName: "Аноним",
    role: "user",
    avatar: "/uploads/dev-image/no-avatar.png",
    money: 0,
    moneyHistory: 0,
    lvt: 0,
    totalLvt: 0,
    bonusDayLvt: 0,
    lvtPresent: {
      lvtPresentReferal: 0,
      lvtPresentRegistration: 0,
    },
    notifications: {},
    notificationsHistory: {},
    referal: [],
    referalPay: {},
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
    case ACTION_SET_NOTIFICATIONS:
      return {
        ...state,
        dataUser: {
          ...state.dataUser,
          notifications: action.notifications, // Обновляем только уведомления
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
