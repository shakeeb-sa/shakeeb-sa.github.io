// src/components/GsapAnimations/GsapAnimations.jsx

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// This component doesn't render anything. It just runs the GSAP animations.
function GsapAnimations({ isIntroComplete }) {
  useEffect(() => {
    // Don't run animations if the intro isn't complete
    if (!isIntroComplete) return;

    // Register the plugin
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    const breakPoint = 768;

    mm.add(
      {
        isDesktop: `(min-width: ${breakPoint}px)`,
        isMobile: `(max-width: ${breakPoint - 1}px)`,
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isDesktop, reduceMotion } = context.conditions;

        // --- Initial Page-Load Animations (after intro) ---
        if (!reduceMotion) {
          const introTl = gsap.timeline({ delay: 0.2 }); // Small delay after intro
          introTl
            .from("#title", { duration: 0.5, y: 100, opacity: 0, ease: "power3.out" })
            .from("#portraitContainer", { duration: 0.5, y: 100, opacity: 0, ease: "power3.out" }, "-=0.3")
            .from("#jobTitle", { duration: 0.5, y: 100, opacity: 0, ease: "power3.out" }, "-=0.3")
            .from("#aboutContainer", { duration: 0.5, y: 100, opacity: 0, ease: "power3.out" }, "-=0.3");
        }

        // --- Scroll-Triggered Animations ---
        if (!reduceMotion) {
          // Animate Skills Section
          gsap.from(".skill-item", {
            scrollTrigger: {
              trigger: ".my-skills",
              start: "top 85%",
              once: true,
            },
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          });

          // Animate Projects Section
          const projects = gsap.utils.toArray(".project-listing");
          
          projects.forEach((project) => {
            const tlProject = gsap.timeline({
              scrollTrigger: {
                trigger: project,
                start: isDesktop ? "top bottom" : "top 80%",
                end: "center center",
                scrub: 1,
              },
            });
            const projectImage = project.querySelector(".project-image");
            const projectInfo = project.querySelector("#projectInfo");

            if (isDesktop) {
              tlProject.from(projectImage, { x: -300, opacity: 0 }).from(projectInfo, { x: 300, opacity: 0 }, "<");
            } else {
              tlProject.from(projectImage, { y: 100, opacity: 0 }).from(projectInfo, { y: 100, opacity: 0 }, "<");
            }
          });

          // Animate Footer Section
          const tlFooter = gsap.timeline({
            scrollTrigger: {
              trigger: "footer",
              start: "top center",
              end: "top top",
              scrub: 1,
            },
          });

          tlFooter
            .from("footer h2", { y: 100, opacity: 0, duration: 0.6 })
            .from("footer #footerLinks", { y: 100, opacity: 0, duration: 0.6 }, "<");
        }
        
        // Return a cleanup function
        return () => {
          // This kills all animations and ScrollTriggers created in this context
          gsap.killTweensOf(".skill-item, .project-listing, footer h2, footer #footerLinks, #title, #portraitContainer, #jobTitle, #aboutContainer");
        }
      }
    );

  }, [isIntroComplete]); // This effect depends on the intro being complete

  return null; // This component renders nothing
}

export default GsapAnimations;