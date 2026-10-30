// All portfolio content lives here. Edit this file to update the site.

export const profile = {
  name: 'Manav Shah',
  role: 'Software Engineer',
  location: 'Pune, India',
  photo: './manav.jpg',
  photoLarge: './manav-large.jpg',
  headline: 'I keep enterprise Java secure, current and shipping.',
  intro:
    'Software engineer at Wishtree Technologies since 2022. I lead platform migrations, close security vulnerabilities, rebuild CI/CD pipelines and work directly with clients when production needs attention.',
  email: 'manav.march12@gmail.com',
  // Drop the PDF at public/Manav-Shah-Resume.pdf; the download button appears once the file exists.
  resume: './Manav-Shah-Resume.pdf',
  // One line for the hero and contact section. Hidden when empty.
  openTo: 'Open to new roles in backend, Java and full-stack engineering.',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/manavushah/' },
    { label: 'GitHub', href: 'https://github.com/manavshah123' },
  ],
};

// Shown in the hero "upgrade log", in order.
export const upgrades = [
  { what: 'Java', from: '8', to: '17' },
  { what: 'Jakarta EE', from: 'javax', to: '10' },
  { what: 'Tomcat', from: '9', to: '10.1' },
  { what: 'Spring Framework', from: '5', to: '6' },
  { what: 'Hibernate', from: '5', to: '6' },
  { what: 'Jackson', from: '2.13', to: '2.21' },
  { what: 'JasperReports', from: '6.3', to: '6.21' },
  { what: 'Unit tests', from: '—', to: '1,600+' },
];

export const facts = [
  { value: '4+ years', label: 'building and maintaining enterprise software' },
  { value: '1,600+', label: 'unit tests added to one platform’s suite' },
  { value: '7 platforms', label: 'shipped to: Web (Chrome), Android, iOS, Fire TV, Apple TV, Roku, Samsung TV' },
];

export const projects = [
  {
    name: 'Webstore platform for HVAC contractors and dealers',
    short: 'Webstore', // label on the Work timeline
    period: 'Jun 2026 – Present',
    summary: 'Support and enhancement work on a B2B ordering platform, working directly with the client.',
    tech: ['Java 17', 'Spring Boot 3', 'Apache Lucene', 'REST APIs', 'Angular', 'TypeScript', 'RxJS'],
    tools: ['Maven', 'Angular CLI', 'Git/GitHub'],
    highlights: [
      'Designed and shipped a full-stack admin feature (Spring Boot REST API + Angular UI) to switch which of two blue-green Lucene index directories serves live search, without a full rebuild.',
      'Added guardrails (HTTP 400/409 validation) that block activating an index mid-rebuild or before it has been built, protecting search availability in production.',
      'Built a thread-safe, bounded build-log buffer and surfaced it as a live, auto-scrolling log panel in the Angular admin dashboard.',
      'Kept UI controls in sync with long-running rebuilds through polling-driven state in the Angular service and component layer.',
      'Owned the change end to end across two repositories: API design, UI integration, branching and production build verification with Maven and the Angular CLI.',
      'Worked directly with the client on production issues and change requests.',
    ],
  },
  {
    name: 'Vision — contract analysis and data extraction',
    short: 'Vision', // label on the Work timeline
    period: 'Apr 2026 – Present',
    summary: 'Hardened the build and dependency chain of a multi-module contract analysis product.',
    tech: ['Java 8/11', 'Jackson', 'JasperReports', 'PostgreSQL', 'Batch scripting'],
    tools: ['IntelliJ IDEA', 'Gradle', 'Jenkins', 'SonarQube', 'Nexus', 'Snyk', 'Git/GitHub'],
    highlights: [
      'Rewrote the Jenkins pipeline in declarative form with SonarQube analysis, Nexus resolution and automatic versioning for every Gradle module.',
      'Fixed CVEs by upgrading Jackson 2.13 → 2.21 and JasperReports 6.3 → 6.21, replacing deprecated Jackson code for safer deserialization.',
      'Introduced Gradle dependency locking so Snyk could surface hidden transitive CVEs; managed the release from 34.x to 35.0.0.',
      'Wrote a build automation script and rewrote the README, simplifying builds and onboarding.',
    ],
  },
  {
    name: 'DocGen — enterprise document generation',
    short: 'DocGen', // label on the Work timeline
    period: 'Mar 2026 – Present',
    summary: 'Led the move of a large enterprise application to Jakarta EE 10 and a modern Spring stack.',
    tech: ['Java 17', 'Jakarta EE 10', 'Spring 6', 'Apache CXF 4', 'JAXB 3', 'EhCache 3', 'PostgreSQL', 'React'],
    tools: ['Tomcat 10.1', 'Ant + Ivy', 'Maven', 'Jenkins', 'Docker', 'JUnit', 'Allure', 'Snyk', 'Bash'],
    highlights: [
      'Led the migration to Java 17 and Jakarta EE 10: Java 8 → 17, Tomcat 9 → 10.1, Spring 5 → 6, Hibernate 5 → 6.',
      'Found and fixed XXE, SQL injection, XSS and HTTP response splitting vulnerabilities.',
      'Resolved migration regressions across Spring Security, Hibernate, JAXB, JSP and web services.',
      'Grew the automated unit test suite to 1,600+ tests and wired it into Jenkins for every build.',
    ],
  },
  {
    name: 'Resume Builder — internal tool for Wishtree',
    short: 'Resume Builder', // label on the Work timeline
    period: 'Feb 2026 – Present',
    summary: 'Built and maintain the company’s tool for creating, importing and exporting candidate resumes, with Gemini-powered AI features.',
    tech: ['React 19', 'Node.js', 'Express', 'MongoDB', 'Gemini API', 'Google OAuth', 'Google Drive API'],
    tools: ['Vite', 'Docker Compose', 'Nginx', 'Swagger', 'Git/GitHub'],
    highlights: [
      'Built the full stack: a step-by-step resume form on React with an Express and MongoDB API behind it.',
      'Added resume import that extracts text from PDF and Word files and uses Gemini to fill the form automatically.',
      'Added AI review, matching against job descriptions and resume ranking, with prompts and model settings that admins can change.',
      'Logged every AI call with token usage and estimated cost per model, so admins can track spend.',
      'Exported resumes to PDF and Word in multiple templates, with version history and auto-save.',
      'Secured access with Google sign-in, invite-only accounts and roles; original CVs are saved to Google Drive.',
      'Shipped it with Docker Compose and Nginx.',
    ],
  },
  {
    name: 'Aquiire — eProcurement system',
    short: 'Aquiire', // label on the Work timeline
    period: 'Aug 2023 – Mar 2026',
    summary: 'Long-running eProcurement product where I grew from developer to leading the team.',
    tech: ['Spring Boot', 'Angular 11', 'Hibernate', 'MySQL'],
    tools: ['IntelliJ IDEA', 'Selenium', 'Jenkins', 'Apache Solr', 'Docker'],
    highlights: [
      'Led the development team: assigned work, tracked progress and kept collaboration smooth.',
      'Contributed to the migration to newer Java and Spring Boot versions.',
      'Built end-to-end UI automation tests with Selenium.',
      'Brought Docker, Jenkins, Apache Solr and Snyk into the project workflow.',
      'Resolved production issues directly with the client.',
    ],
  },
  {
    name: 'IAS OMID Test Harness',
    short: 'IAS OMID', // label on the Work timeline
    period: 'Jul 2022 – Aug 2023',
    summary: 'Ad-measurement test apps for mobile and connected TV, one per platform.',
    tech: ['Java', 'Kotlin', 'Swift', 'BrightScript', 'HTML', 'JavaScript'],
    tools: ['Android Studio', 'Xcode', 'Tizen Studio', 'VS Code', 'Charles'],
    highlights: [
      'Built apps for the web (Chrome), Roku, Amazon Fire TV, Apple TV, Samsung TV, Android and iPhone.',
      'Integrated the OMID library for event tracking, logging and performance measurement.',
      'Implemented XML parsing, networking and many ad formats and scenarios on every device.',
      'Kotlin/Java for Android and Fire TV, Swift for Apple platforms, BrightScript for Roku, web stack for Chrome and Samsung.',
    ],
  },
];

// AI work in progress, shown in its own section after Work.
export const aiWork = [
  {
    label: 'Voice and agents',
    title: 'AI agent development',
    tags: ['Syllable AI', 'LangChain', 'RAG', 'Embeddings', 'Voice agents'],
    points: [
      'Built voice-calling agents on Syllable AI with call routing, intent recognition and automated responses.',
      'Built retrieval-augmented generation (RAG) workflows on vector embeddings for better knowledge retrieval.',
      'Experimented with autonomous agents that carry out tasks and hold conversations in real time.',
      'Combining voice, LLMs and workflow automation into end-to-end flows for real-world use cases.',
    ],
  },
  {
    label: 'Automation',
    title: 'LLM-driven workflows',
    tags: ['n8n', 'OpenAI APIs', 'Vector databases', 'Prompt engineering', 'API integrations'],
    points: [
      'Built n8n workflows that connect WhatsApp and email messaging, CRM actions and LLM-generated replies.',
      'Added vector databases for semantic search, giving agents context-aware replies.',
      'Designed prompts for more accurate and reliable AI responses.',
      'Connected external APIs and automation services into pipelines that run from data ingestion to action.',
    ],
  },
];

// Personal projects, shown in their own section after AI.
export const sideProjects = [
  {
    name: 'Wedding Tone Studio — in-browser photo editor',
    period: 'Aug 2026',
    summary: 'A photo editor for wedding shoots that runs its AI models entirely in the browser.',
    tech: ['TypeScript', 'React', 'Transformers.js', 'ONNX Runtime Web', 'WebGPU'],
    tools: ['Vite'],
    href: 'https://github.com/manavshah123/photo_editor',
    highlights: [
      'Runs Real-ESRGAN super-resolution and LaMa object removal in the browser through ONNX Runtime Web, using WebGPU with a WASM fallback.',
      'Segments faces with a face-parsing model and enhances only skin regions.',
      'Matches a reference edit by learning a colour grade from an original/edited photo pair.',
      'Batch-exports a grade across many photos for consistent wedding albums.',
    ],
  },
  {
    name: 'Resource Management Portal',
    period: 'Dec 2025 – Feb 2026',
    summary: 'Full-stack portal for staffing projects: employees, skills, FTE allocations, forecasting and training.',
    tech: ['Java 21', 'Spring Boot 3', 'Spring Security', 'JPA', 'PostgreSQL', 'React', 'MUI'],
    tools: ['Maven', 'Quartz', 'Swagger/OpenAPI', 'Apache POI', 'iText'],
    href: 'https://github.com/manavshah123/Resource_Management_System',
    highlights: [
      'Tracks FTE-based allocations with availability checks, over-allocation alerts and billable vs non-billable time.',
      'Compares project skill requirements against the team to score skill gaps and recommend training.',
      'Imports projects and users from Zoho Projects over OAuth 2.0.',
      'Secured with JWT and refresh tokens; scheduled reports run on Quartz and export to PDF and Excel.',
    ],
  },
  {
    name: 'Visual Web Scraper',
    period: 'Nov 2025',
    summary: 'Point-and-click web scraper: pick elements on a live page and export the data, no selectors written by hand.',
    tech: ['Python', 'Flask', 'Playwright', 'React'],
    tools: ['Vite', 'Docker'],
    href: 'https://github.com/manavshah123/visual-web-scraper',
    highlights: [
      'Generates selectors automatically as you hover and click elements on the page.',
      'Analyses the page to find data-rich tags, dropping empty tags and redundant containers.',
      'Keeps persistent browser sessions, so login-protected sites only need one sign-in.',
      'Exports the chosen columns to Excel, with your own column names.',
    ],
  },
];

export const skills = [
  { group: 'Languages', items: ['Java', 'Kotlin', 'TypeScript', 'JavaScript', 'Python', 'Swift', 'BrightScript', 'HTML', 'CSS', 'XML'] },
  { group: 'Frameworks', items: ['Spring', 'Spring Boot', 'Hibernate / JPA', 'Jakarta EE', 'REST APIs', 'Angular', 'React', 'Node.js', 'Express', 'Flask'] },
  { group: 'Data and search', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Apache Solr', 'Apache Lucene', 'Vector databases'] },
  { group: 'AI and automation', items: ['Gemini API', 'OpenAI APIs', 'LangChain', 'RAG', 'Syllable AI', 'n8n', 'ONNX Runtime Web'] },
  { group: 'Build and delivery', items: ['Jenkins', 'Docker', 'Gradle', 'Maven', 'SonarQube', 'Nexus', 'Snyk', 'Nginx'] },
  { group: 'Testing and tools', items: ['JUnit', 'Mockito', 'Selenium', 'Selenium Grid', 'Playwright', 'Allure', 'Postman', 'IntelliJ IDEA', 'Android Studio', 'Xcode', 'GitHub', 'Microsoft Azure'] },
];

// Short quotes from managers, clients or colleagues. The section shows once this has entries.
// { quote: '…', name: 'Full Name', role: 'Engineering Manager, Company' }
export const recommendations = [];

export const education = [
  {
    school: 'U.V. Patel College of Engineering, Ganpat University',
    degree: 'B.Tech, Computer Engineering',
    period: '2019 – 2022',
    place: 'Gujarat, India',
  },
  {
    school: 'B.S. Patel Polytechnic, Ganpat University',
    degree: 'Diploma, Computer Engineering',
    period: '2016 – 2019',
    place: 'Gujarat, India',
  },
];
