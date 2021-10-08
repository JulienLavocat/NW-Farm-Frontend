import L, { Icon } from "leaflet";
import React from "react";
import { Marker, Popup } from "react-leaflet";
import { latDatabaseToMap } from "../../utils";

export default function PlayerMarkers({
	positions,
}: {
	positions: [string, number[]][];
}) {
	return (
		<>
			{positions.map((e) => (
				<Marker
					key={e[0]}
					position={[latDatabaseToMap(e[1][1]), e[1][0]]}
					icon={
						new Icon({
							iconUrl: "/images/marker-icon.png",
							iconAnchor: [19, 19],
						})
					}>
					<Popup>{e[0]}</Popup>
				</Marker>
			))}
		</>
	);
}
