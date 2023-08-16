import Button from "./Button";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { supabase } from "../lib/supabaseClient";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const checkUser = (state) => state.user.user;
const selectUser = createSelector([checkUser], (user) => user);

const ChangeEmail = () => {
  const user = useSelector(selectUser);

  const [sendEmailMessage, setSendEmailMessage] = useState(false);

  const [initialValues, setInitialValues] = useState({
    email: "",
  });

  const { email } = user;

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  useEffect(() => {
    setInitialValues({
      email: email || "",
    });
  }, [email]);

  const handleSubmit = async (values) => {
    const { email } = values;
    setInitialValues({ email: email });
    await supabase.auth.updateUser({ email: email });

    setSendEmailMessage(true);
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
          <Form className="max-w-sm mx-auto w-72 p-8 text-lg">
            <label className="block mb-2">
              <span className="text-gray-700">Email:</span>
              <Field
                type="email"
                name="email"
                className="w-full px-3 py-2 border rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </label>
            <Button type="submit" value="Update" className="mt-1 w-full" />
          </Form>
        )}
      </Formik>
      {sendEmailMessage ? (
        <p className="text-center text-blue-400 text-lg">
          Confirmation email was sent to:
          <span className="text-blue-400 font-semibold">
            {" "}
            {initialValues.email}
          </span>
        </p>
      ) : null}
    </div>
  );
};

export default ChangeEmail;
