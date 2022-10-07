import React from 'react'
import axios from "axios";
import Router from "next/router";
import { useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";

import style from "./../../pages/zavrsi-kupovinu/style.module.scss";

const infoObject = { Ime: "", Prezime: "", Adresa: "", PostanskiBroj: "", Grad: "", Opciono: "", Drzava: "Srbija", Telefon: "", Email: "", Napomena: "" };
export default function FizickaLica() {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
	const [info, setInfo] = React.useState(infoObject);
    const [orders, setOrders] = [useSelector((state) => state.orders), (state) => dispatch(ordersAction.setOrder(state))];

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
	}, []);

	const onSubmitForm = async (e) => {
		e.preventDefault();

		const errors = [];
		for (const [key, value] of Object.entries(info)) {
			if (key === "Opciono") continue;
			if (value === "") errors.push(key);
		}

		if (errors.length > 0) {
			return enqueueSnackbar(`Obavezna polja ${errors.join(", ")}`, { variant: "error" });
		}

		if (orders.length === 0) {
			return enqueueSnackbar(`Molimo vas napravite poručbinu.`, { variant: "error" });
		}

		axios
			.post(`${process.env.APIURL}/api/order`, { ...info, Orders: orders })
			.then(() => {
				setInfo(infoObject);
				setOrders([]);
				enqueueSnackbar("Poručbina je prihvaćena. Hvala.", { variant: "success" });
				Router.push("/");
			})
			.catch((err) => enqueueSnackbar(err.message, { variant: "error" }));
	};

	return (
		<section className={style.userInformation}>
			<form onSubmit={onSubmitForm}>
				<h3>Adresa za isporuku </h3>

				<div className={`${`${style.form} form-group`} form-group`}>
					<input id="firstname" className={style.formInput} name="name" type="text" value={info.Ime} onChange={(e) => setInfo({ ...info, Ime: e.target.value })} />
					<label htmlFor="firstname">Ime</label>
				</div>

				<div className={`${style.form} form-group`}>
					<input id="lastname" className={style.formInput} name="lastname" type="text" value={info.Prezime} onChange={(e) => setInfo({ ...info, Prezime: e.target.value })} />
					<label htmlFor="lastname">Prezime</label>
				</div>

				<div className={`${style.form} form-group`}>
					<input id="address" className={style.formInput} name="address" type="text" value={info.Adresa} onChange={(e) => setInfo({ ...info, Adresa: e.target.value })} />
					<label htmlFor="address">Adresa</label>
				</div>

				<div className={`${style.form} form-group`}>
					<input id="opciono" className={style.formInput} type="text" value={info.Opciono} onChange={(e) => setInfo({ ...info, Opciono: e.target.value })} />
					<label htmlFor="opciono">Stan, broj, itd. (opciono)</label>
				</div>

				<div className={`${style.form} form-group`}>
					<input id="zipcode" className={style.formInput} name="zipcode" type="text" value={info.PostanskiBroj} onChange={(e) => setInfo({ ...info, PostanskiBroj: e.target.value })} />
					<label htmlFor="zipcode">Poštanski broj</label>
				</div>

				<div className={`${style.form} form-group`}>
					<input id="city" className={style.formInput} name="city" type="text" value={info.Grad} onChange={(e) => setInfo({ ...info, Grad: e.target.value })} />
					<label htmlFor="city">Grad</label>
				</div>

				<div className={`${`${style.form} form-group`} ${style.active}`}>
					<input id="country" className={style.formInput} name="country" disabled type="text" value={info.Drzava} onChange={(e) => setInfo({ ...info, Drzava: e.target.value })} />
					<label htmlFor="country">Država</label>
				</div>

				<h3>Kontakt informacije</h3>

				<div className={`${style.form} form-group`}>
					<input id="phone" className={style.formInput} name="phone" type="text" value={info.Telefon} onChange={(e) => setInfo({ ...info, Telefon: e.target.value })} />
					<label htmlFor="phone">Telefon</label>
				</div>

				<div className={`${style.form} form-group`}>
					<input id="email" className={style.formInput} name="email" type="text" value={info.Email} onChange={(e) => setInfo({ ...info, Email: e.target.value })} />
					<label htmlFor="email">Email</label>
				</div>

				<div className={`${style.form} form-group`}>
					<textarea rows={5} id="napomena" className={style.formInput} name="napomena" type="text" value={info.Napomena} onChange={(e) => setInfo({ ...info, Napomena: e.target.value })} />
					<label htmlFor="napomena">Napomena</label>
				</div>

				<div className={`${style.form} form-group`}>
					<button type="submit" onSubmit={onSubmitForm}>
						Završi kupovinu
					</button>
				</div>
			</form>
		</section>
	);
}
