import Link from "next/link";

const withHeader =
	(Component) =>
	({ ...props }) => {
		return (
			<main>
				<header>
					<div className="content">
						<div className="left">
							<h1>
								<Link href="/">Visage</Link>
							</h1>
						</div>
						<div className="center">
							<Link href="/">Porizvodi</Link>
							<Link href="/">Kontakt</Link>
						</div>
						<div className="right">
							<div className="shop-cart">
								<span className="material-symbols-outlined">shopping_basket</span>
								<span className="shop-number-cart">0</span>
							</div>
						</div>
					</div>
				</header>

				<Component {...props} />

				<footer>Copyright© 2022 | Visage.com | office@visage.com | developed by ADJ</footer>
			</main>
		);
	};

export default withHeader;
