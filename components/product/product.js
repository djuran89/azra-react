import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { ordersAction } from "../../redux/action";
import style from "./Product.module.scss";

const Product = (props) => {
	const { product, products, pageNumber } = props;
	const dispatch = useDispatch();
	const [orders, setOrders] = [useSelector((state) => state.orders), (state) => dispatch(ordersAction.setOrder(state))];
	const [quantity, setQuantity] = React.useState(1);
	const [toucheStart, setToucheStart] = React.useState([0, 0]);
	const [toucheMove, setToucheMove] = React.useState([0, 0]);
	const [scrollTop, setScrollTop] = React.useState(0);
	const screenHeight = document.documentElement.clientHeight;
	const productNumber = products.map((el) => el.id).indexOf(product.id);

	const onCreateOrder = () => setOrders([...orders, { ...product, quantity }]);
	const removeQuantity = () => quantity > 1 && setQuantity(--quantity);
	const addQuantity = () => setQuantity(++quantity);

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

	const onTouchStart = (e) => setToucheStart([e.touches[0].clientX, e.touches[0].clientY]);
	const onTouchMove = (e) => setToucheMove([e.touches[0].clientX, e.touches[0].clientY]);
	const onTouchEnd = () => {
		const limitMove = 20;
		// toucheStart[0] - toucheMove[0] > limitMove && swipeLeft();
		// toucheStart[0] - toucheMove[0] < -limitMove && swipeRight();
		// toucheStart[1] - toucheMove[1] > limitMove && swipeDown();
		// toucheStart[1] - toucheMove[1] < -limitMove && swipeUp();
	};

	//   return <>PROD</>;
	// onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}

	const renderSliders = products.map((el, i) => <a key={i} style={{ borderColor: products[productNumber].colors[1], backgroundColor: productNumber === i ? products[productNumber].colors[1] : "transparent" }} href={`#slide-${i + 1}`}></a>);

	if (products.length === 0) return <>Loading...</>;

	return (
		<section className={style.productHolder} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
			<section className={style.productImage}>
				<div className={style.imageHolder}>
					<img src={`./images/${product.images[0].src}`} alt={product.name} />
				</div>

				<div className={style.slidersBtn}>{renderSliders}</div>

				<div className={style.productName}>
					<h2>{product.name}</h2>

					<div className={style.quantityHolder}>
						<button className={style.remove} onClick={removeQuantity}>
							<span className="material-symbols-outlined">remove</span>
						</button>
						<div>{quantity}</div>
						<button className={style.add} onClick={addQuantity}>
							<span className="material-symbols-outlined">add</span>
						</button>
					</div>
				</div>
				<div className={style.description}>
					<p>{product.smallDescription}</p>
				</div>
				<div className={style.buyInfo}>
					<div className={style.totalPrice}>
						<div>Ukupna cena</div>
						<div>{quantity * product.price},00 RSD</div>
					</div>
					<button onClick={onCreateOrder}>
						<div>Dodaj u korpu</div>
						<span className="material-symbols-outlined">shopping_basket</span>
					</button>
				</div>
				<div className="backBG" style={{ backgroundColor: product.colors[0] }}></div>
			</section>
		</section>
	);
};
export default Product;
