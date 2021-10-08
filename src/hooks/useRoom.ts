import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export const useRoom = (room: string, name: string) => {
	const socket = useRef();

	const [connected, setConnected] = useState(false);
	const [connectionError, setConnectionError] = useState<null | any>(null);
	const [error, setError] = useState<null | any[]>(null);

	const [positions, setPositions] = useState<[string, number[]][]>([]);

	useEffect(() => {
		const socket = io("http://localhost:3001", {
			query: {
				room: room,
				name: name,
			},

			transports: ["websocket"],
			reconnection: true,
		});

		socket.on("connect", () => {
			setConnected(true);
			setConnectionError(null);
		});

		socket.on("connect_error", (err) => {
			setConnected(false);
			setConnectionError(err);
		});

		socket.on("disconnect", () => {
			setConnected(false);
		});

		socket.on("error", (...args) => setError(args));

		socket.on("positions", (positions) => {
			setPositions(positions);
		});

		console.log("Connected");

		return () => {
			socket.disconnect();
		};
	}, [name, room]);

	return {
		socket: socket.current,
		connected,
		connectionError,
		error,
		positions,
	};
};
