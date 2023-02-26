import React, { useState } from "react";
import Product from "../components/Product";
import Skeleton from "../components/Skeleton";
import logoSvg from "../img/v987-11a.jpg";
import logo from "../img/icons8-user-100.png";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Search from "../components/Search";
import { useSelector } from "react-redux";

export default function Home() {
  const [search, setSearch] = useState("");
  const location = useLocation();
  const token = useSelector((state) => state.user.token);
  const { totalPrice, totalCount } = useSelector((state) => state.cart);

  const getProducts = async () => {
    const res = await fetch("https://api.react-learning.ru/products", {
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

  const {
    data: items,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  // .filter((item) => {
  //   return item.title.toLowerCase().includes(search.toLowerCase());
  // })
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
            {location.pathname !== "/cart" && (
              <Search search={search} setSearch={setSearch} />
            )}
            {location.pathname !== "/cart" && (
              <div className="header__cart">
                <Link to="/cart" className="button button--cart">
                  <span>{totalPrice.toLocaleString()} ₽</span>
                  <div className="button__delimiter"></div>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{totalCount}</span>
                </Link>
              </div>
            )}
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
          {isError ? (
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
                {isLoading
                  ? skeletons
                  : items.products
                      .filter((item) => {
                        return item.name
                          .toLowerCase()
                          .includes(search.toLowerCase());
                      })
                      .map((obj) => {
                        return <Product key={obj._id} {...obj} />;
                      })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
