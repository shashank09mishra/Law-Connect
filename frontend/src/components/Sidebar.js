// Sidebar.js
import React from 'react';
import './Sidebar.css';

const Sidebar = ({ onSelectUser }) => {
  const users = ['Lawyer', 'Client'];

  return (
    <div className="sidebar">
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user} onClick={() => onSelectUser(user)}>
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
