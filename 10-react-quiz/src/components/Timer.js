import { useEffect } from "react";
import { useQuizContext } from "../contexts/QuizContext";

function Timer() {
  const { dispatch, secondsRemaining } = useQuizContext();

  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  //We are initializing the timer here because Timer component mounts as soon as the game starts - if we put it in App component then the timer starts as soon as the application starts
  useEffect(
    function () {
      // runs this function every 1sec
      const timerId = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      //to clear interval we need to pass in the id of the timer we started with setInterval
      return () => clearInterval(timerId);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
//Timer will keep running even after the component unmounts so it needs a clean up function
