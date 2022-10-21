import React from "react";
import Head from "next/head";
import axios from "axios";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

import Loading from "./../components/loading/loading";

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
		const status = err.response?.status;
		const error = err.response?.data || "Something wrong with server.";
		throw new Error(error.replace("Error", "Greška"));
	}
);

const SetQuantityValue = (quantity, product) => {
	const unit = product.categoryObj.unit;
	switch (unit) {
		case "g":
			return `${quantity * 100} g`;
		case "kg":
			return quantity * 500 >= 1000 ? (quantity * 500) / 1000 + " kg" : quantity * 500 + " g";
		case "kom":
			return quantity;
		default:
			return quantity;
	}
};
const UrlString = (string) => string.replaceAll(" ", "-");
const SetPageTitle = (title) => {
	document.title = title;
	console.log(title);
};
const httpErrorHandler = (msg, type) => console.error(msg);
const btnLoading = `<span id="loading"><span class="material-symbols-outlined">cached</span> Obradjuje se...</span>`;
function MyApp({ Component, pageProps }) {
	const [pageTitle, setPageTitle] = React.useState("Home");
	const [isMobile, setIsMobile] = React.useState(false);
	const [products, setProducts] = React.useState([]);
	const notistackRef = React.useRef();

	React.useEffect(() => {
		axios.get("/api/product").then((res) => setProducts(res));
	}, []);

	React.useEffect(() => {
		let vh = window.innerHeight * 0.01;
		const footer = document.getElementsByTagName("footer");
		const footerHeight = footer.length !== 0 ? footer[0].offsetHeight : 0;
		document.documentElement.style.setProperty("--fh", `${footerHeight}px`);

		document.documentElement.style.setProperty("--vh", `${vh}px`);
		setIsMobile(Boolean(navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)));
	}, []);

	if (products.length === 0) return <Loading />;

	return (
		<>
			<Head>
				<title>Pilja</title>
				<meta name="theme-color" content="#fff" media="(prefers-color-scheme: light)"></meta>
				<meta name="description" content="Pilja ti nudi ponudu voća, orašastih plodova, sušenog voća, čokolada i ceđenih sokova" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
				<link
					href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@100;200;300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
				/>
			</Head>
			<Provider store={store}>
				<SnackbarProvider
					// ref={notistackRef}
					maxSnack={1}
					autoHideDuration={2000}
					classes="hotification"
					anchorOrigin={{ vertical: "top", horizontal: "left" }}
				>
					<Component
						{...pageProps}
						products={products}
						setQuantityValue={SetQuantityValue}
						btnLoading={btnLoading}
						urlString={UrlString}
						isMobile={isMobile}
						mainTitle="Pilja"
					/>
				</SnackbarProvider>
			</Provider>
		</>
	);
}

export default MyApp;
