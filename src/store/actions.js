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
