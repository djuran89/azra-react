import React from "react";
import axios from "axios";
import Router from "next/router";
import moment from "moment";
import DataTable from "react-data-table-component";

import Loading from "./../../components/loading/loading";
import { useSnackbar } from "notistack";

export default function Admin() {
	const columns = [
		{
			name: "Ime",
			selector: (row) => row.Ime + " " + row.Prezime,
			sortable: true,
		},
		{
			name: "Adresa",
			selector: (row) => `${row.Adresa}, ${row.PostanskiBroj}, ${row.Grad} ${row.Drzava}`,
			sortable: true,
		},
		{
			name: "Porucbina",
			selector: (row) =>
				row.Orders.map((el, i) => (
					<div key={i}>
						{el.quantity} x {el.name}
					</div>
				)),
			sortable: true,
		},
		{
			name: "Datum",
			selector: (row) => moment(row.createdAt).format("DD-MM-YYYY, hh:mm:ss"),
			sortable: true,
			id: "datum",
		},
		{
			name: "Obrisi",
			selector: (row) => (
				<button className="btn btn-remove" onClick={() => onRemove(row)}>
					<span className="material-symbols-outlined">delete</span>
				</button>
			),
			sortable: true,
			width: "100px",
			id: "delete",
		},
	];

	const [user, setUser] = React.useState();
	const [data, setData] = React.useState();
	const { enqueueSnackbar } = useSnackbar();

	React.useEffect(() => {
		axios
			.post(`${process.env.APIURL}/api/user/islogin`)
			.then((res) => (!res ? Router.push("/admin/login") : setUser(res)))
			.catch((err) => enqueueSnackbar(err.message, { variant: "error" }));
	}, []);

	React.useEffect(() => {
		axios
			.get(`${process.env.APIURL}/api/order`)
			.then((res) => setData(res))
			.catch((err) => enqueueSnackbar(err.message, { variant: "error" }));
	}, []);

	const onPrint = () => window.print();
	const onLogout = () => {
		axios
			.post(`${process.env.APIURL}/api/user/logout`)
			.then(() => Router.push("/admin/login"))
			.catch((err) => enqueueSnackbar(err.message, { variant: "error" }));
	};

	const onRemove = (Order) => {
		axios
			.delete(`${process.env.APIURL}/api/order`, { data: { Order } })
			.then((res) => setData(res))
			.catch((err) => enqueueSnackbar(err.message, { variant: "error" }));
	};

	if (!user) return <Loading />;

	return (
		<>
			<header className="admin-header">
				<button className="btn btn-print" onClick={onPrint}>
					Print
				</button>
				<button className="btn  btn-logout" onClick={onLogout}>
					Logout
				</button>
			</header>
			<DataTable id="dataTable" pagination columns={columns} data={data} />
		</>
	);
}
