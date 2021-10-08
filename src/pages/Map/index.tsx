import { Grid } from "@mui/material";
import { CRS } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useRoom } from "../../hooks/useRoom";
import { latDatabaseToMap } from "../../utils";
import { LayersMenu } from "../../utils/resources";
import LayersSelector from "./LayersSelector";
import ResourcesRenderer from "./markers/ResourcesRenderer";
import PlayerMarkers from "./PlayerMarkers";
import "./worldmap.css";

const e = 0.25;
const t = Math.pow(2, 8) * e;
CRS.Simple.scale = function (e) {
	return Math.pow(2, e) / t;
};
CRS.Simple.zoom = function (e) {
	return Math.log(e * t) / Math.LN2;
};

export default function Test() {
	const { positions } = useRoom("test", "Piigo");
	const [menu, setMenu] = useState<LayersMenu>({});

	return (
		<>
			{/* <MapAppBar /> */}
			<Grid container height="100%" overflow={"hidden"}>
				<Grid item xs={2}>
					<LayersSelector onChange={(menu) => setMenu(menu)} />
				</Grid>
				<Grid item xs id="worldmap">
					<MapContainer
						attributionControl={false}
						center={[latDatabaseToMap(5e3), 1e4]}
						crs={CRS.Simple}
						maxZoom={8}
						minZoom={2}
						preferCanvas={true}
						// worldCopyJump={true}
						zoom={4}
						zoomControl={false}
						doubleClickZoom={false}>
						<TileLayer
							url="https://newworld-map.fra1.cdn.digitaloceanspaces.com/{z}/{x}/{y}.png"
							bounds={[
								[-14336, 0],
								[0, 14336],
							]}
							tileSize={256}
						/>
						<PlayerMarkers positions={positions} />
						<ResourcesRenderer resources={menu} />
						<MapEvents />
					</MapContainer>
				</Grid>
			</Grid>
		</>
	);
}

function MapEvents() {
	const map = useMap();
	useMapEvents({
		mousemove: (e) => {
			// console.log(e.latlng);
		},
		dblclick: (e) => {
			console.log(e.latlng);
		},
	});

	useEffect(() => {
		// map.setMaxBounds([
		// 	[-14336, 0],
		// 	[0, 14336],
		// ]);
		// map.fitWorld();
		// map.setView([latDatabaseToMap(5e3), 1e4], 4);
		return () => {};
	}, [map]);

	return null;
}
