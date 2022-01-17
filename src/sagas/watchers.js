import { all, fork, takeEvery, takeLatest } from "redux-saga/effects";
import { registerSaga } from "./authenticationSaga";
import { getAllCompanySaga } from "./getAllCompanySaga";

import * as types from "../store/types";

function* watchUserAuthentication() {
	yield takeLatest(types.REGISTER_USER, registerSaga);
}
function* watchRequestCompany() {
	yield takeEvery(types.REQUEST_ALL_COMPANY, getAllCompanySaga);
}

export default function* rootSaga() {
	yield all([fork(watchUserAuthentication), fork(watchRequestCompany)]);
}
