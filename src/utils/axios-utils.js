import axios from "axios";

const client = axios.create({ baseURL: process.env.REACT_APP_BASEURL });

/**
 *
 * @param {*} options is object @returns 3 params:
 * URL, Method, Data
 */
export const request = ({ ...options }) => {
	client.defaults.headers.common.Authoization = "Bearer token";

	const onSuccess = (response) => response;
	const onError = (error) => {
		console.log(error);
		return error;
	};

	return client(options).then(onSuccess).catch(onError);
};
