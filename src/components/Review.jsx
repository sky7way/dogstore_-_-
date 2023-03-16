import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function Review({ author, rating, text }) {
  const token = useSelector((state) => state.user.token);

  const getAuthor = async () => {
    const res = await fetch(
      `https://api.react-learning.ru/v2/9-gr/users/${author}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const responce = await res.json();
    return responce;
  };

  const { data, isError } = useQuery({
    queryKey: ["author"],
    queryFn: getAuthor,
  });

  return (
    <div className="review">
      {isError ? (
        <div className="review__top">
          <div className="review__author">Автор не найден</div>
        </div>
      ) : (
        <>
          <div className="review__top">
            <div className="review__author">Автор: {data?.name}</div>
            <div className="review__rate">Оценка: {rating}</div>
          </div>
          <div className="review__bottom">
            <div className="review__text">{text}</div>
          </div>
        </>
      )}
    </div>
  );
}
