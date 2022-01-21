import axios from "axios";

const client = axios.create({ baseURL: process.env.REACT_APP_BASEURL });
export const request = ({ ...options }) => {
	console.log(options.headers);

	if (options.headers !== undefined) {
		// console.log(options.headers["Content-Type"]);
		client.defaults.headers.post["Content-Type"] = options.headers["Content-Type"];
	}

	const OnSuccess = (response) => {
		if (response.data.jwt) {
			const token = response.data.jwt;
			client.defaults.headers.common.Authoization = `Bearer ${token}`; //Ubaciti token dinamicno umesto stringa token
			localStorage.setItem("token", token);
		}
		return response;
	};
	const onError = (error) => {
		return error.response;
	};

	return client(options).then(OnSuccess).catch(onError);
};
