import { combineReducers } from "redux";
import { registerReducer } from "./reducers/registerReducer";
import { loadingReducer } from "./reducers/loadingReducer";
import { companyReducer } from "./reducers/companyReducer";
import { loginReducer } from "./reducers/loginReducer";

const rootReducer = combineReducers({
	loadingReducer,
	registerReducer,
	companyReducer,
	loginReducer,
});

export default rootReducer;
