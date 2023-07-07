import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../components/Button";
import { supabase } from "../lib/supabaseClient";
import { checkUser } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name cannot be shorter than 2 letters")
    .max(20, "First name cannot be longer than 20 letters")
    .matches("^[a-zA-Z0-9.\\s-]*$", "Incorrect value"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name cannot be shorter than 2 letters")
    .max(20, "Last name cannot be longer than 20 letters")
    .matches("^[a-zA-Z0-9.\\s-]*$", "Incorrect value"),
  phoneNumber: Yup.number()
    .required("Phone number is required")
    .positive("Phone number must be a positive number")
    .min(7, "Phone numbers cannot contain less than 7 digits")
    .max(15, "Phone numbers cannot contain more than 15 digits"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Repeat password is required"),
});

function Register(props) {
  const dispatch = useDispatch();

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

    const { data, error } = await supabase.auth.signUp({
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
    }
    props.handleClick(true);
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
            <label htmlFor="firstName" className="block mb-2">
              First Name:
            </label>
            <Field
              type="text"
              id="firstName"
              name="firstName"
              className="w-full px-3 py-2 border rounded"
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block mb-2">
              Last Name:
            </label>
            <Field
              type="text"
              id="lastName"
              name="lastName"
              className="w-full px-3 py-2 border rounded"
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2">
              Phone Number:
            </label>
            <Field
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="w-full px-3 py-2 border rounded"
            />
            <ErrorMessage
              name="phoneNumber"
              component="div"
              className="text-red-500"
            />
          </div>

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

          <div className="mb-4">
            <label htmlFor="repeatPassword" className="block mb-2">
              Repeat Password:
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

          <Button type="submit" value="Sign Up" className="w-full" />
        </Form>
      </Formik>
      <Link to={"/menu/login"} className="hover:text-blue-500 cursor-pointer ">
        Have an account? Log in
      </Link>
    </div>
  );
}

export default Register;
