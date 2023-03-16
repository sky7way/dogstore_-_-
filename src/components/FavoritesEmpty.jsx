import React from "react";
import { Link } from "react-router-dom";

export default function FavoritesEmpty() {
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
