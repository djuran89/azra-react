import React from "react";
import Link from "next/link";
import axios from "axios";
import { useSnackbar } from "notistack";

import style from "./../../pages/zavrsi-kupovinu/style.module.scss";

export default function PravnaLica(props) {
	const { setUser, btnLoading } = props;
	const button = React.useRef();
	const { enqueueSnackbar } = useSnackbar();
	const [Email, setEmail] = React.useState("");
	const [Password, setPassword] = React.useState("");
	const [btnContent, setBtnContent] = React.useState("");

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
		<section className={style.userInformation}>
			<form onSubmit={onSubmitForm}>
				<h3>Prijava</h3>

				<div className={`${`${style.form} form-group`} form-group`}>
					<input
						id="firstname"
						className={style.formInput}
						name="name"
						type="text"
						value={Email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label htmlFor="firstname">Korisničko ime</label>
				</div>

				<div className={`${`${style.form} form-group`} form-group`}>
					<input
						id="firstname"
						className={style.formInput}
						name="name"
						type="password"
						value={Password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<label htmlFor="firstname">Lozinka</label>
				</div>

				<div className={`${style.form} form-group`}>
					<button type="submit" ref={button}>
						Prijava
					</button>
				</div>
			</form>

			<div className={style.registration}>
				Nemate nalog ?
				<Link href="/registracija">
					<a>Registracija</a>
				</Link>
			</div>
		</section>
	);
}
