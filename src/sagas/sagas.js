import axios from "axios";
import { put, call } from "redux-saga/effects";
import Service from "../services/service";
import { recevieAllCompany, fetchProfileReceive, editUserResponse } from "../store/actions";

axios.interceptors.request.use(
	(config) => {
		const token = JSON.parse(localStorage.getItem("userData")).token;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`; // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMxLCJpYXQiOjE2NDMwMjIxNjIsImV4cCI6MTY0MzAyOTM2Mn0.5ps7ojZoAEZJUJsGvNwtFJW6BUmaVpbS-FJQiV79x_k
		}
		return config;
	},
	(error) => {
		console.log(error);
	}
);
export function* getAllCompanySaga() {
	try {
		const response = yield call(Service.getAllCompany);
		yield put(recevieAllCompany(response));
	} catch (error) {
		console.log(error);
	}
}

export function* fetchProfileSaga(id) {
	try {
		console.log("3. sagas.js");
		const response = yield call(Service.fetchUser, id);
		yield put(fetchProfileReceive(response));
	} catch (error) {
		return error;
	}
}

export function* editUserSaga(payload) {
	try {
		//AKo je object.formData != null onda upisi sliku u bazu, a ako nje to ostaje null i salje se na izmenu
		let imageId = payload.object.imageId !== null ? payload.object.imageId : null;
		if (payload.object.newImageData !== null && (payload.object.imageId !== null || undefined)) {
			const image = yield call(Service.uploadImage, payload.object.newImageData);
			imageId = image.payload[0].id;
		}
		const response = yield call(Service.editUser, { object: payload.object }, imageId);
		yield put(editUserResponse(response));
		window.location.reload();
	} catch (error) {
		return error;
	}
}
