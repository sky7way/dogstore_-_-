import React from "react";

export default function Skeleton() {
  return <img className="load" src={require("../assets/gif/load.gif")} alt="loading..." />
}
