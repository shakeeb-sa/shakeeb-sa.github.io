// src/components/Projects/Projects.jsx

import React from 'react';
import projectsData from '../../data/projectsData';
import './Projects.css';

// Helper component to avoid repeating the project listing code
import CodeCounter from './CodeCounter'; // Import the new component

const ProjectItem = ({ project }) => {
  const primaryLink = project.link ?? project.code;
  const linkTitle = project.link ? `Open site for ${project.name}` : `View code for ${project.name}`;

  return (
    <div className="project-listing" id={project.slug}>
      <div className="project-item-container">
        <a href={primaryLink} title={linkTitle} target="_blank" rel="noopener noreferrer">
          <img src={project.image} alt={project.name} className="project-image" />
        </a>

        <div id="projectInfo" className="project-info">
          
          {/* 1. Header Row: Title on Left, Circle on Right */}
          <div className="project-header-row">
            <div>
                <a href={primaryLink} title={linkTitle} target="_blank" rel="noopener noreferrer">
                <h3 className="playful-hover">{project.name}</h3>
                </a>
                <p style={{marginTop: '0.5rem'}}>{project.type}</p>
            </div>
            
            {/* 2. The Animated Circle (Only shows if totalLines exists) */}
{/* OLD LINE: */}
{/* {project.totalLines && <CodeCounter totalLines={project.totalLines} />} */}

{/* NEW LINE: Pass both totalLines AND languages */}
{project.totalLines && (
  <CodeCounter 
    totalLines={project.totalLines} 
    languages={project.languages} 
  />
)}
          </div>

          <p style={{marginTop: '1rem'}}>{project.description}</p>

          {/* 3. Updated Languages Section with Line Counts */}
          {project.languages && project.languages.length > 0 && (
            <div className="project-languages">
              <h4>Complexity Breakdown</h4>
              {project.languages.map(lang => (
                <div key={lang.name} className="language-item">
                  
                  {/* Text Header: "HTML" ........ "395 Lines" */}
                  <div className="language-header">
                    <span className="language-name-text">{lang.name}</span>
                    <span className="language-lines-text">
                        {lang.lines ? `${lang.lines} lines` : `${lang.percentage}%`}
                    </span>
                  </div>

                  {/* The Colored Bar */}
                  <div className="language-bar-container">
                    <div
                      className={`language-bar lang-${lang.name.toLowerCase().replace(/\s+/g, '-')}`}
                      style={{ width: `${lang.percentage}%` }}
                    ></div>
                  </div>
                  
                </div>
              ))}
            </div>
          )}

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
  // Filter projects into three separate arrays based on the category
  const fullStackProjects = projectsData.filter(p => p.category === 'Full-Stack');
  const chromeExtensionProjects = projectsData.filter(p => p.category === 'Chrome Extension');
  const frontendProjects = projectsData.filter(p => p.category === 'Frontend');

  return (
    <section className="project-container" id="projects">
      <div className="project-title-container">
        <h2>My Projects</h2>
      </div>

      {/* Section 1: Full-Stack Projects */}
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

      {/* Section 2: Chrome Extensions */}
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

      {/* Section 3: Frontend Projects */}
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