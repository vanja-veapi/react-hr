import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import Service from "../../services/service";

const editCompany = async (company) => {
	console.log(company);
	let img = company.isFileSubmited ? null : company.image;
	if (company.image !== null && company.isFileSubmited) {
		const image = await Service.uploadImage(company.image).then((res) => res);
		img = image.payload[0];
	}
	return axios
		.put(`${process.env.REACT_APP_BASEURL}/api/companies/${company.id}?populate=*`, { data: { name: company.name, slug: company.name.toLowerCase().replaceAll(" ", "-"), logo: img } })
		.then((res) => res)
		.catch((err) => err.response.data.error);
};
export default function useEditCompanyData() {
	const queryClient = useQueryClient();
	return useMutation(editCompany, {
		onSuccess: (data) => {
			//Visak, trebalo bi da ide u onMutate...
			const companyId = data.data.data.id;
			queryClient.setQueryData(["company", companyId], data);
			return data;
		},
		onError: (error) => {
			return error;
		},
	});
}
