const products = [
	{
		id: 1,
		name: "Ananas 1Kg",
		price: 1200,
		description: "",
		smallDescription: "It is a long established fact that a reader will be distracted",
		images: [
			{
				src: "anannas.png",
				alt: "Text",
			},
			{
				src: "image-2.jpg",
				alt: "Text",
			},
		],
		colors: ["rgba(212,195,161,0.3)", "rgba(212,195,161,1)"],
	},
	{
		id: 2,
		name: "Jabuka",
		price: 350,
		description: "",
		smallDescription: "It is a long established fact that a reader will be distracted",
		images: [
			{
				src: "jabuka.png",
				alt: "Text",
			},
			{
				src: "image-2.jpg",
				alt: "Text",
			},
		],
		colors: ["rgba(204,135,135,0.3)", "rgba(204,135,135,1)"],
	},
	{
		id: 3,
		name: "Borovnica",
		price: 950,
		description: "",
		smallDescription: "It is a long established fact that a reader will be distracted",
		images: [
			{
				src: "borovnica.png",
				alt: "Text",
			},
			{
				src: "image-2.jpg",
				alt: "Text",
			},
		],
		colors: ["rgba(154,184,232,0.3)", "rgba(154,184,232,1)"],
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
