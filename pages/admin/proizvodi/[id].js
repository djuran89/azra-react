import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Header from "./../../../components/admin/header";
import ProductForm from "./../../../components/admin/poructForm";

export default function SingleProduct() {
	const router = useRouter();
	const [product, setProduct] = React.useState(null);
	const { id } = router.query;

	React.useEffect(() => {
		id &&
			axios
				.get(`/api/product/${id}`)
				.then((res) => setProduct(res))
				.catch((err) => console.error(err));
	}, [id]);

    if(!product) return <>Loading...</>;

	return (
		<>
			<Header />
			<ProductForm product={product} setProduct={setProduct} />
		</>
	);
}
