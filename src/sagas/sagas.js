
import { put, call } from "redux-saga/effects";
import Service from "../services/service";
import { recevieAllCompany, fetchProfileReceive, editUserResponse, setInitalLoading } from "../store/actions";


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
