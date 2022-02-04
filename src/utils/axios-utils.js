import axios from "axios";



const client = axios.create({ baseURL: process.env.REACT_APP_BASEURL });
export const request = ({ ...options }) => {
	if (options.headers !== undefined) {
		client.defaults.headers.post["Content-Type"] = options.headers["Content-Type"];
	}

	const OnSuccess = (response) => {
		if (response.data.jwt) {
			const token = response.data.jwt;
			const id = response.data.user.id;
			const userData = { token, id };
			client.defaults.headers.common.Authoization = `Bearer ${token}`; //Ubaciti token dinamicno umesto stringa token

			localStorage.setItem("userData", JSON.stringify(userData));
			
		}
		return response;
	};
	
	const onError = (error) => {
		return error.response;
	};

	return client(options).then(OnSuccess).catch(onError);
};


export default client;
  
