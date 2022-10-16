import Router from "next/router";

const columns = [
	{
		name: "Activno",
		selector: (row) => (
			<button className={`btn btn-active ${row.active ? `active` : `inactive`}`}>
				<span className="material-symbols-outlined">{row.active ? `toggle_on` : `toggle_off`}</span>
			</button>
		),
		sortable: true,
		width: "100px",
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
	{
		name: "Izmeni",
		selector: (row) => (
			<button className="btn btn-edit" onClick={() => Router.push(`./proizvodi/${row._id}`)}>
				<span className="material-symbols-outlined">edit_note</span>
			</button>
		),
		sortable: true,
		width: "100px",
	},
];

export default columns;
