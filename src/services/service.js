import { request } from "../utils/axios-utils";
class Service {
	static getAllCompany() {
		return request({ url: "/api/companies", method: "GET" });
	}
}

export default Service;
