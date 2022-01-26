import { fork } from "redux-saga/effects";
import watchUserAuthentication from "./watchers";
import watchRequestCompany from "./watchers";
import watchLoginSaga from "./watchers"

export default function* startForman() {
	yield fork(watchUserAuthentication);
}
export function* startLog() {
	yield fork(watchLoginSaga);
}

export function* startReciving() {
	yield fork(watchRequestCompany);
}
