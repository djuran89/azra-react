import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import Basket from "./../basket/basket";

const MobileHeader = (props) => {
	const { setQuantityValue } = props;
	const orders = useSelector((state) => state.orders);
	const [isOpenCheckout, setIsOpenCheckout] = React.useState(false);

	const setOpenCheckout = () => orders.length > 0 && setIsOpenCheckout(true);

	return (
		<header className="mobile">
			<div className="content">
				<div className="left">
					<Link href="/">
						<span className="material-symbols-outlined">arrow_back_ios_new</span>
					</Link>
				</div>

				<div className="center" style={{ justifyContent: "center", marginRight: 0 }}>
					<h1>
						<Link href="/">
							<img className="logo" src="/logo.png" alt="Pilja" />
						</Link>
					</h1>
				</div>

				<div className="right">
					<button className="shop-cart" onClick={setOpenCheckout}>
						<span className="material-symbols-outlined">shopping_cart</span>
						{orders.length > 0 && <span className="shop-number-cart">{orders.length}</span>}
					</button>
				</div>
			</div>

			<Basket isOpen={isOpenCheckout} toogleBasket={setIsOpenCheckout} setQuantityValue={setQuantityValue} />
		</header>
	);
};

export default MobileHeader;
