import * as types from "./types";
export const reducer = (state = {}, action) => {
	switch (action.type) {
		// case types.REGISTER_USER:
		// 	return { ...state, ...action.payload };
		case types.SET_INITAL_LOADING:
			return { ...state, loading: action.value };
		default:
			return state;
	}
};
