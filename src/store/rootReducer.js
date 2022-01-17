import { combineReducers } from "redux";
import { registerReducer } from "./reducers/registerReducer";
import { loadingReducer } from "./reducers/loadingReducer";
import { companyReducer } from "./reducers/companyReducer";

const rootReducer = combineReducers({
	loadingReducer,
	registerReducer,
	companyReducer,
});

export default rootReducer;
