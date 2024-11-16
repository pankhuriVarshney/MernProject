import React from 'react';
import FeatureSection from './FeatureSection.jsx';
import ContactSection from './ContactSection.jsx';
import MediaLinks from './MediaLinks.jsx';
import '../../style.css'; 

function HomePage() {
  return (
    <main className="homepage">
      <div className="content-wrapper">
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Cyber Security AI Chatbot</h1>
            <p className="hero-description">
              This website aims to help you in your Cyber-security journey and be your backbone.
            </p>
            <button className="cta-button">README File</button>
          </div>
        </section>
        <FeatureSection />
        <ContactSection />
        <MediaLinks />
      </div>
    </main>
  );
}

export default HomePage;
