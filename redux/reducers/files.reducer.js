import { FETCH_FILES_DATA } from "redux/actions/file.actions";

const initialState = {
  files: [],
};

const filesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_FILES_DATA:
      return {
        ...state,
        files: payload,
      };

    default:
      return state;
  }
};

export default filesReducer;
