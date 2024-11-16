import React from 'react';
import '../Chatbot.css';

function Profile() {
  const userId = "user123";

  return (
    <div className="user-id">
      <h3>User ID: {userId}</h3>
    </div>
  );
};

export default Profile;
