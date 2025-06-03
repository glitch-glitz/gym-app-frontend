import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function App() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/member")
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((err) => console.error("Fetch members error:", err));
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gym Members</h1>
        <Link
          to="/add-member"
          className="px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Add Member
        </Link>
      </div>

      {members.length === 0 ? (
        <p>No members found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="p-4 bg-white border border-gray-200 rounded shadow"
            >
              <img
                src={member.passport}
                alt={`${member.full_name}'s passport`}
                className="w-24 h-24 object-cover rounded-full mb-2"
              />
              <h3 className="text-xl font-semibold">{member.full_name}</h3>
              <p>Weight: {member.weight}</p>
              <p>BMI: {member.bmi}</p>
              <p className="text-gray-500 text-sm">
                Joined: {new Date(member.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
