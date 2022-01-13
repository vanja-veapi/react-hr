import * as types from "../types";

export const registerReducer = (state = {}, action) => {
	let response = action.response !== undefined ? action.response : action.error;
	switch (action.type) {
		case types.REGISTER_USER_SUCCESS:
			return { ...state, response };
		case types.REGISTER_USER_ERROR:
			return { ...state, response };
		default:
			return state;
	}
};
