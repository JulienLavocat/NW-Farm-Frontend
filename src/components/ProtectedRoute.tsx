import { FunctionComponent, useEffect } from "react";
import React from "react";
import { Redirect, Route, useHistory } from "react-router-dom";

type Props = {
	path: string;
	exact?: boolean;
};

const ProtectedRoute: React.FC<Props> = ({ exact, path, children }) => {
	// const [user, isLoading, error] = useAuthState(firebase.auth);
	const [user, isLoading, error] = ["Test", false, null];

	return user ? (
		<Route path={path} exact={exact}>
			{children}
		</Route>
	) : error ? (
		<p>An error occured while login in !</p>
	) : (
		<Redirect to="/signin" />
	);
};

export default ProtectedRoute;
