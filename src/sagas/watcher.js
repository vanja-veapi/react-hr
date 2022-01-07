import { takeLatest } from "redux-saga/effects";
import { registerSaga } from "./authenticationSaga";

import * as types from "../store/types";

export default function* watchUserAuthentication() {
	yield takeLatest(types.REGISTER_USER, registerSaga);
}
