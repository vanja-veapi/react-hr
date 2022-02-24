import { useQuery } from "react-query";
// import { useSelector } from "react-redux";
import Service from "../../services/service";
import { useSelector } from "react-redux";
export default function usePendingProfiles() {
	// const companyId = 5; //Dnevnjak DOO 58, 37 imt
	const user = useSelector((state) => state.dataReducer.data?.data);
	const companyId = user[0].attributes.company.data.id;
	return useQuery(["pending-profiles", companyId], Service.fetchPendingProfiles, { enabled: !!companyId });
}
