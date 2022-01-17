import * as types from "../types";
export const loadingReducer = (state = {}, action) => {
	switch (action.type) {
		case types.SET_INITAL_LOADING:
			return { ...state, loading: action.value };
		default:
			return state;
	}
};
