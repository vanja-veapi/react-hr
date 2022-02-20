import Service from "../../services/service";
export default function useRemoveProfile(ev) {
	const id = ev.currentTarget.id;
	const card = ev.currentTarget.parentElement.parentElement.parentElement.parentElement;

	Service.removeProfile(id);
	card.remove();
}
