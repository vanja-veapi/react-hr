import { put, call } from "redux-saga/effects";
import AuthService from "../services/auth-service";
import { setInitalLoading } from "../store/actions";

import * as types from "../store/types";

export function* registerSaga(object) {
	try {
		let response = yield call(AuthService.register, object.payload);

		yield put(setInitalLoading(false));
		if (response.status >= 400) {
			throw response;
		}
		yield put({ type: types.REGISTER_USER_SUCCESS, response });
	} catch (error) {
		yield put({ type: types.REGISTER_USER_ERROR, error });
	}
}
