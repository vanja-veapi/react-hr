import axios from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import Service from "../../services/service";

const id = localStorage.getItem("companyId");

const fetchCompany = (companyId) => {
	return axios.get(`${process.env.REACT_APP_BASEURL}/api/companies/${companyId.queryKey[1]}?populate=*`);
};

// Deifining custom hooks
export default function useComapnyData() {
	const user = useSelector((state) => state.dataReducer.data.data);
	const companyId = user[0].attributes.company.data.id;

	// queryKey: false
	return useQuery(["company", companyId], fetchCompany, { refetchOnWindowFocus: false });
}
