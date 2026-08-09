const coursesData = [
  {
    id: "fullstack-web-dev",
    title: "Full-Stack Web Development Mastery",
    category: "development",
    shortDescription: "Master HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB. Build 10+ production-grade projects.",
    description: "Go from absolute beginner to a professional full-stack developer. This course covers everything from modern CSS grid layouts to deploying secure backend APIs and managing cloud databases. Designed with industry professionals, you will build portfolio-ready web apps.",
    price: 9999,
    discountPrice: 3499,
    rating: 4.9,
    studentsEnrolled: 1420,
    duration: "65 Hours",
    lecturesCount: 140,
    level: "Beginner to Advanced",
    skills: ["React.js", "Node.js", "Express", "MongoDB", "Tailwind CSS", "REST APIs"],
    syllabus: [
      {
        chapterTitle: "Module 1: Modern Frontend Fundamentals",
        lessons: [
          { title: "HTML5 Semantic Markup & Accessibility", duration: "25 min" },
          { title: "Advanced CSS Layouts (Flexbox, CSS Grid & Variables)", duration: "45 min" },
          { title: "Responsive Web Design & Tailwind CSS Integration", duration: "50 min" },
          { title: "Modern JavaScript (ES6+): Closures, Promises & Async/Await", duration: "1h 15m" }
        ]
      },
      {
        chapterTitle: "Module 2: Interactive Frontends with React",
        lessons: [
          { title: "React Core Concepts: Components, Props & State", duration: "40 min" },
          { title: "Advanced React Hooks (useEffect, useContext, useMemo)", duration: "1h 05m" },
          { title: "State Management with Redux Toolkit", duration: "1h 30m" },
          { title: "Routing and API Integration in React Applications", duration: "55 min" }
        ]
      },
      {
        chapterTitle: "Module 3: Backend & Database Engineering",
        lessons: [
          { title: "Node.js Architecture & Asynchronous Event Loop", duration: "35 min" },
          { title: "RESTful API Development with Express.js", duration: "1h 10m" },
          { title: "MongoDB Schema Design & Mongoose ODM", duration: "1h 20m" },
          { title: "JSON Web Tokens (JWT) Authentication & Security", duration: "45 min" }
        ]
      },
      {
        chapterTitle: "Module 4: Deployment & Real-World Projects",
        lessons: [
          { title: "Creating a MERN Stack E-commerce Application", duration: "2h 15m" },
          { title: "Building a Real-Time Chat App with Socket.io", duration: "1h 50m" },
          { title: "Dockerizing Web Apps & Deploying to AWS", duration: "1h 10m" }
        ]
      }
    ]
  },
  {
    id: "ai-data-science",
    title: "AI & Data Science Professional Boot Camp",
    category: "data-science",
    shortDescription: "Learn Python, NumPy, Pandas, Scikit-Learn, TensorFlow, and Deep Learning. Analyze data and build AI models.",
    description: "Deep dive into data science and artificial intelligence. Learn how to scrape data, perform statistical analysis, visualize trends, and design deep neural networks for prediction and computer vision. Includes real-world capstone datasets.",
    price: 11999,
    discountPrice: 3999,
    rating: 4.8,
    studentsEnrolled: 980,
    duration: "55 Hours",
    lecturesCount: 110,
    level: "Intermediate",
    skills: ["Python", "Pandas", "Scikit-Learn", "TensorFlow", "Data Visualization", "Neural Networks"],
    syllabus: [
      {
        chapterTitle: "Module 1: Advanced Python & Data Analysis",
        lessons: [
          { title: "Python for Data Science: Arrays & Vectorized Ops", duration: "35 min" },
          { title: "Data Wrangling and Cleaning with Pandas", duration: "1h 15m" },
          { title: "Exploratory Data Analysis & Visualization (Matplotlib, Seaborn)", duration: "55 min" }
        ]
      },
      {
        chapterTitle: "Module 2: Machine Learning Algorithms",
        lessons: [
          { title: "Supervised Learning: Regression & Classification", duration: "1h 10m" },
          { title: "Unsupervised Learning: Clustering & Dimensionality Reduction", duration: "1h 05m" },
          { title: "Model Evaluation, Cross-Validation & Hyperparameter Tuning", duration: "50 min" }
        ]
      },
      {
        chapterTitle: "Module 3: Deep Learning & Computer Vision",
        lessons: [
          { title: "Introduction to Neural Networks & Backpropagation", duration: "45 min" },
          { title: "Building CNNs for Image Classification using TensorFlow", duration: "1h 25m" },
          { title: "Natural Language Processing (NLP) & Sentiment Analysis", duration: "1h 10m" }
        ]
      }
    ]
  },
  {
    id: "devops-cloud",
    title: "DevOps & Cloud Infrastructure Engineer",
    category: "devops",
    shortDescription: "Master Docker, Kubernetes, AWS, Terraform, CI/CD pipelines, and Linux administration from scratch.",
    description: "Modern software relies on automated deployment. Learn the complete DevOps lifecycle, from continuous integration (CI) using GitHub Actions to container orchestration via Kubernetes on AWS EKS, and Infrastructure as Code with Terraform.",
    price: 12999,
    discountPrice: 4299,
    rating: 4.9,
    studentsEnrolled: 820,
    duration: "48 Hours",
    lecturesCount: 95,
    level: "Intermediate to Advanced",
    skills: ["Docker", "Kubernetes", "Terraform", "AWS", "GitHub Actions", "Linux bash"],
    syllabus: [
      {
        chapterTitle: "Module 1: Linux Administration & Shell Scripting",
        lessons: [
          { title: "Linux File System & User Management", duration: "30 min" },
          { title: "Bash Shell Scripting & Automation Utilities", duration: "45 min" },
          { title: "Networking Essentials & SSH Configuration", duration: "40 min" }
        ]
      },
      {
        chapterTitle: "Module 2: Containers & Orchestration",
        lessons: [
          { title: "Docker Deep Dive: Image Creation & Multi-stage Builds", duration: "1h 15m" },
          { title: "Docker Compose for Multi-Container Apps", duration: "45 min" },
          { title: "Kubernetes Core Concepts: Pods, Services, & Deployments", duration: "1h 35m" },
          { title: "Kubernetes Production Clusters: Helm & Ingress Controllers", duration: "1h 10m" }
        ]
      },
      {
        chapterTitle: "Module 3: Infrastructure as Code & CI/CD",
        lessons: [
          { title: "Terraform Fundamentals: Providers, Resources, & State", duration: "1h 20m" },
          { title: "Setting up CI/CD with GitHub Actions", duration: "50 min" },
          { title: "Monitoring & Logging: Prometheus, Grafana, and ELK Stack", duration: "1h 15m" }
        ]
      }
    ]
  },
  {
    id: "python-automation",
    title: "Python Automation & Scripting Specialist",
    category: "programming",
    shortDescription: "Automate boring tasks. Learn web scraping, API scraping, Excel automation, and build automated desktop apps.",
    description: "Unleash the full power of scripting. Learn how to write scripts that read and write files, extract data from websites, automate web browser workflows, work with PDFs and Excel sheets, and schedule automation jobs.",
    price: 7999,
    discountPrice: 2499,
    rating: 4.7,
    studentsEnrolled: 1650,
    duration: "38 Hours",
    lecturesCount: 80,
    level: "Beginner Friendly",
    skills: ["Python", "BeautifulSoup", "Selenium", "OpenPyXL", "PyQt5", "Automation Scripts"],
    syllabus: [
      {
        chapterTitle: "Module 1: Python Basics & File Handling",
        lessons: [
          { title: "Python Essentials: Data Types & Control Flow", duration: "30 min" },
          { title: "Working with Files (Text, JSON, CSV) & Exception Handling", duration: "40 min" },
          { title: "Regular Expressions (Regex) for Text Parsing", duration: "35 min" }
        ]
      },
      {
        chapterTitle: "Module 2: Web Automation & Scraping",
        lessons: [
          { title: "Requesting APIs & JSON Parsing in Python", duration: "45 min" },
          { title: "Web Scraping HTML with BeautifulSoup", duration: "1h 05m" },
          { title: "Automating Browsers & Form Submission with Selenium", duration: "1h 25m" }
        ]
      },
      {
        chapterTitle: "Module 3: Document Automation & UI",
        lessons: [
          { title: "Automating Excel Workbooks & PDF Parsing", duration: "55 min" },
          { title: "Building Graphical User Interfaces (GUIs) with PyQt5", duration: "1h 15m" },
          { title: "Scheduling Scripts & Setting up Cron Jobs/Windows Task Scheduler", duration: "40 min" }
        ]
      }
    ]
  }
];

// Exporting so that other scripts can read it
if (typeof module !== 'undefined' && module.exports) {
  module.exports = coursesData;
}
