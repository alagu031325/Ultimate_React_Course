import { useState } from "react";

import Logo from './Logo';
import Form from './Form';
import PackingList from "./PackingList";
import Stats from './Stats'

//array of items
/* const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
]; */

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item){
    //In react we cant mutate the state so we cant use items.push function - the current value needs to be added to the list of existing values so use callback function
    setItems((items) => [...items,item])
  }

  function handleDeleteItem(id){
    setItems((items) => items.filter(item => item.id !== id))
  }

  function handleToggleItem(id){
    //should return array of same length with one item updated
    setItems((items) => items.map((item) => item.id === id ? {...item,packed : !item.packed} : item))
  }

  function handleDeleteAllItems(){
    //standard DOM web api - confirmed true if 'OK' clicked else false
    const confirmed = window.confirm("Are you sure you want to delete all items?");
    if(confirmed)
      setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems}/>
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onDeleteAllItems={handleDeleteAllItems}/>
      <Stats items={items}/>
    </div>
  );
}


//Lecture: Controlled Elements
//Input and select elements maintain their own states inside the DOM, In React we need to keep all these state in one simple place, inside React application. So we use a technique called controlled elements - with this react controls and owns the state of these input fields and no longer in DOM. - Done by 3 steps - 1)Define a piece of state 2)set the state as the default value of the element which we want react to control 3) update state variable using onChange event handler

//Lecture - State vs Props -

//1) Props communication channel between parent and child component - where parent can pass data into child(like functino parameters) - they are external data and state is internal data owned by component

//2) part of component's "memory" - can hold data across multiple re-renders - can be updated by the component itself - which makes react to re-render that component - we use mechanism of state to make components interactive

//3)props are read only and cant be modified by the component receiving them - If the child component receives the new updated props it also causes the component to re-render - usually when the parent's state has been updated - This gives parent component ability to configure child component(Eg: Props are seen as settings in child component that the parent component can define as they wish)

//Forms is sibbling component to PackingList - so we cant pass props to packingList - data can be passed only from parent to child - 
