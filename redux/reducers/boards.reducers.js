import { FETCH_BOARDS } from "../actions/boards.redux";
const initialState = {
  boards: [],
};

const boardsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_BOARDS:
      console.log("FETCH_BOARDS");
      return {
        ...state,
        boards: payload,
      };

    default:
      return state;
  }
};

export default boardsReducer;
