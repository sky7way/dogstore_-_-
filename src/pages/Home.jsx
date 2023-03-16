import React from "react";
import Product from "../components/Product";
import Skeleton from "../components/Skeleton";
import logoSvg from "../assets/img/v987-11a.jpg";
import logo from "../assets/img/icons8-user-100.png";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Search from "../components/Search";
import { useSelector } from "react-redux";
import CartLogo from "../components/svg/CartLogo";

export default function Home() {
  const search = useSelector((state) => state.search.search);
  const location = useLocation();
  const token = useSelector((state) => state.user.token);
  const { totalPrice, totalCount } = useSelector((state) => state.cart);

  const getProducts = async () => {
    let url = `https://api.react-learning.ru/products/?query=${search}`;

    const res = await fetch(url, {
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
    queryKey: ["products", search],
    queryFn: getProducts,
  });

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

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
            {location.pathname !== "/cart" && <Search />}
          </div>
          <div className="cart__right">
            {location.pathname !== "/cart" && (
              <div className="header__cart">
                <Link to="/cart" className="button button--cart">
                  <span>{totalPrice.toLocaleString()} ₽</span>
                  <div className="button__delimiter"></div>
                  <CartLogo />
                  <span>{totalCount}</span>
                </Link>
              </div>
            )}
            <Link to={"userinfo"}>
              <div className="user__logo">
                <img src={logo} alt="" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="content">
          {isError ? (
            <div className="content__error">
              <h2>
                Ничего не найдено<span>😕</span>
              </h2>
              <p>
                Вероятней всего, произошла ошибка.
                <br />
                Попробуйте повторить попытку позже.
              </p>
            </div>
          ) : (
            <>
              <div className="flex">
                <h2 className="content__title">Все товары ({items?.total})</h2>
                <Link to={"/likes"}>
                  <button>Избранное</button>
                </Link>
                <Link to={"/newproduct"}>
                  <button className="bg">Добавить продукт</button>
                </Link>
              </div>
              <div className="content__items">
                {isLoading
                  ? skeletons
                  : items?.products?.map((obj) => {
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
