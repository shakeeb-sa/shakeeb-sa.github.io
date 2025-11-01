// src/App.jsx

import React, { useState } from 'react';

// Hooks and Components
import useSmoothScroll from './hooks/useSmoothScroll';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Footer from './components/Footer/Footer';
import IntroOverlay from './components/IntroOverlay/IntroOverlay';
import GsapAnimations from './components/GsapAnimations/GsapAnimations';

const hasIntroBeenPlayed = sessionStorage.getItem('introPlayed');

function App() {
  const [isIntroComplete, setIntroComplete] = useState(!!hasIntroBeenPlayed);

  // Call the custom hook to enable smooth scrolling
  useSmoothScroll();

  const handleIntroComplete = () => {
    setIntroComplete(true);
    sessionStorage.setItem('introPlayed', 'true');
  };

  return (
    <>
      {/* Conditionally render the IntroOverlay */}
      {!isIntroComplete && <IntroOverlay onComplete={handleIntroComplete} />}
      
      {/* Pass the state to the animations component */}
      <GsapAnimations isIntroComplete={isIntroComplete} />

      <div 
        id="afterAnimation" 
        style={{ opacity: isIntroComplete ? 1 : 0 }}
      >
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;