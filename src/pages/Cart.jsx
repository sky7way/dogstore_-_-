import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/slices/cartReducer";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import CartEmpty from "./CartEmpty";
import Clear from "../components/svg/Clear";
import Back from "../components/svg/Back";
import CartLogo from "../components/svg/CartLogo";

export default function Cart() {
  const { items, totalPrice, totalCount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  function tryClearCart() {
    if (window?.confirm("Вы точно хотите очистить всю корзину?")) {
      dispatch(clearCart());
    }
  }
  if (items.length === 0) {
    return <CartEmpty />;
  }
  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <CartLogo />
            Корзина
          </h2>
          <div onClick={tryClearCart} className="cart__clear">
            <Clear />

            <span>Очистить корзину</span>
          </div>
        </div>
        <div className="content__items">
          {items.map((item) => {
            return <CartItem key={item._id} {...item} />;
          })}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              Всего товаров: <b>{totalCount} шт.</b>
            </span>
            <span>
              Сумма заказа: <b>{totalPrice} ₽</b>
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link
              to="/"
              className="button button--outline button--add go-back-btn"
            >
              <Back />

              <span>Вернуться назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
