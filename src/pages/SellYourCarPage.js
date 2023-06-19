import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { nanoid } from "nanoid";

function SellYourCarPage() {
  const [car, setCar] = useState({
    name: "",
    year_of_production: 0,
    price: 0,
    location: "",
    image_url: "",
  });

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
    const { data, error } = await supabase.from("cars").insert([
      {
        name: car.name,
        year_of_production: car.year_of_production,
        price: car.price,
        location: car.location,
        image_url: car.image_url,
      },
    ]);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  };

  return (
    <div>
      Sell your car
      <form>
        <input
          type="text"
          name="name"
          value={car.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="year_of_production"
          value={car.year_of_production}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={car.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          value={car.location}
          onChange={handleChange}
        />
        Image:
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={(event) => {
            uploadImage(event);
          }}
        />
        <button
          onClick={(event) => {
            handleClick(event);
          }}
        >
          Confirm
        </button>
      </form>
    </div>
  );
}

export default SellYourCarPage;
