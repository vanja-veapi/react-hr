import { request } from "../utils/axios-utils";
import axios from "axios";
class Service {
	static getAllCompany() {
		return request({ url: "/api/companies", method: "GET" });
	}

	static createNewProfile = async (data) => {
		try {
			const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/profiles`, {
				data: data,
			});
			console.log(response);
			return { payload: response.data };
		} catch (error) {
			return error;
		}
	};

	static createNewCompany = async (data) => {
		try {
			const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/companies`, {
				data: data,
			});
			console.log(response);
			return { payload: response.data };
		} catch (error) {
			return error.response;
		}
	};
	static uploadImage = async (image) => {
		try {
			const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/upload`, image, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			console.log(response);
			return { payload: response.data };
		} catch (error) {
			return error;
		}
	};

	static fetchUser = async (object) => {
		// console.log("4. service.js");
		try {
			const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/profiles?filters[user][id][$eq]=${object.id}&populate=*`);
			console.log(response);
			return response;
		} catch (error) {
			return error;
		}
	};
	static editUser = async ({ object }, imageId) => {
		try {
			const response = await axios.put(`${process.env.REACT_APP_BASEURL}/api/profiles/${object.profileId}`, { data: { name: object.name, profilePhoto: imageId } });
			return response;
		} catch (error) {
			return error;
		}
	};
}

export default Service;
