// skillTooltips.js
document.addEventListener('DOMContentLoaded', () => {
  // Skill descriptions dictionary
  const skillDescriptions = {
    'HTML': 'HTML (HyperText Markup Language) is the standard markup language for creating web pages and web applications. It forms the structure of a webpage, defining elements like headings, paragraphs, links, and images.',
    'CSS': 'CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML. It controls layout, colors, fonts, and responsive design for all screen sizes.',
    'JavaScript': 'JavaScript (JS) is a versatile, high-level programming language primarily known for enabling interactive and dynamic content on web pages. It is a core technology of the World Wide Web, alongside HTML and CSS, and is supported by all major web browsers.',
    'WordPress': 'WordPress is a free and open-source content management system (CMS) based on PHP and MySQL. It powers over 40% of all websites on the internet, offering flexibility through themes and plugins.',
    'Python': 'Python is a high-level, interpreted programming language known for its readability and versatility. It\'s widely used in web development, data science, artificial intelligence, automation, and scientific computing.',
    'VS Code': 'Visual Studio Code (VS Code) is a free, open-source code editor developed by Microsoft. It features intelligent code completion, debugging, version control integration, and a vast ecosystem of extensions.',
    'GitHub': 'GitHub is a web-based platform for version control and collaboration using Git. It allows developers to store, manage, and review code, track issues, and host open-source projects.',
    'Git': 'Git is a distributed version control system that tracks changes in source code during software development. It enables multiple developers to work on projects simultaneously without conflicts.',
    'React': 'React is a JavaScript library for building user interfaces, particularly single-page applications. Developed by Facebook, it uses a component-based architecture and virtual DOM for efficient rendering.',
    'PHP': 'PHP is a server-side scripting language designed for web development. It powers dynamic content, database interactions, and session tracking, and is the foundation of platforms like WordPress.',
    'Node JS': 'Node.js is a JavaScript runtime built on Chrome\'s V8 engine that allows developers to run JavaScript on the server. It enables building scalable network applications with non-blocking I/O operations.',
    'npm': 'npm (Node Package Manager) is the default package manager for Node.js. It hosts over 1 million packages of reusable code and provides dependency management for JavaScript projects.',
    'pip': 'pip is the standard package installer for Python. It allows you to install and manage additional libraries and dependencies that aren\'t distributed as part of the standard library.',
    'Powershell': 'PowerShell is a task automation and configuration management framework from Microsoft. It includes a command-line shell and scripting language built on the .NET framework for system administration.',
    'Terminal': 'The Terminal is a command-line interface for interacting with an operating system. It allows direct execution of commands, file management, and system configuration without a graphical interface.',
    'Bootstrap': 'Bootstrap is a free, open-source CSS framework directed at responsive, mobile-first front-end web development. It contains HTML, CSS, and JavaScript-based design templates for typography, forms, buttons, and navigation.',
    'Tailwind': 'Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces. It provides low-level utility classes to build designs directly in markup without writing custom CSS.',
    'Canva': 'Canva is a graphic design platform that allows users to create social media graphics, presentations, posters, documents, and other visual content using drag-and-drop features and templates.',
    'Figma': 'Figma is a collaborative web-based design tool for creating user interfaces, prototypes, and design systems. It enables real-time collaboration between designers, developers, and stakeholders.',
    'ChatGPT': 'ChatGPT is an AI language model developed by OpenAI that generates human-like text responses. It assists with coding, content creation, problem-solving, and learning through conversational interaction.',
    'Copilot': 'GitHub Copilot is an AI pair programmer that suggests code and entire functions in real-time right from your editor. It helps developers write code faster and with less work.',
    'Perplexity': 'Perplexity AI is an answer engine that provides precise answers with cited sources. It combines large language models with real-time web search for accurate, up-to-date information.',
    'Dropbox': 'Dropbox is a cloud storage service that allows users to store files online and sync them across devices. It facilitates file sharing, collaboration, and backup with version history.',
    'Grok': 'Grok is an AI chatbot developed by xAI (Elon Musk\'s team) that provides answers with a witty, rebellious personality. It integrates with real-time data from the X platform (formerly Twitter).',
    'Prettier': 'Prettier is an opinionated code formatter that enforces consistent code style by parsing code and re-printing it with its own rules. It supports multiple languages including JavaScript, CSS, and HTML.',
    'Hugging Face': 'Hugging Face is an AI community and platform that provides tools for building, training, and deploying machine learning models. It hosts thousands of pre-trained models and datasets for NLP and computer vision.',
    'DeepSeek': 'DeepSeek is an AI coding assistant that understands and generates code in multiple programming languages. It provides intelligent code completion, debugging help, and documentation explanations.',
    'Claude': 'Claude is an AI assistant developed by Anthropic that excels at reasoning, analysis, and safe interactions. It handles complex tasks like document summarization, coding, and strategic planning.'
  };

  // Create tooltip element
  const tooltip = document.createElement('div');
  tooltip.id = 'skill-tooltip';
  tooltip.style.cssText = `
    position: fixed;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    max-width: 320px;
    font-size: 14px;
    line-height: 1.5;
    z-index: 1000;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease;
    backdrop-filter: blur(4px);
  `;
  document.body.appendChild(tooltip);

  // Add event listeners to all skill items
  document.querySelectorAll('.skill-item').forEach(item => {
    const skillName = item.querySelector('p')?.textContent?.trim();
    
    if (!skillName || !skillDescriptions[skillName]) return;

    // Show tooltip on hover
    item.addEventListener('mouseenter', (e) => {
      tooltip.textContent = skillDescriptions[skillName];
      tooltip.style.opacity = '1';
      positionTooltip(e);
    });

    // Update position while moving
    item.addEventListener('mousemove', (e) => {
      positionTooltip(e);
    });

    // Hide tooltip on leave
    item.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });
  });

  // Position tooltip near cursor
  function positionTooltip(e) {
    const x = e.clientX + 15;
    const y = e.clientY + 15;
    
    // Prevent overflow on right edge
    const tooltipWidth = tooltip.offsetWidth;
    const maxX = window.innerWidth - tooltipWidth - 10;
    const finalX = Math.min(x, maxX);
    
    tooltip.style.left = `${finalX}px`;
    tooltip.style.top = `${y}px`;
  }
});