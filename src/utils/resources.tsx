import ores from "../data/ores.json";
import towns from "../data/towns.json";
import plants from "../data/plants.json";
import { nanoid } from "nanoid";
import ResourceMarker from "../pages/Map/ResourceMarker";

const sanitizeName = (name: string) =>
	name.replace(/_/g, " ").replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());

const createMarkers = (icon: string, locations: any) =>
	Object.values<any>(locations).map((e) => (
		<ResourceMarker
			key={nanoid()}
			icon={icon}
			position={[parseFloat(e.x + ""), parseFloat(e.y + "")]}
		/>
	));

export type LayersMenu = Record<
	string,
	{ open: boolean; resources: Record<string, boolean> }
>;

export const markersMappings: { [x: string]: JSX.Element[] } = {};

export const resourcesMenu: LayersMenu = {
	Ores: mapOresMenu(),
};

mapPlantsMenu();

function mapOresMenu() {
	const result: {
		open: boolean;
		resources: Record<string, boolean>;
	} = {
		open: false,
		resources: {},
	};
	Object.keys(ores)
		.sort()
		.forEach((name) => {
			result.resources[sanitizeName(name)] = false;
		});

	Object.entries(ores).forEach(([ore, data]) => {
		markersMappings["Ores-" + sanitizeName(ore)] = Object.values(data).map(
			(e) => (
				<ResourceMarker
					key={nanoid()}
					icon={ore}
					position={[parseFloat(e.x + ""), parseFloat(e.y + "")]}
				/>
			)
		);
	});

	return result;
}

function mapPlantsMenu() {
	const pigments: string[] = [];
	const ingredients: string[] = [];
	const gatherables = ["azoth_water", "hemp_t5", "herb", "hemp_t4", "hemp"];

	Object.entries(plants).forEach(([name, locations]) => {
		const sanitizedName = sanitizeName(name);

		// if (name.startsWith("pigment_plant")) {
		// 	const pigmentName = name.split("pigment_plant_")[1];
		// 	pigments.push(pigmentName);
		// 	markersMappings["Pigments-" + sanitizeName(pigmentName)] =
		// 		createMarkers(name, locations);
		// 	return;
		// }
		if (
			name.replace("pigment_plant", "dye_plant").startsWith("dye_plant")
		) {
			name = name.replace("pigment_plant", "dye_plant");
			const dyeName = name.split("dye_plant_")[1];
			pigments.push(dyeName);
			markersMappings["Pigments-" + sanitizeName(dyeName)] =
				createMarkers(name, locations);
			return;
		}

		if (!gatherables.includes(name)) {
			ingredients.push(name);
			markersMappings["Ingredients-" + sanitizedName] = createMarkers(
				name,
				locations
			);
			return;
		}

		markersMappings["Gatherables-" + sanitizedName] = createMarkers(
			name,
			locations
		);
	});

	resourcesMenu["Pigments"] = {
		open: false,
		resources: Object.fromEntries(
			pigments.sort().map((e) => [sanitizeName(e), false])
		),
	};

	resourcesMenu["Gatherables"] = {
		open: false,
		resources: Object.fromEntries(
			gatherables.sort().map((e) => [sanitizeName(e), false])
		),
	};

	resourcesMenu["Ingredients"] = {
		open: false,
		resources: Object.fromEntries(
			ingredients.sort().map((e) => [sanitizeName(e), false])
		),
	};
}
