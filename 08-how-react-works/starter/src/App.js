import { useState } from "react";

const content = [
  {
    summary: "React is a library for building UIs",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    summary: "React is awesome",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export default function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}

//returns a React element by calling React.createElement() func
// console.log(<DifferentContent />);
//React doesnt see this as an component instance instead sees this as an Raw react element with type and props being that of its content of that component
//console.log(DifferentContent()) - Never use this for React components 

function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>
      {/* same TabContent element between renders and stays in exact same place in the component tree so state is preserved just the props are changed while rendering - by diffing rule 1 - we change to DifferentContent component type then the state is reset and the previous element is deleted from the component tree - by including a key to each TabContent, the key changes across renders so state will be reset and component will be recreated each time*/}
      {activeTab <= 2 ? (
        <TabContent item={content.at(activeTab)} key={content.at(activeTab).summary}/>
      ) : (
        <DifferentContent />
      )}
    </div>
  );
}

function Tab({ num, activeTab, onClick }) {
  return (
    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      Tab {num + 1}
    </button>
  );
}

function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  function handleInc() {
    setLikes((likes)=>likes + 1);
  }

  function handleTripleInc() {
    //This will not work because we will not have updated value of likes
    // setLikes(likes + 1);
    // setLikes(likes + 1);
    // setLikes(likes + 1);

    //we get access to the updated state 
    setLikes((likes)=>likes + 1);
    setLikes((likes)=>likes + 1);
    setLikes((likes)=>likes + 1);
  }

  //If no state update happens then their is no re-render
  function handleUndo() {
    //These two state updates are batched within the event handler function and will only cause one component re-render 
    setShowDetails(true);
    setLikes(0);
    //stale value returned - because state is updated only during the re-render function not after calling the setLikes function
    // console.log(likes);
  }

  function handleUndoLater(){
    //schedule handleUndo function after 2sec (2000 ms) - component still re-rendered only once - so batching not only happens inside event handlers but also inside setTimeout
    setTimeout(handleUndo, 2000);
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button onClick={handleTripleInc}>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleUndoLater}>Undo in 2s</button>
      </div>
    </div>
  );
}

function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}
