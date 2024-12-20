import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatItem from './ChatItem'; 
import '../Chatbot.css';

const Chat = () => {
  const [sessionId, setSessionId] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {

    axios.get("http://localhost:8000/api/start_chat")
      .then(response => setSessionId(response.data.sessionId))
      .catch(error => console.error("Error starting chat:", error));
  }, []);

  const sendMessage = () => {
    if (!sessionId || !userMessage.trim()) return;
  
    console.log("Sending message to the backend:", userMessage); 
  
    axios.post("http://localhost:8000/api/send_message", {
        sessionId,
        query: userMessage
      })
      .then(response => {
        console.log("Received response:", response.data);
        setChatHistory([
          ...chatHistory,
          { sender: "User", message: userMessage },
          { sender: "AI", message: response.data.reply }
        ]); 
        setUserMessage(""); 
      })
      .catch(error => {
        console.error("Error sending message:", error);
        
      });
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        
        {chatHistory.map((msg, index) => (
          <div key={index} className={msg.sender === "AI" ? "ai-message" : "user-message"}>
            <ChatItem name={msg.sender} message={msg.message} />
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button onClick={sendMessage} className="send-button">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a674626724a99e065b1d256515aa4f4446242ab4861d01c4712239a0f909aed8?placeholderIfAbsent=true&apiKey=d26e38aece5941a0a8e4e0ee8489a04f"
            alt="Send"
          />
        </button>
      </div>
    </div>
  );
};

export default Chat;
