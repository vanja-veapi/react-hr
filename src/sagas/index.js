import { fork } from "redux-saga/effects";
import watchUserAuthentication from "./watchers";

export default function* startForman() {
	console.log("Start forman");
	yield fork(watchUserAuthentication);
}
