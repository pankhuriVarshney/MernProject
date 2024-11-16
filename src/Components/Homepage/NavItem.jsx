import React from 'react';
import '../../style.css';
function SectionHeader({ title }) {
  return (
    <h2 className="section-header">
      <span className="section-title">#{title}</span>
      <div className="section-divider" />
    </h2>
  );
}

export default SectionHeader;
