import Router from "next/router";

const columns = [
	{
		name: "Izmeni",
		selector: (row) => (
			<button className="btn btn-edit" onClick={() => Router.push(`./proizvodi/${row._id}`)}>
				<span className="material-symbols-outlined">edit_note</span>
			</button>
		),
		sortable: true,
		width: "100px",
		id: "delete",
	},
	{
		name: "Naziv",
		selector: (row) => row.name,
		sortable: true,
	},
	{
		name: "Cena",
		selector: (row) => row.price,
		sortable: true,
	},
	{
		name: "Opis",
		selector: (row) => row.description,
		sortable: true,
	},
	{
		name: "Kategorija",
		selector: (row) => row.category,
		sortable: true,
	},
];

export default columns;
