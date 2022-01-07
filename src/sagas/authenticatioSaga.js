import { put, call } from "redux-saga/effects";
import AuthService from "../services/auth-service";

import * as types from "../store/types";

export function* registerSaga(payload) {
	console.log("Srbija");
	console.log(payload);
	try {
		const response = yield call(AuthService.register, payload);
		console.log(response);
		yield [put({ type: types.REGISTER_USER_SUCCESS, response })];
	} catch (error) {
		yield put({ type: types.REGISTER_USER.ERROR, error });
		console.log(error);
	}
}
