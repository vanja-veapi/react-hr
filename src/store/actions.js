import * as types from "./types";

// Register
export const registerUser = (user) => {
	return {
		type: types.REGISTER_USER,
		payload: user,
	};
};
// Loader
export const setInitalLoading = (value) => {
	return {
		type: types.SET_INITAL_LOADING,
		value,
	};
};

// Fetching companies
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
// Login
export const login = (email, password) => ({
	type: types.LOGIN_USER,
	payload: {
		email,
		password,
	},
});

export const loginError = () => ({
	type: types.LOGIN_USER_ERROR,
});

export const setLoginUser = (user) => ({
	type: types.SET_LOGIN_USER,
	payload: user,
});

// Logout
export const logout = () => ({
	type: types.LOGOUT_SUCCESS,
});

// Fetching user
export const fetchUserRequest = (id = null) => {
	console.log("2. Usao sam u akciju (actions.js)");
	return {
		id,
		type: types.FETCH_PROFILE_REQUEST,
	};
};

export const fetchProfileReceive = (user) => {
	console.log("5. Izlaz (actions.js)");
	return {
		type: types.FETCH_PROFILE_RECEIVE,
		payload: user,
	};
};

// Edit user
export const editUserRequest = (object) => {
	return {
		object,
		type: types.EDIT_USER_REQUEST,
	};
};

export const editUserResponse = (payload) => {
	return {
		payload,
		type: types.EDIT_USER_RESPONSE,
	};
};
