import React from "react";
import Link from "next/link";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../redux/action";

import Basket from "./../basket/basket";

const Header = (props) => {
	const dispatch = useDispatch();
	const { products, setQuantityValue } = props;
	const orders = useSelector((state) => state.orders);
	const [isOpenCheckout, setIsOpenCheckout] = React.useState(false);
	const [openMenu, setOpenMenu] = React.useState(false);
	const categories = [...new Set(products.map((el) => el.category))];
	const setOpenCheckout = () => orders.length > 0 && setIsOpenCheckout(true);
	const [user, setUser] = [useSelector((state) => state.user), (state) => dispatch(userAction.setUser(state))];
	const [show, setShow] = React.useState(false);

	React.useEffect(() => {
		if (user === null) {
			axios.get("/api/company").then((res) => setUser(res));
		}
	}, []);

	const urlString = (string) => string.replaceAll(" ", "-");
	const onLogout = () =>
		axios
			.post("/api/company/logout")
			.then(() => setUser(null))
			.catch((err) => console.error(err));

	const renderLinks = categories.map((category, i) => {
		const prod = products.filter((product) => product.category === category)[0];
		return (
			<Link key={i} href={`/proizvod/${urlString(category)}#${urlString(prod.name)}`}>
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
								Zatvori <span className="material-symbols-outlined">close</span>
							</button>
						</div>

						{renderLinks}

						<Link href={`/o-nama`}>
							<a className="link">Upoznajte Pilju</a>
						</Link>

						<Link href={`/kontakt`}>
							<a className="link">Kontaktirajte pilju</a>
						</Link>

						{!user ? (
							<div className="login-btn">
								<Link href={`/registracija`}>
									<a className="link">Registracija</a>
								</Link>

								<Link href={`/login`}>
									<a className="link">Login</a>
								</Link>
							</div>
						) : (
							<div className="login-user">
								<button className="btn-user" onClick={() => setShow(!show)}>
									{user.CompanyName}
								</button>
								<div className={`drop-down ${show ? "" : "hide"}`}>
									<Link href={`/porucbine`}>
										<a>Moje poručbine</a>
									</Link>

									<Link href={``}>
										<a onClick={onLogout}>Odjava</a>
									</Link>
								</div>
							</div>
						)}
					</nav>
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

export default Header;
