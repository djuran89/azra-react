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
export default function Login(props) {
	const { mainTitle, products, setQuantityValue } = props;
	const button = React.useRef();
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const [info, setInfo] = React.useState({});
	const [btnContent, setBtnContent] = React.useState("");
	const [user, setUser] = [useSelector((state) => state.user), (state) => dispatch(userAction.setUser(state))];
	const [Email, setEmail] = React.useState("");
	const [Password, setPassword] = React.useState("");

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
			.post(`/api/company/login`, { Email, Password })
			.then((res) => (enableBtn(), setUser(res)))
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
					<h3>Login</h3>

					<div className={`${`${style.form} form-group`} form-group`}>
						<input
							id="email"
							className={style.formInput}
							name="email"
							type="text"
							value={Email}
							onChange={(e) => setEmail(e.target.value)}
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
							value={Password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<label htmlFor="passowd">Lozinka</label>
					</div>

					<div className={`${style.form} form-group`}>
						<button type="submit" ref={button}>
							Login
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
