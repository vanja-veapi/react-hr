import { REGISTER_USER } from "./types";

export const registerUser = (user) => {
	return {
		type: REGISTER_USER,
		payload: user,
	};
};
