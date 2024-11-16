import React from 'react';
import '../../style.css';

const FeatureSection = () => {
  const features = [
    { id: 1, title: 'Fast', description: 'Quick and efficient responses.' },
    { id: 2, title: 'Secure', description: 'Your data is always safe.' },
    { id: 3, title: 'Customizable', description: 'Easily adaptable to your needs.' },
  ];

  return (
    <div className="feature-section">
      <h2 className="feature-title">Features</h2>
      <div className="feature-list">
        {features.map((feature) => (
          <div key={feature.id} className="feature-card">
            <h3 className="feature-card-title">{feature.title}</h3>
            <p className="feature-card-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
