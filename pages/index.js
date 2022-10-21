import React from "react";
import Link from "next/link";
import Head from "next/head";

import styles from "./../styles/Home.module.scss";
import Slider from "./../components/slider/slider";
import Header from "./../components/header/header";
import Footer from "../components/footer/footer";

const Home = ({ ...props }) => {
	const { products, urlString, mainTitle } = props;
	const [categories, setCategories] = React.useState([]);

	React.useEffect(() => {
		setCategories([...new Set(products.map((el) => el.category))]);
	}, []);

	const productsRender = categories.map((category) => {
		const product = products.filter((el) => el.category === category)[0];

		return (
			<section className={styles.article} key={product._id}>
				<Link className="image" href={`proizvod/${urlString(category)}/#${urlString(product.name)}`}>
					<a>
						<h2>{category}</h2>
						<figure>
							<img src={`/images/${product._id}.png`} alt={`${product.name}`} />
						</figure>
					</a>
				</Link>
			</section>
		);
	});

	return (
		<>
			<Head>
				<title>{mainTitle} - Početna</title>
			</Head>

			<Header products={products} />
			<Slider />

			<main className="content">
				<section className={styles.title}>
					<h2>Proizvodi</h2>
				</section>
				<section className={styles.products}>{productsRender}</section>
			</main>
			<Footer products={products} />
		</>
	);
};

export default Home;
