// Import each project image at the top of the file
import toolsForDevsSeosImage from "../assets/images/tools-for-devs-seos.jpg";
import urlPathSeparatorImage from "../assets/images/url-path-separator.jpg";
import multiFormatLinkConverterImage from "../assets/images/multi-format-link-converter.jpg";
import guestbookExtractorImage from "../assets/images/guestbook-extractor.jpg";
import allAboutCodingImage from "../assets/images/all-about-coding.jpg";
import domainCheckerImage from "../assets/images/domain-checker.jpg";
import shaFabricsImage from "../assets/images/sha-fabrics.jpg";
import codeChunker from "../assets/images/code-chunker.jpg";
import metaScraper from "../assets/images/meta-scraper.jpg";
import devSeoTools from "../assets/images/devseo-tools.jpg";
import liveCssEditor from "../assets/images/live-css-editor.jpg";
import LinkBuildingAutomator from "../assets/images/link-building-automator.jpg";
import LinkBuildingExecutionGenerator from "../assets/images/link-building-execution-generator.jpg";
import CinemaDownloader from "../assets/images/cinema-downloader.jpg";
import DevTube from "../assets/images/dev-tube.jpg";

const projectsData = [
  {
    name: "Meta Scraper",
    description:
      "Easily bulk scrape meta titles and descriptions from a list of URLs. Paste your list to get instant results, then export to TXT, DOCX, or Excel (.xlsx). A fast, free tool for SEOs and marketers.",
    image: metaScraper,
    link: "https://meta-scraper-three.vercel.app/",
    code: "https://github.com/shakeeb-sa/meta-scraper",
    slug: "meta-scraper",
    type: "Personal Project",
    totalLines: "345",
    category: "Full-Stack",
    languages: [
      // 2. ADD "lines" property to each language
      { name: "HTML", percentage: 9.3, lines: "35" },
      { name: "CSS", percentage: 16.2, lines: "124" },
      { name: "JavaScript", percentage: 74.5, lines: "186" },
    ],
  },
  {
    name: "DevSeo Tools",
    description:
      "A free and simple SEO analysis tool. Get an instant on-page report covering your meta tags, headings, word count, image SEO, and structured data in seconds.",
    image: devSeoTools,
    link: "https://devseo-tools-fresh.vercel.app/",
    code: "https://github.com/shakeeb-sa/devseo-tools",
    slug: "devseo-tools",
    type: "Personal Project",
    totalLines: "345",
    category: "Full-Stack",
    languages: [
      // 2. ADD "lines" property to each language
      { name: "HTML", percentage: 45.7, lines: "35" },
      { name: "CSS", percentage: 25.3, lines: "124" },
      { name: "JavaScript", percentage: 29.0, lines: "186" },
    ],
  },
  {
    name: "Guestbook Extractor Chrome Extension",
    description:
      "A Chrome extension that automates scrolling through guest books, downloads backlinks, and removes duplicates for efficient link building.",
    image: guestbookExtractorImage,
    link: "https://github.com/shakeeb-sa/guestbook-extractor-extension",
    code: "https://github.com/shakeeb-sa/guestbook-extractor-extension",
    slug: "guestbook-extractor",
    type: "Personal Project",
    totalLines: "362",
    category: "Chrome Extension",
    languages: [
      // 2. ADD "lines" property to each language
      { name: "HTML", percentage: 11.5, lines: "66" },
      { name: "CSS", percentage: 0, lines: "0" },
      { name: "JavaScript", percentage: 88.5, lines: "336" },
    ],
  },
  {
    name: "Live CSS Editor",
    description:
      "A live CSS editor for Chrome. Visually edit any webpage by clicking and resizing elements. Instantly generates the required CSS with unique selectors, ready to copy with one click.",
    image: liveCssEditor,
    link: "https://github.com/shakeeb-sa/Live-css-editor",
    code: "https://github.com/shakeeb-sa/Live-css-editor",
    slug: "live-css-editor",
    type: "Personal Project",
    totalLines: "362",
    category: "Chrome Extension",
    languages: [
      // 2. ADD "lines" property to each language
      { name: "HTML", percentage: 11.3, lines: "66" },
      { name: "CSS", percentage: 11.9, lines: "0" },
      { name: "JavaScript", percentage: 76.8, lines: "336" },
    ],
  },
  {
    name: "Link Building Automator",
    description:
      "Lightning LinkBuilder is a Chrome extension that automates form-filling, profile creation, and outreach for link builders using smart data injection and AI-powered field detection. It supports real/fake data, intelligent dropdown sequencing, one-click submissions, and domain collision alerts via its Watchtower feature.",
    image: LinkBuildingAutomator,
    link: "https://github.com/shakeeb-sa/link-building-automator",
    code: "https://github.com/shakeeb-sa/link-building-automator",
    slug: "link-building-automator",
    type: "Personal Project",
    totalLines: "7169",
    category: "Chrome Extension",
    languages: [
      // 2. ADD "lines" property to each language
      { name: "HTML", percentage: 13.2, lines: "1060" },
      { name: "CSS", percentage: 0.4, lines: "41 " },
      { name: "JavaScript", percentage: 86.4, lines: "6068" },
    ],
  },
  {
    name: "Cinema Downloader",
    description:
      "Can't download that video? This extension sniffs out hidden streams, grabs the source, and reassembles the video file for you. Includes a 'Force Scan' mode for stubborn players.",
    image: CinemaDownloader,
    link: "https://github.com/shakeeb-sa/cinema-downloader/",
    code: "https://github.com/shakeeb-sa/cinema-downloader/",
    slug: "cinema-downloader",
    type: "Personal Project",
    totalLines: "1066",
    category: "Chrome Extension",
    languages: [
      // 2. ADD "lines" property to each language
      { name: "HTML", percentage: 21.3, lines: "182" },
      { name: "CSS", percentage: 0, lines: "0 " },
      { name: "JavaScript", percentage: 78.7, lines: "884" },
    ],
  },
  {
    name: "Dev Tube",
    description:
      "Discover a comprehensive collection of coding tutorials, videos, and resources from YouTube. Your go-to site for all things coding—learn, explore, and master programming today!",
    image: DevTube,
    link: "https://shakeeb-sa.github.io/dev-tube/",
    code: "https://github.com/shakeeb-sa/dev-tube",
    slug: "dev-tube",
    type: "Personal Project",
    totalLines: "1702",
    category: "Frontend",
    languages: [
      // 2. ADD "lines" property to each language
      { name: "HTML", percentage: 0, lines: "0" },
      { name: "CSS", percentage: 0, lines: "0 " },
      { name: "JavaScript", percentage: 98.6, lines: "1702" },
    ],
  },
  {
    name: "Sha Fabrics",
    description:
      "SHA Fabrics is an e-commerce site offering high-quality fabrics, bedsheets, and stylish clothing for men and women. With a user-friendly design, it provides trendy, premium products to refresh your home or wardrobe effortlessly.",
    image: shaFabricsImage,
    link: "http://sha-fabrics.github.io/",
    code: "https://github.com/sha-fabrics/sha-fabrics.github.io",
    slug: "sha-fabrics",
    type: "Personal Project",
    totalLines: "5812",
    category: "Frontend",
    languages: [
      // 2. ADD "lines" property to each language
      { name: "HTML", percentage: 26.8, lines: "2122" },
      { name: "CSS", percentage: 14.5, lines: "1499 " },
      { name: "JavaScript", percentage: 58.7, lines: "2191" },
    ],
  },
  {
    name: "Multi Format Link Converter",
    description:
      "Easily convert all types of links, including BBCode, HTML, and plain URLs.",
    image: multiFormatLinkConverterImage,
    link: "https://shakeeb-sa.github.io/multi-format-link-converter/",
    code: "https://github.com/shakeeb-sa/multi-format-link-converter",
    slug: "link-converter",
    type: "Personal Project",
    totalLines: "1970",
    category: "Frontend",
    languages: [
      // 2. ADD "lines" property to each language
      { name: "HTML", percentage: 21.3, lines: "472" },
      { name: "CSS", percentage: 35.4, lines: "636 " },
      { name: "JavaScript", percentage: 43.3, lines: "862" },
    ],
  },
  {
    name: "Link Building Execution Generator",
    description:
      "Link Building Execution Generator is a web-based tool that transforms raw outreach data from Excel into a prioritized, ready-to-execute link-building plan. It intelligently categorizes activities like Guest Blogging, Web 2.0, DA 50+, and Classifieds, then sorts them by strategic importance.",
    image: LinkBuildingExecutionGenerator,
    link: "https://shakeeb-sa.github.io/link-building-execution-generator/",
    code: "https://github.com/shakeeb-sa/link-building-execution-generator",
    slug: "link-building-execution-generator",
    type: "Personal Project",
    totalLines: "525",
    category: "Frontend",
    languages: [
      // 2. ADD "lines" property to each language
      { name: "HTML", percentage: 20, lines: "97" },
      { name: "CSS", percentage: 30, lines: "104 " },
      { name: "JavaScript", percentage: 60, lines: "324" },
    ],
  },
  {
    name: "Tools for Developers & SEOs",
    description:
      "A curated collection of free, powerful tools for developers and SEOs to streamline workflows and boost productivity.",
    image: toolsForDevsSeosImage,
    link: "https://shakeeb-sa.github.io/tools/",
    code: "https://github.com/shakeeb-sa/tools",
    slug: "tools-for-devs",
    type: "Personal Project",
    totalLines: "305",
    category: "Frontend",
    languages: [
      // 2. ADD "lines" property to each language
      { name: "HTML", percentage: 35.3, lines: "101" },
      { name: "CSS", percentage: 46.4, lines: "122 " },
      { name: "JavaScript", percentage: 18.3, lines: "82" },
    ],
  },
  {
    name: "URL Path Separator",
    description:
      "It's a handy tool that simplifies splitting and managing URL paths by accurately identifying and separating each segment, making navigation more efficient.",
    image: urlPathSeparatorImage,
    link: "https://shakeeb-sa.github.io/url-path-separator/",
    code: "https://github.com/shakeeb-sa/url-path-separator",
    slug: "url-separator",
    type: "Personal Project",
    totalLines: "1130",
    category: "Frontend",
    languages: [
      // 2. ADD "lines" property to each language
      { name: "HTML", percentage: 21.3, lines: "182" },
      { name: "CSS", percentage: 35.4, lines: "466 " },
      { name: "JavaScript", percentage: 43.3, lines: "482" },
    ],
  },
  {
    name: "Domain Checker",
    description:
      "A web tool that compares two URL lists, identifies unique and matching domains, and creates a detailed report. It streamlines URL data analysis efficiently.",
    image: domainCheckerImage,
    link: "https://shakeeb-sa.github.io/domain-checker/",
    code: "https://github.com/shakeeb-sa/domain-checker",
    slug: "domain-checker",
    type: "Personal Project",
    totalLines: "484",
    category: "Frontend",
    languages: [
      // 2. ADD "lines" property to each language
      { name: "HTML", percentage: 15.3, lines: "64" },
      { name: "CSS", percentage: 42.3, lines: "242 " },
      { name: "JavaScript", percentage: 42.4, lines: "178" },
    ],
  },
  {
    name: "Code Chunker",
    description:
      "Paste your large code file below. Choose how you want to split it, and get copy-paste-ready chunks for your AI assistant.",
    image: codeChunker,
    link: "https://shakeeb-sa.github.io/code-chunker/",
    code: "https://github.com/shakeeb-sa/code-chunker/",
    slug: "code-chunker",
    type: "Personal Project",
    totalLines: "795",
    category: "Frontend",
    languages: [
      // 2. ADD "lines" property to each language
      { name: "HTML", percentage: 35, lines: "209" },
      { name: "CSS", percentage: 35, lines: "204 " },
      { name: "JavaScript", percentage: 30, lines: "150" },
    ],
  },
];

export default projectsData;
