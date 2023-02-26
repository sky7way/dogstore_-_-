import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectCurrentItem } from "../Redux/Slices/cartReducer";

export default function Product({
  _id,
  price,
  pictures,
  name,
  available,
  discount,
  stock,
}) {
  const dispatch = useDispatch();
  const currentItem = useSelector(selectCurrentItem(_id));
  function handleAddItem() {
    dispatch(
      addItem({ _id, price, pictures, name, available, discount, stock })
    );
  }
  return (
    <div className="product-block">
      <img className="product-block__image" src={pictures} alt="Pizza" />
      <h4 className="product-block__title">{name}</h4>
      <div className="product-block__selector">
        <ul>
          <li>{available ? "Есть в наличии" : "Товар закончился"}</li>
        </ul>
        <ul>
          <li>{discount !== 0 ? `Скидка : ${discount} %` : "Конечная цена"}</li>
        </ul>
      </div>
      <div className="product-block__bottom">
        <div className="product-block__price">{price} ₽</div>
        <div
          className="button button--outline button--add"
          onClick={handleAddItem}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {currentItem && <i>{currentItem.count}</i>}
        </div>
      </div>
    </div>
  );
}
