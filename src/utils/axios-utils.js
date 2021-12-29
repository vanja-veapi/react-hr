import axios from "axios";

const client = axios.create({ baseURL: process.env.REACT_APP_BASEURL });

/**
 * @param {*} options is object @returns 3 params:
 * URL, Method, Data
 */
export const request = ({ ...options }) => {
	client.defaults.headers.common.Authoization = "Bearer token";
	const onSuccess = (response) => {
		console.log(options);
		return response;
	};
	const onError = (error) => {
		const errorMessages = error.response.data.error.details.errors; //Fetch all messages
		let msgInfo = "";

		if (errorMessages === undefined) {
			return alert(error.response.data.error.message);
		}
		errorMessages.forEach((msg) => {
			msgInfo += msg.message + "\n"; //ForEach used if we have more than one error, than we can render more msg
		});
		return alert(msgInfo);
	};

	return client(options).then(onSuccess).catch(onError);
};
