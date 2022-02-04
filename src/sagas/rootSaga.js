import { fork } from "redux-saga/effects";
import watchUserAuthentication from "./watchers";
import watchRequestCompany from "./watchers";
import watchLoginSaga from "./watchers";
import watchFetchProfileRequest from "./watchers";

export default function* startForman() {
	yield fork(watchUserAuthentication);
}
export function* startLog() {
	yield fork(watchLoginSaga);
}

export function* startReciving() {
	yield fork(watchRequestCompany);
}

export function* fetchUserReceive() {
	console.log("USAO SAM U root sagu");
	yield fork(watchFetchProfileRequest);
}

//Mozda je i nebitan ovaj fajl
// function* watchEditUserRequest() {
// 	console.log("WATCH");
// 	yield takeLatest(types.EDIT_USER_REQUEST, editUserSaga);
// }
