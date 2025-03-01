"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import {
  BarChart2,
  Database,
  Brain,
  Code2,
  TableProperties,
  FileSpreadsheet,
  PiIcon as Python,
  MessagesSquare,
} from "lucide-react"

const skills = [
  {
    icon: BarChart2,
    title: "Power BI and Tableau",
    description: "for data visualization",
  },
  {
    icon: Database,
    title: "SQL",
    description: "Structured Query Language",
  },
  {
    icon: FileSpreadsheet,
    title: "Microsoft Excel",
    description: "Advanced Data Analysis",
  },
  {
    icon: Python,
    title: "Pyhton & R",
    description: "Python For Advanced EDA",
  },
  {
    icon: Brain,
    title: "Machine Learning",
    description: "AI & Predictive Modeling",
  },
  {
    icon: TableProperties,
    title: "Data Scraping",
    description: "Web Data Extraction",
  },
  {
    icon: MessagesSquare,
    title: "Chatbot Creation",
    description: "AI-Powered Conversations",
  },
  {
    icon: Code2,
    title: "MERN Stack",
    description: "Full Stack Development",
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
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-60 h-64 relative rounded-2xl overflow-hidden border-4 border-primary/10"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MyBnWPic.jpg-AuGDsNn7SdD3lgZlSS2w1iJw3pepyQ.jpeg"
                alt="Profile Picture"
                fill
                className="object-cover object-[50%_20%]"
                priority
              />
            </motion.div>
            <p className="text-lg text-muted-foreground text-left">
            I'm a data analyst and software engineer passionate about transforming data into insights. Skilled in Power BI, Python, and software development, I build dashboards, clean data, and create efficient solutions to drive informed decisions.
            </p>
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
                {skill.isDoubleIcon ? (
                  <div className="flex items-center gap-2 w-full justify-center">
                    {skill.icons?.map((icon, i) => (
                      <div key={i} className="w-6 h-6 relative">
                        <Image src={icon.src || "/placeholder.svg"} alt={icon.alt} fill className="object-contain" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <skill.icon className="w-6 h-6" />
                )}
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

