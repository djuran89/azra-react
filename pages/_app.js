import React from "react";
import Head from "next/head";
import axios from "axios";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

import withHeader from "../hocs/withHeader";
import store from "./../redux/store";
import "../styles/globals.scss";
import "../styles/globals-mobile.scss";
import "../styles/loading.scss";
import "../styles/Admin/style.scss";
// AXIOS CONFIG
axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://192.168.0.49:4000" : "http://18.185.113.237:4000";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
	(res) => res.data,
	(err) => {
		const error = err.response?.data || "Something wrong with server.";
		throw new Error(error);
	}
);

const httpErrorHandler = (msg, type) => console.error(msg);
function MyApp({ Component, pageProps }) {
	const [pageTitle, setPageTitle] = React.useState("Home");
	const [isMobile, setIsMobile] = React.useState(false);
	const notistackRef = React.useRef();

	React.useEffect(() => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
		setIsMobile(Boolean(navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)));
	}, []);

	return (
		<>
			<Head>
				<title>{pageTitle}</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
				<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
			</Head>
			<Provider store={store}>
				<SnackbarProvider ref={notistackRef} maxSnack={1} autoHideDuration={1500} classes="hotification" anchorOrigin={{ vertical: "top", horizontal: "left" }}>
					<Component {...pageProps} setPageTitle={setPageTitle} httpErrorHandler={httpErrorHandler} isMobile={isMobile} />
				</SnackbarProvider>
			</Provider>
		</>
	);
}

export default MyApp;
