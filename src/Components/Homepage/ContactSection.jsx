import React from 'react';
import '../../style.css';

const ContactSection = () => {
  return (
    <div className="contact-section">
      <h2 className="contact-title">Contact Us</h2>
      <form className="contact-form">
        <input
          type="text"
          className="contact-input"
          placeholder="Your Name"
          required
        />
        <input
          type="email"
          className="contact-input"
          placeholder="Your Email"
          required
        />
        <textarea
          className="contact-textarea"
          placeholder="Your Message"
          required
        />
        <button type="submit" className="contact-button">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactSection;
