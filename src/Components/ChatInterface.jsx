import React from 'react';
import Sidebar from './Sidebar';
import Profile from './Profile';
import Chat from './Chat';

function ChatbotInterface() {
    return (
        <div className="app">
            <Sidebar />
            <div className="content">
                <Chat />
                <Profile />
            </div>
        </div>
    );
};

export default ChatbotInterface;
