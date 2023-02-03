import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
export default function UserInfo() {
  const { data: currentUser } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const res = await fetch(
        "https://api.react-learning.ru/v2/gr-9/users/me",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const responce = await res.json();

      return responce;
    },
  });

  return (
    <div className="info">
      <Link to={"/"}>
        <div className="back">Назад</div>
      </Link>
      <div className="info__title">Личный кабинет</div>
      <div className="user__info">
        <div className="user__name">
          <span>Имя: </span>
          {currentUser?.name}
        </div>
        <div className="user__email">
          <span>Email: </span>
          {currentUser?.email}
        </div>
        <div className="user__group">
          <span>Группа: </span>
          {currentUser?.group}
        </div>
        <div className="about">
          <span>Дополнительная информация: </span>
          <p>{currentUser?.about}</p>
        </div>
        <div className="photo">
          <span>Аватар: </span>
          <p>
            <img src={currentUser?.avatar} alt="" />
          </p>
        </div>
      </div>
    </div>
  );
}
