import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [member, setMember] = useState([]);

  //
  useEffect(() => {
    fetch("http://localhost:8000/member")
      .then((res) => res.json())
      .then((data) => {
        // console.log((data))
        setMember(data);
      });
  }, []); // this only runs once
  return (
    <>
      {member.map((member) => (
        <div key={member.id}>
          <h3>{member.full_name}</h3>
          <h4>{member.weight}</h4>
          <h4>{member.bmi}</h4>
          <h5>{member.created_at}</h5>
          <img src={member.passport} alt={member.passport} />
        </div>
      ))}
    </>
  );
}

export default App;
