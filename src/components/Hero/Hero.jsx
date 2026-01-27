// src/components/Hero/Hero.jsx

import React from 'react';
import './Hero.css'; // Import the component's styles
import portraitImage from '../../assets/images/portrait.jpg'; // Import the local image

function Hero() {
  return (
    <section className="hero">
      <div className="cta">
        <div> {/* Added a div wrapper for better flexbox control on larger screens */}
            <h1 className="hidden-text">Shakeeb Ahmed</h1>
            <h2 id="title" className="title">
              I create <span className="playful">playful</span> experiences.
            </h2>
        </div>
        <div id="portraitContainer" className="portrait-container">
          <img src={portraitImage} alt="Portrait of Shakeeb Ahmed" className="portrait" />
        </div>
      </div>
      <p id="jobTitle" className="job-title">Website Tools | Desktop Applications | Chrome Extensions | Online Games</p>
    </section>
  );
}

export default Hero;