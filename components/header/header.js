import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import Basket from "./../basket/basket";

const Header = () => {
	const orders = useSelector((state) => state.orders);
	const [isOpenCheckout, setIsOpenCheckout] = React.useState(false);
	const [openMenu, setOpenMenu] = React.useState(false);
	const products = useSelector((state) => state.products);
	const categories = [...new Set(products.map((el) => el.category))];
	const setOpenCheckout = () => orders.length > 0 && setIsOpenCheckout(true);

	const renderLinks = categories.map((category, i) => {
		const prod = products.filter(product => product.category === category)[0];
		return (
			<Link key={i} href={`/proizvod/${category}#${prod.name}`}>
				<a className="link">{category}</a>
			</Link>
		);
	});

	return (
		<header>
			<div className="content">
				<div className="left">
					<div className="menu" onClick={() => setOpenMenu(true)}>
						<div className="line-1"></div>
						<div className="line-2"></div>
					</div>
					<h1>
						<Link href="/">
							<a>
								<img className="logo" src="/logo.png" alt="Pilja" />
							</a>
						</Link>
					</h1>
				</div>
				<div className="center"></div>
				<div className="right">
					<nav className={`${openMenu ? "active" : ""}`}>
						<div className="header">
							<button onClick={() => setOpenMenu(false)}>
								Zatvori <span class="material-symbols-outlined">close</span>
							</button>
						</div>

						{renderLinks}

						<Link href={`/o-nama`}>
							<a className="link">Upoznajte Pilju</a>
						</Link>

						<Link href={`/kontakt`}>
							<a className="link">Kontaktirajte pilju</a>
						</Link>
					</nav>
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
