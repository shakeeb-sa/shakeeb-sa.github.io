import React from 'react';
import { categorizedSkills } from '../../data/skillsData';
import './Skills.css';

const SkillCard = ({ skill }) => (
  <div className="modern-skill-card" data-tooltip={skill.description}>
    <div 
      className="icon-box" 
      dangerouslySetInnerHTML={{ __html: skill.svg }} 
    />
    <span className="skill-name">{skill.name}</span>
  </div>
);

function Skills() {
  return (
    <section className="skills-section">
      {Object.entries(categorizedSkills).map(([category, items]) => (
        <div key={category} className="category-group">
          <h3 className="category-label">{category}</h3>
          <div className="skills-flex-container">
            {items.map(skill => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default Skills;