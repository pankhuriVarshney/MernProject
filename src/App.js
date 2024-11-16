import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './Components/Homepage/TopBar.jsx';
import HomePage from './Components/Homepage/Homepage.jsx';
import ChatbotInterface from './Components/ChatInterface.jsx';

function App() {
  return (
    <Router>
      <TopBar /> {/* Keep TopBar here */}
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* HomePage Route */}
        <Route path="/chatbot" element={<ChatbotInterface />} /> {/* Chatbot Route */}
      </Routes>
    </Router>
  );
}

export default App;
