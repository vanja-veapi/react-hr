import * as types from "../types";

export const dataReducer = (state = {}, action) => {
	switch (action.type) {
		case types.RECEIVE_ALL_COMPANY:
			return { ...state, ...action.payload };
		case types.FETCH_PROFILE_RECEIVE:
			return { ...state, ...action.payload };
		default:
			return state;
	}
};
