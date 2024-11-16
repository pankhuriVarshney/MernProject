import React from 'react';
import { useNavigate } from 'react-router-dom';

function TopBar() {
  const navigate = useNavigate(); // Initialize the navigate hook

  // Function to navigate to the chatbot page
  function navChatbot() {
    navigate('/chatbot');
  }

  return (
    <header className="topbar">
      <div className="topbar-container">
        <nav className="nav">
          <div className="logo">CYBERAI</div>
          <div className="nav-item active">Home</div>
          {/* Clicking here will trigger the navChatbot function */}
          <div className="nav-item" onClick={navChatbot}>Chatbot</div>
          <a href="#news" className="nav-item">News</a>
          <a href="#notes" className="nav-item">Notes</a>
          <a href="#links" className="nav-item">Links</a>
        </nav>
      </div>
    </header>
  );
}

export default TopBar;
