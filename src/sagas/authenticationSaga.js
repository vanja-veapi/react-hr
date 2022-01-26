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
			config.headers.Authorization = `Bearer ${token}`; // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMxLCJpYXQiOjE2NDMwMjIxNjIsImV4cCI6MTY0MzAyOTM2Mn0.5ps7ojZoAEZJUJsGvNwtFJW6BUmaVpbS-FJQiV79x_k
		}
		return config;
	},
	(error) => {
		console.log(error);
	}
);

export function* registerSaga({ payload: { email, password, username, photo, role, newCompany } }) {
	try {
		const response = yield call(AuthService.register, { email, password, username });
		console.log(response);

		yield put(setInitalLoading(false));
		if (response.status >= 400) {
			throw response;
		}

		yield put({ type: types.REGISTER_USER_SUCCESS, response: response });

		// If Company string isn't a number, that means we have to create a new company.
		if (isNaN(newCompany)) {
			const companyResponse = yield call(Service.createNewCompany, { name: newCompany, slug: newCompany.toLowerCase() });
			if (companyResponse.status >= 400) {
				throw companyResponse;
			}
			yield put({ type: types.CREATE_NEW_COMPANY, response: companyResponse });
		}

		let imageId = null;
		if (photo !== null) {
			const image = yield call(Service.uploadImage, photo);
			imageId = image.payload[0].id;
		}
		yield call(Service.createNewProfile, { name: username, user: response.data.user.id, userRole: role, company: Number(newCompany), profilePhoto: imageId });
	} catch (error) {
		yield put({ type: types.REGISTER_USER_ERROR, error });
	}
}
