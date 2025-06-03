import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

function App() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/member")
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((err) => console.error("Fetch members error:", err));
  }, []);

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="title">Gym Members</h1>
        <Link to="/add-member" className="btn">
          Add Member
        </Link>
      </div>

      <div className="grid">
        {members.map((member) => (
          <div className="card" key={member.id}>
            <img
              src={member.passport}
              alt={member.full_name}
              style={{ width: "96px", height: "96px", borderRadius: "50%" }}
            />
            <h3>{member.full_name}</h3>
            <p>Weight: {member.weight}</p>
            <p>BMI: {member.bmi}</p>
            <p>Subscription: {member.subscription_name || "N/A"}</p>
            <p>Joined: {new Date(member.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
