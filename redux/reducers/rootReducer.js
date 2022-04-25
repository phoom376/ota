import { combineReducers } from "redux";
import boardsReducer from "./boards.reducers";
import filesReducer from "./files.reducer";

const rootReducer = combineReducers({
  boards: boardsReducer,
  files: filesReducer,
});

export default rootReducer;
