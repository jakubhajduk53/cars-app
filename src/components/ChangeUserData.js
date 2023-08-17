import Button from "./Button";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import classNames from "classnames";

const checkUser = (state) => state.user.user;
const selectUser = createSelector([checkUser], (user) => user);

const ChangeUserData = () => {
  const user = useSelector(selectUser);

  const navigate = useNavigate();

  const fieldClasses = classNames("w-full px-3 py-2 border rounded");

  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const { user_metadata } = user;
  const {
    first_name: firstName,
    last_name: lastName,
    phone_number: phoneNumber,
  } = user_metadata || {};

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    phoneNumber: Yup.string().matches(
      /^\d{7,15}$/,
      "Invalid phone number. Phone number should contain 7 to 15 digits"
    ),
  });

  useEffect(() => {
    setInitialValues({
      firstName: firstName || "",
      lastName: lastName || "",
      phoneNumber: phoneNumber || "",
    });
  }, [firstName, lastName, phoneNumber]);

  const handleSubmit = async (values) => {
    const { firstName, lastName, phoneNumber } = values;

    await supabase.auth.updateUser({
      data: {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
      },
    });

    navigate("/menu/panel");
  };

  return (
    <div className="flex flex-col items-center">
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <Form className="flex flex-col gap-1 w-80 p-8">
            <label htmlFor="firstName" className="text-lg text-gray-700">
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
            <label htmlFor="lastName" className="text-lg text-gray-700">
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
            <label htmlFor="phoneNumber" className="text-lg text-gray-700">
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
            <Button type="submit" value="Update" className="w-full mt-1" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangeUserData;
