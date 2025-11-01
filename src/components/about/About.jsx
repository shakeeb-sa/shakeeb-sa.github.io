// src/components/About/About.jsx

import React from 'react';
import './About.css';

function About() {
  return (
    <section id="aboutContainer" className="about-container">
      <h2>About Me</h2>
      <p>
        I'm a passionate and self-taught web developer with a knack for turning creative ideas into engaging, user-friendly digital experiences. My journey into code began with a deep curiosity for how things work on the web, and it has since evolved into a full-fledged passion for building elegant and efficient solutions.
      </p>
      <p>
        I enjoy the challenge of solving complex problems and take pride in writing clean, maintainable code. My goal is to create web applications that are not only functional and responsive but also provide a genuinely <span className="playful-hover">playful</span> and enjoyable interaction for every user.
      </p>
    </section>
  );
}

export default About;