import React from "react";
import axios from "axios";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";

import style from "./style.module.scss";
import { ordersAction, userAction } from "../../redux/action";

import Header from "./../../components/header/header";
import FizickaLica from "../../components/zavrsi-kupovinu/fizickaLica";
import PravnaLica from "../../components/zavrsi-kupovinu/pravnaLica";
import CompanyRender from "../../components/zavrsi-kupovinu/companyRender";
import { useRouter } from "next/router";

const FinishOrder = (props) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { products, isMobile, btnLoading, setQuantityValue, mainTitle } = props;
	const [orders, setOrders] = [useSelector((state) => state.orders), (state) => dispatch(ordersAction.setOrder(state))];
	const [hideOrders, sethideOrders] = React.useState(true);
	const [textFinishOrder, setTextFinishOrder] = React.useState("Prikaži vašu poručbinu");
	const [isFizickaLica, setIsFizickaLica] = React.useState(true);
	const [isLogin, setIsLogin] = React.useState(false);
	const [user, setUser] = [useSelector((state) => state.user), (state) => dispatch(userAction.setUser(state))];
	const [showModel, setShowModel] = React.useState(false);

	React.useEffect(() => {
		for (const input of document.getElementsByTagName("input")) {
			input.addEventListener("blur", function () {
				const lable = this.parentElement.getElementsByTagName("label")[0];
				this.value !== "" ? this.classList.add("active") : this.classList.remove("active");
				this.value !== "" ? lable.classList.add("active") : lable.classList.remove("active");
			});
		}
		for (const textarea of document.getElementsByTagName("textarea")) {
			textarea.addEventListener("blur", function () {
				const lable = this.parentElement.getElementsByTagName("label")[0];
				this.value !== "" ? this.classList.add("active") : this.classList.remove("active");
				this.value !== "" ? lable.classList.add("active") : lable.classList.remove("active");
			});
		}
		for (const input of document.getElementsByTagName("input")) {
			const lable = input.parentElement.getElementsByTagName("label")[0];
			lable.value !== "" ? lable.classList.add("active") : this.classList.remove("active");
			lable.value !== "" ? lable.classList.add("active") : lable.classList.remove("active");
		}
		for (const textarea of document.getElementsByTagName("textarea")) {
			const lable = textarea.parentElement.getElementsByTagName("label")[0];
			textarea.value !== "" ? textarea.classList.add("active") : textarea.classList.remove("active");
			textarea.value !== "" ? lable.classList.add("active") : lable.classList.remove("active");
		}
	}, []);

	React.useState(() => {
		!isMobile && setTextFinishOrder("Vaša poručbinu");
		!isMobile && sethideOrders(false);
	}, []);

	React.useEffect(() => {
		!user &&
			axios
				.get("/api/company")
				.then((res) => res !== null && (setUser(res), setIsLogin(true)))
				.catch((err) => console.error(err));
	}, []);

	React.useEffect(() => {
		user === null ? setIsLogin(false) : setIsLogin(true);
	}, [user]);

	const hideOrdersInfo = () => {
		isMobile && orders.length > 0 && sethideOrders(!hideOrders);
		isMobile && (hideOrders ? setTextFinishOrder("Sakri vašu poručbinu") : setTextFinishOrder("Prikaži vašu poručbinu"));
	};

	const totalPrice = orders.length > 0 ? orders.map((el) => el.quantity * el.price).reduce((a, b) => a + b) : 0;
	const renderTxt =
		isMobile &&
		(hideOrders ? (
			<span className="material-symbols-outlined">keyboard_arrow_down</span>
		) : (
			<span className="material-symbols-outlined">keyboard_arrow_up</span>
		));
	const renderOrders = orders.map((el, i) => (
		<section key={i} className={style.singleOrder}>
			<div className={style.imgHolder}>
				<div className={style.quantity}>{setQuantityValue(el.quantity, el)}</div>
				<img src={`/images/${el._id}.png`} alt={el.Name} />
			</div>

			<div className={style.nameProduct}>{el.name}</div>

			<div>{el.quantity * el.price},00 RSD</div>
		</section>
	));

	const finishOrder = () => (setOrders([]), router.push("/"), setShowModel(false));

	return (
		<>
			<Head>
				<title>{mainTitle} - Naplata</title>
			</Head>
			{showModel && (
				<div className="model-box">
					<div className="content">
						<div className="header">Vaša poručbina je prihvaćena</div>
						<div className="body">
							<div className="left">
								<span className="material-symbols-outlined">verified</span>
							</div>
							<div className="right">{renderOrders}</div>
						</div>
						<div className="footer">
							<button onClick={finishOrder}>Zatvori</button>
						</div>
					</div>
				</div>
			)}

			<Header products={products} setQuantityValue={setQuantityValue} />

			<div className={`${style.container}`}>
				<div className={style.maintTitle}>
					<section className={`${style.showOrder}`} onClick={hideOrdersInfo}>
						<div className={style.title}>
							<span className="material-symbols-outlined">shopping_bag</span>
							<span>{textFinishOrder}</span>
							<span>{renderTxt}</span>
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
					{!isLogin && (
						<section className={style.selectButton}>
							<button onClick={() => setIsFizickaLica(true)} className={isFizickaLica ? style.active : ""}>
								Isporuka na adresu
							</button>
							<button onClick={() => setIsFizickaLica(false)} className={!isFizickaLica ? style.active : ""}>
								Prijava na nalog
							</button>
						</section>
					)}

					{isLogin ? (
						<CompanyRender
							user={user}
							setUser={setUser}
							btnLoading={btnLoading}
							orders={orders}
							setOrders={setOrders}
							setShowModel={setShowModel}
						/>
					) : isFizickaLica ? (
						<FizickaLica orders={orders} setOrders={setOrders} btnLoading={btnLoading} setShowModel={setShowModel} />
					) : (
						<PravnaLica user={user} setUser={setUser} btnLoading={btnLoading} />
					)}
				</div>
			</div>
		</>
	);
};

export default FinishOrder;
