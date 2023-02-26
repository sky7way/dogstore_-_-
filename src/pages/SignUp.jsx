import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [body, setBody] = useState(undefined);

  const { isLoading, isError } = useQuery({
    queryKey: ["signUp"],
    queryFn: async () => {
      const res = await fetch("https://api.react-learning.ru/signup", {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const group = e.target[2].value;
    const password = e.target[3].value;
    const obj = { name, email, group, password };
    setBody(obj);
  };

  if (!isLoading) {
    navigate("/login");
  }

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
          {isError && <span>Что-то пошло не так</span>}
        </form>
        <p>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
}
