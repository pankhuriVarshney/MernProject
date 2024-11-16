import React from 'react';
import '../../style.css';
import githubLogo from '../../assests/github.png';  // Import the image file


function MediaLinks() {
  return (
    <aside className="media-links">
      <div className="vertical-line" />
      <div className="social-icons">
        <a
          href="https://github.com/pankhuriVarshney/MernProject"
          aria-label="GitHub"
          className="github-link"
        >
          <img
            src={githubLogo}
            className="icon github-icon"
          />
        </a>
      </div>
    </aside>
  );
}

export default MediaLinks;
