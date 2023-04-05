import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MyProduct from "../components/MyProduct";
import { useQuery } from "@tanstack/react-query";
import { errorAlert } from "../utils/errorAlert";
import Skeleton from "../components/Skeleton";

const getAllMyProducts = async (token) => {
  const response = await fetch(`https://api.react-learning.ru/products`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const data = await response.json();
  return data.products;
};

const MyProducts = () => {
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.userId);
  const { products } = useSelector((state) => state.user);

  const [myProd, setMyProd] = useState([]);
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["myproducts", products.ids],
    queryFn: useCallback(() => getAllMyProducts(token), [token]),
    onError: () => {
      errorAlert("Продукт не найден");
    },
  });

  const filteredProducts = useMemo(() => {
    if (data) {
      return data.filter((prod) => prod.author._id === userId);
    }
    return [];
  }, [data, userId]);

  useEffect(() => {
    const allProd = [...filteredProducts, ...products];
    setMyProd(
      allProd.reduce(
        (acc, pr) => {
          if (acc.map[pr._id]) return acc;

          acc.map[pr._id] = true;
          acc.products.push(pr);
          return acc;
        },
        {
          map: {},
          products: [],
        }
      ).products
    );
  }, [filteredProducts, products]);

  const MemoizedSkeleton = React.memo(Skeleton);

  return (
    <div className="container container--my">
      <div className="flex">
        <Link to={"/"}>
          <button>Назад</button>
        </Link>
        <h2 className="content__title">Мои товары ({myProd.length})</h2>

        <Link to={"/newproduct"}>
        <button className="bg-m">Добавить продукт</button>
        </Link>
      </div>
      {isError && <p>{error.message}</p>}
      <div className="content__items">
        {isLoading 
        ? <MemoizedSkeleton />
        : myProd?.map((obj) => {
          return <MyProduct key={obj._id} obj={obj} />;
        })}
      </div>
    </div>
  );
}
export default MyProducts;








// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import MyProduct from "../components/MyProduct";
// // import CategoryEmpty from "../components/ProdcutsEmpty";
// import { useQuery } from "@tanstack/react-query";
// import { errorAlert } from "../utils/errorAlert";
// import Skeleton from "../components/Skeleton";

// export default function MyProducts() {
//   const token = useSelector((state) => state.user.token);
//   const userId = useSelector((state) => state.user.userId);
//   const [myProd, setMyProd] = useState([]);
//   const { products } = useSelector((state) => state.user);

//   const getAllMyProducts = async () => {
//     return fetch(`https://api.react-learning.ru/products`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + token,
//       },
//     }).then((res) => res.json());
//   };

//   const { data, isError, isLoading } = useQuery({
//     queryKey: ["myproducts", products.ids],
//     queryFn: getAllMyProducts,
//   });

//   if (isError) {
//     errorAlert("Продукт не найден");
//   }

//   useEffect(() => {
//     if (!isLoading) {
//       const filterProd = data.products.filter(
//         (prod) => prod.author._id === userId
//       );
//       const allProd = [...filterProd, ...products];

//       setMyProd(
//         allProd.reduce(
//           (acc, pr) => {
//             if (acc.map[pr._id]) return acc;

//             acc.map[pr._id] = true;
//             acc.products.push(pr);
//             return acc;
//           },
//           {
//             map: {},
//             products: [],
//           }
//         ).products
//       );
//     }
//   }, [data, userId, isLoading, products]);

//   // if (myProd.length === 0) {
//   //   return <CategoryEmpty />;
//   // }

//   return (
//     <div className="container container--my">
//       <div className="flex">
//         <Link to={"/"}>
//           <button>Назад</button>
//         </Link>
//         <h2 className="content__title">Мои товары ({myProd.length})</h2>
//         <Link to={"/newproduct"}>
//         <button className="bg-m">Добавить продукт</button>
//         </Link>
//       </div>
//       <div className="content__items">
//         {isLoading 
//         ? <Skeleton />
//         : myProd?.map((obj) => {
//           return <MyProduct key={obj._id} obj={obj} />;
//         })}
//       </div>
//     </div>
//   );
// }
