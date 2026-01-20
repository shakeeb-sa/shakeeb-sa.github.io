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
  const gameProjects = projectsData.filter(p => p.category === 'Game');
  const fullStackProjects = projectsData.filter(p => p.category === 'Full-Stack');
  const chromeExtensionProjects = projectsData.filter(p => p.category === 'Chrome Extension');
  const frontendProjects = projectsData.filter(p => p.category === 'Frontend');

  return (
    <section className="project-container" id="projects">
      <div className="project-title-container">
        <h2>My Projects</h2>
      </div>

      {/* Section 1: Games (At the top) */}
      {gameProjects.length > 0 && (
        <div className="project-category-section">
          <h2 className="project-category-title">Games</h2>
          <div className="project-listings-container">
            {gameProjects.map(project => (
              <ProjectItem key={project.slug} project={project} />
            ))}
          </div>
        </div>
      )}

      {/* Section 2: Full-Stack Projects */}
      {fullStackProjects.length > 0 && (
        <div className="project-category-section">
          <h2 className="project-category-title">Full-Stack Applications</h2>
          <div className="project-listings-container">
            {fullStackProjects.map(project => (
              <ProjectItem key={project.slug} project={project} />
            ))}
          </div>
        </div>
      )}

      {/* Section 3: Chrome Extensions */}
      {chromeExtensionProjects.length > 0 && (
        <div className="project-category-section">
          <h2 className="project-category-title">Chrome Extensions</h2>
          <div className="project-listings-container">
            {chromeExtensionProjects.map(project => (
              <ProjectItem key={project.slug} project={project} />
            ))}
          </div>
        </div>
      )}

      {/* Section 4: Frontend Projects */}
      {frontendProjects.length > 0 && (
        <div className="project-category-section">
          <h2 className="project-category-title">Frontend & UI Projects</h2>
          <div className="project-listings-container">
            {frontendProjects.map(project => (
              <ProjectItem key={project.slug} project={project} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;