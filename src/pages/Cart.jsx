import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, selectAllIds } from "../redux/slices/cartReducer";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import CartEmpty from "../components/CartEmpty";
import Clear from "../components/svg/Clear";
import Back from "../components/svg/Back";
import CartLogo from "../components/svg/CartLogo";
import { useQuery } from "@tanstack/react-query";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { errorAlert } from "../utils/errorAlert";

export default function Cart() {
  const { items, totalPrice, totalCount } = useSelector((state) => state.cart);
  const ids = useSelector(selectAllIds);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const tryClearCart = () => {
    confirmAlert({
      title: "Подожди-ка",
      message: `Вы точно собираетесь очистить корзину?`,
      buttons: [
        {
          label: "Да",
          onClick: () => dispatch(clearCart()),
        },
        {
          label: "Нет",
        },
      ],
    });
  };

  const fetches = ids.map((id) => {
    return fetch(`https://api.react-learning.ru/products/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => res.json());
  });

  const getAllCartProducts = async () => {
    const results = await Promise.allSettled(fetches);
    return results;
  };

  const { data, isError } = useQuery({
    queryKey: ["cartproducts"],
    queryFn: getAllCartProducts,
  });

  if (isError) {
    errorAlert("Продукт не найден");
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
          {data?.map((item) => {
            return <CartItem key={item.value._id} {...item.value} />;
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
