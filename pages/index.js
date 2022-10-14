import React from "react";
import Link from "next/link";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { productsAction } from "./../redux/action";
import styles from "./../styles/Home.module.scss";
import Slider from "./../components/slider/slider";
import Header from "./../components/header/header";
import Loading from "./../components/loading/loading";
import Footer from "../components/footer/footer";

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

	const productsRender = categories.map((category) => {
		const product = products.filter((el) => el.category === category)[0];

		return (
			<section className={styles.article} key={product._id}>
				<Link className="image" href={`proizvod/${category}/#${product.name}`}>
					<a>
						<h2>{category}</h2>
						<figure>
							<img src={`${product.image}`} alt={`${product.name}`} />
						</figure>
						{/* <div className={styles.description}>{product.description}</div>  */}
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

			<main className="content">
				<section className={styles.title}>
					<h2>Proizvodi</h2>
				</section>
				<section className={styles.products}>{productsRender}</section>
			</main>
			<Footer />
		</>
	);
};

export default Home;
