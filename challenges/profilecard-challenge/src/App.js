import "./styles.css";

const skills = [
  {
    skill: "HTML+CSS",
    level: "intermediate",
    color: "orange",
  },
  {
    skill: "Javascript",
    level: "advanced",
    color: "orangered",
  },
  {
    skill: "Jquery",
    level: "intermediate",
    color: "yellow",
  },
  {
    skill: "Git and Github",
    level: "advanced",
    color: "#C3DCAF",
  },
  {
    skill: "React",
    level: "beginner",
    color: "blue",
  },
  {
    skill: "cypress",
    level: "beginner",
    color: "green",
  },
];

export default function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {
  return <img className="avatar" src="infinity.jpeg" alt="Jelly Fish" />;
}

function Intro() {
  return (
    <div>
      <h1> Alagu Arunachalam </h1>
      <p>
        Full stack Web developer. When not coding I like to cook and eat,
        Playing shuttle and table tennis. This is my first react profile card.
      </p>
    </div>
  );
}

function SkillList() {
  return (
    <div className="skill-list">
      {skills.map((skill) => (
        <Skill skillObj={skill} />
      ))}

      {/* <Skill language="HTML+CSS" emoji="💪" color="#123456" />
      <Skill language="ES6 JS" emoji="💪" color="yellow" />
      <Skill language="Jquery" emoji="👍" color="orangered" />
      <Skill language="React" emoji="👍" color="blue" />
      <Skill language="Git/GitHub" emoji="👍" color="orange" />
      <Skill language="Django" emoji="👶" color="red" /> */}
    </div>
  );
}

function Skill({ skillObj }) {
  return (
    <div className="skill" style={{ backgroundColor: skillObj.color }}>
      <span>{skillObj.skill}</span>
      <span>
        {skillObj.level === "beginner" && "👶"}
        {skillObj.level === "intermediate" && "👍"}
        {skillObj.level === "advanced" && "💪"}
      </span>
    </div>
  );
}
