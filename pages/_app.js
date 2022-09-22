import Head from "next/head";
import axios from "axios";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

import withHeader from "../hocs/withHeader";
import store from "./../redux/store";
import "../styles/globals.scss";
import "../styles/globals-mobile.scss";
import React from "react";

// AXIOS CONFIG
// axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://192.168.0.23:4000" : "http://localhost:4000";
// axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://192.168.0.23:4000" : "https://api.maca-caj.rs";
// axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://192.168.0.23:4000" : "http://192.168.0.23:4000";
// axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:4000" : "http://localhost:4000";
axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.withCredentials = true;
axios.interceptors.response.use(
	(res) => res.data,
	(err) => {
		throw new Error(`Something wrong with server.`);
	}
);

const httpErrorHandler = (msg, type) => console.error(msg);

function MyApp({ Component, pageProps }) {
	React.useEffect(() => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
	}, []);

	return (
		<>
			<Head>
				<title>Title page</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
				<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
			</Head>

			<main className="content">
				<Provider store={store}>
					<SnackbarProvider maxSnack={1} anchorOrigin={{ vertical: "top", horizontal: "left" }}>
						<Component {...pageProps} httpErrorHandler={httpErrorHandler} />
					</SnackbarProvider>
				</Provider>
			</main>
		</>
	);
}

export default MyApp;
