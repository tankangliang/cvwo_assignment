import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import notesReducer from "./reducers/notesReducer";
import tagsReducer from "./reducers/tagsReducer";
import datesReducer from "./reducers/datesReducer";

const reducer = combineReducers({
  notes: notesReducer,
  tags: tagsReducer,
  dates: datesReducer
});

export type RootState = ReturnType<typeof reducer>;

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
