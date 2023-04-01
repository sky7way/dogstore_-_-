import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { errorAlert } from "../utils/errorAlert";
import { editProduct } from "../redux/slices/userReducer";

export default function EditProduct() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const currentProd = useSelector((state) => state.user.editedProduct);
  const dispatch = useDispatch();

  const initialValues = {
    name: currentProd.name || "",
    stock: currentProd.stock || "",
    price: currentProd.price || "",
    discount: currentProd.discount || "",
    description: currentProd.description || "",
    pictures: currentProd.pictures || "",
  };

  const { mutate } = useMutation({
    mutationFn: (formPayload) => {
      return axios.patch(
        `https://api.react-learning.ru/products/${currentProd._id}`,
        formPayload,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    },
  });

  const addProductSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Слишком короткое!")
      .max(40, "Слишком длинное!")
      .required("Необходимо указать название товара"),

    stock: Yup.number()
      .integer()
      .min(0)
      .max(999)
      .required("Необходимо указать количество товара"),

    price: Yup.number()
      .min(1)
      .max(999999)
      .required("Необходимо указать цену товара"),

    discount: Yup.number()
      .integer()
      .min(0)
      .max(99)
      .required("Необходимо указать скидку товара"),

    description: Yup.string()
      .min(2, "Слишком короткое!")
      .max(150, "Слишком длинное!")
      .required("Необходимо указать описание товара"),

    pictures: Yup.string()
      .url("укажите валидный url")
      .required("Необходимо указать ссылку на изображение"),
  });

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (responce) => {
        dispatch(editProduct(responce.data));
        navigate("/myproducts");
      },
      onError: () => {
        errorAlert("Произошла ошибка при редактировании продукта");
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addProductSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div className="formContainer">
            <div className="formWrapper formWrapper--product">
              <span className="logo">DogStore</span>
              <span className="title">Редактирование продукта</span>
              <Form>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Название"
                  className={errors.name && touched.name ? "input-error" : null}
                />
                <ErrorMessage name="name" component="span" className="error" />

                <Field
                  type="number"
                  name="stock"
                  id="stock"
                  placeholder="Кол-во на складе"
                  className={
                    errors.stock && touched.stock ? "input-error" : null
                  }
                />
                <ErrorMessage name="stock" component="span" className="error" />

                <Field
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Цена"
                  className={
                    errors.price && touched.price ? "input-error" : null
                  }
                />
                <ErrorMessage name="price" component="span" className="error" />

                <Field
                  type="number"
                  name="discount"
                  id="price"
                  placeholder="Скидка"
                  className={
                    errors.discount && touched.discount ? "input-error" : null
                  }
                />
                <ErrorMessage
                  name="discount"
                  component="span"
                  className="error"
                />

                <Field
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Описание"
                  className={
                    errors.description && touched.description
                      ? "input-error"
                      : null
                  }
                />
                <ErrorMessage
                  name="description"
                  component="span"
                  className="error"
                />

                <Field
                  type="text"
                  name="pictures"
                  id="pictures"
                  placeholder="Ссылка на изображение"
                  className={
                    errors.pictures && touched.pictures ? "input-error" : null
                  }
                />
                <ErrorMessage
                  name="pictures"
                  component="span"
                  className="error"
                />

                <button
                  type="submit"
                  className={!(dirty && isValid) ? "disabled-btn" : ""}
                >
                  Применить изменения
                </button>
              </Form>
              <p>
                <Link to="/myproducts">
                  <button className="bg">Назад</button>
                </Link>
              </p>
            </div>
          </div>
        );
      }}
    </Formik>
  );
}
