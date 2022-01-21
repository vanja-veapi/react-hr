import axios from "axios";
import { put, call } from "redux-saga/effects";
import AuthService from "../services/auth-service";
import Service from "../services/service.js";
import { setInitalLoading } from "../store/actions";

import * as types from "../store/types";

axios.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		console.log(error);
	}
);

export function* registerSaga({ payload: { email, password, username, photo } }) {
	try {
		const response = yield call(AuthService.register, { email, password, username });
		console.log(response);

		yield put(setInitalLoading(false));
		if (response.status >= 400) {
			throw response;
		}

		yield put({ type: types.REGISTER_USER_SUCCESS, response: response });
		const image = yield call(Service.uploadImage, photo);
		console.log(image);
		const imageId = image.payload[0].id;

		yield call(Service.createNewProfile, { name: username, user: response.data.user.id, userRole: "company_user", company: 7, profilePhoto: imageId });
	} catch (error) {
		yield put({ type: types.REGISTER_USER_ERROR, error });
	}
}
