"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Github, ExternalLink } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"

// Update the project type to include media type
type Project = {
  title: string
  description: string
  media: {
    type: "image" | "gif"
    url: string
  }
  github: string
  demo: string
  technologies: string[]
}

const projects: Project[] = [
  {
    title: "T20 World Cup 2022 Analytics",
    description: "Analyzed T20 World Cup 2022 data from ESPN Cricinfo, using Python, Pandas, and Power Query for cleaning and transformation. Developed a Power BI dashboard with dynamic insights and player selection based on performance metrics.",
    media: {
      type: "gif",
      url: "/projects/gifs/t20.gif", // Replace with your GIF path
    },
    github: "https://github.com/Hasnainsardarr",
    demo: "https://github.com/Hasnainsardarr",
    technologies: ["Power BI", "Web Scrapping", "Pandas","Power Query" , "DAX"],
  },
  {
    title: "Prepium",
    description: "An all-in-one medical exam preparation platform offering mock exams, study notes, bookmarks, flashcards, and an AI-powered chatbot to assist learners in their journey.",
    media: {
      type: "gif",
      url: "/projects/images/prepiumProject.png", // Replace with your GIF path
    },
    github: "https://github.com/Hasnainsardarr",
    demo: "https://www.prepium.org/",
     
    technologies: ["Next.js", "React Native", "AI Chatbot","Redux" , "Stripe"],
  },
  
  {
    title: "ApneaGuard",
    description: "A machine learning-powered mobile application designed to detect sleep apnea using heart rate and SpO₂ data from smartwatches.",
    media: {
      type: "gif",
      url: "/projects/images/ApneamockupsSS.png", // Replace with your GIF path
    },
    github: "https://github.com/Hasnainsardarr",
    demo: "https://apneaguard.vercel.app/",
     
    technologies: ["Next.js", "React Native","Supabase" , "AWS",  " Scikit-learn", "NumPy", " Matplotlib", "Buisinees Intelligence"],
  },

  {
    title: "MadaddGar",
    description: "A multi-vendor home service platform that enables users to book services while allowing multiple companies to bid on service requests. The system facilitates seamless service management with real-time updates and secure transactions.",
    media: {
      type: "gif",
      url: "/projects/images/madaddgarProject.png", // Replace with your GIF path
    },
    github: "https://github.com/Hasnainsardarr",
    demo: "https://www.madaddgar.com/",
     
    technologies: ["EJS", "React", "Node.js", "REST API", "Socket.io", "Redux"],
  },
  {
    title: "Atliq Hardware Sales Insights Dashboard",
    description: "Analyzed Atliq Hardware sales with Power BI, uncovering trends, regional performance, customer behavior, and top/bottom products for data-driven decisions.",
    media: {
      type: "gif",
      url: "/projects/gifs/atliqPBI.gif", // Replace with your GIF path
    },
    github: "https://github.com/Hasnainsardarr",
    demo: "https://app.powerbi.com/view?r=eyJrIjoiNzQ5NGJkZjUtNzU5Ni00ZjU3LWE4MzMtNzA4ZGJlMDQxZjQ2IiwidCI6IjM1NzJkNGE5LTcxNGQtNGMxNS05NzI5LTg1NzY5NGM1MzI5YiIsImMiOjh9",
     
    technologies: ["Python", "DAX", " Power BI", "Buisinees Intelligence"],
  },
  {
    title: "AskWebAI Chatbot",
    description: "Built AskWebAI, a Next.js 14 chatbot leveraging Meta-Llama-3-8B-Instruct for dynamic, AI-powered website interactions.",
    media: {
      type: "gif",
      url: "/projects/gifs/chatbotgif.gif", // Replace with your GIF path
    },
    github: "https://github.com/Hasnainsardarr/ASK_WEB_AI",
    demo: "https://askwebai.vercel.app/",
 
    technologies: ["Next.js 14", "Meta-Llama-3-8B-Instruct", "Vercel AI SDK", "RAG"],
  },
  {
    title: "Machine Learning Based Home Price Prediction",
    description: "Developed a web app to predict home prices using a machine learning model (sklearn, linear regression). The project includes data cleaning, feature engineering, a Flask API for predictions, and deployment on AWS EC2.",
    media: {
      type: "image",
      url: "/projects/images/priceprediction.png ", // Replace with your image path
    },
    github: "https://github.com/Hasnainsardarr/Real-Estate-Price-Model",
    demo: "http://13.127.81.177:8080/",
    technologies: ["Flask", "AWS", "Scikit-learn", "Pandas"],
  },
  {
    title: "Full-Stack Restaurant Website with MERN Stack",
    description: "A fully functional restaurant website built with MongoDB, Express.js, React.js, and Node.js. It features seamless frontend-backend integration, Firebase authentication, JWT-based access control, an admin panel, payment processing, image hosting, and online food ordering.",
    media: {
      type: "gif",
      url: "/projects/gifs/foodiigif.gif ", // Replace with your image path
    },
    github: "https://github.com/Hasnainsardarr/EatBuddy",
    demo: "https://eatbuddy.vercel.app/",
     
    technologies: ["React.js", "Node.js", "MongoDB", "Express.js", "Firebase","JWT","React Context API / Redux "],
  },
  {
    title: "Super Store Data Analysis Dashboard",
    description: "In this client project, I developed a Power BI dashboard to analyze the sales performance of a super store, revealing that the West region leads with 31.58% of total sales, followed closely by the East. This analysis provided actionable insights that support informed business strategies.",
    media: {
      type: "image",
      url: "/projects/images/superstore.jpg", // Replace with your GIF path
    },
    github: "https://github.com/Hasnainsardarr",
    demo: "https://app.powerbi.com/view?r=eyJrIjoiMzIwNzc4NzMtNzNlMy00ZmU4LWE4MGEtNTU1NjNhNzY2ZjEyIiwidCI6IjM1NzJkNGE5LTcxNGQtNGMxNS05NzI5LTg1NzY5NGM1MzI5YiIsImMiOjh9",
 
    technologies: ["Excel", "Power BI", "DAX" ],
  },
  {
    title: "Vrinda Store Sales Dashboard",
    description: "In this client project, I developed a comprehensive sales dashboard for Vrinda Store using Excel to analyze and visualize online sales data. The dashboard features interactive charts and graphs for real-time tracking of key performance metrics, sales trends, and customer behavior.",
    media: {
      type: "image",
      url: "/projects/images/store.jpg", // Replace with your GIF path
    },
    github: "https://github.com/Hasnainsardarr",
    demo: "https://github.com/Hasnainsardarr",
 
    technologies: ["Excel", "Power BI", "DAX" ],
  },
  {
    title: "QBCC Data Web Scraping",
    description: "In this client project, I developed a web scraping tool using Python and libraries like Beautiful Soup to extract data from the QBCC website for local contractors. This automated solution streamlined the collection of contractor details and licensing status, helping make effective decision.",
    media: {
      type: "image",
      url: "/projects/images/qbcc.png", // Replace with your GIF path
    },
    github: "https://github.com/Hasnainsardarr/DataScrapper-forContractersData",
    demo: "https://github.com/Hasnainsardarr/DataScrapper-forContractersData",
 
    technologies: ["Beautiful Soup", "Pandas", "API Handling:" ],
  },
  {
    title: "Shopify Data Scraping",
    description: "In this client project, I developed a web scraping application using Python and libraries like Scrapy and Selenium to gather data from Shopify stores. The tool focused on extracting product listings, customer reviews, and sales trends, enabling the client to perform competitive and make decisions.",
    media: {
      type: "image",
      url: "/projects/images/shopify.jpg", // Replace with your GIF path
    },
    github: "https://github.com/Hasnainsardarr/Shopify-data-scrapping",
    demo: "https://github.com/Hasnainsardarr/Shopify-data-scrapping",
 
    technologies: ["Beautiful Soup", "Pandas", "API Handling:" ],
  },
  {
    title: "Crypto Dashboard",
    description: "A fully dynamic crypto dashboard built with React and Chakra UI, providing real-time cryptocurrency data, interactive charts, and market trends. Features include price tracking, historical data visualization, and a user-friendly interface for seamless navigation.",
    media: {
      type: "gif",
      url: "/projects/gifs/cryptogif.gif ", // Replace with your image path
    },
    github: "https://github.com/Hasnainsardarr/ReactWorks/tree/main/Cryptoapp/project-6",
    demo: "https://cryptodashboard-react.vercel.app/",
     
    technologies: ["React.js", "Chakra UI", "Data Visualization", "Recharts"],
  },
]

export default function Projects() {
  const [showAll, setShowAll] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(true)
  const displayedProjects = showAll ? projects : projects.slice(0, 5)

  return (
    <section id="projects" className="py-20 bg-muted/50">
      <div className="container px-4 mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-16 text-center"
        >
          Selected Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-video mb-4 overflow-hidden rounded-lg bg-muted">
                <div className={`transition-opacity duration-300 ${isImageLoading ? "opacity-100" : "opacity-0"}`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-primary rounded-full animate-spin border-t-transparent" />
                  </div>
                </div>
                <Image
                  src={project.media.url || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className={`object-cover transition-all duration-300 group-hover:scale-105 ${
                    isImageLoading ? "opacity-0" : "opacity-100"
                  }`}
                  onLoadingComplete={() => setIsImageLoading(false)}
                  unoptimized={project.media.type === "gif"}
                  priority={index < 3}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 text-xs rounded-full bg-primary/10 text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    Repository
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        {projects.length > 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-12 text-center"
          >
            <Button variant="outline" size="lg" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "View More Projects"}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

