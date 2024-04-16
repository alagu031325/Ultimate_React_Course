import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

// State remains independent for each Steps component instance no matter how many times we render it on a page
function App(){
  return (
    <div>
      <Steps />
      <Steps />
    </div>
  );
}

//Usually App component will be the parent component of other components
function Steps() {
  //step variable should be dynamic - 1) create state variable 
  const [step, setStep] = useState(1) //takes in default value of state variable - returns the default value and a fn to update the state
  
  const [isOpen, setIsOpen] = useState(true)

  //const [test] = useState({name:'Alagu'})

  //Event Handler function that is called from JSX of the component
  function handlePrevious(){
    if(step > 1)
      setStep((s) => s - 1);
  }

  function handleNext(){
    //update the state when a click happens
    if(step < 3){
      //we shouldnt update the state variable based on the current state like below, we should use a call back fn which receive the current value of the state as input 
      /* setStep(step + 1); 
      setStep(step + 1); */ 
      setStep((s) => s + 1); 
      // setStep((s) => s + 1);
      //updates the state twice 
    }
    //mutating objects/statevariables manually is a bad practice
    //test.name = 'uma'
  }

  return (
    <div>
      <button className="close" onClick={() => setIsOpen(open => !open)}>&times;</button>
    { isOpen && (
      <div className="steps">
      <div className="numbers">
        <div className={step >= 1 ? 'active':''}>1</div>
        <div className={step >= 2 ? 'active':''}>2</div>
        <div className={step >= 3 ? 'active':''}>3</div>
      </div>
      <p className="message">Step {step} : {messages[step-1]}
      </p>
      <div className="buttons">
        <button style={{backgroundColor: "#7950f2", color:'#fff'}} onClick={handlePrevious}>Previous</button>
        <button style={{backgroundColor: "#7950f2", color:'#fff'}} onClick={handleNext}>Next</button>
      </div>
    </div>)}
    </div>
  );
}

export default App;


