const ACTION_SET_BALL_DIRECT = "ACTION_SET_BALL_DIRECT";
const ACTION_SET_DOMEN_SUBSCRIPTION = "ACTION_SET_DOMEN_SUBSCRIPTION";

// Действия для обновления состояния
export const setBallDirect = (ball) => ({
  type: ACTION_SET_BALL_DIRECT,
  ballDirect: ball,
});

export const setDomenSubscription = (dataDomen) => ({
  type: ACTION_SET_DOMEN_SUBSCRIPTION,
  dataDomen: dataDomen,
});

const initialState = {
  countWordKey: {
    ballDirect: 0,
  },
  whoisDomenSubscription: [
    {
      domen: "",
      freeData: "",
    },
  ],
};

const toolsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_SET_BALL_DIRECT:
      return {
        ...state,
        countWordKey: {
          ...state.countWordKey,
          ballDirect: action.ballDirect,
        },
      };

    case ACTION_SET_DOMEN_SUBSCRIPTION:
      return {
        ...state,
        whoisDomenSubscription: [...action.dataDomen], // Заменяем текущие данные новыми
      };

    default:
      return state;
  }
};

export default toolsReducer;
