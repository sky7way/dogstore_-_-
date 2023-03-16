import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Interaction from "./svg/Interaction.jsx";
import {
  addItem,
  decrement,
  deleteItem,
  selectCurrentItem,
} from "../redux/slices/cartReducer";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function CartItem({
  _id,
  price,
  pictures,
  name,
  discount,
  stock,
}) {
  const currentItem = useSelector(selectCurrentItem(_id));
  const dispatch = useDispatch();

  const tryDelete = () => {
    confirmAlert({
      title: "Подожди-ка",
      message: `Вы действительно хотите удалить товар ${name}?`,
      buttons: [
        {
          label: "Да",
          onClick: () => dispatch(deleteItem({ _id })),
        },
        {
          label: "Нет",
        },
      ],
    });
  };

  return (
    currentItem && (
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
            disabled={currentItem.count === 1}
            onClick={() => dispatch(decrement({ _id }))}
            className="button button--outline button--circle cart__item-count-minus"
          >
            <Interaction />
          </button>
          <b>{currentItem.count}</b>
          <button
            disabled={currentItem.count === stock}
            onClick={() => dispatch(addItem({ _id }))}
            className="button button--outline button--circle cart__item-count-plus"
          >
            <Interaction />
          </button>
        </div>
        <div className="cart__item-price">
          <b>{price} ₽</b>
        </div>
        <div onClick={tryDelete} className="cart__item-remove">
          <div className="button button--outline button--circle">
            <Interaction />
          </div>
        </div>
      </div>
    )
  );
}
