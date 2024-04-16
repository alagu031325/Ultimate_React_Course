import Options from "./Options";

function Question({ question, dispatch, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      {/* we will not use ul because we have actual buttons */}
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
