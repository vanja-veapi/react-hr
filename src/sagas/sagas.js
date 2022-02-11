import axios from "axios";
import { put, call } from "redux-saga/effects";
import Service from "../services/service";
import { recevieAllCompany, fetchProfileReceive, editUserResponse, setInitalLoading } from "../store/actions";
import jwt_decode from "jwt-decode";

axios.interceptors.request.use(
	(config) => {
		const token = JSON.parse(localStorage.getItem("userData")).token;
		// console.log(token);
		if (token) {
			let decodedToken = jwt_decode(token);
			let currentDate = new Date();
			if (decodedToken.exp * 1000 < currentDate.getTime()) {
				localStorage.removeItem("userData");
				console.log("Token expired.");
				return (window.location.href = "/");
			} else {
				config.headers.Authorization = `Bearer ${token}`;
				// console.log("Valid token.");
			}
		}
		return config;
	},
	(error) => {
		Promise.reject(error);
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
		// console.log("3. sagas.js");
		console.log(id);
		const response = yield call(Service.fetchUser, id);
		yield put(setInitalLoading(false));
		yield put(fetchProfileReceive(response));
	} catch (error) {
		return error;
	}
}

export function* editUserSaga(payload) {
	try {
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
