// src/components/ChatBox.js

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './ChatBox.css';

const socket = io('http://localhost:3001'); // Update if backend runs on different port

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userRole, setUserRole] = useState('Client'); // Default role

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    const msg = {
      sender: userRole,
      message: newMessage,
    };
    socket.emit('chat message', msg);
    setNewMessage('');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Lawyer Connect 💬</div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="message-wrapper"
            style={{ alignItems: msg.sender === 'Lawyer' ? 'flex-start' : 'flex-end' }}
          >
            <div className={`message-bubble ${msg.sender === 'Lawyer' ? 'lawyer' : 'client'}`}>
              <div className="sender">
                {msg.sender === 'Lawyer' ? '🧑‍⚖️ Lawyer' : '🙋‍♂️ Client'}
              </div>
              <div className="text">{msg.message}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <select
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
        >
          <option value="Client">Client</option>
          <option value="Lawyer">Lawyer</option>
        </select>

        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
