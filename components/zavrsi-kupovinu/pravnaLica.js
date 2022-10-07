import Link from "next/link";
import React from "react";
import style from "./../../pages/zavrsi-kupovinu/style.module.scss";

export default function PravnaLica() {
	const [Username, setUsername] = React.useState("");
	const [Passwrod, setPassowrd] = React.useState("");

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

	return (
		<section className={style.userInformation}>
			<form>
				<h3>Prijava</h3>

				<div className={`${`${style.form} form-group`} form-group`}>
					<input id="firstname" className={style.formInput} name="name" type="text" value={Username} onChange={(e) => setUsername(e.target.value)} />
					<label htmlFor="firstname">Korisničko ime</label>
				</div>

				<div className={`${`${style.form} form-group`} form-group`}>
					<input id="firstname" className={style.formInput} name="name" type="password" value={Passwrod} onChange={(e) => setPassowrd(e.target.value )} />
					<label htmlFor="firstname">Lozinka</label>
				</div>

				<div className={`${style.form} form-group`}>
					<button type="submit">Prijava</button>
				</div>
			</form>

            <div className={style.registration}>Nemate nalog ?  <Link href="/registracija"><a>Registracija</a></Link></div>
		</section>
	);
}
