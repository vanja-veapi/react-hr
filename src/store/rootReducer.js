import { combineReducers } from "redux";
import { loadingReducer } from "./reducers/loadingReducer";
import { dataReducer } from "./reducers/dataReducer";
import { authReducer } from "./reducers/authReducer";

const rootReducer = combineReducers({
	dataReducer,
	loadingReducer,
	authReducer,
	
});

export default rootReducer;
