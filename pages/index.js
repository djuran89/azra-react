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

	React.useEffect(() => {
		products.length === 0 &&
			axios
				.get(`/api/product`)
				.then((res) => setProducts(res))
				.catch((err) => httpErrorHandler(err));
	}, []);

	const productsRender = products.map((el, i) => (
		<section className={styles.article} key={el.id}>
			<Link className="image" href={`proizvod#${el.name}`}>
				<a>
					<h2>{el.name}</h2>
					<figure>
						<img src={`./images/${el.image}`} alt={`${el.name}`} />
					</figure>
					{/* <div className={styles.description}>{el.smallDescription}</div> */}
					<div className={styles.infoProduct}>
						<div className={styles.priceText}>Cena</div>
						<div className={styles.price}>{el.price},00 RSD</div>
					</div>
				</a>
			</Link>
		</section>
	));

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
