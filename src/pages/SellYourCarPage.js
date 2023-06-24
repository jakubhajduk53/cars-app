import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { nanoid } from "nanoid";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { addCar } from "../store";

function SellYourCarPage() {
  const dispatch = useDispatch();

  const [car, setCar] = useState({
    name: "",
    year_of_production: 0,
    price: 0,
    location: "",
    image_url: "",
  });

  const [image, setImage] = useState({
    file: "",
    id: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const [imageValue, setImageValue] = useState("");

  const [formError, setFormError] = useState(false);

  const CDNURL =
    "https://fomgpntxpamdvhnbyiyr.supabase.co/storage/v1/object/public/cars/";

  const handleImage = (event) => {
    const id = nanoid();
    const file = event.target.files[0];

    setImage({ file, id });

    setCar((prevCar) => ({
      ...prevCar,
      image_url: CDNURL + id,
    }));

    setImageValue(event.target.value);

    setImagePreview(URL.createObjectURL(file));
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      !car.name ||
      !car.year_of_production ||
      !car.price ||
      !car.location ||
      !image.file
    ) {
      setFormError(true);
      return;
    }

    await supabase.storage.from("cars").upload(image.id, image.file);

    const { data, error } = await supabase
      .from("cars")
      .insert([
        {
          name: car.name,
          year_of_production: car.year_of_production,
          price: car.price,
          location: car.location,
          image_url: CDNURL + image.id,
        },
      ])
      .select();

    if (error) {
    } else {
      await dispatch(addCar(data[0]));
    }

    setCar({
      name: "",
      year_of_production: 0,
      price: 0,
      location: "",
      image_url: "",
    });

    setImage({
      file: "",
      id: null,
    });

    setFormError(false);

    setImageValue("");

    setImagePreview(null);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  };

  return (
    <div className="flex w-full justify-center py-5">
      <div>
        <h2 className="text-lg font-bold mb-4 text-center">Sell your car</h2>
        <form
          className="flex flex-col px-4 py-2 w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name" className="mb-2">
            Car name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={car.name}
            onChange={handleChange}
            className="mb-4 p-2 border border-gray-300 rounded"
            placeholder="Car name"
          />

          <label htmlFor="year" className="mb-2">
            Year of production:
          </label>
          <input
            type="number"
            id="year"
            name="year_of_production"
            value={car.year_of_production}
            onChange={handleChange}
            className="mb-4 p-2 border border-gray-300 rounded"
            placeholder="Year of production"
          />

          <label htmlFor="price" className="mb-2">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={car.price}
            onChange={handleChange}
            className="mb-4 p-2 border border-gray-300 rounded"
            placeholder="Price"
          />

          <label htmlFor="location" className="mb-2">
            Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={car.location}
            onChange={handleChange}
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
            value={imageValue}
            onChange={handleImage}
            className="mb-4"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mb-4" />
          )}

          <Button value="Confirm" className="w-full" />
          {formError && (
            <p className="text-red-500 text-center text-lg">
              All fields are required!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default SellYourCarPage;
