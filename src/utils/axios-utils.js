import axios from "axios";

const client = axios.create({ baseURL: process.env.REACT_APP_BASEURL });
export const request = ({ ...options }) => {
	client.defaults.headers.common.Authoization = "Bearer token";
	const OnSuccess = (response) => {
		return response;
	};
	const onError = (error) => {
		// const errorMessages = error.response.data.error.details.errors; //Fetch all messages

		// if (errorMessages === undefined) {
		// 	// alert(error.response.data.error.message);
		// 	return error.response;
		// }

		// let msgInfo = "";
		// errorMessages.forEach((msg) => {
		// 	msgInfo += msg.message + "\n"; //ForEach used if we have more than one error, than we can render more msg
		// });
		// // alert(msgInfo);
		return error.response;
	};

	return client(options).then(OnSuccess).catch(onError);
};
