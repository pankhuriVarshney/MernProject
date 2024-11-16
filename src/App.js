import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './Components/Homepage/TopBar.jsx';
import HomePage from './Components/Homepage/Homepage.jsx';
import ChatbotInterface from './Components/ChatInterface.jsx';

function App() {
  return (
    <Router>
      <TopBar /> 
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/chatbot" element={<ChatbotInterface />} /> 
      </Routes>
    </Router>
  );
}

export default App;
