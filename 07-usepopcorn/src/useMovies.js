import { useState, useEffect } from "react";
//using default exports for components and named exports for custom hooks - this is a function so we dont accept props but we do accept arguments
const KEY = "9e2e983";
//KEY is tightly coupled with URL and hence having a copy here

export function useMovies(query) {
  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  //Doesnt return anything - we pass in a function and a dependancy array
  //Is similar to event handler that is listening for the query to change - synchronized with state variable and runs on initial render and whenever query changes
  useEffect(
    function () {
      const controller = new AbortController();
      //callback?.(); //function will only be called if it exists
      setIsLoading(true);
      setError("");
      //can use useEffect - only if we want to fetch data on mount - but if we are fetching only as a result of search query then we can convert it to a event handler function which is more preferred way listening to onChange event
      async function fetchMovies() {
        try {
          //contains code that creates side effect
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          //Error handling
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          // console.log(data)
          //Error handling when movie not found
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
          // console.log(movies) - we will have stale state - old value
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (!query.length) {
        setError("");
        setIsLoading(false);
        setMovies([]);
        return;
      }

      //   handleCloseMovie();
      fetchMovies();

      //to clean up fetch api - we use native browser api - AbortController
      return function () {
        //No longer many http requests happen at the same time - no additional data downloads - each time there is a new key stroke the component is re-rendered and our controller will abort the previous fetch request, and then initiates the new one
        controller.abort();
      };
    },
    [query]
  ); // [] array means the effect that we specified will only run as the component first mounts(after it has painted on the screen) - when app component renders for very first time
  return { movies, isLoading, error }; //returning object
}
