import { useSnackbar } from "notistack";
import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";

import { ordersAction } from "../../redux/action";
import style from "./Product.module.scss";

const Product = (props) => {
	const { product, products } = props;
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const [orders, setOrders, addOrderQuantity] = [useSelector((state) => state.orders), (state) => dispatch(ordersAction.setOrder(state)), (state) => dispatch(ordersAction.addQuantity(state))];
	const [quantity, setQuantity] = React.useState(1);
	const productNumber = products.map((el) => el._id).indexOf(product._id);

	const makeColorRGBA = (color) => {
		if (!color) return "#fff";
		const { r, g, b, a } = color;
		return `rgba(${r},${g},${b},${a})`;
	};

	const removeQuantity = () => quantity > 1 && setQuantity(--quantity);
	const addQuantity = () => setQuantity(++quantity);
	const onCreateOrder = () => {
		setQuantity(1);
		// enqueueSnackbar("Dodato u korpu.");
		const index = orders.map((el) => el._id).indexOf(product._id);
		if (index === -1) {
			setOrders([...orders, { ...product, quantity }]);
		} else {
			addOrderQuantity({ ...product, quantity: quantity + orders[index].quantity });
		}
	};

	const setQuantityValue = () => quantity*100 >= 1000 ? `${quantity*100/1000} kg` : `${quantity*100} g` 


	const index = products.map((el) => el._id).indexOf(product._id);
	const lastIndex = products.length;
	const renderSliders = products.map((el, i) => <a key={i} style={{ borderColor: makeColorRGBA(products[productNumber].colors[1]), backgroundColor: productNumber === i ? makeColorRGBA(products[productNumber].colors[1]) : "transparent" }} href={`#${el.name}`}></a>);

	if (products.length === 0) return <>Loading...</>;

	return (
		<section className={style.productHolder}>
			{index !== 0 && (
				<div id="left-slide">
					<Link href={`#${products[index - 1].name}`}>
						<a>
							<span className="material-symbols-outlined">arrow_back_ios</span>
							{products[index - 1].name}
						</a>
					</Link>
				</div>
			)}

			{index + 1 !== lastIndex && (
				<div id="right-slide">
					<Link href={`#${products[index + 1].name}`}>
						<a>
							{products[index + 1].name}
							<span className="material-symbols-outlined">arrow_forward_ios</span>
						</a>
					</Link>
				</div>
			)}
			<section className={style.productImage}>
				<div className={style.imageHolder}>
					<img src={product.image} alt={product.name} />
				</div>

				<div className={style.slidersBtn}>{renderSliders}</div>

				<div className={style.productName}>
					<h2>{product.name}</h2>

					<div className={style.quantityHolder}>
						<button className={style.remove} onClick={removeQuantity}>
							<span className="material-symbols-outlined">remove</span>
						</button>
						<div>{setQuantityValue({quantity})}</div>
						<button className={style.add} onClick={addQuantity}>
							<span className="material-symbols-outlined">add</span>
						</button>
					</div>
				</div>
				<div className={style.description}>
					<p>{product.description}</p>
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
				<div className="backBG" style={{ backgroundColor: makeColorRGBA(product.colors[0]) }}></div>
			</section>
		</section>
	);
};
export default Product;
