import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { errorAlert } from "../utils/errorAlert";

export default function SignUp() {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    group: "",
    password: "",
  };

  const { mutate } = useMutation({
    mutationFn: (formPayload) => {
      return axios.post("https://api.react-learning.ru/signup", formPayload);
    },
  });

  const signUpSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("Необходимо указать имя"),

    group: Yup.string()
      .min(2, "Too Short!")
      .max(5, "Too Long!")
      .required("Необходимо указать группу"),

    email: Yup.string().email().required("Необходимо указать Email"),

    password: Yup.string()
      .required("Необходимо указать пароль")
      .min(6, "Пароль слишком короткий"),
  });

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        navigate("/login");
      },
      onError: (response) => {
        errorAlert("Произошла ошибка");
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signUpSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div className="formContainer">
            <div className="formWrapper">
              <span className="logo">DogStore</span>
              <span className="title">Регистрация</span>
              <Form>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Имя"
                  className={errors.name && touched.name ? "input-error" : null}
                />
                <ErrorMessage name="name" component="span" className="error" />
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className={
                    errors.email && touched.email ? "input-error" : null
                  }
                />
                <ErrorMessage name="email" component="span" className="error" />
                <Field
                  type="text"
                  name="group"
                  id="group"
                  placeholder="Группа"
                  className={
                    errors.group && touched.group ? "input-error" : null
                  }
                />
                <ErrorMessage name="name" component="span" className="error" />
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Пароль"
                  className={
                    errors.password && touched.password ? "input-error" : null
                  }
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="error"
                />
                <button
                  type="submit"
                  className={!(dirty && isValid) ? "disabled-btn" : ""}
                >
                  Зарегистрироваться
                </button>
              </Form>
              <p>
                Уже есть аккаунт? <Link to="/login">Войти</Link>
              </p>
            </div>
          </div>
        );
      }}
    </Formik>
  );
}
