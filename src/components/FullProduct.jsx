import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem, selectCurrentItem } from "../redux/slices/cartReducer";
import Add from "./svg/Add";
import {
  dislikeItem,
  likeItem,
  selectCurrentLikeItem,
} from "../redux/slices/likeReducer";
import Review from "./Review";

export default function FullProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentLike = useSelector(selectCurrentLikeItem(id));
  const [like, setLike] = useState(currentLike ? true : false);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const currentItem = useSelector(selectCurrentItem(id));

  const {
    items: cards,
    totalPrice,
    totalCount,
  } = useSelector((state) => state.cart);

  const { items: likes } = useSelector((state) => state.like);

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const cartJson = JSON.stringify(cards);
      const priceJson = JSON.stringify(totalPrice);
      const countJson = JSON.stringify(totalCount);
      const likesJson = JSON.stringify(likes);

      localStorage.setItem("likes", likesJson);
      localStorage.setItem("cart", cartJson);
      localStorage.setItem("price", priceJson);
      localStorage.setItem("count", countJson);
    }
    isMounted.current = true;
  }, [cards, totalPrice, totalCount, likes]);

  function handleAddItem() {
    dispatch(addItem(data));
  }

  function handleLike() {
    dispatch(likeItem(data));
    setLike(true);
  }

  function handleDislike() {
    dispatch(dislikeItem(data));
    setLike(false);
  }

  const getProduct = async () => {
    const res = await fetch(`https://api.react-learning.ru/products/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const responce = await res.json();
    return responce;
  };

  const { data, isError } = useQuery({
    queryKey: ["product"],
    queryFn: getProduct,
  });

  if (isError) {
    alert("Пицца не найдена");
    navigate("/");
  }
  console.log(data);
  return (
    <div className="container">
      <div className="full">
        <div className="full--left">
          <h2>{data?.name}</h2>
          <img src={data?.pictures} alt="pizza" />
          <div>от {data?.price} ₽</div>
          <div className="full__btn">
            <Link to="/" className="button button--black">
              <span>Назад</span>
            </Link>
          </div>
        </div>
        <div className="full--right">
          <div>
            Информация:
            <ul>
              <li>{data?.available ? "В наличии" : "Нет в наличии"}</li>
              <li>{data?.description}</li>
              <li>Кол-во на складе: {data?.stock}</li>
              <li>Вес: {data?.wight}</li>
              {data?.discount !== 0 ? <li>Скидка: {data?.discount}%</li> : ""}
            </ul>
          </div>
          <div
            className="button button--outline button--add"
            onClick={handleAddItem}
          >
            <Add />
            <span>В корзину</span>
            {currentItem && <i>{currentItem.count}</i>}
          </div>
          {like ? (
            <div className="btn btn-d" onClick={handleDislike}>
              <span>Убрать из избранного </span>
              <i className="uil uil-heart"></i>
            </div>
          ) : (
            <div className="btn" onClick={handleLike}>
              <span>Добавить в избранное </span>
              <i className="uil uil-heart"></i>
            </div>
          )}
        </div>
      </div>
      <div>
        <h1>Отзывы: </h1>
        <div className="review__container">
          {data?.reviews.map((obj) => {
            return <Review key={obj._id} {...obj} />;
          })}
        </div>
      </div>
    </div>
  );
}
