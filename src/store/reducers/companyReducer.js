import * as types from "../types";

export const companyReducer = (state = {}, action) => {
	switch (action.type) {
		case types.RECEIVE_ALL_COMPANY:
			return { ...state, ...action.payload };
		default:
			return state;
	}
};
