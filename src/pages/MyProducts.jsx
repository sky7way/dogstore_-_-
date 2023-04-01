import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Product from "../components/Product";
import CategoryEmpty from "../components/ProdcutsEmpty";
import { useQuery } from "@tanstack/react-query";
import { errorAlert } from "../utils/errorAlert";

export default function MyProducts() {
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.userId);
  const [myProd, setMyProd] = useState([]);
  const { products } = useSelector((state) => state.user);

  const getAllMyProducts = async () => {
    return fetch(`https://api.react-learning.ru/products`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => res.json());
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["myproducts"],
    queryFn: getAllMyProducts,
  });

  if (isError) {
    errorAlert("Продукт не найден");
  }

  useEffect(() => {
    if (!isLoading) {
      const filterProd = data.products.filter(
        (prod) => prod.author._id === userId
      );
      const allProd = [...filterProd, ...products];

      setMyProd(
        allProd.reduce(
          (acc, pr) => {
            if (acc.map[pr._id]) return acc;

            acc.map[pr._id] = true;
            acc.products.push(pr);
            return acc;
          },
          {
            map: {},
            products: [],
          }
        ).products
      );
    }
  }, [data, userId, isLoading, products]);

  if (myProd.length === 0) {
    return <CategoryEmpty />;
  }

  return (
    <div className="container container--my">
      <div className="flex">
        <Link to={"/"}>
          <button>Назад</button>
        </Link>
        <h2 className="content__title">Мои товары ({myProd.length})</h2>
      </div>
      <div className="content__items">
        {myProd?.map((obj) => {
          return <Product key={obj._id} obj={obj} />;
        })}
      </div>
    </div>
  );
}
