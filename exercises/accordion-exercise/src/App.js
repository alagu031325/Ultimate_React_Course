import { useState } from "react";
import "./index.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
  },
  {
    title: "How long do I have to return my chair?",
    text:
      "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
  },
  {
    title: "Do you ship to countries outside the EU?",
    text:
      "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
  }
];

export default function App() {
  return (
    <div>
      <Accordion data={faqs}/>
    </div>
  );
}

function Accordion({data}) {

  const [curOpen, setCurOpen] = useState(null);

  return <div className="accordion">{
    data.map((q,i) => <AccordionItem curOpen={curOpen} title={q.title} num={i} key={q.title} onOpen={setCurOpen}> {q.text}</AccordionItem>)
  }

  <AccordionItem curOpen={curOpen} title={'Testing Component reusability'} num={22} key={'Testing Component reusability'} onOpen={setCurOpen}> Manually added - Any generic content/JSX can be passed<br/><ul><li>Start Learning React Now!!</li></ul></AccordionItem>
  </div>;
}

//Whenever the UI need to change by user event, then we need a piece of state to track that change and re render that component - each accordion operates independent to one another - so each of them must hold their state
function AccordionItem({curOpen, onOpen, num,title,children }){

  const isOpen = curOpen === num;

  function handleOpen(){
    //If already opened, on clicking we should close it so setting back to null
    onOpen(isOpen ? null : num)
  }

  return <div className={`item ${isOpen ? 'open' : ''}`} onClick={handleOpen}>
    <p className="number">{num < 9 ? `0${num+1}` : num+1}</p>
    <p className="title">{title}</p>
    <p className="icon">{isOpen ? '-' : '+'}</p>
    {isOpen && <div className="content-box">{children}</div>}
  </div>
}
