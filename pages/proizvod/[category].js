import React from "react";
import Head from "next/head";
import Router, { useRouter } from "next/router";

import SingleProduct from "./../../components/product/product";
import MobileHeader from "./../../components/header/mobileHeader";
import Header from "./../../components/header/header";

class Product extends React.Component {
	constructor(props) {
		super(props);

		this.state = { productName: "" };
	}

	componentDidMount() {
		const productName = decodeURI(this.props.urlString(window.location.hash).split("#")[1]);
		this.setState({ productName });
	}

	componentDidUpdate() {
		console.log("Updated!");
	}

	render() {
		const props = this.props;
		const { category } = Router.router.query;
		const { products, isMobile, setQuantityValue, urlString, mainTitle } = props;

		const filterProducts = products.filter((el) => el.category === category.replace("-", " "));
		const renderPorudcts = filterProducts.map((el, i) => (
			<div id={`${urlString(el.name)}`} key={i}>
				<SingleProduct
					product={el}
					setQuantityValue={setQuantityValue}
					category={category}
					pageNumber={i + 1}
					products={filterProducts}
					urlString={urlString}
				/>
			</div>
		));
		const productName = decodeURI(this.props.urlString(window.location.hash).split("#")[1]);
		const link = document.createElement("a");
		link.href = "#" + productName;
		link.click();

		return (
			<>
				<Head>
					<title>
						{mainTitle} - {productName.replaceAll("-", " ")}
					</title>
				</Head>
				{isMobile ? (
					<MobileHeader setQuantityValue={setQuantityValue} />
				) : (
					<Header products={products} setQuantityValue={setQuantityValue} />
				)}
				<div id="slider" className={`slider `}>
					<div className="slides">{renderPorudcts}</div>
				</div>
			</>
		);
	}
}

export default Product;
