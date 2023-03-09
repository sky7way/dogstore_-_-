import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Product from "../components/Product";

export default function Likes() {
  const { items } = useSelector((state) => state.like);

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const cartJson = JSON.stringify(items);
      localStorage.setItem("likes", cartJson);
    }
    isMounted.current = true;
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="container">
        <div className="flex">
          <Link to={"/"}>
            <button>Назад</button>
          </Link>
          <h2 className="content__title">
            Не добавлено ни одного товара в избранное
          </h2>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="flex">
        <Link to={"/"}>
          <button>Назад</button>
        </Link>
        <h2 className="content__title">Избранные товары ({items.length})</h2>
      </div>
      <div className="content__items">
        {items.map((obj) => {
          return <Product key={obj._id} {...obj} />;
        })}
      </div>
    </div>
  );
}
