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
    technologies: ["Power BI", "Web Scrapping", "Pandas", "Power Query", "DAX"],
  },
  {
    title: "Prepium AI",
    description: "An all-in-one medical exam preparation platform offering mock exams, study notes, bookmarks, flashcards, and an AI-powered chatbot to assist learners in their journey.",
    media: {
      type: "gif",
      url: "/projects/images/prepiumProject.png", // Replace with your GIF path
    },
    github: "https://github.com/Hasnainsardarr",
    demo: "https://www.prepium.org/",

    technologies: ["Next.js", "React Native", "AI Chatbot", "Redux", "Stripe"],
  },

  {
    title: "ApneaGuard AI",
    description: "A machine learning-powered mobile application designed to detect sleep apnea using heart rate and SpO₂ data from smartwatches.",
    media: {
      type: "gif",
      url: "/projects/images/ApneamockupsSS.png", // Replace with your GIF path
    },
    github: "https://github.com/Hasnainsardarr",
    demo: "https://apneaguard.vercel.app/",

    technologies: ["Next.js", "React Native", "Supabase", "AWS", " Scikit-learn", "NumPy", " Matplotlib", "Buisinees Intelligence"],
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
    title: "AI-Powered Accent Training System",
    description: "Built a custom accent training system for Ace1t.com using Microsoft Speech API and ElevenLabs. The tool analyzes spoken English, evaluates pronunciation and fluency, and provides real-time voice feedback to help users improve their accent.",
    media: {
      type: "gif",
      url: "/projects/gifs/speechgiff.gif", // Replace with your actual media path
    },
    github: "https://github.com/Hasnainsardarr", // Update with specific repo if available
    demo: "https://ace1t.com", // Or direct demo link if applicable
    technologies: ["Python", "Microsoft Speech API", "ElevenLabs", "FastAPI", "Speech Recognition"],
  },
  {
    title: "LLM-Based Automation System for Message Routing",
    description: "Built an AI-powered workflow using n8n, OpenAI, and Google Sheets to automate message processing, intelligent task routing, and real-time response handling through autonomous agents.",
    media: {
      type: "image",
      url: "/projects/images/1flow.jpg", // Replace with your actual media path
    },
    github: "https://github.com/Hasnainsardarr", // Update if you have a repo for it
    demo: "", // Add live demo or video link if available
    technologies: ["n8n", "OpenAI API", "JavaScript", "Webhooks", "Google Sheets"],
  },
  {
    title: "Instagram Follower Scraper Automation",
    description: "Created an automated workflow using n8n to collect Instagram follower data via an external API and log the results into Google Sheets. Includes dynamic looping, status polling, and timed waits for asynchronous data retrieval.",
    media: {
      type: "image",
      url: "/projects/images/2flow.jpg", // Replace with your actual media path
    },
    github: "https://github.com/Hasnainsardarr", // Update if there's a repo
    demo: "", // Add if you have a public-facing version or demo video
    technologies: ["n8n", "HTTP API", "Google Sheets", "Automation", "JavaScript", "Instagram"],
  },
  {
    title: "Automated AI Article Generator",
    description: "Designed an AI-driven content generation system using n8n and OpenAI. It automates writing workflows from Airtable metadata, outlines creation, multi-agent drafting, and personalized article assembly, enabling scalable, high-quality content production.",
    media: {
      type: "image",
      url: "/projects/images/3flow.jpg", // Replace with your actual media path
    },
    github: "https://github.com/Hasnainsardarr", // Add repo if public
    demo: "", // Include if you have a demo or video
    technologies: ["n8n", "OpenAI", "Airtable", "JavaScript", "Content Automation"],
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

    technologies: ["FastAPI", "Meta-Llama-3-8B-Instruct", "LangChain", "RAG", "FAISS", "Vector Embeddings"],
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
                  className={`object-cover transition-all duration-300 group-hover:scale-105 ${isImageLoading ? "opacity-0" : "opacity-100"
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

