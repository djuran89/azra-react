import Link from "next/link";
import React from "react";
import axios from "axios";
import DataTable, { memoize } from "react-data-table-component";

import Header from "./../../../components/admin/header";
import columns from "./../../../components/admin/columns/productsColumes";

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
	const [filterText, setFilterText] = React.useState("");
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

	React.useEffect(() => {
		products.length === 0 &&
			axios
				.get(`/api/product/all`)
				.then((res) => setProducts(res))
				.catch((err) => httpErrorHandler(err));
	}, []);

	const filteredItems = products.filter((item) => JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !== -1);

	const onChangeActive = (row) => {
		axios
			.put("/api/product/active", row)
			.then((res) => setProducts(res))
			.catch((err) => console.error(err));
	};

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
			<DataTable
				id="dataTable"
				paginationPerPage={30}
				pagination
				columns={columns}
				data={filteredItems}
				onRowClicked={onChangeActive}
				subHeaderComponent={subHeaderComponent}
				defaultSortField="name"
				striped
				subHeader
			/>
		</>
	);
}
