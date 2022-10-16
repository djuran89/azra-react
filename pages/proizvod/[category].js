import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { productsAction } from "./../../redux/action";
import SingleProduct from "./../../components/product/product";
import MobileHeader from "./../../components/header/mobileHeader";
import Header from "./../../components/header/header";
import Loading from "./../../components/loading/loading";

const Product = ({ ...props }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { category } = router.query;
	const { isMobile, httpErrorHandler } = props;
	const [products, setProducts] = [useSelector((state) => state.products), (state) => dispatch(productsAction.setProducts(state))];
	const [renderProducts, setRenderProducts] = React.useState([]);

	React.useEffect(() => {
		if (category) {
			if (products.length > 0) {
				setRenderProducts(getFilterProducts(products));
			} else {
				axios
					.get(`/api/product`)
					.then((res) => {
						setProducts(res);
						setRenderProducts(getFilterProducts(res));
					})
					.catch((err) => httpErrorHandler(err));
			}
		}
	}, [category]);

	const getFilterProducts = (prod) => prod.filter((el) => el.category === category);

	const renderPorudcts = renderProducts.map((el, i) => (
		<div id={`${el.name}`} key={i}>
			<SingleProduct product={el} category={category} pageNumber={i + 1} products={renderProducts} />
		</div>
	));

	if (renderProducts.length === 0) return <Loading />;
	return (
		<>
			{isMobile ? <MobileHeader /> : <Header />}
			<div id="slider" className={`slider `}>
				<div className="slides">{renderPorudcts}</div>
			</div>
		</>
	);
};

export default Product;
