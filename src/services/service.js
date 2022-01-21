import { request } from "../utils/axios-utils";
import axios from "axios";
class Service {
	static getAllCompany() {
		return request({ url: "/api/companies", method: "GET" });
	}
	//OVAKO NE RADI
	// static uploadImage(image) {
	// 	return request({
	// 		url: "/api/upload",
	// 		method: "POST",
	// 		data: image,
	// 		headers: {
	// 			"Content-Type": "multipart/form-data",
	// 		},
	// 	});
	// }

	static createNewProfile = async (data) => {
		try {
			console.log(data.name + data.user + data.userRole + data.company + data.profilePhoto);
			const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/profiles`, {
				data: data,
			});
			console.log(response);
			return { payload: response.data };
		} catch (error) {
			console.log(error);
		}
	};
	static uploadImage = async (image) => {
		try {
			console.log(image);
			const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/upload`, image, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			console.log(response);
			return { payload: response.data };
		} catch (error) {
			console.log(error.error);
			return error;
		}
	};
}

export default Service;
