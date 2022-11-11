import Link from "next/link";
import Router from "next/router";
import React from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

import Loading from "./../../../components/loading/loading";
import Header from "./../../../components/admin/header";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
	<div className="data-table-search">
		<Link href="./proizvodi/new">
			<a>
				<button className="btn-create">
					<span className="material-symbols-outlined">add</span>Novi proizvod
				</button>
			</a>
		</Link>
		<div>
			<input id="search" type="text" placeholder="Filter table data..." value={filterText} onChange={onFilter} />
			<button id="clear" onClick={onClear}>
				<span className="material-symbols-outlined">backspace</span>
			</button>
		</div>
	</div>
);

export default function Proizvodi(props) {
	const columns = [
		{
			selector: (row) => (
				<button className="btn btn-edit" onClick={() => Router.push(`./proizvodi/${row._id}`)}>
					<span className="material-symbols-outlined">edit_note</span>
				</button>
			),
			sortable: true,
			width: "50px",
			style: {
				padding: "0px 4px",
			},
		},
		{
			name: "On",
			selector: (row) => (
				<button onClick={() => onChangeActive(row)} className={`btn btn-active ${row.active ? `on` : `off`}`}>
					<span className={row.active ? `on` : `off`}></span>
				</button>
			),
			sortable: true,
			sortField: "active",
			width: "40px",
			compact: 1,
		},

		{
			name: "Naziv",
			selector: (row) => row.name,
			sortable: true,
		},
		{
			name: "Cena",
			selector: (row) => (
				<input
					id={`input-${row._id}`}
					className="input-price"
					type="text"
					pattern="\d*"
					value={row.price}
					onChange={(e) => onChangePrice(e, row)}
				/>
			),
			sortable: true,
			width: "100px",
		},
		{
			name: "Opis",
			selector: (row) => row.description,
			sortable: true,
			hide: "sm",
		},
		{
			name: "Kategorija",
			selector: (row) => row.category,
			sortable: true,
			hide: "sm",
		},
	];
	const updateProductAfter = 700;
	const [products, setProducts] = React.useState([]);
	const [filterText, setFilterText] = React.useState("");
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
	const [timeoutFn, setTimeoutFn] = React.useState(null);
	const [user, setUser] = React.useState();

	React.useEffect(() => {
		axios
			.post(`/api/user/islogin`)
			.then((res) => (!res ? Router.push("/admin/login") : setUser(res)))
			.catch((err) => Router.push("/admin"));
	}, []);

	React.useEffect(() => {
		products.length === 0 &&
			axios
				.get(`/api/product/all`)
				.then((res) => setProducts(res))
				.catch((err) => console.error(err));
	}, []);

	const clickHandler = (e) => document.getElementById(`input-${e._id}`).focus();

	const onChangePrice = async (e, row) => {
		timeoutFn && clearTimeout(timeoutFn);

		const updatedProduct = { ...row, price: e.target.value };
		const updatedProducts = products.map((obj) => (obj._id === row._id ? updatedProduct : obj));
		delete updatedProducts.image;
		setProducts(updatedProducts);

		const updateProduct = async () => {
			try {
				e.target.classList.remove("changed", "error");

				await axios.put("/api/product/price", updatedProduct);

				e.target.classList.add("changed");
				setTimeout(() => e.target.classList.remove("changed"), 300);
			} catch (err) {
				e.target.classList.add("error");
				console.error(err);
			}
		};

		setTimeoutFn(setTimeout(updateProduct, updateProductAfter));
	};

	const onChangeActive = async (row) => {
		const updatedProduct = { ...row, active: !row.active };
		const updatedProducts = products.map((obj) => (obj._id === row._id ? updatedProduct : obj));
		delete updatedProducts.image;
		try {
			setProducts(updatedProducts);
			await axios.put("/api/product/active", updatedProduct);
		} catch (err) {
			console.error(err);
		}
	};

	const handleSort = (col, sortDirection) => {
		if (col.sortField === "active") {
			const sortableProducts = products.sort((a, b) => (sortDirection === "desc" ? a.active < b.active : a.active > b.active));
			setProducts([...sortableProducts]);
		}
	};

	const filteredItems = products.filter((item) => JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !== -1);
	const subHeaderComponent = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText("");
			}
		};

		return <FilterComponent onFilter={(e) => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
	}, [filterText, resetPaginationToggle]);

	if (!user) return <Loading />;
	return (
		<>
			<Header />
			<DataTable
				id="dataTable"
				paginationPerPage={30}
				pagination
				columns={columns}
				data={filteredItems}
				subHeaderComponent={subHeaderComponent}
				defaultSortField="name"
				onRowClicked={clickHandler}
				striped
				subHeader
				onSort={handleSort}
			/>
		</>
	);
}
