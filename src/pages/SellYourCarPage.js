import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { nanoid } from "nanoid";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { addCar } from "../store";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createSelector } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const checkIsLoggedIn = (state) => state.user.isLoggedIn;

const selectIsLoggedIn = createSelector(
  [checkIsLoggedIn],
  (isLoggedIn) => isLoggedIn
);

const checkUser = (state) => state.user.user;

const selectUser = createSelector([checkUser], (user) => user);

function SellYourCarPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const currentYear = new Date().getFullYear();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Car name is required")
      .matches(
        "^[a-zA-Z0-9.s-]*$",
        "Incorrect value, name should contain letters, numbers, dots, dashes and whitespaces"
      )
      .min(6, "Name should contain more than 5 characters")
      .max(25, "Name cannot be longer than 24 characters"),
    year_of_production: Yup.number()
      .required("Year of production is required")
      .positive("Year of production must be a positive number")
      .min(1901, "Year must be higher than 1900")
      .max(currentYear, `Year cannot be higher than ${currentYear}`),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be a positive number")
      .max(100000000, "Price cannot be higher than 100mln $"),
    location: Yup.string()
      .required("Location is required")
      .matches("^[a-zA-Z0-9.s-]*$", "Incorrect characters")
      .min(4, "Location should contain more than 3 characters")
      .max(30, "Location cannot be longer than 30 characters"),

    image_url: Yup.mixed().required("Image is required"),
  });

  const [imagePreview, setImagePreview] = useState(null);

  const CDNURL = process.env.REACT_APP_SUPABASE_CDN_URL;

  const user = useSelector(selectUser);

  const { id: userId } = user || {};

  async function handleSubmit(values, actions) {
    const { name, year_of_production, price, location, image_url } = values;

    const id = nanoid();

    await supabase.storage.from("cars-list").upload(id, image_url);

    const { data, error } = await supabase
      .from("cars")
      .insert([
        {
          name,
          year_of_production,
          price,
          location,
          image_url: CDNURL + id,
          owner_id: userId,
        },
      ])
      .select();

    if (!error) {
      await dispatch(addCar(data[0]));
    }

    setImagePreview(null);

    actions.resetForm();

    navigate("/menu/panel/your-cars");
  }

  return (
    <div className="flex w-full justify-center py-5">
      {isLoggedIn ? (
        <div>
          <h2 className="text-lg font-bold mb-4 text-center">Sell your car</h2>
          <Formik
            initialValues={{
              name: "",
              year_of_production: 0,
              price: 0,
              location: "",
              image_url: null,
            }}
            onSubmit={(values, actions) => {
              handleSubmit(values, actions);
            }}
            validationSchema={validationSchema}
          >
            {({ setFieldValue, errors, touched }) => (
              <Form className="flex flex-col px-4 py-2 w-full max-w-md">
                <label htmlFor="name" className="mb-2 mt-4">
                  Car name:
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="p-2 border border-gray-300 rounded"
                  placeholder="Car name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error mb-4 text-red-500"
                />

                <label htmlFor="year" className="mb-2 mt-4">
                  Year of production:
                </label>
                <Field
                  type="number"
                  id="year"
                  name="year_of_production"
                  className="p-2 border border-gray-300 rounded"
                  placeholder="Year of production"
                />
                <ErrorMessage
                  name="year_of_production"
                  component="div"
                  className="error mb-4 text-red-500"
                />

                <label htmlFor="price" className="mb-2 mt-4">
                  Price:
                </label>
                <Field
                  type="number"
                  id="price"
                  name="price"
                  className="p-2 border border-gray-300 rounded"
                  placeholder="Price"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="error  mb-4 text-red-500"
                />

                <label htmlFor="location" className="mb-2 mt-4">
                  Location:
                </label>
                <Field
                  type="text"
                  id="location"
                  name="location"
                  className="p-2 border border-gray-300 rounded"
                  placeholder="Location"
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="error  mb-4 text-red-500"
                />

                <label htmlFor="image" className="mb-2 mt-4">
                  Image:
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(event) => {
                    setFieldValue("image_url", event.currentTarget.files[0]);
                    setImagePreview(
                      URL.createObjectURL(event.currentTarget.files[0])
                    );
                  }}
                />
                {errors.image_url && touched.image_url && (
                  <div className="error mb-4 text-red-500">
                    {errors.image_url}
                  </div>
                )}
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="mb-4" />
                )}

                <Button type="submit" value="Confirm" className="w-full mt-4" />
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="mb-5 text-lg text-blue-400">
            You must be logged in to sell your car!
          </p>
          <Link to="/menu/login">
            <p className="hover:text-blue-500 cursor-pointer ">Log in now!</p>
          </Link>
        </div>
      )}
    </div>
  );
}

export default SellYourCarPage;
