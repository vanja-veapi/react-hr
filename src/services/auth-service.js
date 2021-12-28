import { request } from "../utils/axios-utils";
class AuthService {
	static register(data) {
		// return request({ url: process.env.REACT_APP_BASEURL + "/users", method: "POST", data });
		return request({ url: "/api/auth/local/register", method: "POST", data });
	}
}
export default AuthService;
