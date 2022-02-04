import { put, call } from "redux-saga/effects";
import AuthService from "../services/auth-service";
import { setInitalLoading, setLoginUser, loginError } from "../store/actions";

/*export function* hendlerLoginSaga(action) {
	try {
		const response = yield call(AuthService.login, action.email,action.password);

		yield put(setInitalLoading(false));
		if (response.status === 200) {
			const user = {
                jwt: response.data.jwt,
                user: response.data.user
            }
            yield put(setLoginUser(user))
		}
		
	} catch (error) {
		yield put(loginError(error));
	}
}*/

import * as types from "../store/types";

export function* hendlerLoginSaga(object) {
	console.log(object);
	try {
		let response = yield call(AuthService.login, object.payload);

		yield put(setInitalLoading(false));
		if (response.status >= 400) {
			throw response;
		}
		yield put({ type: types.SET_LOGIN_USER, response });
	} catch (error) {
		yield put({ type: types.LOGIN_USER_ERROR, error });
	}
}
