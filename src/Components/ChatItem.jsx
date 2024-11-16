import React from 'react';
import '../Chatbot.css';

function ChatItem({ name }) {
  return (
    <div className="chat-item">
      {name}
    </div>
  );
}

export default ChatItem;
