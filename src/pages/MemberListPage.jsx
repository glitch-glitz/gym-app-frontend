import React, { useEffect, useState } from "react";
import "../styles/MemberList.css";

export const MemberListPage = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/member")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched members:", data);
        setMembers(data);
      })
      .catch((err) => {
        console.error("Error fetching members:", err);
      });
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;

    fetch(`http://localhost:8000/member/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete member");
        }
        // Remove the deleted member from state
        setMembers((prevMembers) => prevMembers.filter((m) => m.id !== id));
      })
      .catch((err) => {
        console.error(err);
        alert("Error deleting member");
      });
  };

  return (
    <div className="container card">
      <h2 className="title">Members List</h2>
      {members.length === 0 ? (
        <p>No members found.</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th>Passport</th>
              <th>ID</th>
              <th>Name</th>
              <th>Weight</th>
              <th>Subscription</th>
              <th>Actions</th> {/* New column for Delete */}
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td data-label="Passport">
                  {member.passport ? (
                    <img
                      src={member.passport}
                      alt={`${member.full_name}'s passport`}
                      style={{ width: 50, height: 50, borderRadius: 8 }}
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td data-label="ID">{member.id}</td>
                <td data-label="Name">{member.full_name}</td>
                <td data-label="Weight">{member.weight}</td>
                <td data-label="Subscription">
                  {member.subscription?.plan_name || "None"}
                </td>
                <td data-label="Actions">
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(member.id)}
                    aria-label={`Delete member ${member.full_name}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
