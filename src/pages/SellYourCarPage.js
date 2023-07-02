import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { nanoid } from "nanoid";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { addCar } from "../store";
import { Formik, Field, Form, ErrorMessage } from "formik";

function SellYourCarPage() {
  const dispatch = useDispatch();

  const [imagePreview, setImagePreview] = useState(null);

  const CDNURL =
    "https://fomgpntxpamdvhnbyiyr.supabase.co/storage/v1/object/public/cars/";

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
            image: null,
          }}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="flex flex-col px-4 py-2 w-full max-w-md">
              <label htmlFor="name" className="mb-2">
                Car name:
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="mb-4 p-2 border border-gray-300 rounded"
                placeholder="Car name"
              />

              <label htmlFor="year" className="mb-2">
                Year of production:
              </label>
              <Field
                type="number"
                id="year"
                name="year_of_production"
                className="mb-4 p-2 border border-gray-300 rounded"
                placeholder="Year of production"
              />

              <label htmlFor="price" className="mb-2">
                Price:
              </label>
              <Field
                type="number"
                id="price"
                name="price"
                className="mb-4 p-2 border border-gray-300 rounded"
                placeholder="Price"
              />

              <label htmlFor="location" className="mb-2">
                Location:
              </label>
              <Field
                type="text"
                id="location"
                name="location"
                className="mb-4 p-2 border border-gray-300 rounded"
                placeholder="Location"
              />

              <label htmlFor="image" className="mb-2">
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
                className="mb-4"
              />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="mb-4" />
              )}

              <Button type="submit" value="Confirm" className="w-full" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SellYourCarPage;
