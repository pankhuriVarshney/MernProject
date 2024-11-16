import React from 'react';
import ChatItem from './ChatItem';
import '../Chatbot.css';

function Sidebar() {
  const chatItems = [
    { name: 'Chat Name 1' },
    { name: 'Chat Name 2' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-container">
        <h1 className="sidebar-title">
          CYBERAI
        </h1>
        <hr className="sidebar-divider" />
        <button className="add-chat-button">
          <span className="add-chat-text">+ Add Chat</span>
        </button>
        {chatItems.map((chat, index) => (
          <ChatItem key={index} name={chat.name} />
        ))}
        <h2 className="sources">
          Sources
        </h2>
        <div className="sources-container" />
            <ul>
                
            </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
