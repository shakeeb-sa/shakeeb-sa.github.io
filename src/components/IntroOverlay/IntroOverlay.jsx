// src/components/IntroOverlay/IntroOverlay.jsx

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './IntroOverlay.css';

function IntroOverlay({ onComplete }) {
  // These refs get a direct reference to the HTML elements
  const overlayRef = useRef(null);
  const ballRef = useRef(null);

  // This useEffect runs the animation when the component first appears
  useEffect(() => {
    // We added this log for debugging. It's good to keep for now.
    console.log("Intro Animation Started.");

    // This is the GSAP animation timeline
    const tl = gsap.timeline({
      onComplete: onComplete, // This calls the function from App.jsx when the animation is finished
    });

    // The animation steps
    tl.to(ballRef.current, {
      duration: 2,
      y: "100vh",
      ease: "bounce.out",
    })
    .to(ballRef.current, {
      duration: 1,
      delay: 0.2,
      scale: 75,
      ease: "power3.out",
    });

  }, [onComplete]); // The empty array means this effect runs only once

  // This is the HTML that gets rendered
  return (
    <div className="intro-overlay" ref={overlayRef}>
      <div className="ball" ref={ballRef}></div>
    </div>
  );
}

export default IntroOverlay;