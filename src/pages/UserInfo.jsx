import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
export default function UserInfo() {
  const { currentUser } = useContext(AuthContext);

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
