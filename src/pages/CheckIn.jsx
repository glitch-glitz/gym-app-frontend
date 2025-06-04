import React, { useState } from "react";

const CheckIn = () => {
  const [members, setMembers] = useState([
    {
      id: 1,
      member_name: "Christina Yang",
      check_in_time: "8:00 AM",
      check_out_time: "10:00 AM",
    },
    {
      id: 2,
      member_name: "Mark Sloan",
      check_in_time: "9:30 AM",
      check_out_time: "11:00 AM",
    },
  ]);

  return (
    <div>
      <h2>Gym Register</h2>
      <table
        border="1"
        cellPadding="8"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Member Name</th>
            <th>Check-In Time</th>
            <th>Check-Out Time</th>
          </tr>
        </thead>
        <tbody>
          {members.map(
            ({ id, member_name, check_in_time, check_out_time }, index) => (
              <tr key={id}>
                <td>{index + 1}</td>
                <td>{member_name}</td>
                <td>{check_in_time}</td>
                <td>{check_out_time}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CheckIn;
