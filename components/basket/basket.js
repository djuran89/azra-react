import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

import { ordersAction } from "../../redux/action";
import style from "./Basket.module.scss";

const Basket = (props) => {
	const dispatch = useDispatch();
	const { isOpen, toogleBasket } = props;
	const [orders, setOrders] = [useSelector((state) => state.orders), (state) => dispatch(ordersAction.setOrder(state))];

	const setCloseCheckout = () => toogleBasket(!isOpen);

	const removeOrder = (index) => {
		const helpOrder = [...orders];
		helpOrder.splice(index, 1);
		setOrders(helpOrder);
		helpOrder.length === 0 && setCloseCheckout();
	};

	const renderOrder = orders.map((el, i) => (
		<div key={i} className={style.singleOrder}>
			<div className={style.imgHolder}>
				<div className={style.quantity}>{el.quantity}</div>
				<img src={`./images/${el.image}`} alt={el.Name} />
			</div>
			<div className={style.nameProduct}>{el.name}</div>
			<div>
				{/* <span style={{ fontSize: "10px" }}> X </span> */}
				{el.price * el.quantity},00 RSD
			</div>
			<div className={style.deleteOrder}>
				<button onClick={() => removeOrder(i)}>
					<span className="material-symbols-outlined">delete</span>
				</button>
			</div>
		</div>
	));

	const totalPrice = orders.length > 0 ? orders.map((el) => el.price * el.quantity).reduce((a, b) => a + b) : 0;

	return (
		<section className={`${style.basket} ${!isOpen && style["close"]}`}>
			<div className={style.header}>
				<div>Vasa porucbina</div>
				<span onClick={setCloseCheckout} className="material-symbols-outlined">
					close
				</span>
			</div>

			<div className={style.content}>{renderOrder}</div>

			<div className={style.footer}>
				<div className={style.prices}>
					<div>Ukupna cena:</div>
					<div>{totalPrice},00 RSD</div>
				</div>
				<div className={style.finish}>
					<button onClick={setCloseCheckout}>Nastavi kupovinu</button>
					<Link href="/zavrsi-kupovinu">
						<button>Završi kupovinu</button>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Basket;
