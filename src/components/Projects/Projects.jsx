// src/components/Projects/Projects.jsx

import React from 'react';
import projectsData from '../../data/projectsData';
import './Projects.css';

// Import Icons
import reactLogo from '../../assets/react.svg';
import nodeLogo from '../../assets/nodejs.svg';
import chromeLogo from '../../assets/chrome.svg';

const ProjectItem = ({ project }) => {
  const primaryLink = project.link ?? project.code;
  const linkTitle = project.link ? `Open site for ${project.name}` : `View code for ${project.name}`;

  // Determine Logo Content & Label based on category
  let BadgeContent;

  if (project.category === 'Full-Stack') {
    // React JS + Node JS
    BadgeContent = (
      <>
        <div className="logo-row">
            <img src={reactLogo} alt="React JS" className="tech-logo spin" />
            <img src={nodeLogo} alt="Node JS" className="tech-logo" />
        </div>
        <span className="tech-label">Based on React JS & Node JS</span>
      </>
    );
  } else if (project.category === 'Chrome Extension') {
    // Chrome + React JS
    BadgeContent = (
      <>
        <div className="logo-row">
            <img src={chromeLogo} alt="Chrome" className="tech-logo" />
            <img src={reactLogo} alt="React JS" className="tech-logo spin" />
        </div>
        <span className="tech-label">Based on React JS</span>
      </>
    );
  } else if (project.category === 'Game') {
    // Game Badge (Updated to match Full-Stack: React + Node)
    BadgeContent = (
      <>
        <div className="logo-row">
            <img src={reactLogo} alt="React JS" className="tech-logo spin" />
            <img src={nodeLogo} alt="Node JS" className="tech-logo" />
        </div>
        <span className="tech-label">React JS & Node JS Game</span>
      </>
    );
  } else {
    // Frontend (Just React JS)
    BadgeContent = (
      <>
        <div className="logo-row">
            <img src={reactLogo} alt="React JS" className="tech-logo spin" />
        </div>
        <span className="tech-label">Based on React JS</span>
      </>
    );
  }

  return (
    <div className="project-listing" id={project.slug}>
      <div className="project-item-container">
        <a href={primaryLink} title={linkTitle} target="_blank" rel="noopener noreferrer">
          <img src={project.image} alt={project.name} className="project-image" />
        </a>

        <div id="projectInfo" className="project-info">
          
          {/* Header Row */}
          <div className="project-header-row">
            <div>
                <a href={primaryLink} title={linkTitle} target="_blank" rel="noopener noreferrer">
                <h3 className="playful-hover">{project.name}</h3>
                </a>
                <p style={{marginTop: '0.5rem'}}>{project.type}</p>
            </div>
            
            {/* Dynamic Badge */}
            <div className="tech-badge">
                {BadgeContent}
            </div>
          </div>

          <p style={{marginTop: '1rem'}}>{project.description}</p>

          <div className="project-btns">
            {project.link && (
              <a href={project.link} title={`Open site for ${project.name}`} className="project-btn" target="_blank" rel="noopener noreferrer">
                Open Site
              </a>
            )}
            {project.code && (
              <a href={project.code} title={`View code for ${project.name}`} className="project-btn" target="_blank" rel="noopener noreferrer">
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function Projects() {
  const sections = [
    { title: "Full stack website", key: "Full stack website" },
    { title: "Software exe", key: "Software exe" },
    { title: "Frontend", key: "Frontend" },
    { title: "Chrome extensions", key: "Chrome extensions" }
  ];

  return (
    <section className="project-container" id="projects">
      <div className="project-title-container">
        <h2>My Projects</h2>
      </div>

      {sections.map(section => {
        const filtered = projectsData.filter(p => p.category === section.key);
        if (filtered.length === 0) return null;

        return (
          <div key={section.key} className="project-category-section">
            <h2 className="project-category-title">{section.title}</h2>
            <div className="project-listings-container">
              {filtered.map(project => (
                <ProjectItem key={project.slug} project={project} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default Projects;