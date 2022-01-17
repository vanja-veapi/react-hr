import { put, call } from "redux-saga/effects";
import Service from "../services/service";
import { recevieAllCompany } from "../store/actions";
export function* getAllCompanySaga() {
	try {
		const response = yield call(Service.getAllCompany);
		yield put(recevieAllCompany(response));
	} catch (error) {
		console.log(error);
	}
}
