import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Product from "../components/Product";
import CategoryEmpty from "../components/ProdcutsEmpty";
import { selectAllIds } from "../redux/slices/likeReducer";
import { useQuery } from "@tanstack/react-query";
import { errorAlert } from "../utils/errorAlert";

export default function Favorites() {
  const { items } = useSelector((state) => state.like);
  const ids = useSelector(selectAllIds);
  const token = useSelector((state) => state.user.token);

  const fetches = ids.map((id) => {
    return fetch(`https://api.react-learning.ru/products/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => res.json());
  });

  const getAllFavoriteProducts = async () => {
    const results = await Promise.allSettled(fetches);
    return results;
  };

  const { data, isError } = useQuery({
    queryKey: ["favoriteproducts"],
    queryFn: getAllFavoriteProducts,
  });

  if (isError) {
    errorAlert("Продукт не найден");
  }

  if (items.length === 0) {
    return <CategoryEmpty />;
  }

  return (
    <div className="container container--my">
      <div className="flex">
        <Link to={"/"}>
          <button>Назад</button>
        </Link>
        <h2 className="content__title">Избранные товары ({items.length})</h2>
      </div>
      <div className="content__items content__items--my">
        {data?.map((obj) => {
          return <Product key={obj.value._id} obj={obj.value} />;
        })}
      </div>
    </div>
  );
}
