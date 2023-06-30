import Button from "./Button";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const FormComponent = (props) => {
  const car = useSelector((state) => {
    return state.selectedCar;
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    comment: "",
    inquiryType: "checkAvailability",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.closeModal();
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-8 mb-8 text-lg"
    >
      <label className="block mb-2">
        <span className="text-gray-700">First Name:</span>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="form-input mt-1 block w-full border border-gray-300 rounded"
        />
      </label>
      <label className="block mb-2">
        <span className="text-gray-700">Last Name:</span>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="form-input mt-1 block w-full border border-gray-300 rounded"
        />
      </label>
      <label className="block mb-2">
        <span className="text-gray-700">Phone Number:</span>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="form-input mt-1 block w-full border border-gray-300 rounded"
        />
      </label>
      <label className="block mb-2">
        <span className="text-gray-700">Email:</span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-input mt-1 block w-full border border-gray-300 rounded"
        />
      </label>
      <label className="block mb-2">
        <span className="text-gray-700">Inquiry Type:</span>
        <select
          name="inquiryType"
          value={formData.inquiryType}
          onChange={handleChange}
          className="form-select mt-1 block w-full border border-gray-300 rounded"
        >
          <option value="checkAvailability">Check Availability</option>
          <option value="getPriceQuote">Get a Price Quote</option>
          <option value="askQuestion">Ask a Question</option>
        </select>
      </label>
      <label className="block mb-2">
        <span className="text-gray-700">Comment:</span>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          className="form-textarea mt-1 block w-full border border-gray-300 rounded"
        />
      </label>
      <Button value="Submit" className="mt-1 block w-full" />
    </form>
  );
};

export default FormComponent;
