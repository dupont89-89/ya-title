const ACTION_SET_BALL_DIRECT = "ACTION_SET_BALL_DIRECT";
const ACTION_SET_DAY = "ACTION_SET_DAY";

// Действия для обновления состояния
export const setBallDirect = (ball) => ({
  type: ACTION_SET_BALL_DIRECT,
  ballDirect: ball,
});

export const setDay = (day) => ({
  type: ACTION_SET_DAY,
  day: day,
});

const initialState = {
  countWordKey: {
    ballDirect: 0,
  },
  countDay: {
    day: "Monday",
  },
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
    case ACTION_SET_DAY:
      return {
        ...state,
        countDay: {
          ...state.countDay,
          day: action.day,
        },
      };
    default:
      return state;
  }
};

export default toolsReducer;
