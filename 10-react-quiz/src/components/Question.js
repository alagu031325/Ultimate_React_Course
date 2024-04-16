import { useQuizContext } from "../contexts/QuizContext";
import Options from "./Options";

function Question() {
  const { questions, index } = useQuizContext();
  const question = questions[index];
  return (
    <div>
      <h4>{question.question}</h4>
      {/* we will not use ul because we have actual buttons */}
      <Options question={question} />
    </div>
  );
}

export default Question;
