import axios from "axios";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";

export const getCompanyQuestions = async (id) => {
	const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/questions?filters[company][id][$eq]=${id.queryKey[1]}&populate=*`);
	return response;
};

export default function useCompanyQuestions() {
	let company = useSelector((state) => state.dataReducer?.data?.data[0]?.attributes.company.data.id);
	if (!company) {
		company = localStorage.getItem("companyId");
	}
	return useQuery(["companyQuestions", company], getCompanyQuestions);
}
