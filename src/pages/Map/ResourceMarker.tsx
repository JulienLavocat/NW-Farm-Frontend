import React from "react";
import { divIcon, Icon, PointExpression, PointTuple } from "leaflet";
import { Marker, useMap } from "react-leaflet";
import { latDatabaseToMap } from "../../utils";

export interface ResourceMarkerProps {
	position: PointTuple;
	icon: string;
	label?: string;
}

export default function ResourceMarker({
	position,
	icon,
	label,
}: ResourceMarkerProps) {
	const map = useMap();

	return (
		<Marker
			position={[latDatabaseToMap(position[1]), position[0]]}
			icon={
				new Icon({
					iconUrl: `/images/markers/${icon}.png`,
					iconSize: [30, 30],
					iconAnchor: [15, 15],
				})
			}></Marker>
	);
}
