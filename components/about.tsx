"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import {
  BarChart2,
  Brain,
  Code2,
  TableProperties,
  PiIcon as Python,
  MessagesSquare,
  Smartphone,
  Bot,
} from "lucide-react"
const skills = [
  {
    icon: Bot,
    title: "LLM Agents",
    description: "Autonomous Task-Solving Systems",
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Applied ML & Predictive Modeling",
  },
  {
    icon: MessagesSquare,
    title: "Chatbots & Voice Agents",
    description: "By LLM Providers",
  },
  {
    icon: BarChart2,
    title: "Data Analytics",
    description: "Power BI, Python, SQL, DBT",
  },
  {
    icon: Code2,
    title: "MERN Stack",
    description: "Web & Backend Development",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "React Native Apps",
  },
  {
    icon: TableProperties,
    title: "Retrieval-Augmented Generation (RAG)",
    description: "LangChain, Vector DBs, Custom Knowledge",
  },
  {
    icon: Brain,
    title: "Hugging Face Transformers",
    description: "NLP Models & Pipelines",
  },
  {
    icon: Bot,
    title: "AI Agents",
    description: "n8n, Memory, Tool Use",
  },
]


export default function About() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center md:justify-end"
            >
              <div className="w-60 h-64 relative rounded-2xl overflow-hidden border-4 border-primary/10 flex-shrink-0">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MyBnWPic.jpg-AuGDsNn7SdD3lgZlSS2w1iJw3pepyQ.jpeg"
                  alt="Profile Picture"
                  fill
                  className="object-cover object-[50%_20%]"
                  priority
                />
              </div>
            </motion.div>
            <div className="flex items-center">
              <p className="text-lg text-muted-foreground text-left">
                I'm an <strong>AI Engineer</strong> with experience designing and deploying <strong>LLM-based AI Agents</strong>, <strong>multi-agent collaboration systems</strong>, and <strong>autonomous task-solving pipelines</strong>. My work focuses on bridging <strong>cutting-edge research</strong> with practical applications ranging from workflow automation, data reasoning, to voice-activated agents.
              </p>

            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg bg-background border"
            >
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4"
                whileHover={{
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                  transition: { duration: 0.2 },
                }}
              >
                <skill.icon className="w-6 h-6" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
              <p className="text-muted-foreground">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

