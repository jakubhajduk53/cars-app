import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../components/Button";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Repeat password is required"),
});

function ChangePassword() {
  const navigate = useNavigate();

  const initialValues = {
    password: "",
    repeatPassword: "",
  };

  const handleSubmit = async (values) => {
    const { password } = values;

    await supabase.auth.updateUser({
      password: password,
    });

    navigate("/menu/panel/options");
  };

  return (
    <div className="flex flex-col items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="bg-white p-8 rounded w-80 ">
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              New Password:
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded"
              autoComplete="on"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="repeatPassword" className="block mb-2">
              Repeat New Password:
            </label>
            <Field
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              className="w-full px-3 py-2 border rounded"
              autoComplete="on"
            />
            <ErrorMessage
              name="repeatPassword"
              component="div"
              className="text-red-500"
            />
          </div>

          <Button type="submit" value="Change Password" className="w-full" />
        </Form>
      </Formik>
    </div>
  );
}

export default ChangePassword;
