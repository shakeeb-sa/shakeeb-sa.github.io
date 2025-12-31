// src/components/GsapAnimations/GsapAnimations.jsx

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function GsapAnimations({ isIntroComplete }) {
  useEffect(() => {
    if (!isIntroComplete) return;

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

        if (!reduceMotion) {
          // Intro Animations
          const introTl = gsap.timeline({ delay: 0.2 });
          introTl
            .from("#title", { duration: 0.5, y: 100, opacity: 0, ease: "power3.out" })
            .from("#portraitContainer", { duration: 0.5, y: 100, opacity: 0, ease: "power3.out" }, "-=0.3")
            .from("#jobTitle", { duration: 0.5, y: 100, opacity: 0, ease: "power3.out" }, "-=0.3")
            .from("#aboutContainer", { duration: 0.5, y: 100, opacity: 0, ease: "power3.out" }, "-=0.3");
        }

        if (!reduceMotion) {
          // Skills
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

          // Projects
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

          // --- FIXED FOOTER ANIMATION ---
          // 1. Removed scrub (prevents it from sticking to scrollbar)
          // 2. Changed start to "top 75%" (triggers when footer is mostly in view)
          const tlFooter = gsap.timeline({
            scrollTrigger: {
              trigger: "footer",
              start: "top 75%", 
              toggleActions: "play none none reverse",
            },
          });

          tlFooter
            .from("footer h2", { 
                y: 50, 
                opacity: 0, 
                duration: 0.8, 
                ease: "power3.out" 
            })
            .from("footer #footerLinks", { 
                y: 50, 
                opacity: 0, 
                duration: 0.8, 
                ease: "power3.out" 
            }, "-=0.6");
        }
        
        return () => {
          gsap.killTweensOf(".skill-item, .project-listing, footer h2, footer #footerLinks, #title, #portraitContainer, #jobTitle, #aboutContainer");
        }
      }
    );

  }, [isIntroComplete]);

  return null;
}

export default GsapAnimations;