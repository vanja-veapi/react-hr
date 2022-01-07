import { createStore, combineReducers } from "redux";
import { reducer } from "./store/reducer";

const store = combineReducers({
	userStore: reducer,
});
export default createStore(store);
