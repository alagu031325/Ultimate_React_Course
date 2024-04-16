// imports to third party libraries
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import CityList from "./components/CityList";
import City from "./components/City";
import Form from "./components/Form";
import CountryList from "./components/CountryList";

const BASE_URL = "http://localhost:8000";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //To Load data on mount
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        // console.log(data);
        setCities(data);
      } catch {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  // react element - not just the name of the component but react element which we get by using the component
  return (
    <BrowserRouter>
      <Routes>
        {/* by default application renders the homepage */}
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        {/* Create nested routes - child routes of this parent route */}
        <Route path="app" element={<AppLayout />}>
          {/* an index route is the default child route that is to be matched if none of the other routes matches */}
          {/* here we can use the navigate function that comes from the hook */}
          <Route index element={<Navigate replace to="cities" />} />
          {/* Navigate component redirects to cities route that point to CityList component instead of again specifying CityList element in there - replace keyword replaces current element in the history stack*/}
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          {/* specify the name of the parameter in the path - dynamically specifying the id*/}
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        {/* catch all routes that didnt match one of the above 3 routes */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
