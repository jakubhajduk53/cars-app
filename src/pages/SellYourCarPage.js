import { Button } from "../components/";
import { supabase } from "../lib/supabaseClient";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCar } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import { sellYourCarValidationSchema } from "../data/validation";
import { fieldClasses, labelClasses } from "../data/classes";

const CDNURL = process.env.REACT_APP_SUPABASE_CDN_URL;

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
  const [imagePreview, setImagePreview] = useState(null);
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
    <div className="flex w-full justify-center mt-5">
      {isLoggedIn ? (
        <div>
          <h2 className="text-4xl text-center">Sell your car</h2>
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
            validationSchema={sellYourCarValidationSchema}
          >
            {({ setFieldValue, errors, touched }) => (
              <Form className="flex flex-col gap-1 w-80 p-8 pt-4">
                <label htmlFor="name" className={labelClasses}>
                  Car name:
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className={fieldClasses}
                  placeholder="Car name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                />
                <label htmlFor="year" className={labelClasses}>
                  Year of production:
                </label>
                <Field
                  type="number"
                  id="year"
                  name="year_of_production"
                  className={fieldClasses}
                  placeholder="Year of production"
                />
                <ErrorMessage
                  name="year_of_production"
                  component="div"
                  className="text-red-500"
                />
                <label htmlFor="price" className={labelClasses}>
                  Price:
                </label>
                <Field
                  type="number"
                  id="price"
                  name="price"
                  className={fieldClasses}
                  placeholder="Price"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500"
                />
                <label htmlFor="location" className={labelClasses}>
                  Location:
                </label>
                <Field
                  type="text"
                  id="location"
                  name="location"
                  className={fieldClasses}
                  placeholder="Location"
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-500"
                />
                <label htmlFor="image" className={labelClasses}>
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
                  <div className="text-red-500">{errors.image_url}</div>
                )}
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="w-80 h-80" />
                )}

                <Button type="submit" value="Confirm" className="w-full mt-1" />
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
