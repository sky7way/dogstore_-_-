import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectCurrentItem } from "../redux/slices/cartReducer";
import Add from "./svg/Add";

export default function Product({
  _id,
  price,
  pictures,
  name,
  available,
  discount,
  stock,
}) {
  const obj = { _id, price, pictures, name, available, discount, stock };
  const dispatch = useDispatch();
  const currentItem = useSelector(selectCurrentItem(_id));

  function handleAddItem() {
    dispatch(addItem(obj));
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
          <Add />
          <span>Добавить</span>
          {currentItem && <i>{currentItem.count}</i>}
        </div>
      </div>
    </div>
  );
}
