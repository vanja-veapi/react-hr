import { all, fork, takeEvery, takeLatest } from "redux-saga/effects";
import { registerSaga } from "./authenticationSaga";
import { getAllCompanySaga, fetchProfileSaga, editUserSaga } from "./sagas";
import { hendlerLoginSaga } from "./loginSaga";

import * as types from "../store/types";

function* watchUserAuthentication() {
	yield takeLatest(types.REGISTER_USER, registerSaga);
}
function* watchLoginSaga() {
	yield takeLatest(types.LOGIN_USER, hendlerLoginSaga);
}
function* watchRequestCompany() {
	yield takeEvery(types.REQUEST_ALL_COMPANY, getAllCompanySaga);
}
function* watchFetchProfileRequest() {
	yield takeLatest(types.FETCH_PROFILE_REQUEST, fetchProfileSaga);
}
function* watchEditUserRequest() {
	yield takeLatest(types.EDIT_USER_REQUEST, editUserSaga);
}

export default function* rootSaga() {
	yield all([fork(watchUserAuthentication), fork(watchLoginSaga), fork(watchRequestCompany), fork(watchFetchProfileRequest), fork(watchEditUserRequest)]);
}
