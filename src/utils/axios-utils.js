import axios from "axios";

const client = axios.create({ baseURL: process.env.REACT_APP_BASEURL });

export const request = ({ ...options }) => {
	client.defaults.headers.common.Authoization = "Bearer token";
	const onSuccess = (response) => {
		return response;
	};
	const onError = (error) => {
		const errorMessages = error.response.data.error.details.errors; //Fetch all messages

		if (errorMessages === undefined) {
			return alert(error.response.data.error.message);
		}

		let msgInfo = "";
		errorMessages.forEach((msg) => {
			msgInfo += msg.message + "\n"; //ForEach used if we have more than one error, than we can render more msg
		});
		return alert(msgInfo);
	};

	return client(options).then(onSuccess).catch(onError);
};
