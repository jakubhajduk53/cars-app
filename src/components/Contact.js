import React, { useState } from "react";

const FormComponent = () => {
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

    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Phone Number:
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Comment:
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Inquiry Type:
        <select
          name="inquiryType"
          value={formData.inquiryType}
          onChange={handleChange}
        >
          <option value="checkAvailability">Check Availability</option>
          <option value="getPriceQuote">Get a Price Quote</option>
          <option value="askQuestion">Ask a Question</option>
        </select>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
