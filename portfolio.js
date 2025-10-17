document.addEventListener('DOMContentLoaded', () => {

    // --- PROJECT DATA & DYNAMIC LISTING ---
    const projectsList = [
        { name: "SEO Tools & Coding Resources", description: "Online multiplayer game where players compete against each other to create the funniest AI-generated images.", image: "https://i.ibb.co/xKyck15q/SEO-Tools-Coding-Resources.jpg", link: "https://shakeeb-sa.github.io/", code: "https://github.com/shakeeb-sa/shakeeb-sa.github.io", slug: "artificial-unintelligence", type: "Personal Project" },
        { name: "URL Path Separator", description: "It's a handy tool that simplifies splitting and managing URL paths by accurately identifying and separating each segment, making navigation more efficient.", image: "https://i.ibb.co/5xBWW6mJ/URL-Path-Separator.png", link: "https://shakeeb-sa.github.io/url-path-separator.html", code: "https://github.com/shakeeb-sa/shakeeb-sa.github.io", slug: "alcohol101-plus", type: "Personal Project" },
        { name: "Multi Format Link Converter", description: "Easily convert all types of links, including BBCode, HTML, and plain URLs.", image: "https://i.ibb.co/Qw9c0Mf/Multi-Format-Link-Converter.jpg", link: "https://shakeeb-sa.github.io/multi-format-link-converter.html", code: "https://github.com/shakeeb-sa/shakeeb-sa.github.io", slug: "hayden-ai", type: "Personal Project" },
        { name: "Guestbook Extractor Chrome Extension", description: "A Chrome extension that automates scrolling through guest books, downloads backlinks, and removes duplicates for efficient link building.", image: "https://i.ibb.co/cMR4CKV/Guestbook-Extractor-Chrome-Extension.jpg", link: "https://shakeeb-sa.github.io/guestbook-extractor-chrome-extension.html", code: "https://github.com/shakeeb-sa/shakeeb-sa.github.io", slug: "responsibility-works", type: "Personal Project" },
        { name: "All About Coding", description: "Discover a comprehensive collection of coding tutorials, videos, and resources from YouTube. Your go-to site for all things coding—learn, explore, and master programming today!", image: "https://i.ibb.co/LzXTHdkY/All-About-Coding.jpg", link: "https://shakeeb-sa.github.io/all-about-coding.html", code: "https://github.com/shakeeb-sa/shakeeb-sa.github.io", slug: "safe-drive", type: "Personal Project" },
        { name: "Sha Fabrics", description: "SHA Fabrics is an e-commerce website dedicated to offering a wide selection of high-quality fabrics and apparel. The platform features an extensive range of products including stylish bedsheets, as well as fashionable dresses for both women and men. With a user-friendly interface, SHA Fabrics aims to provide customers with a seamless shopping experience, showcasing premium materials and trendy designs to meet diverse tastes and preferences. Whether you're looking to refresh your bedroom decor or update your wardrobe, SHA Fabrics has you covered with its versatile and fashionable offerings.", image: "https://i.ibb.co/4nQtqJbH/sha-fabrics.jpg", link: "http://sha-fabrics.github.io/", code: "https://github.com/sha-fabrics/sha-fabrics.github.io", slug: "virtual-bar", type: "Personal Project" },
    ];

    const projectContainer = document.querySelector('.project-listings-container');
    if (projectContainer) {
        projectsList.forEach(project => {
            const projectEl = document.createElement('div');
            projectEl.className = 'project project-listing';
            projectEl.id = project.slug;

            const link = project.link ?? project.code;
            const title = project.link ? `Open site of ${project.name}` : `View Code for ${project.name}`;

            let buttonsHTML = '';
            if (project.link) {
                buttonsHTML += `<a href="${project.link}" title="Open site of ${project.name}" class="project-btn" target="_blank" rel="noopener noreferrer">Open Site</a>`;
            }
            if (project.code) {
                buttonsHTML += `<a href="${project.code}" title="View Code for ${project.name}" class="project-btn" target="_blank" rel="noopener noreferrer">View Code</a>`;
            }
            
            const descriptionHTML = project.description.split("\n").map(p => `<p>${p}</p>`).join('');

            projectEl.innerHTML = `
                <div class="project-item-container">
                    <a href="${link}" title="${title}" target="_blank" rel="noopener noreferrer">
                        <picture>
                            ${project.mobileImage ? `<source srcset="${project.mobileImage}" media="(max-width:967px)">` : ''}
                            <img src="${project.image}" alt="${project.name}" class="project-image">
                        </picture>
                    </a>
                    <div id="projectInfo" class="project-info">
                        <a href="${link}" title="${title}" target="_blank" rel="noopener noreferrer">
                            <h2 class="playful-hover">${project.name}</h2>
                        </a>
                        ${descriptionHTML}
                        <p>${project.type}</p>
                        <div class="project-btns">
                            ${buttonsHTML}
                        </div>
                    </div>
                </div>
            `;
            projectContainer.appendChild(projectEl);
        });
    }

    // --- SMOOTH SCROLLING WITH LENIS ---
    const lenis = new Lenis({
        lerp: 0.1,
        duration: 1.5,
    });
    
    // --- GSAP & LENIS INTEGRATION FOR SMOOTH SCROLLING ---
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // --- ANIMATIONS ---
    gsap.registerPlugin(ScrollTrigger);
    
    const introOverlay = document.querySelector('.intro-overlay');
    const afterAnimationContent = document.querySelector('#afterAnimation');
    
    const params = new URLSearchParams(window.location.search);
    const cameBack = params.get('back') === 'true';

    const onIntroComplete = () => {
        if (introOverlay) {
            introOverlay.style.display = 'none';
        }
        gsap.to(afterAnimationContent, { opacity: 1, duration: 0 });
    };

    if (cameBack) {
        onIntroComplete();
    }
    
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
            
            // --- Intro Animation ---
            if (!cameBack) {
                const tl = gsap.timeline();
                tl.to("#ball", {
                    duration: reduceMotion ? 0 : 2,
                    y: "100vh",
                    ease: "bounce.out",
                })
                .to("#ball", {
                    duration: reduceMotion ? 0 : 1,
                    delay: 0.2,
                    // --- FIX: Increased scale to cover entire viewport diagonal ---
                    scale: 75, // Changed from 'isDesktop ? 25 : 30'
                    ease: "power3.out",
                    onComplete: onIntroComplete,
                })
                .from("#afterAnimation", {
                    duration: reduceMotion ? 0 : 0.8,
                    opacity: 0,
                    ease: "power3.out",
                }, "-=0.5")
                .from("#title", { duration: reduceMotion ? 0 : 0.5, y: 100, delay: 0.2, opacity: 0, ease: "power3.out" })
                .from("#portraitContainer", { duration: reduceMotion ? 0 : 0.5, y: 100, opacity: 0, ease: "power3.out" }, "-=0.3")
                .from("#jobTitle", { duration: reduceMotion ? 0 : 0.5, y: 100, opacity: 0, ease: "power3.out" }, "-=0.3")
                .from("#aboutContainer", { duration: reduceMotion ? 0 : 0.5, y: 100, opacity: 0, ease: "power3.out" }, "-=0.3")
                .from("#blogPreviewContainer", { duration: reduceMotion ? 0 : 0.5, y: 100, opacity: 0, ease: "power3.out" }, "-=0.3");
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
                    duration: 0.6, // Restored to a more reasonable duration
                    stagger: 0.1,
                    ease: "power3.out",
                });

                // Animate Tools Section
                gsap.from(".tool-item", {
                    scrollTrigger: {
                        trigger: ".my-tools",
                        start: "top 85%",
                        once: true,
                    },
                    opacity: 0,
                    y: 20,
                    duration: 0.6, // Restored to a more reasonable duration
                    stagger: 0.1,
                    ease: "power3.out",
                });

                const projects = gsap.utils.toArray(".project");
                
                if (isDesktop) {
                    projects.forEach((project) => {
                        const tlProject = gsap.timeline({
                            scrollTrigger: {
                                trigger: project,
                                start: "top bottom",
                                end: "center center",
                                scrub: 1,
                            },
                        });
                        const projectImage = project.querySelector("img");
                        const projectInfo = project.querySelector("#projectInfo");

                        tlProject.from(projectImage, { x: -300, opacity: 0 }).from(projectInfo, { x: 300, opacity: 0 }, "<");
                    });
                } else {
                    projects.forEach((project) => {
                        const tlProject = gsap.timeline({
                            scrollTrigger: {
                                trigger: project,
                                start: "top 80%",
                                end: "center center",
                                scrub: 1,
                            },
                        });
                        const projectImage = project.querySelector("img");
                        const projectInfo = project.querySelector("#projectInfo");

                        tlProject.from(projectImage, { y: 100, opacity: 0 }).from(projectInfo, { y: 100, opacity: 0 }, "<");
                    });
                }

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
        }
    );
});