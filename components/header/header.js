import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import Basket from "./../basket/basket";

const Header = () => {
	const orders = useSelector((state) => state.orders);
	const [isOpenCheckout, setIsOpenCheckout] = React.useState(false);

	const setOpenCheckout = () => orders.length > 0 && setIsOpenCheckout(true);

	return (
		<header>
			<div className="content">
				<div className="left">
					<h1>
						<Link href="/">
							<a>
								<img className="logo" src="./logo.png" alt="Pilja" />
							</a>
						</Link>
					</h1>
				</div>
				<div className="center"></div>
				<div className="right">
					<Link href="tel:381658823275">
						<a className="btn-header call" target="_blank">
							<span className="material-symbols-outlined">call</span>
						</a>
					</Link>
					<Link href="https://wa.me/381658823275">
						<a className="btn-header" target="_blank">
							<img src="./whassapp.png" />
						</a>
					</Link>
					<button className="shop-cart" onClick={setOpenCheckout}>
						<span className="material-symbols-outlined">shopping_cart</span>
						{orders.length > 0 && <span className="shop-number-cart">{orders.length}</span>}
					</button>
				</div>
			</div>

			<Basket isOpen={isOpenCheckout} toogleBasket={setIsOpenCheckout} />
		</header>
	);
};

export default Header;
