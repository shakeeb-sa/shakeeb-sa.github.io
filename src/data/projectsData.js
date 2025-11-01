// src/data/projectsData.js

const projectsData = [
    {
        name: "Tools for Developers & SEOs",
        description: "A curated collection of free, powerful tools for developers and SEOs to streamline workflows and boost productivity.",
        image: "/src/assets/images/tools-for-devs-seos.jpg", // Path updated
        link: "https://shakeeb-sa.github.io/tools/",
        code: "https://github.com/shakeeb-sa/tools",
        slug: "tools-for-devs",
        type: "Personal Project",
        languages: [
            { name: 'JavaScript', percentage: 18.3 },
            { name: 'HTML', percentage: 35.3 },
            { name: 'CSS', percentage: 46.4 }
        ]
    },
    {
        name: "URL Path Separator",
        description: "It's a handy tool that simplifies splitting and managing URL paths by accurately identifying and separating each segment, making navigation more efficient.",
        image: "/src/assets/images/url-path-separator.jpg", // Path updated
        link: "https://shakeeb-sa.github.io/url-path-separator/",
        code: "https://github.com/shakeeb-sa/tools",
        slug: "url-separator",
        type: "Personal Project",
        languages: [
            { name: 'JavaScript', percentage: 43.3 },
            { name: 'HTML', percentage: 21.3 },
            { name: 'CSS', percentage: 35.4 }
        ]
    },
    {
        name: "Multi Format Link Converter",
        description: "Easily convert all types of links, including BBCode, HTML, and plain URLs.",
        image: "/src/assets/images/multi-format-link-converter.jpg", // Path updated
        link: "https://shakeeb-sa.github.io/multi-format-link-converter/",
        code: "https://github.com/shakeeb-sa/multi-format-link-converter",
        slug: "link-converter",
        type: "Personal Project",
        languages: [
            { name: 'JavaScript', percentage: 35.3 },
            { name: 'HTML', percentage: 32.9 },
            { name: 'CSS', percentage: 31.8 }
        ]
    },
    {
        name: "Guestbook Extractor Chrome Extension",
        description: "A Chrome extension that automates scrolling through guest books, downloads backlinks, and removes duplicates for efficient link building.",
        image: "/src/assets/images/guestbook-extractor.jpg", // Path updated
        link: "https://shakeeb-sa.github.io/guestbook-extractor-chrome-extension/",
        code: "https://github.com/shakeeb-sa/guestbook-extractor-chrome-extension",
        slug: "guestbook-extractor",
        type: "Personal Project",
        languages: [
            { name: 'JavaScript', percentage: 100 }
        ]
    },
    {
        name: "All About Coding",
        description: "Discover a comprehensive collection of coding tutorials, videos, and resources from YouTube. Your go-to site for all things coding—learn, explore, and master programming today!",
        image: "/src/assets/images/all-about-coding.jpg", // Path updated
        link: "https://shakeeb-sa.github.io/all-about-coding/",
        code: "https://github.com/shakeeb-sa/all-about-coding",
        slug: "all-about-coding",
        type: "Personal Project",
        languages: [
            { name: 'CSS', percentage: 23.0 },
            { name: 'HTML', percentage: 18.9 },
            { name: 'JavaScript', percentage: 58.1 }
        ]
    },
    {
        name: "Domain Checker",
        description: "A web tool that compares two URL lists, identifies unique and matching domains, and creates a detailed report. It streamlines URL data analysis efficiently.",
        image: "/src/assets/images/domain-checker.jpg", // Path updated
        link: "https://shakeeb-sa.github.io/domain-checker/",
        code: "https://github.com/shakeeb-sa/domain-checker",
        slug: "domain-checker",
        type: "Personal Project",
        languages: [
            { name: 'JavaScript', percentage: 42.4 },
            { name: 'HTML', percentage: 15.3 },
            { name: 'CSS', percentage: 42.3 }
        ]
    },
   {
    name: "Sha Fabrics",
    description: "SHA Fabrics is an e-commerce site offering high-quality fabrics, bedsheets, and stylish clothing for men and women. With a user-friendly design, it provides trendy, premium products to refresh your home or wardrobe effortlessly.",
    image: "/src/assets/images/sha-fabrics.jpg",
    link: "http://sha-fabrics.github.io/",
    code: "https://github.com/sha-fabrics/sha-fabrics.github.io",
    slug: "sha-fabrics",
    type: "Personal Project",
    languages: [
        { name: 'HTML', percentage: 26.8 },
        { name: 'CSS', percentage: 14.5 },
        // This is the line to fix
        { name: 'JavaScript', percentage: 58.7 } 
    ]
},
];

export default projectsData;