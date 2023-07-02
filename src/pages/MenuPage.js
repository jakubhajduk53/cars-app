import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../components/Button";

const validationSchema = Yup.object().shape({
  login: Yup.string().required("Login is required"),
  password: Yup.string().required("Password is required"),
});

function MenuPage() {
  const initialValues = {
    login: "",
    password: "",
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="flex w-full justify-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="bg-white p-8 rounded ">
          <div className="mb-4">
            <label htmlFor="login" className="block mb-2">
              Login:
            </label>
            <Field
              type="text"
              id="login"
              name="login"
              className="w-full px-3 py-2 border rounded"
            />
            <ErrorMessage
              name="login"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password:
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />
          </div>

          <Button type="submit" value="Log In" className="w-full" />
        </Form>
      </Formik>
    </div>
  );
}

export default MenuPage;
