import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "./Button";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const checkUser = (state) => state.user.user;

const selectUser = createSelector([checkUser], (user) => user);

const ChangeUserData = () => {
  const user = useSelector(selectUser);

  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  const { user_metadata, email } = user;
  const {
    first_name: firstName,
    last_name: lastName,
    phone_number: phoneNumber,
  } = user_metadata || {};

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  useEffect(() => {
    setInitialValues({
      firstName: firstName || "",
      lastName: lastName || "",
      phoneNumber: phoneNumber || "",
      email: email || "",
    });
  }, [firstName, lastName, phoneNumber, email]);

  const handleSubmit = async (values) => {
    const { firstName, lastName, phoneNumber, email } = values;

    await supabase.auth.updateUser({
      data: {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
      },
    });

    navigate("/menu/panel/options");
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values }) => (
        <Form className="max-w-sm mx-auto w-72 text-lg">
          <label className="block mb-2">
            <span className="text-gray-700">First Name:</span>
            <Field
              type="text"
              name="firstName"
              className="form-input mt-1 block w-full border border-gray-300 rounded"
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className="text-red-500"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Last Name:</span>
            <Field
              type="text"
              name="lastName"
              className="form-input mt-1 block w-full border border-gray-300 rounded"
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className="text-red-500"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Phone Number:</span>
            <Field
              type="text"
              name="phoneNumber"
              className="form-input mt-1 block w-full border border-gray-300 rounded"
            />
            <ErrorMessage
              name="phoneNumber"
              component="div"
              className="text-red-500"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Email:</span>
            <Field
              type="email"
              name="email"
              className="form-input mt-1 block w-full border border-gray-300 rounded"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500"
            />
          </label>
          <Button type="submit" value="Update" className="mt-1 block w-full" />
        </Form>
      )}
    </Formik>
  );
};

export default ChangeUserData;
