import Button from "../components/Button";
import React from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { changePasswordValidationSchema } from "../data/validation";
import { labelClasses, fieldClasses } from "../data/classes";

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
        validationSchema={changePasswordValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-1 w-80 p-8">
          <>
            <label htmlFor="password" className={labelClasses}>
              New Password:
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
          </>
          <>
            <label htmlFor="repeatPassword" className={labelClasses}>
              Repeat New Password:
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
          </>
          <Button
            type="submit"
            value="Change Password"
            className="w-full mt-1"
          />
        </Form>
      </Formik>
    </div>
  );
}

export default ChangePassword;
