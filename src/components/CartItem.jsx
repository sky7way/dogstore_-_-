import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Interaction from "./svg/Interaction.jsx";

import {
  addItem,
  decrement,
  deleteItem,
  selectCurrentItem,
} from "../redux/slices/cartReducer";

export default function CartItem({
  _id,
  price,
  pictures,
  name,
  discount,
  stock,
  count,
}) {
  const currentItem = useSelector(selectCurrentItem(_id));
  const dispatch = useDispatch();
  
  function decrementItem(_id) {
    dispatch(decrement({ _id }));
  }

  function tryDelete(_id) {
    if (
      window?.confirm(
        `Вы уверены что хотите удалить товар "${currentItem?.name}" из корзины?`
      )
    ) {
      dispatch(deleteItem({ _id }));
    }
  }

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="" src={pictures} alt="Tovar" />
      </div>
      <div className="cart__item-info">
        <h3>{name}</h3>
        {discount ? <p>Скидка: {discount} % </p> : ""}
      </div>
      <div className="cart__item-count">
        <button
          disabled={count === 1}
          onClick={() => decrementItem(_id)}
          className="button button--outline button--circle cart__item-count-minus"
        >
          <Interaction />
        </button>
        <b>{count}</b>
        <button
          disabled={count === stock}
          onClick={() => dispatch(addItem({ _id }))}
          className="button button--outline button--circle cart__item-count-plus"
        >
          <Interaction />
        </button>
      </div>
      <div className="cart__item-price">
        <b>{price} ₽</b>
      </div>
      <div onClick={() => tryDelete(_id)} className="cart__item-remove">
        <div className="button button--outline button--circle">
          <Interaction />
        </div>
      </div>
    </div>
  );
}
