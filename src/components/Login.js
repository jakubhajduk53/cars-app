import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../components/Button";
import { supabase } from "../lib/supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "../store";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Login is required"),
  password: Yup.string().required("Password is required"),
});

function Login(props) {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    const { email, password } = values;
    console.log(supabase);

    const { user, session, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (!error) {
      dispatch(checkUser());
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="bg-white p-8 rounded ">
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
        </Form>
      </Formik>
      <p
        onClick={() => {
          props.handleClick(false);
        }}
        className="hover:text-blue-500 cursor-pointer "
      >
        Don't have an account?
      </p>
      {isLoggedIn ? <p>Hi</p> : null}
    </div>
  );
}

export default Login;
