import React from "react";
import { Link } from "react-router-dom";

export default function CategoryEmpty() {
  return (
    <div className="container container--my">
      <div className="flex">
        <Link to={"/"}>
          <button>Назад</button>
        </Link>
        <h2 className="content__title">
          Не добавлено ни одного товара в эту категорию
        </h2>
      </div>
    </div>
  );
}
