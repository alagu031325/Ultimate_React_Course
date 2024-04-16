import { useEffect } from "react";
//key might be passed as capital letters or all lower case - so used toLowerCase to support all formats

export function useKey(key, action) {
  //Directly touching the DOM - hence this is a side effect so we register another effect - which globally listens for keypress event
  useEffect(
    function () {
      //Only attached when the MovieDetails component is mounted - Each time a new MovieDetails component mounts a new event listener is added to the document - so we need to clean up previous event listeners
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }

      document.addEventListener("keydown", callback);

      //only one event listener will be attached to Document at a time
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key]
  );
}
