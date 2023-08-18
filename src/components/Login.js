import Button from "../components/Button";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { supabase } from "../lib/supabaseClient";
import { checkUser } from "../store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidationSchema } from "../data/validation";
import classNames from "classnames";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fieldClasses = classNames("w-full px-3 py-2 border rounded");
  const labelClasses = classNames("text-lg text-gray-700");

  const [loginErrorMessage, setLoginErrorMessage] = useState(undefined);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    const { email, password } = values;

    const { error } = await supabase.auth.signInWithPassword({
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

  const logInIntoExampleUser = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: "example123@example.com",
      password: "123123",
    });
    if (!error) {
      dispatch(checkUser());
      navigate("/menu/panel");
    } else {
      setLoginErrorMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center ">
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-1 w-80 p-8 pb-4">
          <label htmlFor="email" className={labelClasses}>
            Email:
          </label>
          <Field type="text" id="email" name="email" className={fieldClasses} />
          <ErrorMessage name="email" component="div" className="text-red-500" />
          <label htmlFor="password" className={labelClasses}>
            Password:
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
          <Button type="submit" value="Log In" className="w-full mt-1" />
          {loginErrorMessage ? (
            <div className="text-lg text-red-500 text-center mt-2">
              {loginErrorMessage}!
            </div>
          ) : null}
        </Form>
      </Formik>
      <Link
        to={"/menu/register"}
        className="hover:text-blue-500 cursor-pointer"
      >
        Don't have an account?
      </Link>
      <Link
        className="text-blue-500 hover:text-blue-600 cursor-pointer mt-2"
        onClick={() => {
          logInIntoExampleUser();
        }}
      >
        Log in into example user
      </Link>
    </div>
  );
}

export default Login;
