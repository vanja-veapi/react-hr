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

export const requestAllCompany = () => {
	return {
		type: types.REQUEST_ALL_COMPANY,
	};
};

export const recevieAllCompany = (companies) => {
	return {
		type: types.RECEIVE_ALL_COMPANY,
		payload: companies,
	};
};

export const login = (email,password) => ({
	type: types.LOGIN_USER,
	payload: {
		email,password
	}
});

export const loginError = () => ({
	type: types.LOGIN_USER_ERROR
});

export const setLoginUser = (user) => ({
	type: types.SET_LOGIN_USER,
	payload: user
});
