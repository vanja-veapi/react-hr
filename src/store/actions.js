import * as types from "./types";
export const registerUser = (user) => {
	return {
		type: types.REGISTER_USER,
		payload: user,
	};
};

export const setInitalLoading = (value) => {
	return {
		type: types.SET_INITAL_LOADING,
		value,
	};
};
