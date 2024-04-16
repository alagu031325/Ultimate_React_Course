/* eslint-disable react/prop-types */
import { createContext, useEffect, useContext, useReducer } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  //handles all state transitions - they should be pure functions - so if async functions are involved still they need to be performed within event handlers
  switch (action.type) {
    //model actions as events and not setters - '/' naming convention used in redux community
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      //both loading and cities state are updated
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  //To Load data on mount
  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        // console.log(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    //id is read from the URL so it will be a string and currentCity.id is a number
    if (Number(id) === currentCity.id) return;

    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      // console.log(data);
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading the city...",
      });
    }
  }
  //updates the server - in our case updates the cities.json file - fake server
  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
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
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      });
    }
  }

  //To delete a city from the list
  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      // we need specify the options object if the method is post(post request sent to an api) and actual data is in body property and mention the data format in the headers
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      //UI state in sync with remote state
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
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
