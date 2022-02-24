import axios from "axios";
import jwt_decode from "jwt-decode";



const client = axios.create({ baseURL: process.env.REACT_APP_BASEURL });
export const request = ({ ...options }) => {
	if (options.headers !== undefined) {
		client.defaults.headers.post["Content-Type"] = options.headers["Content-Type"];
	}

	const OnSuccess = (response) => {
		if (response.data.jwt) {
			const token = response.data.jwt;
			const id = response.data.user.id;
			const userData = { token, id};
			client.defaults.headers.common.Authorization = `Bearer ${token}`; //Ubaciti token dinamicno umesto stringa token

			localStorage.setItem("userData", JSON.stringify(userData));
		}
		
		return response;
	};

	const onError = (error) => {
		return error.response;
	};

	return client(options).then(OnSuccess).catch(onError);
};

axios.interceptors.request.use(
	(config) => {
		const token = JSON.parse(localStorage.getItem("userData")).token;
		
		if (token) {
			let decodedToken = jwt_decode(token);
			let currentDate = new Date();
			if (decodedToken.exp * 1000 < currentDate.getTime()) {
				localStorage.removeItem("userData");
				console.log("Token expired.");
				return (window.location.href = "/");
			} else {
				config.headers.Authorization = `Bearer ${token}`;
				
			}
		}
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);


export default client;
