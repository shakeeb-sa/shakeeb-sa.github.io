// src/components/Skills/Skills.jsx

import React from 'react';
import skillsData from '../../data/skillsData'; // Import the data
import './Skills.css'; // Import the styles

function Skills() {
  return (
    <section className="my-skills">
      <h2>Skills and Tools</h2>
      <div className="skills-grid">
        {skillsData.map((skill) => (
          <div 
            key={skill.name} 
            className="skill-item" 
            data-tooltip={skill.description} // MODIFIED: Changed 'title' to 'data-tooltip'
          >
            <div dangerouslySetInnerHTML={{ __html: skill.svg }} />
            <p>{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;