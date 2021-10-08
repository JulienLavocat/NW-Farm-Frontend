import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Map from "./pages/Map";
import { createTheme } from "@mui/material/styles";
import { IoProvider } from "socket.io-react-hook";

const theme = createTheme();

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<IoProvider>
				<CssBaseline />
				<BrowserRouter>
					<Switch>
						<Route path="/" exact>
							<Map />
						</Route>
					</Switch>
				</BrowserRouter>
			</IoProvider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
