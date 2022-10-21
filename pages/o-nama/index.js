import Head from "next/head";

import Header from "./../../components/header/header";
import Footer from "./../../components/footer/footer";

export default function AboutUs(props) {
	const { products, setQuantityValue } = props;
	return (
		<>
			<Head>
				<title>Upoznajte Pilju</title>
			</Head>

			<Header products={products} setQuantityValue={setQuantityValue} />
			<div id="aboutUs" className="content">
				<img id="paperAboutUs" src="/paper.png" alt="Picture of the author" />
			</div>
			<Footer products={products} />
		</>
	);
}
