import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from "react"
//import './index.css';
//import App from './App';
import StarRating from './StarRating';

//When StarRating is consumed by external components then we need to also set an external state variable 
function TestComponent (){
  const [movieRating, setMovieRating] = useState(0);

  return ( <div>
    <StarRating color="blue" maxRating={10} onSetRating={setMovieRating} />
    <p>This movie was rated {movieRating} stars </p>
  </div>)
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={7}/>
    <StarRating maxRating={10} size={24} color='red'/>
    <StarRating messages={['Terrible','Bad','Okay','Good','Amazing']} defaultRating={3}/>
    <TestComponent maxRating={7} color='blue'/>
  </React.StrictMode>
);

