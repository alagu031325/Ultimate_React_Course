import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Footer from "./Footer";
import Timer from "./Timer";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import { useEffect, useReducer } from "react";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

const SECS_PER_QUESTION = 25;

const initialState = {
  questions: [],
  //status is a string that keep track of the current status of the application that will change throughout time - in the beginning application will be in the loading state
  //possible states - 'loading','error','ready','active','finished'
  status: "loading",
  //current question
  index: 0,
  //storing current answer
  answer: null,
  //user score
  points: 0,
  //highscore needs to be remembered across re-renders
  highscore: 0,
  //to keep track of timer
  secondsRemaining: null,
};

// state updating logic decoupled from all other components
function reducer(state, action) {
  switch (action.type) {
    //questions and status many times change together
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      // state updating logic
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      // we dont need to refetch the questions
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
        highscore:
          state.secondsRemaining === 0
            ? state.points > state.highscore
              ? state.points
              : state.highscore
            : state.highscore,
      };
    default:
      throw new Error("Action Unknown");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  //derived state
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch(err => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
