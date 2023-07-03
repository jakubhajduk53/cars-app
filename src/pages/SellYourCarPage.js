import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { nanoid } from "nanoid";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { addCar } from "../store";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function SellYourCarPage() {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Car name is required"),
    year_of_production: Yup.number()
      .required("Year of production is required")
      .positive("Year of production must be a positive number"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be a positive number"),
    location: Yup.string().required("Location is required"),
    image_url: Yup.mixed().required("Image is required"),
  });

  const [imagePreview, setImagePreview] = useState(null);

  const CDNURL = process.env.REACT_APP_SUPABASE_CDN_URL;

  async function handleSubmit(values) {
    const { name, year_of_production, price, location, image_url } = values;

    const id = nanoid();

    await supabase.storage.from("cars").upload(id, image_url);

    const { data, error } = await supabase
      .from("cars")
      .insert([
        {
          name,
          year_of_production,
          price,
          location,
          image_url: CDNURL + id,
        },
      ])
      .select();

    if (!error) {
      await dispatch(addCar(data[0]));
    }

    setImagePreview(null);
  }

  return (
    <div className="flex w-full justify-center py-5">
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
          onSubmit={handleSubmit}
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
    </div>
  );
}

export default SellYourCarPage;
