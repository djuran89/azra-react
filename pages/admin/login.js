import React from "react";
import axios from "axios";
import Router from "next/router";
import { useSnackbar } from "notistack";

export default function Login() {
	const { enqueueSnackbar } = useSnackbar();
	const [Username, setUsername] = React.useState("");
	const [Password, setPassword] = React.useState("");

	React.useEffect(() => {
		axios
			.post(`/api/user/islogin`)
			.then((res) => res && Router.push("/admin"))
			.catch((err) => console.log(err));
	}, []);

	const onLogin = (e) => {
		e.preventDefault();
		axios
			.post(`${process.env.APIURL}/api/user/admin/login`, { Username, Password })
			.then(() => Router.push("/admin"))
			.catch((err) => enqueueSnackbar(err.message, { variant: "error" }));
	};

	return (
		<div className="admin-panel">
			<div className="login">
				<div className="holder">
					<div className="title">Admin Panel</div>
					<form onSubmit={onLogin}>
						<div className="form-box">
							<label>
								<input type="text" placeholder="Username" value={Username} onChange={(e) => setUsername(e.target.value)} />
							</label>
							<label>
								<input type="password" placeholder="Passwrod" value={Password} onChange={(e) => setPassword(e.target.value)} autoComplete="on" />
							</label>
							<button className="btn">Login</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
