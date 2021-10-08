export function latDatabaseToMap(e: number) {
	return Math.round(1e3 * (e - 14336)) / 1e3;
}

export function latMapToDatabase(e: number) {
	return Math.round(1e3 * (14336 + e)) / 1e3;
}

export function ym(e: any) {
	var t: any[] = [];
	return (
		e.forEach(function (e: any) {
			t.push([latDatabaseToMap(e[0]), e[1]]);
		}),
		t
	);
}
