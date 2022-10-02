import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { RgbaColorPicker } from "react-colorful";
import { useSnackbar } from "notistack";

import style from "./style.module.scss";

export default function productForm(props) {
	const router = useRouter();
	const { enqueueSnackbar } = useSnackbar();
	const { product, setProduct } = props;
	const [categories, setCategories] = React.useState([]);
	const [copyCategories, setCopyCategories] = React.useState([]);
	const dropDown = React.useRef();
	const inputs = React.createRef();
	const isNew = router.pathname.includes("new");
	const [color1, setColor1] = React.useState({ r: 255, g: 255, b: 255, a: 0.4 });
	const [color2, setColor2] = React.useState({ r: 255, g: 255, b: 255, a: 0.9 });

	React.useEffect(() => {
		axios
			.get("/api/product/category")
			.then((res) => (setCategories(res), setCopyCategories(res)))
			.catch((err) => enqueueSnackbar(err.message, { variant: "error" }));
	}, []);

	React.useEffect(() => {
		!isNew && setColor1(product.colors[0]);
		!isNew && setColor2(product.colors[1]);
	}, []);

	React.useEffect(() => {
		[...document.getElementsByTagName("input")].forEach((input) => input.addEventListener("blur", () => handlerClasses(input)));
		[...document.getElementsByTagName("input")].forEach((input) => handlerClasses(input));
	}, []);

	React.useEffect(() => {
		!dropDown && document.addEventListener("click", cechkShouldClose);
	}, []);

	function cechkShouldClose(e) {
		const isConten = e.target.parentNode?.id.includes("list");
		if (!isConten) dropDown.current.style.display = "none";
		else dropDown.current.style.display = "block";
	}

	const onImageToBase64 = () => {
		const file = document.querySelector('input[type="file"]').files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => setProduct({ ...product, image: reader.result });
		reader.onerror = () => enqueueSnackbar(error, { variant: "error" });

		document.getElementById("imageText").value = file.name;
		if (file.name !== "" || file.name !== null) {
			document.getElementById("imageText").style.zIndex = "1";
		} else {
			document.getElementById("imageText").style.zIndex = "-1";
		}
	};

	const makeColorRGBA = (color) => {
		if (!color) return "#fff";
		const { r, g, b, a } = color;
		return `rgba(${r},${g},${b},${a})`;
	};

	const handlerClasses = (element) => {
		const lable = element.parentElement.getElementsByTagName("label")[0];
		element.value !== "" ? lable.classList.add("active") : lable.classList.remove("active");
		element.value !== "" ? element.classList.add("active") : element.classList.remove("active");
	};

	const onSubmitForm = async (e) => {
		e.preventDefault();
		try {
			const data = { ...product, colors: [color1, color2] };
			isNew ? await axios.post(`/api/product`, data) : await axios.put(`/api/product`, data);
			enqueueSnackbar(`Uspesno ${isNew ? "kreiran" : "izmenjen"}.`, { variant: "success" });
			router.push("/admin/proizvodi");
		} catch (err) {
			enqueueSnackbar(err.message, { variant: "error" });
		}
	};

	const onChangeCategory = (e) => {
		dropDown.current.style.display = "block";

		const value = e.target.value;
		const copy = [...categories].filter((el) => el.toLowerCase().includes(value.toLowerCase()));

		if (copy.length === 0) dropDown.current.style.display = "none";

		setCopyCategories(copy);
		setProduct({ ...product, category: e.target.value });
	};

	const onSetCategory = (category) => {
		dropDown.current.style.display = "none";
		setProduct({ ...product, category: category });
	};

	return (
		<section className={style.userInformation}>
			<form onSubmit={onSubmitForm}>
				<div className={`${`${style.form} form-group`} form-group`}>
					<input id="firstname" ref={inputs} className={style.formInput} type="text" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
					<label htmlFor="firstname">Naziv</label>
				</div>

				<div className={`${style.form} form-group`}>
					<input id="lastname" ref={inputs} className={style.formInput} type="number" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
					<label htmlFor="lastname">Cena</label>
				</div>

				<div className={`${style.form} form-group`}>
					<input id="address" rows={3} className={style.formInput} type="text" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
					<label htmlFor="address">Opis</label>
				</div>

				<div className={`${style.form} form-group`}>
					<input id="image" className={style.formInput} type="file" onChange={onImageToBase64} />
					<input id="imageText" className={style.formInputFake} type="text" />
					<label htmlFor="image">Slika</label>
				</div>

				<div className={`${style.form} form-group`}>
					<input id="zipcode" className={style.formInput} type="text" value={product.category} onChange={onChangeCategory} />
					<label htmlFor="zipcode">Kategorija</label>
					<div id={style.dropDown} ref={dropDown}>
						<ul id="list">
							{copyCategories.map((el, i) => (
								<li key={i} onClick={() => onSetCategory(el)}>
									{el}
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="color-picker">
					<RgbaColorPicker color={color1} onChange={setColor1} />
					<RgbaColorPicker color={color2} onChange={setColor2} />
					<div className="preview" style={{ backgroundColor: makeColorRGBA(color1) }}>
						<img src={`${product.image}`} />
						<div className="crcle-btn" style={{ backgroundColor: makeColorRGBA(color2) }}></div>
					</div>
				</div>

				{/* <div className={`${style.form} form-group`}>
					<input id="city" className={style.formInput} type="text" value={product.colors1} onChange={(e) => setProduct({ ...product, colors1: e.target.value })} />
					<label htmlFor="city">Color1</label>
				</div>

				<div className={`${`${style.form} form-group`}`}>
					<input id="country" className={style.formInput} type="text" value={product.colors2} onChange={(e) => setProduct({ ...product, colors2: e.target.value })} />
					<label htmlFor="country">Color2</label>
				</div> */}

				<div className={`${style.form} form-group`}>
					<button type="submit" onSubmit={onSubmitForm}>
						Izmeni prozivod
					</button>
				</div>
			</form>
		</section>
	);
}
