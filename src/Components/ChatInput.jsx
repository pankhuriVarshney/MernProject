import React, { useState } from 'react';
import '../Chatbot.css';

function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message); // Log the message
      onSendMessage(message);
      setMessage(''); // Clear the input after sending
    }
  };
  

  return (
    <div className="chat-input-container">
      <form className="chat-input-form" onSubmit={handleSubmit}>
        <textarea
          id="chatInput"
          className="chat-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
        />
        <button type="submit" className="send-button" aria-label="Send message">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a674626724a99e065b1d256515aa4f4446242ab4861d01c4712239a0f909aed8?placeholderIfAbsent=true&apiKey=d26e38aece5941a0a8e4e0ee8489a04f"
            alt="Send"
          />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
