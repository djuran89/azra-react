import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";

import { useSnackbar } from "notistack";
import moment from "moment";

import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../redux/action";

import style from "./style.module.scss";
import Header from "../../components/header/header";

const btnLoading = `<span id="loading"><span class="material-symbols-outlined">cached</span> Obradjuje se...</span>`;
export default function Login(props) {
	const router = useRouter();
	const dispatch = useDispatch();
	const [orders, setOrdes] = React.useState([]);
	const { mainTitle, products, setQuantityValue } = props;
	const [user, setUser] = [useSelector((state) => state.user), (state) => dispatch(userAction.setUser(state))];

	React.useEffect(() => {
		axios
			.post("/api/order/user")
			.then((res) => {
				setOrdes(res);
			})
			.catch((err) => router.push("/"));
	}, []);

	const ordersRender = orders.map((el) => <Order key={el._id} order={el} setQuantityValue={setQuantityValue} />);

	if (user === null) router.back();

	return (
		<>
			<Head>
				<title>{mainTitle} - Registracija</title>
			</Head>
			<Header products={products} setQuantityValue={setQuantityValue} />

			<div className={`${style.container}`}>
				<div className={style.orders}>{ordersRender}</div>
			</div>
		</>
	);
}

const Order = ({ order, setQuantityValue }) => {
	return (
		<div className={style.order}>
			<div className={style.title}>
				{moment(order.createdAt).format("D MMM YYYY, hh:mm")} - {moment(order.createdAt).endOf("min").fromNow()}
			</div>

			<div>
				<table border={0}>
					<thead>
						<tr>
							<th>Proizvod</th>
							<th>Kolicina</th>
							<th>Cena</th>
						</tr>
					</thead>
					<tbody>
						{order.Orders.map((el, i) => (
							<tr key={i} className={style.orderList}>
								<td>{el.name}</td>
								<td>{setQuantityValue(el.quantity, el)}</td>
								<td>{el.quantity * el.price},00 RSD</td>
							</tr>
						))}
						<tr className={style.total}>
							<td colSpan={2}>Ukupno</td>
							<td>{order.Orders.map((el) => el.quantity * el.price).reduce((a, b) => a + b)},00 RSD</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};
