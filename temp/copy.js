import React from 'react';
import axios from 'axios';
import style from './Product.module.scss';
import { useRouter } from 'next/router'
import { httpErrorHandler } from '../utility/errorHandler';

const Product = () => {
  const query = useRouter().query;
  const [productName, setProductName] = React.useState();
  const [product, setProduct] = React.useState();
  const [quantity, setQuantity] = React.useState(1);

  React.useEffect(() => setProductName(query?.name), [query]);

  React.useEffect(() => {
    productName && axios.get(`/api/product?name=${productName}`).then(res => setProduct(res)).catch(err => httpErrorHandler(err));
  }, [productName])

  const removeQuantity = () => quantity > 1 && setQuantity(--quantity)
  const addQuantity = () => setQuantity(++quantity)

  product && console.log(product)

  if (!product) return <>Loading...</>


  return <>
    <section className={style.productHolder}>
      <section className={style.productImage}>
        <img src={`./images/${product.images[0].src}`} alt={product.name} />
      </section>
      <section className={style.productInfo}>
        <div className={style.review}>
          5star
        </div>
        <div className={style.info}>
          <h2>{product.name}</h2>
          <h3>{product.price},00 RSD</h3>
          <p>{product.description}</p>
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
}

export default Product