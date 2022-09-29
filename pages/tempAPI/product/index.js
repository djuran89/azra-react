const products = [
	{
		id: 1,
		name: "Nectarine",
		price: 1200,
		description: "",
		smallDescription: "It is a long established fact that a reader will be distracted",
		image: "nectarine.png",
		colors: ["rgba(245,240,180,0.5)", "rgba(239,124,18,0.5)"],
	},
	{
		id: 2,
		name: "Breskve",
		price: 1200,
		description: "",
		smallDescription: "It is a long established fact that a reader will be distracted",
		image: "breskva.png",
		colors: ["rgba(238,183,168,0.3)", "rgb(235,133,104,0.7)"],
	},
	{
		id: 3,
		name: "Narandže",
		price: 1200,
		description: "",
		smallDescription: "It is a long established fact that a reader will be distracted",
		image: "naranza.png",
		colors: ["rgba(246,99,6,0.2)", "rgb(246,99,6,0.8)"],
	},
	{
		id: 4,
		name: "Mandarine",
		price: 1200,
		description: "",
		smallDescription: "It is a long established fact that a reader will be distracted",
		image: "mandarine.png",
		colors: ["rgba(248,151,37,0.3)", "rgb(248,151,37)"],
	},
	{
		id: 5,
		name: "Nar",
		price: 1200,
		description: "",
		smallDescription: "It is a long established fact that a reader will be distracted",
		image: "nar.png",
		colors: ["rgba(178,85,103,0.2)", "rgba(178,85,103,0.8)"],
	},

	{
		id: 6,
		name: "Limnu",
		price: 1200,
		description: "",
		smallDescription: "It is a long established fact that a reader will be distracted",
		image: "limun.png",
		colors: ["rgba(250,246,192,0.7)", "rgb(234,212,67)"],
	},
	{
		id: 7,
		name: "Limeta",
		price: 1200,
		description: "",
		smallDescription: "It is a long established fact that a reader will be distracted",
		image: "lime.png",
		colors: ["rgb(226,245,86,0.5)", "rgb(159,198,37)"],
	},
	{
		id: 8,
		name: "Kivi",
		price: 1200,
		description: "",
		smallDescription: "It is a long established fact that a reader will be distracted",
		image: "kivi.png",
		colors: ["rgba(219,217,133,0.5)", "rgba(119,105,35,0.7)"],
	},
	{
		id: 9,
		name: "Banane",
		price: 1200,
		description: "",
		smallDescription: "It is a long established fact that a reader will be distracted",
		image: "banana.png",
		colors: ["rgba(241,207,119,0.5)", "rgba(212,170,65,0.8)"],
	},
	{
		id: 10,
		name: "Jabuke",
		price: 1200,
		description: "",
		smallDescription: "It is a long established fact that a reader will be distracted",
		image: "jabuka.png",
		colors: ["rgba(194,231,52,0.4)", "rgb(194,231,52)"],
	},
	{
		id: 11,
		name: "Kruške",
		price: 1200,
		description: "",
		smallDescription: "It is a long established fact that a reader will be distracted",
		image: "kruska2.png",
		colors: ["rgba(219,219,149,0.9)", "rgb(177,171,47)"],
	},
	{
		id: 12,
		name: "Crno Grožđe",
		price: 1200,
		description: "",
		smallDescription: "It is a long established fact that a reader will be distracted",
		image: "grozdje.png",
		colors: ["rgba(129,144,194,0.6)", "rgba(71,82,118,0.8)"],
	},
	{
		id: 13,
		name: "Belo Grožđe",
		price: 1200,
		description: "",
		smallDescription: "It is a long established fact that a reader will be distracted",
		image: "belogrozdje.png",
		colors: ["rgba(209,219,140,0.7)", "rgb(185,195,62)"],
	},
	{
		id: 14,
		name: "Djumbir",
		price: 1200,
		description: "",
		smallDescription: "It is a long established fact that a reader will be distracted",
		image: "djumbir.png",
		colors: ["rgb(230,204,147,0.8)", "rgb(199,151,31)"],
	},
	{
		id: 15,
		name: "Celer",
		price: 1200,
		description: "",
		smallDescription: "It is a long established fact that a reader will be distracted",
		image: "celer.png",
		colors: ["rgba(211,231,165,0.7)", "rgb(109,160,29)"],
	},
	{
		id: 16,
		name: "Avokado",
		price: 1200,
		description: "",
		smallDescription: "It is a long established fact that a reader will be distracted",
		image: "avokado.png",
		colors: ["rgb(152,157,47,0.3)", "rgba(107,66,31,0.7)"],
	},
];

export default function handler(req, res) {
	const productName = req.query?.name;

	if (productName) {
		const findProduct = products.filter((el) => el.name === productName);
		if (findProduct.length === 0) return res.status(404).json({ error: "Product not found" });
		return res.status(200).json(findProduct[0]);
	}

	res.status(200).json(products);
}
