import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function SignIn() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const obj = { email, password };
    try {
      const res = await fetch("https://api.react-learning.ru/signin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      const responce = await res.json();
      setCurrentUser(responce);

      localStorage.setItem("token", responce.token);
      if (res.ok) {
        navigate("/");
      }
    } catch (err) {
      setErr(true);
    }
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
          {err && <span>Что-то пошло не так</span>}
        </form>
        <p>
          У вас нет аккаунта? <Link to="/register">Регистрация</Link>{" "}
        </p>
      </div>
    </div>
  );
}
