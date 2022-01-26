import { request } from "../utils/axios-utils";
class AuthService {
	static register(data) {
		return request({ url: "/api/auth/local/register", method: "POST", data });
	}
	static login(data) {
		return request({ url: "/api/auth/local", method: "POST", data: {identifier:data.email, password:data.password} });
	}
}
export default AuthService;
