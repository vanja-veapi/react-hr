import { useMutation } from "react-query";
import Service from "../../services/service";

export default function useApproveProfile() {
	return useMutation(Service.approveProfile);
}
