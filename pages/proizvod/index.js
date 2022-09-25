import React from "react";
import Link from "next/link";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import style from "./Product.module.scss";
import { productsAction } from "../../redux/action";
import SingleProduct from "./../../components/product/product";
import MobileHeader from "./../../components/header/mobileHeader";
import Header from "./../../components/header/header";
import Loading from "./../../components/loading/loading";

const Product = ({ ...props }) => {
	const dispatch = useDispatch();
	const { isMobile, httpErrorHandler } = props;
	const [products, setProducts] = [useSelector((state) => state.products), (state) => dispatch(productsAction.setProducts(state))];
	const [quantity, setQuantity] = React.useState(1);
	const [toucheStart, setToucheStart] = React.useState([0, 0]);
	const [toucheMove, setToucheMove] = React.useState([0, 0]);
	const [scrollTop, setScrollTop] = React.useState(0);
	const [slide, setSlide] = React.useState(-1);

	React.useEffect(() => {
		products.length === 0 &&
			axios
				.get(`/api/product`)
				.then((res) => setProducts(res))
				.catch((err) => httpErrorHandler(err));
	}, []);

	const scrollTo = (top) => window.scrollTo({ top: top, behavior: "smooth" });
	const swipeUp = () => {
		const scroll = scrollTop - screenHeight;
		if (scroll >= 0) {
			setScrollTop(scroll);
			scrollTo(scroll);
		}
	};
	const swipeDown = () => {
		const scroll = scrollTop + screenHeight;
		if (document.body.clientHeight >= scroll) {
			setScrollTop(scroll);
			scrollTo(scroll);
		}
	};

	const removeQuantity = () => quantity > 1 && setQuantity(--quantity);
	const addQuantity = () => setQuantity(++quantity);

	const onTouchStart = (e) => setToucheStart([e.touches[0].clientX, e.touches[0].clientY]);
	const onTouchMove = (e) => setToucheMove([e.touches[0].clientX, e.touches[0].clientY]);
	const onTouchEnd = () => {
		const limitMove = 20;
		// toucheStart[0] - toucheMove[0] > limitMove && swipeLeft();
		// toucheStart[0] - toucheMove[0] < -limitMove && swipeRight();
		toucheStart[1] - toucheMove[1] > limitMove && swipeDown();
		toucheStart[1] - toucheMove[1] < -limitMove && swipeUp();
	};

	const renderPorudcts = products.map((el, i) => (
		<div id={`${el.name}`} key={i}>
			
			<SingleProduct product={el} pageNumber={i + 1} products={products} />
		</div>
	));
	const renderSliders = products.map((el, i) => <a key={i} className={`${slide === i ? "active" : ""}`} href={`#${el.name}`} onClick={() => setSlide(i)}></a>);

	const renderPorudctButtons = products.map((el, i) => (
		<Link key={i} href={`#${el.name}`}>
			<a>
				<button data-color={el.colors[0]}>{el.name}</button>
			</a>
		</Link>
	));

	if (products.length === 0) return <Loading />;
	return (
		<>
			{isMobile ? <MobileHeader /> : <Header />}

			{/* {!isMobile && <div className={style.productsLinks}>{renderPorudctButtons}</div>} */}

			<div id="slider" className="slider">
				<div className="slides">{renderPorudcts}</div>
				{/* <div className="slidesPosition">{renderSliders}</div> */}
			</div>
		</>
	);
};

export default Product;
