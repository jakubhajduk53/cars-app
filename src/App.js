import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import CarsList from "./components/CarsList";

function App() {
  const [cars, setCars] = useState([]);

  async function fetchData() {
    let { data: cars, error } = await supabase.from("cars").select("*");
    setCars(cars);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      {cars.length > 0 ? <CarsList cars={cars} /> : <p>Loading...</p>}
    </div>
  );
}

export default App;
