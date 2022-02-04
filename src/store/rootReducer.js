import { combineReducers } from "redux";
import { registerReducer } from "./reducers/registerReducer";
import { loadingReducer } from "./reducers/loadingReducer";
import { dataReducer } from "./reducers/dataReducer";
import { loginReducer } from "./reducers/loginReducer";

const rootReducer = combineReducers({
	dataReducer,
	loadingReducer,
	registerReducer,
	loginReducer,
});

export default rootReducer;
