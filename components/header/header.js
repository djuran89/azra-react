import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import Basket from "./../basket/basket";

const Header = () => {
  const orders = useSelector((state) => state.orders);
  const [isOpenCheckout, setIsOpenCheckout] = React.useState(false);

  const setOpenCheckout = () => orders.length > 0 && setIsOpenCheckout(true);

  return (
    <header>
      <div className="content">
        <div className="left">
          <h1>
            <Link href="/">Korpa</Link>
          </h1>
        </div>
        <div className="center">
          <Link href="/kontakt">Kontakt</Link>
        </div>
        <div className="right">
          <button className="shop-cart" onClick={setOpenCheckout}>
            <span className="material-symbols-outlined">shopping_cart</span>
            {orders.length > 0 && <span className="shop-number-cart">{orders.length}</span>}
          </button>
        </div>
      </div>

      <Basket isOpen={isOpenCheckout} toogleBasket={setIsOpenCheckout} />
    </header>
  );
};

export default Header;
