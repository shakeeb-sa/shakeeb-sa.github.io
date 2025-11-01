// src/components/Projects/Projects.jsx

import React from 'react';
import projectsData from '../../data/projectsData';
import './Projects.css';

function Projects() {
  return (
    <section className="project-container" id="projects">
      <div className="project-title-container">
        <h2>My Projects</h2>
      </div>
      <div className="project-listings-container">
        {projectsData.map((project) => {
          // Determine the primary link for the image and title
          const primaryLink = project.link ?? project.code;
          const linkTitle = project.link ? `Open site for ${project.name}` : `View code for ${project.name}`;

          return (
            <div key={project.slug} className="project-listing" id={project.slug}>
              <div className="project-item-container">
                <a href={primaryLink} title={linkTitle} target="_blank" rel="noopener noreferrer">
                  <img src={project.image} alt={project.name} className="project-image" />
                </a>

                <div id="projectInfo" className="project-info">
                  <a href={primaryLink} title={linkTitle} target="_blank" rel="noopener noreferrer">
                    <h2 className="playful-hover">{project.name}</h2>
                  </a>
                  <p>{project.description}</p>
                  <p>{project.type}</p>

                  {/* Conditionally render the languages section */}
                  {project.languages && project.languages.length > 0 && (
                    <div className="project-languages">
                      <h3>Languages</h3>
                      {project.languages.map(lang => (
                        <div key={lang.name} className="language-item">
                          <span className="language-name">{lang.name}</span>
                          <div className="language-bar-container">
                            <div
                              className={`language-bar lang-${lang.name.toLowerCase().replace(/\s+/g, '-')}`}
                              style={{ width: `${lang.percentage}%` }}
                            ></div>
                          </div>
                          <span className="language-percentage">{lang.percentage}%</span>
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
        })}
      </div>
    </section>
  );
}

export default Projects;