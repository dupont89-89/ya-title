const ACTION_SET_DATA_PAGE_APP = "ACTION_SET_DATA_PAGE_APP";

// Действия для обновления состояния
export const setDataPageApp = (page) => ({
  type: ACTION_SET_DATA_PAGE_APP,
  page: page,
});

const initialState = {
  pageApp: [
    {
      pageTitle: "",
      slug: "",
      textContent: "",
      metaTitle: "",
      metaDescription: "",
    },
  ],
};

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_SET_DATA_PAGE_APP:
      return {
        ...state,
        pageApp: [...action.page], // Заменяем текущие данные новыми
      };

    default:
      return state;
  }
};

export default pageReducer;
