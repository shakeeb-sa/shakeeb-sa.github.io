// src/components/Projects/CodeCounter.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Color Map for your specific languages
const getColor = (name) => {
  const n = name.toLowerCase();
  if (n.includes('html')) return '#e34f26'; // Orange
  if (n.includes('css')) return '#1572b6';  // Blue
  if (n.includes('java')) return '#f7df1e'; // Yellow
  if (n.includes('react')) return '#61dafb'; // Light Blue
  return '#ffffff'; // Default White
};

const CodeCounter = ({ totalLines, languages }) => {
  const wrapperRef = useRef(null);
  const counterRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const counter = counterRef.current;
    const svgCircles = svgRef.current.querySelectorAll('circle');
    const badges = wrapper.querySelectorAll('.satellite-badge');

    // Clean number for animation
    const endValue = parseInt(totalLines.replace(/,/g, ''), 10);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });

    // 1. Animate the Center Number
    tl.fromTo(counter, 
      { innerText: 0 }, 
      {
        innerText: endValue,
        duration: 2,
        ease: "power2.out",
        snap: { innerText: 1 },
        onUpdate: function() {
          counter.innerText = Math.ceil(this.targets()[0].innerText).toLocaleString();
        }
      },
      "start"
    );

    // 2. Animate the SVG Segments (The Donut Chart)
    if (svgCircles.length > 0) {
        tl.fromTo(svgCircles, 
            { strokeDashoffset: 283 }, // 283 is approx circumference of r=45
            { 
                strokeDashoffset: (i, target) => target.dataset.offset,
                duration: 1.5,
                ease: "circ.out",
                stagger: 0.2
            },
            "start"
        );
    }

    // 3. Pop out the Satellite Badges (Automatic, no hover)
    tl.fromTo(badges,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)", stagger: 0.2 },
        "-=1" // Start slightly before circle finishes
    );

  }, [totalLines]);

  // --- SVG MATH ---
  // Circle Radius = 45. Circumference = 2 * PI * 45 ≈ 283
  const circumference = 283;
  let currentOffset = 0;

  // Sort languages by percentage (High to Low) and take top 3 to avoid clutter
  const topLanguages = [...languages].sort((a, b) => b.percentage - a.percentage).slice(0, 3);

  return (
    <div className="code-counter-wrapper" ref={wrapperRef}>
        
        {/* THE MULTI-COLORED DONUT CHART */}
        <svg className="code-donut-svg" width="100" height="100" viewBox="0 0 100 100" ref={svgRef}>
            {/* Background Circle (Grey track) */}
            <circle cx="50" cy="50" r="45" fill="none" stroke="#222" strokeWidth="6" />
            
            {/* Colored Segments */}
            {topLanguages.map((lang, index) => {
                const strokeLength = (lang.percentage / 100) * circumference;
                const dashArray = `${strokeLength} ${circumference}`;
                const dashOffset = -currentOffset; // Negative to rotate clockwise
                
                // Save offset for next segment
                currentOffset += strokeLength;

                return (
                    <circle
                        key={index}
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke={getColor(lang.name)}
                        strokeWidth="6"
                        strokeDasharray={dashArray}
                        data-offset={dashOffset} // Passed to GSAP
                        transform="rotate(-90 50 50)" // Start at top
                        strokeLinecap="round"
                    />
                );
            })}
        </svg>

        {/* CENTER TEXT */}
        <div className="code-counter-content">
            <span className="counter-number" ref={counterRef}>0</span>
            <span className="counter-label">Lines</span>
        </div>

        {/* SATELLITE POPUPS (Badges) */}
        {topLanguages.map((lang, index) => (
            <div key={lang.name} className={`satellite-badge badge-pos-${index}`}>
                <span className="badge-name" style={{ color: getColor(lang.name) }}>{lang.name}</span>
                <span className="badge-lines">{lang.lines}</span>
            </div>
        ))}

    </div>
  );
};

export default CodeCounter;