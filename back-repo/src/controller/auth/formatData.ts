import list from '../../Middlewares/list';

export const getPermiss = (value: any[]) => {
	let list: { [key: string]: number } = {};
	for (const key of value) {
		if (key.active) {
			let item: string = key.id_action.name;
			//console.log(item);
			list[item] = key.id_action.id;
		}
	}
	return list;
};

interface ViewsUser {
	name: string;
	key: number;
	root: string;
}

export const getViews = (access_views: any[]) => {
	let listViews: ViewsUser[] = [];
	for (const key of access_views) {
		if (key.active) {
			listViews.push({
				name: key.id_views.name,
				key: key.id_views.key,
				root: key.id_views.root,
			});
			//console.log(item);
			//listViews[item] = key.id_views.id;
		}
	}
	return listViews;
};
