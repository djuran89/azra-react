import React from "react";
import Link from "next/link";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { productsAction } from "./../redux/action";
import styles from "./../styles/Home.module.scss";
import Slider from "./../components/slider/slider";
import Header from "./../components/header/header";
import Loading from "./../components/loading/loading";

const Home = ({ ...props }) => {
	const dispatch = useDispatch();
	const { httpErrorHandler } = props;
	const [products, setProducts] = [useSelector((state) => state.products), (state) => dispatch(productsAction.setProducts(state))];
	const [categories, setCategories] = React.useState([]);

	React.useEffect(() => {
		products.length === 0 &&
			axios
				.get(`/api/product`)
				.then((res) => setProducts(res))
				.catch((err) => httpErrorHandler(err));
	}, []);

	React.useEffect(() => {
		setCategories([...new Set(products.map((el) => el.category))]);
	}, [products]);

	// const productsRender = products.map((el) => (
	// 	<section className={styles.article} key={el._id}>
	// 		<Link className="image" href={`proizvod#${el.name}`}>
	// 			<a>
	// 				<h2>{el.name}</h2>
	// 				<figure>
	// 					<img src={`${el.image}`} alt={`${el.name}`} />
	// 				</figure>
	// 				<div className={styles.description}>{el.description}</div>
	// 				<div className={styles.infoProduct}>
	// 					<div className={styles.priceText}>Cena</div>
	// 					<div className={styles.price}>{el.price},00 RSD</div>
	// 				</div>
	// 			</a>
	// 		</Link>
	// 	</section>
	// ));

	const productsRender = categories.map((category) => {
		const product = products.filter(el => el.category === category)[0];
		
		return (
			<section className={styles.article} key={product._id}>
				<Link className="image" href={`proizvod#${product.name}`}>
					<a>
						<h2>{category}</h2>
						<figure>
							<img src={`${product.image}`} alt={`${product.name}`} />
						</figure>
						<div className={styles.description}>{product.description}</div>
					</a>
				</Link>
			</section>
		);
	});

	if (products.length === 0) return <Loading />;
	return (
		<>
			<Header />
			<Slider />
			<section className={styles.title}>
				<h2>Proizvodi</h2>
			</section>
			<main className="content">
				<section className={styles.products}>{productsRender}</section>
			</main>
		</>
	);
};

export default Home;
