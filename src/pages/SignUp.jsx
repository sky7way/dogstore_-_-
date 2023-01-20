import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function SignUp() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const group = e.target[2].value;
    const password = e.target[3].value;
    const obj = { name, email, group, password };
    try {
      const res = await fetch("https://api.react-learning.ru/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      const responce = await res.json();
      setCurrentUser(responce);
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
        <span className="title">Регистрация</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Имя" />
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Группа" />
          <input type="password" placeholder="Пароль" />
          <button>Зарегистрироваться</button>
          {err && <span>Что-то пошло не так</span>}
        </form>
        <p>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
}
