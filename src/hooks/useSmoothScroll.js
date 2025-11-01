// src/hooks/useSmoothScroll.js

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// This is the critical step that makes ScrollTrigger available to GSAP
gsap.registerPlugin(ScrollTrigger);

function useSmoothScroll() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Sync GSAP's ScrollTrigger with Lenis's scrolling
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // This is a cleanup function that runs when the component unmounts
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []); // The empty dependency array ensures this runs only once

  return null; // A hook that only produces side effects doesn't need to return anything
}

export default useSmoothScroll;