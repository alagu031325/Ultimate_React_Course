import { createContext } from "react";
import { useContext } from "react";

const quizContext = createContext();

function QuizProvider({ children }) {
  <quizContext.Provider value={{}}>{children}</quizContext.Provider>;
}

function useQuizContext() {
  const context = useContext();
  if (context === undefined)
    throw new Error("QuizContext used out of the Quiz Provider");
  return context;
}

export { QuizProvider, useQuizContext };
