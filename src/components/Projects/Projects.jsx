import React from 'react';
import projectsData from '../../data/projectsData';
import './Projects.css';

const ProjectCard = ({ project }) => {
  return (
    <div className="new-project-card">
      <div className="project-image-wrapper">
        <img src={project.image} alt={project.name} />
        <div className="project-overlay">
           {project.link && <a href={project.link} target="_blank" rel="noreferrer">Open Live</a>}
           {project.code && <a href={project.code} target="_blank" rel="noreferrer">Source Code</a>}
        </div>
      </div>
      
      <div className="project-details">
        <div className="project-meta-header">
          <span className="type-pill">{project.type}</span>
        </div>
        
        <h3 className="project-name-heading">{project.name}</h3>
        <p className="project-desc-text">{project.description}</p>
        
        {/* Dynamic Tags replacing the footer icons */}
        <div className="project-tags-container">
            {project.tags && project.tags.map((tag, index) => (
                <span key={index} className="skill-tag">{tag}</span>
            ))}
        </div>
      </div>
    </div>
  );
};

function Projects() {
  const groups = [
    { title: "Web Tools & Applications", key: "Web Tool" },
    { title: "Chrome Extensions", key: "Chrome Extension" },
    { title: "Software & Desktop Exe", key: "Software Exe" }
  ];

  return (
    <section className="projects-grid-section" id="projects">
      <h2 className="main-section-title">My Works</h2>
      
      {groups.map(group => {
        const list = projectsData.filter(p => p.category === group.key);
        if (list.length === 0) return null;
        
        return (
          <div key={group.key} className="project-group-container">
            <h3 className="group-title">{group.title}</h3>
            <div className="modern-projects-grid">
              {list.map(p => <ProjectCard key={p.slug} project={p} />)}
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default Projects;