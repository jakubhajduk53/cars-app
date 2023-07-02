import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "./Button";
import { useSelector } from "react-redux";

const Contact = (props) => {
  const car = useSelector(({ cars: { selectedCar } }) => {
    return selectedCar;
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    comment: `Hi! I just want to ask about ${car.name} availability`,
    inquiryType: "checkAvailability",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    inquiryType: Yup.string().required("Inquiry type is required"),
    comment: Yup.string().required("Comment is required"),
  });

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
      validationSchema={validationSchema}
    >
      {({ values, setFieldValue }) => (
        <Form className="max-w-sm mx-auto mt-8 mb-8 text-lg">
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
          <label className="block mb-2">
            <span className="text-gray-700">Inquiry Type:</span>
            <Field
              as="select"
              name="inquiryType"
              className="form-select mt-1 block w-full border border-gray-300 rounded"
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
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Comment:</span>
            <Field
              as="textarea"
              name="comment"
              className="form-textarea mt-1 block w-full border border-gray-300 rounded h-24"
            />
            <ErrorMessage
              name="comment"
              component="div"
              className="text-red-500"
            />
          </label>
          <Button type="submit" value="Submit" className="mt-1 block w-full" />
        </Form>
      )}
    </Formik>
  );
};

export default Contact;
