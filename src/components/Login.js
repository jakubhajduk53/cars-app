import Button from "../components/Button";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { supabase } from "../lib/supabaseClient";
import { checkUser } from "../store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [loginErrorMessage, setLoginErrorMessage] = useState(undefined);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    const { email, password } = values;

    const { user, session, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (!error) {
      dispatch(checkUser());
      navigate("/menu/panel");
    } else {
      setLoginErrorMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center w-80">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="bg-white p-8 rounded w-full">
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email:
            </label>
            <Field
              type="text"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded"
            />
            <ErrorMessage
              name="email"
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
              autoComplete="on"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />
          </div>
          <Button type="submit" value="Log In" className="w-full" />
          {loginErrorMessage ? (
            <div className="text-lg text-red-500 text-center mt-2">
              {loginErrorMessage}!
            </div>
          ) : null}
        </Form>
      </Formik>
      <Link
        to={"/menu/register"}
        className="hover:text-blue-500 cursor-pointer "
      >
        Don't have an account?
      </Link>
    </div>
  );
}

export default Login;
