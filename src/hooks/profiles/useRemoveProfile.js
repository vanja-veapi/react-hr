import { useMutation } from "react-query";
import Service from "../../services/service";
export default function useRemoveProfile() {
	return useMutation(Service.removeProfile);
}
