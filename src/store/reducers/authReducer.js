import * as types from "../types";

const initialState = {
	user: {},
	isLoggedIn: false,
	isError: false,
	isLoading: false,
	response: "",
	role: null,
};

export const authReducer = (state = initialState, action) => {
	let response = action.response !== undefined ? action.response : action.error;
	switch (action.type) {
		case types.REGISTER_USER_SUCCESS:
			return { ...state, response };
		case types.REGISTER_USER_ERROR:
			return { ...state, response };
		case types.CREATE_NEW_COMPANY:
			return { ...state, response };
		case types.SET_LOGIN_USER:
			return { ...state, user: action.payload, isLoggedIn: true, isError: false, isLoading: false, response };
		case types.LOGIN_USER_ERROR:
			return { ...state, isError: true, response };
		case types.LOGOUT_SUCCESS:
			return (state.response = {});
		default:
			return state;
	}
};
