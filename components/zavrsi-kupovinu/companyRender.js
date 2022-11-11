import React from "react";
import axios from "axios";
import Router from "next/router";
import { useSnackbar } from "notistack";

import style from "./../../pages/zavrsi-kupovinu/style.module.scss";

export default function CompanyRender({ ...props }) {
	const button = React.useRef();
	const { enqueueSnackbar } = useSnackbar();
	const { user, orders, setUser, setOrders, btnLoading, setShowModel } = props;
	const [btnContent, setBtnContent] = React.useState("");

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
		setBtnContent(button.current.innerHTML);
	}, []);

	const disableBtn = () => ((button.current.disabled = true), (button.current.innerHTML = btnLoading));
	const enableBtn = () => ((button.current.disabled = false), (button.current.innerHTML = btnContent));

	const onLogout = () =>
		axios
			.post("/api/company/logout")
			.then(() => setUser(null))
			.catch((err) => console.error(err));

	const onSubmitForm = async (e) => {
		try {
			e.preventDefault();
			disableBtn();

			await axios.post("/api/order/company", { user, orders });
			enableBtn();
			setShowModel(true);
		} catch (err) {
			enableBtn();
			enqueueSnackbar(err.message, { variant: "error" });
		}
	};

	if (user === null) return <></>;

	return (
		<section className={style.userInformation}>
			<h3>
				<span>Informacije firme</span>
				<button onClick={onLogout} className={style.btnLogout}>
					Odjava
				</button>
			</h3>

			<form onSubmit={onSubmitForm}>
				<div className={`${`${style.form} form-group`} form-group`}>
					<input
						id="companyName"
						className={`${style.formInput} ${style.active}`}
						name="company-name"
						type="text"
						value={user.CompanyName}
						onChange={(e) => setUser({ ...user, CompanyName: e.target.value })}
						disabled
					/>
					<label htmlFor="companyName">Naziv firme</label>
				</div>

				<div className={`${`${style.form} form-group`} form-group`}>
					<input
						id="Email"
						className={`${style.formInput} ${style.active}`}
						name="Email"
						type="text"
						value={user.Email}
						onChange={(e) => setUser({ ...user, Email: e.target.value })}
						disabled
					/>
					<label htmlFor="Email">Email</label>
				</div>

				<div className={`${`${style.form} form-group`} form-group`}>
					<input
						id="PIB"
						className={`${style.formInput} ${style.active}`}
						name="pib"
						type="text"
						value={user.PIB}
						onChange={(e) => setUser({ ...user, PIB: e.target.value })}
						disabled
					/>
					<label htmlFor="PIB">PIB</label>
				</div>

				<div className={`${`${style.form} form-group`} form-group`}>
					<input
						id="deliveryAddress"
						className={`${style.formInput} ${style.active}`}
						name="delivery-address"
						type="text"
						value={user.DeliveryAddress}
						onChange={(e) => setUser({ ...user, DeliveryAddress: e.target.value })}
					/>
					<label htmlFor="deliveryAddress">Adresa za dostavu</label>
				</div>

				<div className={`${`${style.form} form-group`} form-group`}>
					<input
						id="Phone"
						className={`${style.formInput} ${style.active}`}
						name="Phone"
						type="text"
						value={user.Phone}
						onChange={(e) => setUser({ ...user, Phone: e.target.value })}
					/>
					<label htmlFor="Phone">Borj telefona</label>
				</div>

				<div className={`${style.form} form-group`}>
					<textarea
						rows={5}
						id="napomena"
						className={style.formInput}
						name="napomena"
						type="text"
						value={user.Napomena}
						onChange={(e) => setUser({ ...user, Napomena: e.target.value })}
					/>
					<label htmlFor="napomena">Napomena</label>
				</div>

				<div className={`${style.form} form-group`}>
					<button ref={button} type="submit">
						Završi kupovinu
					</button>
				</div>
			</form>
		</section>
	);
}
