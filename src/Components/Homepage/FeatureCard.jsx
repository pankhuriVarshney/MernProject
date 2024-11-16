import React from 'react';
import '../../style.css';
function FeatureCard({ icon, title, description, bgColor, imageBg }) {
  return (
    <div className={`feature-card ${bgColor}`}>
      <div className={`feature-image ${imageBg}`}>
        <img src={icon} alt={title} className="feature-icon" />
      </div>
      <div className="feature-content">
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
      </div>
    </div>
  );
}

export default FeatureCard;
