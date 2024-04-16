import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

const average = arr =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// If the variable definition is also the part of render logic then it will be recreated each time the component is rendered
const KEY = "9e2e983";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  //function declarations are hoisted in JS
  const { movies, isLoading, error } = useMovies(query);

  //similar to useState accepts initial state
  const [watched, setWatched] = useLocalStorageState([], "watched");

  // const [watched, setWatched] = useState([]);
  //pass in a callback function to set the initial value - useState hook also accepts a callback function which is called on initial render - then the state variable is initialized with whatever value the function returns
  /* const [watched, setWatched] = useState(
    //This function cant have any arguments and needs to be pure function - is not executed on subsequent re-renders
    function () {
      const storedValue = localStorage.getItem("watched");
      //parses the string representation back to JS object equivalent
      if (storedValue) return JSON.parse(storedValue);
      return [];
    }
  ); */

  function handleSelectMovie(id) {
    setSelectedId(selectedId => (selectedId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  //Event handler function
  function handleAddWatchedMovie(movie) {
    setWatched(watched => [...watched, movie]);
    //Each time when a new movie is added we store it in the local storage - we can even do it inside effect - store key value pair specific to each domain
    //localStorage.setItem("watched", JSON.stringify([...watched, movie])); //value must be a string
  }

  function handleDeleteWatchedMovie(id) {
    //Setter function needs to be pure and should return the next state based on current state - preferred way of updating state - we should not mutate objects but replace them
    setWatched(watched => watched.filter(movie => movie.imdbID !== id));
  }

  //We are using NumResults in the component right where the movies state live - so we are eliminating the prop drilling problem - dont need to pass props through intemediate components
  return (
    <>
      <NavBar>
        <SearchBar query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        {/* Can also pass as explicit props and receive it as element instead of children prop - use this when we want to pass multiple elements and give them separate names   
         <Box element={<MovieList movies={movies} />} />
        <Box element={<>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
          </>} /> */}

        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading ... </p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>👾</span> {message}
    </p>
  );
}

//composed - NavBar with 3 other components - Logo is stateless and completely not relevant to app so we can have it in Navbar
function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function SearchBar({ query, setQuery }) {
  /* useEffect(function () {
    // React is Declarative we dont tell react how to do things - so this isnt react way of doing - should make the action of selecting elements more declarative
    const searchElem = document.querySelector(".search");
    searchElem.focus();
  }, []); */

  const inputEl = useRef(null); //Stores input element

  //Automatically focus on input element with useRef - using Ref with DOM elements happens in 3 steps - create Ref(initial value null) - pass in as a value to 'ref' prop - use this ref within event hanlders or inside useEffect hook

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    //clearing the previous search value
    setQuery("");
  });
  //We need to use an effect in order to use a ref that contains DOM element like input because the ref only gets added to the DOM element, only after the DOM has already loaded
  /*  useEffect(
    function () {
      //the current property stores the DOM element
      function callback(e) {
        //if the input element is the currently active element we need to proceed with search instead of clearing the typed query string
        if (document.activeElement === inputEl.current) return;

        if (e.code === "Enter") {
          inputEl.current.focus();
          //clearing the previous search value
          setQuery("");
        }
      }

      document.addEventListener("keydown", callback);

      return () => document.removeEventListener("keydown", callback);
    },
    [setQuery] //setQuery is a prop to this component
  ); */

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={e => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen(open => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map(movie => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  //initial value - empty object
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  //To track number of times user clicked on star rating before movie is added to the watched list - this doesnt need to be displayed on screen - just needs to be stored
  const countRef = useRef(0);
  //we cant achieve this with regular variables because let variables do reset after each render
  // let count = 0; --> reset to 0 after each render

  //We are not allowed to mutate Ref in render logic - after rating has been updated, ref will be updated as well
  useEffect(
    //This will run on mount when user hasnt rated yet so effect should only happen if there is already an rating is given
    function () {
      //With ref we dont have setter function so we simply mutate the current property
      if (userRating) countRef.current = countRef.current + 1;
    },
    [userRating]
  );

  const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
  //userRating must be taken from the object only if watched array exist - so we are using optional chaining
  const watchedUserRating = watched.find(
    movie => movie.imdbID === selectedId
  )?.userRating;

  //destructuring the set movie state
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  // Not allowed since early returns change the number of hooks rendered between re-renders - React hooks must be called in exact same order between re-renders
  //if (imdbRating > 8) return <p>Greatest Movie ever !!</p>;

  // Conditionally creating hooks changes the order of hooks between re-renders hence not allowed in React
  //if (imdbRating > 8) [isTop, setIsTop] = useState(true);

  //const [isTop, setIsTop] = useState(imdbRating > 8);
  //this will not work because this is the initial state used only during the initial render (when component first mounts ) - after the effect when we get the movie data this will not be executed again so remains false - we can use useEffect hook to update this when imdbRating changes

  // useEffect(
  //   function () {
  //     setIsTop(imdbRating > 8);
  //   },
  //   [imdbRating]
  // );

  //We can use derived state instead - the variable is re-generated/updates each time this component is re-rendered
  //const isTop = imdbRating > 8;

  function handleAdd() {
    //updating states is asynchronous
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useKey("Escape", onCloseMovie);

  //Want to run each time this MovieDetails gets mounted
  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        //connect abort controller with the fetch function
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );

        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }

      getMovieDetails();
    },
    [selectedId]
  );

  //Changing title is interacting with the outside of the React app so it is clearly a side effect hence should be registered with a useEffect hook - each effect should have only 1 purpose

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie ! ${title}`;

      //clean up function is simply a function that we return from an effect
      return function () {
        document.title = "usePopcorn";
        //remembers title even after the component unmounts and movie object is destroyed -It is because of Closures - A function will always remember all the variables that were present at the time and the place that the function was created - so the clean up function was created when the effect was first created by that time the title was defined as movie title - so the function closed over the title variable -so it will remember it in the future
        //console.log(`Clean effect for the Movie ${title}`);
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>
                {genre} : {year}
              </p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB Rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add Movie to Watched List +
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie {watchedUserRating}
                  <span>🌟</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map(movie => movie.imdbRating));
  const avgUserRating = average(watched.map(movie => movie.userRating));
  const avgRuntime = average(
    watched.map(movie => {
      return movie.runtime ? movie.runtime : 0;
    })
  );

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map(movie => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}>
          X
        </button>
      </div>
    </li>
  );
}
