import React, { useMemo } from "react";
import { nanoid } from "nanoid";
import ResourceMarker from "../ResourceMarker";
import TownMarker from "../TownMarker";
import ores from "../../../data/ores.json";
import towns from "../../../data/towns.json";
import {
	LayersMenu,
	markersMappings,
	resourcesMenu,
} from "../../../utils/resources";

export type ResourcesRendererProps = {
	resources: LayersMenu;
};

const ALL_MARKERS: Record<string, JSX.Element[]> = {
	towns: towns.map((e) => (
		<TownMarker
			key={nanoid()}
			icon={e.icon}
			label={e.name.replace("ui_poi_town_", "").replace("_", " ")}
			position={[e.x, e.y]}
		/>
	)),
};

export default function ResourcesRenderer({
	resources,
}: ResourcesRendererProps) {
	const markers = useMemo<JSX.Element[]>(
		() => [
			...ALL_MARKERS.towns,
			...(
				Object.entries(resources)
					.map(([category, content]) => {
						return Object.entries(content.resources).map(
							([name, enabled]) =>
								enabled
									? markersMappings[`${category}-${name}`]
									: null
						);
					})
					.flat(2) as JSX.Element[]
			).filter((e) => !!e),
		],
		[resources]
	);

	return <>{markers}</>;
}
