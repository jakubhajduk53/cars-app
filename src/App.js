import { useEffect } from "react";
import { supabase } from "./lib/supabaseClient";
import CarsList from "./components/CarsList";

function App() {
  console.log(supabase);
  async function fetchData() {
    let { data: cars, error } = await supabase.from("cars").select("*");

    console.log(cars);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <CarsList />
    </div>
  );
}

export default App;
