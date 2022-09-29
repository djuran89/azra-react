import Link from "next/link";
import React from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import DataTable from "react-data-table-component";

import Header from "./../../../components/admin/header";
import columns from "./columns/productsColumes";

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
	const { httpErrorHandler } = props;
	const [products, setProducts] = React.useState([]);

	React.useEffect(() => {
		products.length === 0 &&
			axios
				.get(`/api/product`)
				.then((res) => setProducts(res))
				.catch((err) => httpErrorHandler(err));
	}, []);

	const [filterText, setFilterText] = React.useState("");
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
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

	return (
		<>
			<Header />
			<DataTable id="dataTable" pagination columns={columns} data={filteredItems} subHeaderComponent={subHeaderComponent} defaultSortField="name" striped subHeader />
		</>
	);
}
