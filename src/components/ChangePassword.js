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

    navigate("/menu/panel");
  };

  return (
    <div className="flex flex-col items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="bg-white p-8 rounded w-80 text-lg">
          <div className="mb-4">
            <div className="block mb-2">
              <span className="text-gray-700">New Password:</span>
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
          </div>
          <div className="mb-4">
            <div className="block mb-2">
              <span className="text-gray-700">New Password:</span>
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
          </div>

          <Button
            type="submit"
            value="Change Password"
            className="mt-1 w-full"
          />
        </Form>
      </Formik>
    </div>
  );
}

export default ChangePassword;
