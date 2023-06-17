import { useEffect } from "react";
import { supabase } from "./lib/supabaseClient";

function App() {
  console.log(supabase);
  async function fetchData() {
    let { data: cars, error } = await supabase.from("cars").select("*");

    console.log(cars);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return <div className="App">App</div>;
}

export default App;
