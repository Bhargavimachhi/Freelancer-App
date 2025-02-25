export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "SET_USER_DATA":
      return {
        ...state,
        userData: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};
