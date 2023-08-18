import Button from "../components/Button";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { supabase } from "../lib/supabaseClient";
import { checkUser } from "../store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerValidationSchema } from "../data/validation";
import classNames from "classnames";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fieldClasses = classNames("w-full px-3 py-2 border rounded");
  const labelClasses = classNames("text-lg text-gray-700");

  const [registerErrorMessage, setRegisterErrorMessage] = useState(undefined);

  const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

  const handleSubmit = async (values) => {
    const { firstName, lastName, phoneNumber, email, password } = values;

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
        },
      },
    });
    if (!error) {
      dispatch(checkUser());
      navigate("/menu/panel");
    } else {
      setRegisterErrorMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={registerValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-1 w-80 p-8 pb-4">
          <label htmlFor="firstName" className={labelClasses}>
            First Name:
          </label>
          <Field
            type="text"
            id="firstName"
            name="firstName"
            className={fieldClasses}
          />
          <ErrorMessage
            name="firstName"
            component="div"
            className="text-red-500"
          />
          <label htmlFor="lastName" className={labelClasses}>
            Last Name:
          </label>
          <Field
            type="text"
            id="lastName"
            name="lastName"
            className={fieldClasses}
          />
          <ErrorMessage
            name="lastName"
            component="div"
            className="text-red-500"
          />
          <label htmlFor="phoneNumber" className={labelClasses}>
            Phone Number:
          </label>
          <Field
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            className={fieldClasses}
          />
          <ErrorMessage
            name="phoneNumber"
            component="div"
            className="text-red-500"
          />
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
          <label htmlFor="repeatPassword" className={labelClasses}>
            Repeat Password:
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
          <Button type="submit" value="Sign Up" className="w-full mt-1" />
          {registerErrorMessage ? (
            <div className="text-lg text-red-500 text-center mt-2">
              {registerErrorMessage}!
            </div>
          ) : null}
        </Form>
      </Formik>
      <Link to={"/menu/login"} className="hover:text-blue-500 cursor-pointer ">
        Have an account? Log in
      </Link>
    </div>
  );
}

export default Register;
