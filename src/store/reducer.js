import { REGISTER_USER } from "./types";
export const reducer = (state = {}, action) => {
	switch (action.type) {
		case REGISTER_USER:
			return { ...state, ...action.payload };
		default:
			return state;
	}
};
