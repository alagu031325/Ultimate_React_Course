import { useState } from "react";

export default function Form({onAddItems}){
    //state for input field
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('1');
    //Now items state is needed in the sibbling component packingList - so lift up state to the first common parent element "app"
  
    function handleSubmit(e){
      //form can be submitted by hitting enter key or by clicking on the button
      e.preventDefault(); //to prevent reload when form is submitted
  
      //If no description return immediately
      if(!description) return;
  
      const newItem = {description, quantity, packed:false, id: Date.now()}
  
      onAddItems(newItem);
  
      //so component state remains in sync with form elements
      setDescription('')
      setQuantity(1)
    }
    return (
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your ✈️ trip?</h3>
        <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
          {
            // first arg - obj with length prop and then map fn which receives current value and the index, it then returns the index then use map method to create list of options - when we render a list we need to specify a key
            Array.from({length: 20},(_,i) => i+1).map(num => <option value={num} key={num} >
                    {num}
              </option>)
          }
        </select>
        {/* Whenever we type anything in input field the change event is fired off - we can react using onChange event handler - set new value */}
        <input type="text" placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)}/>
        <button>Add</button>
      </form>
    )
  }