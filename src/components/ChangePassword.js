import Button from "../components/Button";
import React from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import classNames from "classnames";

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Repeat password is required"),
});

function ChangePassword() {
  const navigate = useNavigate();

  const fieldClasses = classNames("w-full px-3 py-2 border rounded");

  const initialValues = {
    password: "",
    repeatPassword: "",
  };

  const handleSubmit = async (values) => {
    const { password } = values;

    await supabase.auth.updateUser({
      password: password,
    });

    navigate("/menu/panel");
  };

  return (
    <div className="flex flex-col items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-1 w-80 p-8">
          <>
            <label htmlFor="password" className="text-lg text-gray-700">
              New Password:
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className={fieldClasses}
              autoComplete="on"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />
          </>
          <>
            <label htmlFor="repeatPassword" className="text-lg text-gray-700">
              Repeat New Password:
            </label>
            <Field
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              className={fieldClasses}
              autoComplete="on"
            />
            <ErrorMessage
              name="repeatPassword"
              component="div"
              className="text-red-500"
            />
          </>
          <Button
            type="submit"
            value="Change Password"
            className="w-full mt-1"
          />
        </Form>
      </Formik>
    </div>
  );
}

export default ChangePassword;
