import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeToken } from "../Redux/Slices/userReducer";
export default function SignIn() {
  const [body, setBody] = useState(undefined);

  const dispatch = useDispatch();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["signIn"],
    queryFn: async () => {
      const res = await fetch("https://api.react-learning.ru/signin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const responce = await res.json();

      return responce;
    },
    enabled: body !== undefined,
  });

  const navigate = useNavigate();

  if (!isLoading) {
    localStorage.setItem("token", data.token);
    dispatch(changeToken(data.token));
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const obj = { email, password };
    setBody(obj);
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">DogStore</span>
        <span className="title">Авторизация</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Пароль" />
          <button>Войти</button>
          {isError && <span>Что-то пошло не так</span>}
        </form>
        <p>
          У вас нет аккаунта? <Link to="/register">Регистрация</Link>{" "}
        </p>
      </div>
    </div>
  );
}
