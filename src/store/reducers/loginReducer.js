import {SET_LOGIN_USER, LOGIN_USER_ERROR} from "../types";

const  initialStateLogin = {
    user: {},
    isLoggedIn: false,
    isError: false,
    isLoading: false,
    response: "",
    role: null

}


export const loginReducer = (state = initialStateLogin, action) => {
    let response = action.response !== undefined ? action.response : action.error;
    switch(action.type) {
		case SET_LOGIN_USER:
			return { ...state,
            user: action.payload,
            isLoggedIn: true,
            isError: false,
            isLoading: false,
            response,
         };
         
		case LOGIN_USER_ERROR:
			return { ...state,
            isError: true,
            response
         };
		default:
			return state;
    }
	
};