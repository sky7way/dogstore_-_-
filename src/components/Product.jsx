import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectCurrentItem } from "../redux/slices/cartReducer";
import Add from "./svg/Add";
import { Link } from "react-router-dom";
import {
  dislikeItem,
  likeItem,
  selectCurrentLikeItem,
} from "../redux/slices/likeReducer";

export default function Product({obj}) {
  const dispatch = useDispatch();
  const currentItem = useSelector(selectCurrentItem(obj._id));
  const currentLike = useSelector(selectCurrentLikeItem(obj._id));
  const [like, setLike] = useState(currentLike ? true : false);

  function handleLike() {
    dispatch(likeItem(obj));
    setLike(true);
  }

  function handleDislike() {
    dispatch(dislikeItem(obj));
    setLike(false);
  }

  return (
    <div className="product-block">
      {like ? (
        <div className="btn btn-d" onClick={handleDislike}>
          <i className="uil uil-heart"></i>
        </div>
      ) : (
        <div className="btn" onClick={handleLike}>
          <i className="uil uil-heart"></i>
        </div>
      )}
      <Link to={`/product/${obj._id}`}>
        <img className="product-block__image" src={obj.pictures} alt="Pizza" />
      </Link>
      <h5 className="product-block__title">{ obj.name.length > 19 ? `${obj.name.substring(0, 18)}...` : obj.name}</h5>
      <div className="product-block__selector">
        <ul>
          <li>{obj.available ? "Есть в наличии" : "Товар закончился"}</li>
        </ul>
        <ul>
          <li>{obj.discount !== 0 ? `Скидка : ${obj.discount} %` : "Конечная цена"}</li>
        </ul>
      </div>
      <div className="product-block__bottom">
        <div className="product-block__price">{obj.price} ₽</div>
        <button
          className="button button--outline button--add"
          onClick={() => dispatch(addItem(obj))}
        >
          <Add />
          <span>Добавить</span>
          {currentItem && <i>{currentItem.count}</i>}
        </button>
      </div>
    </div>
  );
}
