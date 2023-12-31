import Button from "./Button";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { changeUserDataValidationSchema } from "../data/validation";
import { labelClasses, fieldClasses } from "../data/classes";

const checkUser = (state) => state.user.user;
const selectUser = createSelector([checkUser], (user) => user);

const ChangeUserData = () => {
  const user = useSelector(selectUser);

  const navigate = useNavigate();

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
        validationSchema={changeUserDataValidationSchema}
      >
        {({ values }) => (
          <Form className="flex flex-col gap-1 w-80 p-8">
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
            <Button type="submit" value="Update" className="w-full mt-1" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangeUserData;
