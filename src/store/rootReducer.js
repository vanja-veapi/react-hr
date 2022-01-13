import { combineReducers } from "redux";
import { registerReducer } from "./reducers/registerReducer";
import { reducer } from "./reducer";

const rootReducer = combineReducers({
	loadingReducer: reducer,
	registerReducer,
});

export default rootReducer;
