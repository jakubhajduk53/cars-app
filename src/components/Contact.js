import Button from "./Button";
import React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { contactValidationSchema } from "../data/validation";
import { labelClasses, fieldClasses } from "../data/classes";

const checkUser = (state) => state.user.user;
const selectUser = createSelector([checkUser], (user) => user);

const checkCar = (state) => state.cars.selectedCar;
const selectCar = createSelector([checkCar], (selectedCar) => selectedCar);

const Contact = (props) => {
  const car = useSelector(selectCar);

  const user = useSelector(selectUser);

  const {
    first_name: firstName,
    last_name: lastName,
    phone_number: phoneNumber,
  } = user.user_metadata || {};

  const { email } = user;

  const initialValues = {
    firstName: firstName || "",
    lastName: lastName || "",
    phoneNumber: phoneNumber || "",
    email: email || "",
    comment: `Hi! I just want to ask about ${car.name} availability`,
    inquiryType: "checkAvailability",
  };

  const handleInquiryChange = (event, setFieldValue) => {
    const { value } = event.target;

    let message = "";

    switch (value) {
      case "checkAvailability":
        message = `Hi! I just want to ask about ${car.name} availability`;
        break;
      case "getPriceQuote":
        message = `Hi! Can we negotiate about ${car.name} price?`;
        break;
      case "askQuestion":
        message = `Hi! I just want to ask some questions about ${car.name} `;
        break;
      default:
        message = "";
    }

    setFieldValue("inquiryType", value);
    setFieldValue("comment", message);
  };

  const handleSubmit = (values) => {
    console.log(values);
    props.closeModal();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={contactValidationSchema}
    >
      {({ values, setFieldValue }) => (
        <Form className="flex flex-col gap-1 w-80">
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
          <Field
            type="email"
            id="email"
            name="email"
            className={fieldClasses}
          />
          <ErrorMessage name="email" component="div" className="text-red-500" />
          <label htmlFor="inquiryType" className={labelClasses}>
            Inquiry Type:
          </label>
          <Field
            as="select"
            id="inquiryType"
            name="inquiryType"
            className={fieldClasses}
            onChange={(event) => handleInquiryChange(event, setFieldValue)}
          >
            <option value="checkAvailability">Check Availability</option>
            <option value="getPriceQuote">Get a Price Quote</option>
            <option value="askQuestion">Ask a Question</option>
          </Field>
          <ErrorMessage
            name="inquiryType"
            component="div"
            className="text-red-500"
          />
          <label htmlFor="comment" className={labelClasses}>
            Comment:
          </label>
          <Field
            as="textarea"
            id="comment"
            name="comment"
            className={fieldClasses + "h-24 overflow-y-scroll"}
          />
          <ErrorMessage
            name="comment"
            component="div"
            className="text-red-500"
          />
          <Button type="submit" value="Submit" className="mt-1 w-full" />
        </Form>
      )}
    </Formik>
  );
};

export default Contact;
