import React, { useEffect, useState } from "react";

export const MemberListPage = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/member")
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((err) => {
        console.error("Error fetching members:", err);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Members List</h2>
      <div className="bg-white shadow-md rounded p-4">
        {members.length === 0 ? (
          <p>No members found.</p>
        ) : (
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Weight</th>
                <th className="border px-4 py-2">Subscription</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td className="border px-4 py-2">{member.id}</td>
                  <td className="border px-4 py-2">{member.full_name}</td>
                  <td className="border px-4 py-2">{member.weight}</td>
                  <td className="border px-4 py-2">
                    {member.subscription?.plan_name || "None"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
