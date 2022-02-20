import { useQuery } from "react-query";
// import { useSelector } from "react-redux";
import Service from "../../services/service";
export default function usePendingProfiles() {
	const companyId = 58; //Dnevnjak DOO
	return useQuery(["pending-profiles", companyId], Service.fetchPendingProfiles, { enabled: !!companyId });
}
