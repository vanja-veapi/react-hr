import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Service from "../services/service";

const id = localStorage.getItem("companyId");

const fetchCompany = () => {
	return axios.get(`${process.env.REACT_APP_BASEURL}/api/companies/${id}?populate=*`);
};

const editCompany = async (company) => {
	let img = company.isFileSubmited ? null : company.image;
	if (company.image !== null && company.isFileSubmited) {
		const image = await Service.uploadImage(company.image).then((res) => res);
		img = image.payload[0];
	}
	return axios
		.put(`${process.env.REACT_APP_BASEURL}/api/companies/${id}?populate=*`, { data: { name: company.name, slug: company.name.toLowerCase().replaceAll(" ", "-"), logo: img } })
		.then((res) => res)
		.catch((err) => err.response.data.error);
};

// Deifining custom hooks
export const useComapnyData = () => {
	return useQuery("company", fetchCompany, { refetchOnWindowFocus: false, queryKey: false });
};

export const useEditCompanyData = () => {
	const queryClient = useQueryClient();
	return useMutation(editCompany, {
		onSuccess: (data) => {
			queryClient.setQueryData("company", data);
			return data;
		},
		onError: (error) => {
			return error;
		},
	});
};
