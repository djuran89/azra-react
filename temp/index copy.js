import React from "react";
import axios from "axios";
import style from "./Product.module.scss";
import { useRouter } from "next/router";
import { httpErrorHandler } from "../utility/errorHandler";

const Product = () => {
  const query = useRouter().query;
  const [productName, setProductName] = React.useState();
  const [product, setProduct] = React.useState();
  const [products, setProducts] = React.useState();
  const [quantity, setQuantity] = React.useState(1);
  const [toucheStart, setToucheStart] = React.useState([0, 0]);
  const [toucheMove, setToucheMove] = React.useState([0, 0]);
  const [scrollTop, setScrollTop] = React.useState(0);
  const screenHeight = document.documentElement.clientHeight;

  React.useEffect(() => setProductName(query?.name), [query]);

  React.useEffect(() => {
    productName &&
      axios
        .get(`/api/product?name=${productName}`)
        .then((res) => setProduct(res))
        .catch((err) => httpErrorHandler(err));
  }, [productName]);

  React.useEffect(() => {
    axios
      .get(`/api/product`)
      .then((res) => setProducts(res))
      .catch((err) => httpErrorHandler(err));
  }, []);

  const scrollTo = (top) => window.scrollTo({ top: top, behavior: "smooth" });
  const swipeUp = () => {
    const scroll = scrollTop - screenHeight;
    if (scroll >= 0) {
      setScrollTop(scroll);
      scrollTo(scroll);
    }
  };
  const swipeDown = () => {
    const scroll = scrollTop + screenHeight;
    if (document.body.clientHeight >= scroll) {
      setScrollTop(scroll);
      scrollTo(scroll);
    }
  };

  const removeQuantity = () => quantity > 1 && setQuantity(--quantity);
  const addQuantity = () => setQuantity(++quantity);

  const onTouchStart = (e) => setToucheStart([e.touches[0].clientX, e.touches[0].clientY]);
  const onTouchMove = (e) => setToucheMove([e.touches[0].clientX, e.touches[0].clientY]);
  const onTouchEnd = () => {
    const limitMove = 20;
    // toucheStart[0] - toucheMove[0] > limitMove && swipeLeft();
    // toucheStart[0] - toucheMove[0] < -limitMove && swipeRight();
    toucheStart[1] - toucheMove[1] > limitMove && swipeDown();
    toucheStart[1] - toucheMove[1] < -limitMove && swipeUp();
  };

  if (!product) return <>Loading...</>;
  console.log(products)

  return (
    <>
      <section className={style.productHolder} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <section className={style.productImage}>
          <h2>{product.name}</h2>
          <img src={`./images/${product.images[0].src}`} alt={product.name} />
          <p>{product.smallDescription}</p>
        </section>

        <section className={style.productInfo}>
          <div className={style.review}>5star</div>

          <div className={style.info}>
            {/* <h3>{product.price},00 RSD</h3> */}
            {/* <p>{product.description}</p> */}
          </div>

          <div className={style.buy}>
            <div className={style.quantity}>
              <button onClick={removeQuantity}>-</button>
              <input type="text" value={quantity} disabled />
              <button onClick={addQuantity}>+</button>
            </div>

            <div className={style.order}>
              <button>Naruci</button>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Product;
