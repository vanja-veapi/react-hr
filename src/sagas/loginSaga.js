import { put, call } from "redux-saga/effects";
import AuthService from "../services/auth-service";
import { setInitalLoading,setLoginUser,loginError } from "../store/actions";
import * as types from "../store/types";
import Service from "../services/service";






export function* hendlerLoginSaga(object) {
	console.log(object)
	
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