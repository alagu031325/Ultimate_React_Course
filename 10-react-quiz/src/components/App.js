import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Footer from "./Footer";
import Timer from "./Timer";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
// import { useEffect, useReducer } from "react";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import { useQuizContext } from "../contexts/QuizContext";

export default function App() {
  const { status } = useQuizContext();
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}
