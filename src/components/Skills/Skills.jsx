// src/components/Skills/Skills.jsx

import React from 'react';
import { skills, tools } from '../../data/skillsData'; // Note the named imports
import './Skills.css';

function Skills() {
  return (
    <section className="my-skills">
      
      {/* SECTION 1: SKILLS */}
      <h2>My Skills</h2>
      <div className="skills-grid">
        {skills.map((skill) => (
          <div 
            key={skill.name} 
            className="skill-item" 
            data-tooltip={skill.description}
          >
            <div dangerouslySetInnerHTML={{ __html: skill.svg }} />
            <p>{skill.name}</p>
          </div>
        ))}
      </div>

      {/* SECTION 2: TOOLS (Added margin-top for separation) */}
      <h2 style={{ marginTop: '5rem' }}>Tools & Platforms</h2>
      <div className="skills-grid">
        {tools.map((tool) => (
          <div 
            key={tool.name} 
            className="skill-item" 
            data-tooltip={tool.description}
          >
            <div dangerouslySetInnerHTML={{ __html: tool.svg }} />
            <p>{tool.name}</p>
          </div>
        ))}
      </div>

    </section>
  );
}

export default Skills;