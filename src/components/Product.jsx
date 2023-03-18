import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectCurrentItem } from "../redux/slices/cartReducer";
import Add from "./svg/Add";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  dislikeItem,
  likeItem,
  selectCurrentLikeItem,
} from "../redux/slices/likeReducer";
import { deleteProduct, setEditedProduct } from "../redux/slices/userReducer";
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";

export default function Product({ obj }) {
  const dispatch = useDispatch();
  const currentItem = useSelector(selectCurrentItem(obj._id));
  const currentLike = useSelector(selectCurrentLikeItem(obj._id));
  const location = useLocation();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);

  function handleEdit() {
    dispatch(setEditedProduct(obj));
    navigate("/editproduct");
  }

  function handleDeleteItem() {
    confirmAlert({
      title: "Подожди-ка",
      message: `Вы действительно хотите удалить товар ${obj.name}?`,
      buttons: [
        {
          label: "Да",
          onClick: () => {
            dispatch(deleteProduct(obj));
            axios.delete(`https://api.react-learning.ru/products/${obj._id}`, {
              headers: {
                Authorization: "Bearer " + token,
              },
            });
          },
        },
        {
          label: "Нет",
        },
      ],
    });
  }

  return (
    <div className="product-block">
      {location.pathname !== "/myproducts" ? (
        currentLike ? (
          <div className="btn btn-d" onClick={() => dispatch(dislikeItem(obj))}>
            <i className="uil uil-heart"></i>
          </div>
        ) : (
          <div className="btn" onClick={() => dispatch(likeItem(obj))}>
            <i className="uil uil-heart"></i>
          </div>
        )
      ) : (
        <div className="btn" onClick={handleDeleteItem}>
          <i className="uil uil-trash-alt"></i>
        </div>
      )}

      <Link to={`/product/${obj._id}`}>
        <img className="product-block__image" src={obj.pictures} alt="Pizza" />
      </Link>
      <h4 className="product-block__title">{obj.name}</h4>
      <div className="product-block__selector">
        <ul>
          <li>{obj.available ? "Есть в наличии" : "Товар закончился"}</li>
        </ul>
        <ul>
          <li>
            {obj.discount !== 0
              ? `Скидка : ${obj.discount} %`
              : "Конечная цена"}
          </li>
        </ul>
      </div>
      <div className="product-block__bottom">
        <div className="product-block__price">{obj.price} ₽</div>
        {location.pathname === "/myproducts" ? (
          <button
            className="button button--outline button--add"
            onClick={handleEdit}
          >
            <span>Редактировать</span>
          </button>
        ) : (
          <button
            className="button button--outline button--add"
            onClick={() => dispatch(addItem(obj))}
            disabled={currentItem?.count === obj.stock}
          >
            <Add />
            <span>Добавить</span>
            {currentItem && <i>{currentItem.count}</i>}
          </button>
        )}
      </div>
    </div>
  );
}
