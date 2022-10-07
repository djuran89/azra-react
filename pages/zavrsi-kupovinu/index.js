import React from "react";
// import axios from "axios";
// import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import style from "./style.module.scss";
import { ordersAction } from "../../redux/action";

import Header from "./../../components/header/header";
import FizickaLica from "../../components/zavrsi-kupovinu/fizickaLica";
import PravnaLica from "../../components/zavrsi-kupovinu/pravnaLica";

// const infoObject = { Ime: "", Prezime: "", Adresa: "", PostanskiBroj: "", Grad: "", Opciono: "", Drzava: "Srbija", Telefon: "", Email: "", Napomena: "" };
const FinishOrder = (props) => {
	const { isMobile } = props;
	const dispatch = useDispatch();
	// const { enqueueSnackbar } = useSnackbar();
	const [orders, setOrders] = [useSelector((state) => state.orders), (state) => dispatch(ordersAction.setOrder(state))];
	const [hideOrders, sethideOrders] = React.useState(true);
	const [textFinishOrder, setTextFinishOrder] = React.useState("Prikaži vašu poručbinu");
	const [isFizickaLica, setIsFizickaLica] = React.useState(true);

	React.useState(() => {
		!isMobile && setTextFinishOrder("Vaša poručbinu");
		!isMobile && sethideOrders(false);
	}, []);

	// React.useEffect(() => {
	// 	for (const input of document.getElementsByTagName("input")) {
	// 		input.addEventListener("blur", function () {
	// 			const lable = this.parentElement.getElementsByTagName("label")[0];
	// 			this.value !== "" ? this.classList.add("active") : this.classList.remove("active");
	// 			this.value !== "" ? lable.classList.add("active") : lable.classList.remove("active");
	// 		});
	// 	}
	// 	for (const textarea of document.getElementsByTagName("textarea")) {
	// 		textarea.addEventListener("blur", function () {
	// 			const lable = this.parentElement.getElementsByTagName("label")[0];
	// 			this.value !== "" ? this.classList.add("active") : this.classList.remove("active");
	// 			this.value !== "" ? lable.classList.add("active") : lable.classList.remove("active");
	// 		});
	// 	}
	// }, []);

	const hideOrdersInfo = () => {
		isMobile && orders.length > 0 && sethideOrders(!hideOrders);
		isMobile && (hideOrders ? setTextFinishOrder("Sakri vašu poručbinu") : setTextFinishOrder("Prikaži vašu poručbinu"));
	};

	const renderOrders = orders.map((el, i) => (
		<section key={i} className={style.singleOrder}>
			<div className={style.imgHolder}>
				<div className={style.quantity}>{el.quantity}</div>
				<img src={el.image} alt={el.Name} />
			</div>

			<div className={style.nameProduct}>{el.name}</div>

			<div>{el.quantity * el.price},00 RSD</div>
		</section>
	));

	const renderTxt = isMobile && (hideOrders ? <span className="material-symbols-outlined">keyboard_arrow_down</span> : <span className="material-symbols-outlined">keyboard_arrow_up</span>);

	const totalPrice = orders.length > 0 ? orders.map((el) => el.quantity * el.price).reduce((a, b) => a + b) : 0;

	return (
		<>
			<Header />

			<div className={`${style.container}`}>
				<div className={style.maintTitle}>
					<section className={`${style.showOrder}`} onClick={hideOrdersInfo}>
						<div className={style.title}>
							<span className="material-symbols-outlined">shopping_bag</span>
							<span>{textFinishOrder}</span>
							<spna>{renderTxt}</spna>
						</div>
						<div className={style.totalPrice}>{totalPrice},00 RSD</div>
					</section>
					<section className={`${style.order} ${hideOrders ? style.hide : ""}`}>
						<div className={style.renderOrder}>{renderOrders}</div>
						<div className={style.bottom}>
							<span>Ukupno:</span>
							<span>
								<i>RSD</i>
								{totalPrice},00
							</span>
						</div>
					</section>
				</div>

				<div className={`${style.finishOrder}`}>
					<section className={style.selectButton}>
						<button onClick={() => setIsFizickaLica(true)} className={isFizickaLica ? style.active : ''}>Fizicka lica</button>
						<button onClick={() => setIsFizickaLica(false)} className={!isFizickaLica ? style.active : ''}>Pravna lica</button>
					</section>

					{isFizickaLica ? <FizickaLica /> : <PravnaLica />}
				</div>
			</div>
		</>
	);
};

export default FinishOrder;
