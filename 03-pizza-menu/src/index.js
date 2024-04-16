//Webpack needs the entry point to be called as index.js
import React from "react";
import ReactDOM from "react-dom/client";
//Import css file and Webpack will include the styles in our application
import './index.css';

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

//Component name should start with an uppercase
function App() {
  //Each component can return exactly one element - we can call each component multiple times and reuse it
  return (
    //In JSX it is not class but the property is className - because class is already a reserved keyword in JS - styles are global styles not scoped to particular component 
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

//Lecture:
//React v18
//selecting root element from public/index.html
const root = ReactDOM.createRoot(document.getElementById("root"));
//StrictMode is a component of React - React will check if we are using outdated parts of React API - good practice to activate it
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//Lecture:Components as Building Blocks

//React are entirely made of components - it takes all components and draws them on the Web UI (React renders a view for each component which makes UI)

//Component is a piece of UI - that has its own data, logic and appearance

//Components are reused and nested. So we can place components inside of other components and we can easily pass different data into each component using props

//Child components are usually nested within the parent component - component tree makes us to understand the relationship between components


//Lecture: JSX
//Declarative syntax to describe what components look like and how they work
//Components must return 1 block of JSX
//It is an extension of JS that allows to nest and embed CSS, HTML, JS and React components
//How does React understands the HTML - Babel does the conversion from JSX to React.createElement function call - these in turn create HTML elements that are rendered on the screen and browser doesnt understand JSX

//Imperative syntax -
//With vanilla JS we need to manually select the DOM elements and do the DOM traversing and provide the step-by-step DOM mutations until we reach the desired UI - we tell the browser how to do things when some event happens by attaching event handlers

//Declarative syntax -
//Describe what the UI should look like using JSX, based on current data in the component - all that happens without DOM selection/mutation - Abstraction away from DOM - we dont need to touch the DOM - So, UI is the reflection of current data , and React automatically synchronize the UI with current data

//Lecture: Creating more components
function Header(){
  //In JSX inline styles must be defined using JS objects, so enter into JS mode using {}, and then create JS object {}
  //font-size property is converted to camel case property in JSX - almost all properties with "-" are converted and property values are strings
  //const style = {color:'red',fontSize:'48px',textTransform:'uppercase'}
  const style = {} //retained for reference
  return (<header className='header'>
    <h1 style={style} >Fast React Pizza Co.</h1>
  </header>)
}

//parent component and pizza is the child component 
function Menu(){
  //empty array is still a truthy value
  const pizzas = pizzaData;
  // const pizzas = [];
  const numPizzas = pizzas.length;//check with a condition so that it returns true or false so that react doesnt render it if && short circuits

  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {/* we write props as they were normal attributes - we send the props and receive them in the child component as props parameter - order of props doesnt matter. Key property(for performance optimization} is needed for each child while rendering as a list, something unique to each child. The map returns an array of Pizza elements and react knows how to render that with the ul*/}
      {numPizzas > 0 && (
      <>
        <p>
        Authentic Italian cuisine. 6 creative dishes to choose from. All from our stone oven, all organic, all delicious
        </p>
        <ul className="pizzas">
          {pizzas.map(pizza=>{
          return <Pizza pizzaObj={pizza} key={pizza.name}/>
          })}
        </ul>
      </>
      )}
      

      {/* Price passed as Number instead of string - we can pass arrays/objects or even other react components as props not just numbers and strings*/}

      {/* <Pizza name='Pizza Spinaci' ingredient='Tomato, mozarella, spinach, and ricotta cheese' photoName='pizzas/spinaci.jpg' price={10}/>

      <Pizza name='Pizza Funghi' ingredient='Tomato, mushrooms and ricotta cheese'  price={12} photoName='pizzas/funghi.jpg'/> */}

    </main>
  )
}

//Lecture: Creating and Reusing Components
//A function must return either a JSX markup or "null" - We called/nested Pizza component inside App component that is being rendered
//we can directly destructure the props - In the component definition itself we can see what props we receive 
function Pizza({pizzaObj}) {
  //Early return 
  /* if(pizzaObj.soldOut)
    return null; */

  return (
    // to conditionally render class name we use template literal and use JS expression that produce value
    <li className={`pizza ${pizzaObj.soldOut? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        { /* We use this when we want 2 different elements instead of same span element, if same element then text alone can be conditionally rendered
        pizzaObj.soldOut ? <span>SOLD OUT</span> : <span>{pizzaObj.price}</span> */}
        <span>{pizzaObj.soldOut ? 'SOLD OUT' : pizzaObj.price}</span>
      </div>
    </li>
  );
}

//NOTE: Always declare all components in the top level never nest function declarations

function Footer(){
  //JS function so we can write any JS here, and it will be executed when the component is first initialized
  const hour = new Date().getHours();
  const openHour = 8;
  const closeHour = 20;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);

  //Early returns are very useful when we need to render entire component conditionally not just some pieces of JSX
  /* if (!isOpen){
    return (
      <p>
        We're happy to welcome you between {openHour}:00 and {closeHour}:00.
      </p>
    );
  } */

  /* Alert blocks the execution so not advisable to use
  if( hour >= openHour && hour <= closeHour)
    alert ("We're currently Open😎")
  else
    alert("Sorry we're closed") */

  //JSX Way - We're currently Open - {new Date().toLocaleTimeString()} - React doesnt render "true" or "false" value in the DOM
  return (<footer className="footer">
    {false} 
    {isOpen ? <Order closeHour={closeHour}/>:  <p>We're Happy to welcome you between {openHour}:00 and {closeHour}:00.</p>}
  </footer>);
  
  /* //Old way of creating elements - takes in element name , props, string which serves to be the child node
  return React.createElement('footer',null, "We're currently Open!") */

}

function Order(props){
  return (
    <div className="order">
      <p>
        We're open until {props.closeHour}:00. Come and Visit us or order online.
      </p>
      <button className="btn">Order</button>
    </div>) 
}

//Lecture: Separation of Concerns

//Initially HTML, CSS and JS were in separate files but as interactive Single page applications grew, JS was in charge of what we see in UI and contents in general(JS and HTML are tightly coupled together)

//In Modern world the Logic and UI are coupled together - this is why react components contain both data, logic and appearance of one piece of UI 

//So in react HTML and JS are colocated - that is things that change together are located as close as possible together - So in React apps instead of one technology per file we have one component per file - Each component is concerned with one piece of the UI 

//Lecture: Styling React Applications 
//There are more than 1 way to style react components - tailwindcss/inline or external css or sass or css modules

//Lecture: Passing and Receiving Props - communication channel between the parent and child component - see customizing Pizza component code

//Lecture: Props, Immutability and one way data flow
//Props to pass data down the component tree(parent -> child)
//Essential tool to configure and customize components
//With props parent components control how child components look and work like
//Anything can be passed as props - single values, strings, arrays, objects, functions, even other react components 

//Props and state are the data that the react component uses to render a component 
//State is the internal component data that can be updated by the component's logic and props is the data from parent component (external) and can only be updated by the parent component - so props are read only, Immutable 
//state is for data that changes over time and it is mutable 

//props are just a object, if we change the props the original values will also get changed - original object mutated in JS - it creates a side effect - it happens whenever we change some data that is located outside of the current function - react is all about fns without side effects atleast in terms of props and state 

//A component should never mutate any data that is outside of its fn scope

//One way data flow 
//Data can only be passed from parent to child components using props 
//But data cant flow from child to parent - this makes applications easier to understand and more predictable - and easier to debug since we have more control over the data  - is more performant

//Lecture: Rules of JSX
//General JSX Rules
//JSX has similar syntax like HTML, but we can enter "JS mode" by using {}, anywhere in the markup where a value like text or an attribute is expected
//We can place any JS Expression that produces a value, Eg: reference variables, create arrays or objects, [].map() can loop over array and produce a value, can use operators like ternary operator

//In JSX, we cannot use statements like if/else, for loop and switch that doesnt evaluate to a value

//A piece of JSX is converted(produces) into a JS Expression

//This means that we can place other pieces of JSX inside the JS mode and this is only possible because we can put any JS Expression inside the {}, and that includes the expression produced by JSX behind the scenes
//We can write JSX anywhere inside a component(in if/else, assign JSX to variables and pass it into a functions)
//A piece of JSX can only have one root element, if we need more then we need to use React.Fragment

//Difference between JSX and regular HTML 
//use of className property instead of HTML's class
//htmlFor instead of HTML's for
//Every tag needs to be closed like <img/>
//All eventHandlers and other properties need to be camelCased. Eg: onClick or onMouseOver
//Exception : aria-* and data-* are written with dashes like in HTML
//CSS inline styles are written like style={{<style>}} by entering into JS mode
//CSS property names are also camelCased
//Comments need to be in {} (because they are also JS)

//Lecture: Rendering Lists - We have an array and we need to create one component for each element in the array 
//Refer to Menu code

//Lecture: Conditional Rendering with && - rendering some piece of UI (either JSX or entire component) based on certain condition - refer footer - if first value is truthy then the second value is returned, if first value is falsy then the second value is short circuited(not executed)

//Lecture: Conditional Rendering with Ternary Operator - render some piece of JSX based on certain condition

/* {numPizzas > 0 ? (
  <ul className="pizzas">
  {pizzas.map(pizza=>{
    return <Pizza pizzaObj={pizza} key={pizza.name}/>
  })}
</ul>):null} or can use some alternative instead of null like
<p> We're still working on our Menu, Please come back later :) </p> */ 

//Lecture: Conditional Rendering with Multiple returns - still a component can return only once, but we can add multiple returns based on a condition

//Lecture:Extracting JSX into a new component - When components get too big, we extract part of the JSX and build a new component

//Destructuring props - {}

//Lecture: React Fragments - JSX expression must have only one parent element - When we dont want to render one element inside parent element, rather to render 2 different elements - this is the case in which we need to use react fragments - allows to group some html elements without leaving any trace in html tree - refer to Menu component - we use long version when we need to specify the key
//<React.Fragment></React.Fragment> - allows us to have more than 1 elements returned from a piece of JSX

//Lecture: Setting Class Names and Text inside elements Conditionally

