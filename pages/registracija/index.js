import React from "react";
import axios from "axios";
import Router from "next/router";
import Head from "next/head";
import { useSnackbar } from "notistack";

import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../redux/action";

import style from "./../../pages/zavrsi-kupovinu/style.module.scss";
import newStyle from "./style.module.scss";
import Header from "../../components/header/header";

const btnLoading = `<span id="loading"><span class="material-symbols-outlined">cached</span> Obradjuje se...</span>`;
export default function Registracija(props) {
	const { mainTitle, products, setQuantityValue } = props;
	const button = React.useRef();
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const [info, setInfo] = React.useState({});
	const [btnContent, setBtnContent] = React.useState("");
	const [user, setUser] = [useSelector((state) => state.user), (state) => dispatch(userAction.setUser(state))];

	React.useEffect(() => {
		for (const input of document.getElementsByTagName("input")) {
			input.addEventListener("blur", function () {
				const lable = this.parentElement.getElementsByTagName("label")[0];
				this.value !== "" ? this.classList.add("active") : this.classList.remove("active");
				this.value !== "" ? lable.classList.add("active") : lable.classList.remove("active");
			});
		}
		setBtnContent(button.current.innerHTML);
	}, []);

	React.useEffect(() => {
		!user &&
			axios
				.get("/api/company")
				.then((res) => setUser(res))
				.catch((err) => console.error(err));
	}, []);

	React.useEffect(() => {
		user && Router.push("/zavrsi-kupovinu");
	}, [user]);

	const disableBtn = () => ((button.current.disabled = true), (button.current.innerHTML = btnLoading));
	const enableBtn = () => ((button.current.disabled = false), (button.current.innerHTML = btnContent));

	const onSubmitForm = async (e) => {
		e.preventDefault();
		disableBtn();

		axios
			.post(`/api/company`, info)
			.then((res) => {
				Router.push("/zavrsi-kupovinu");
				enableBtn();
			})
			.catch((err) => (enableBtn(), enqueueSnackbar(err.message, { variant: "error" })));
	};

	return (
		<>
			<Head>
				<title>{mainTitle} - Registracija</title>
			</Head>
			<Header products={products} setQuantityValue={setQuantityValue} />

			<div className={`${style.userInformation} ${newStyle.container}`}>
				<form onSubmit={onSubmitForm}>
					<h3>Registracija</h3>

					<div className={`${`${style.form} form-group`} form-group`}>
						<input
							id="email"
							className={style.formInput}
							name="email"
							type="text"
							value={info.Email}
							onChange={(e) => setInfo({ ...info, Email: e.target.value })}
							required
						/>
						<label htmlFor="email">Email</label>
					</div>

					<div className={`${`${style.form} form-group`} form-group`}>
						<input
							id="passowd"
							className={style.formInput}
							name="passowrd"
							type="password"
							value={info.Password}
							onChange={(e) => setInfo({ ...info, Password: e.target.value })}
							required
						/>
						<label htmlFor="passowd">Lozinka</label>
					</div>

					<div className={`${`${style.form} form-group`} form-group`}>
						<input
							id="companyname"
							className={style.formInput}
							name="companyname"
							type="text"
							value={info.CompanyName}
							onChange={(e) => setInfo({ ...info, CompanyName: e.target.value })}
							required
						/>
						<label htmlFor="companyname">Naziv firme</label>
					</div>

					<div className={`${`${style.form} form-group`} form-group`}>
						<input
							id="Address"
							className={style.formInput}
							name="Address"
							type="text"
							value={info.Address}
							onChange={(e) => setInfo({ ...info, Address: e.target.value })}
							required
						/>
						<label htmlFor="Address">Adresa</label>
					</div>

					<div className={`${`${style.form} form-group`} form-group`}>
						<input
							id="pib"
							className={style.formInput}
							name="pib"
							type="text"
							value={info.PIB}
							onChange={(e) => setInfo({ ...info, PIB: e.target.value })}
							required
						/>
						<label htmlFor="pib">PIB</label>
					</div>

					<div className={`${`${style.form} form-group`} form-group`}>
						<input
							id="Phone"
							className={style.formInput}
							name="Phone"
							type="text"
							value={info.Phone}
							onChange={(e) => setInfo({ ...info, Phone: e.target.value })}
							required
						/>
						<label htmlFor="Phone">Telefon</label>
					</div>

					<div className={`${`${style.form} form-group`} form-group`}>
						<input
							id="DeliveryAddress"
							className={style.formInput}
							name="DeliveryAddress"
							type="text"
							value={info.DeliveryAddress}
							onChange={(e) => setInfo({ ...info, DeliveryAddress: e.target.value })}
							required
						/>
						<label htmlFor="DeliveryAddress">Adresa isporuke</label>
					</div>

					<div className={`${style.form} form-group`}>
						<button type="submit" ref={button}>
							Registracija
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
