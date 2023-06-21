import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { nanoid } from "nanoid";
import Button from "../components/Button";

function SellYourCarPage(props) {
  const [car, setCar] = useState({
    name: "",
    year_of_production: 0,
    price: 0,
    location: "",
    image_url: "",
  });

  const [formError, setFormError] = useState(false);

  const CDNURL =
    "https://fomgpntxpamdvhnbyiyr.supabase.co/storage/v1/object/public/cars/";

  async function uploadImage(event) {
    let file = event.target.files[0];
    const id = nanoid();

    setCar((prevCar) => ({
      ...prevCar,
      image_url: CDNURL + id,
    }));

    const { data, error } = await supabase.storage
      .from("cars")
      .upload(id, file);
  }

  async function handleClick(event) {
    event.preventDefault();

    if (
      !car.name ||
      !car.year_of_production ||
      !car.price ||
      !car.location ||
      !car.image_url
    ) {
      setFormError(true);
      return;
    }

    const { data, error } = await supabase.from("cars").insert([
      {
        name: car.name,
        year_of_production: car.year_of_production,
        price: car.price,
        location: car.location,
        image_url: car.image_url,
      },
    ]);

    setCar({
      name: "",
      year_of_production: 0,
      price: 0,
      location: "",
      image_url: "",
    });

    setFormError(false);

    props.update();
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center py-5">
      <div>
        <h2 className="text-lg font-bold mb-4 text-center">Sell your car</h2>
        <form className="flex flex-col px-4 py-2 w-full max-w-md">
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
            onChange={uploadImage}
            className="mb-4"
          />
          <Button onClick={handleClick} value="Confirm" className="w-full" />
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
