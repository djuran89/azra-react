import React from "react";

import Header from "./../../components/header/header";
import style from "./../../pages/zavrsi-kupovinu/style.module.scss";
import newStyle from "./style.module.scss";

export default function Registracija() {
	const [info, setInfo] = React.useState({});

	React.useEffect(() => {
		for (const input of document.getElementsByTagName("input")) {
			input.addEventListener("blur", function () {
				const lable = this.parentElement.getElementsByTagName("label")[0];
				this.value !== "" ? this.classList.add("active") : this.classList.remove("active");
				this.value !== "" ? lable.classList.add("active") : lable.classList.remove("active");
			});
		}
	}, []);

	return (
		<>
			<Header />
			<div className={`${style.userInformation} ${newStyle.container}`}>
				<form>
					<h3>Registracija</h3>

					<div className={`${`${style.form} form-group`} form-group`}>
						<input id="email" className={style.formInput} name="email" type="text" value={info.Email} onChange={(e) => setInfo({ ...info, Email: e.target.value })} required />
						<label htmlFor="email">Email</label>
					</div>

					<div className={`${`${style.form} form-group`} form-group`}>
						<input id="passowd" className={style.formInput} name="passowrd" type="password" value={info.Password} onChange={(e) => setInfo({ ...info, Password: e.target.value })} required />
						<label htmlFor="passowd">Lozinka</label>
					</div>

					<div className={`${`${style.form} form-group`} form-group`}>
						<input id="companyname" className={style.formInput} name="companyname" type="text" value={info.CompanyName} onChange={(e) => setInfo({ ...info, CompanyName: e.target.value })} required />
						<label htmlFor="companyname">Naziv firme</label>
					</div>

					<div className={`${`${style.form} form-group`} form-group`}>
						<input id="Address" className={style.formInput} name="Address" type="text" value={info.Address} onChange={(e) => setInfo({ ...info, Address: e.target.value })} required />
						<label htmlFor="Address">Adresa</label>
					</div>

					<div className={`${`${style.form} form-group`} form-group`}>
						<input id="pib" className={style.formInput} name="pib" type="text" value={info.PIB} onChange={(e) => setInfo({ ...info, PIB: e.target.value })} required />
						<label htmlFor="pib">PIB</label>
					</div>

					<div className={`${`${style.form} form-group`} form-group`}>
						<input id="Phone" className={style.formInput} name="Phone" type="text" value={info.Phone} onChange={(e) => setInfo({ ...info, Phone: e.target.value })} required />
						<label htmlFor="Phone">Telefon</label>
					</div>

					<div className={`${`${style.form} form-group`} form-group`}>
						<input id="DeliveryAddress" className={style.formInput} name="DeliveryAddress" type="text" value={info.DeliveryAddress} onChange={(e) => setInfo({ ...info, DeliveryAddress: e.target.value })} required />
						<label htmlFor="DeliveryAddress">Adresa isporuke</label>
					</div>

					<div className={`${style.form} form-group`}>
						<button type="submit">Registracija</button>
					</div>
				</form>
			</div>
		</>
	);
}
