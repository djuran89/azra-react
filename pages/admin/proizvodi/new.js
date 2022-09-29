import React from "react";
import ProductForm from "./../../../components/admin/poructForm";

import Header from "./../../../components/admin/header";

export default function NewProduct() {
	const [product, setProduct] = React.useState({ name: "", price: "", description: "", image: "", category: "", colors1: "", colors2: "" });

	return (
		<>
			<Header />
			<ProductForm product={product} setProduct={setProduct} />
		</>
	);
}
