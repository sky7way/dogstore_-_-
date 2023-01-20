import React, { useState } from "react";
import { useEffect } from "react";
import Product from "../components/Product";
import Skeleton from "../components/Skeleton";
import logoSvg from "../img/v987-11a.jpg";
import logo from "../img/icons8-user-100.png";
import { Link } from "react-router-dom";
export default function Home() {
  const [status, setStatus] = useState(false);
  const [items, setItems] = useState({});
  useEffect(() => {
    try {
      const getProducts = async () => {
        setStatus("loading");
        const res = await fetch("https://api.react-learning.ru/products", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const responce = await res.json();

        setItems(responce);
        setStatus("success");
      };

      getProducts();
    } catch (error) {
      setStatus("error");
    }
  }, []);

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  // .filter((item) => {
  //   return item.title.toLowerCase().includes(search.toLowerCase());
  // })
  let products;
  if (items.products) {
    products = items.products.map((obj) => {
      return <Product key={obj._id} {...obj} />;
    });
  }

  return (
    <>
      <div className="header">
        <div className="container">
          <div className="header__logo">
            <img width="38" src={logoSvg} alt="dog logo" />
            <div>
              <h1>Dog Store</h1>
              <p>самые лучшие товары для собак</p>
            </div>
          </div>
          <Link to={"userinfo"}>
            <div className="user__logo">
              <img src={logo} alt="" />
            </div>
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="content">
          {status === "error" ? (
            <div className="content__error">
              <h2>
                Ничего не найден<span>😕</span>
              </h2>
              <p>
                Вероятней всего, произошла ошибка.
                <br />
                Попробуйте повторить попытку позже.
              </p>
            </div>
          ) : (
            <>
              <h2 className="content__title">Все товары ({items?.total})</h2>
              <div className="content__items">
                {status === "loading" ? skeletons : products}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
