/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

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

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      // console.log(data);
      setCurrentCity(data);
    } catch {
      alert("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }
  //updates the server - in our case updates the cities.json file - fake server
  async function createCity(newCity) {
    try {
      setIsLoading(true);
      // we need specify the options object if the method is post(post request sent to an api) and actual data is in body property and mention the data format in the headers
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      //UI state in sync with remote state
      setCities(cities => [...cities, data]);
    } catch {
      alert("There was an error creating city.");
    } finally {
      setIsLoading(false);
    }
  }

  //To delete a city from the list
  async function deleteCity(id) {
    try {
      setIsLoading(true);
      // we need specify the options object if the method is post(post request sent to an api) and actual data is in body property and mention the data format in the headers
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      //UI state in sync with remote state
      setCities(cities => cities.filter(city => city.id !== id));
    } catch {
      alert("There was an error deleting city.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the Cities Provider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };
