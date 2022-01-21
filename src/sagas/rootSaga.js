import { fork } from "redux-saga/effects";
import watchUserAuthentication from "./watchers";
import watchRequestCompany from "./watchers";

export default function* startForman() {
	yield fork(watchUserAuthentication);
}

export function* startReciving() {
	yield fork(watchRequestCompany);
}
