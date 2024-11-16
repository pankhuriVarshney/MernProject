import React from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';

function ChatbotInterface() {
  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <Chat />
      </div>
    </div>
  );
}

export default ChatbotInterface;
