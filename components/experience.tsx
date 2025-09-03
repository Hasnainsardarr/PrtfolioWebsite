"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BadgeCheck, Briefcase, Users, Award } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 100,
    label: "Client Projects",
    suffix: "+",
  },
  {
    icon: Briefcase,
    value: 4,
    label: "Years Experience",
    suffix: "+",
  },
  {
    icon: Award,
    value: 10,
    label: "Certifications",
    suffix: "+",
  },
];

const experiences = [
  {
    title: "AI Engineer",
    company: "DotLabs",
    period: "Jun 2025 - Present",
    description:
      "Working as an AI Engineer, building end-to-end AI solutions including Retrieval-Augmented Generation (RAG) systems, chatbot development, and model integration. Contributed to projects involving LangChain, LangGraph, multimodal embeddings, and backend engineering to deliver production-ready AI applications.",
  },

  {
    title: "Frontend Engineer",
    company: "GoManzanas",
    period: "Jan 2025 - Jun 2025",
    description:
      "Worked remotely as a full-time frontend engineer for a US-based company, developing ace1t.com - an AI-powered platform helping teachers enhance their educational experience through innovative technology solutions.",
  },
  {
    title: "Lead of Machine Learning & Data Analytics",
    company: "DotLabs",
    period: "2024 - Present",
    description:
      "Leading machine learning and data analytics initiatives, developing advanced models,visualizations , and driving data-driven strategies for business growth.",
  },
  // {
  //   title: "Senior Data Analyst",
  //   company: "Tech Company",
  //   period: "2023 - 2024",
  //   description: "Provided deep analytical insights, built data pipelines, and optimized business processes through advanced data modeling and visualization.",
  // },
  {
    title: "Freelance Data Analyst",
    company: "Self-Employed",
    period: "2023 - Present",
    description:
      "Collaborated with multiple clients worldwide, delivering data-driven solutions, dashboard development, and predictive analytics to enhance decision-making.",
  },
  {
    title: "Junior Data Analyst",
    company: "DevComs",
    period: "2022 - 2023",
    description:
      "Assisted in data processing, report generation, and visualization, supporting business intelligence and strategic decision-making.",
  },
];

function CountUpNumber({
  target,
  inView,
}: {
  target: number;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const countUpDuration = 2000; // 2 seconds
  const framesPerSecond = 60;
  const incrementPerFrame =
    target / ((countUpDuration / 1000) * framesPerSecond);

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        if (countRef.current < target) {
          countRef.current = Math.min(
            countRef.current + incrementPerFrame,
            target
          );
          setCount(Math.floor(countRef.current));
        } else {
          clearInterval(interval);
        }
      }, 1000 / framesPerSecond);

      return () => clearInterval(interval);
    }
  }, [inView, target, incrementPerFrame]);

  return <>{count}</>;
}

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-20">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
          <p className="text-gray-300">
            Years of building <strong>AI software solutions</strong> and{" "}
            <strong>machine learning models</strong> that have driven over{" "}
            <strong>$0.6M</strong> growth for businesses.
          </p>
        </motion.div>

        {/* Stats Section */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative p-8 rounded-lg bg-muted/50"
            >
              <div className="flex flex-col items-center">
                <div className="mb-4 p-3 rounded-full bg-primary/10">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-4xl font-bold mb-2 tabular-nums">
                  <CountUpNumber target={stat.value} inView={isInView} />
                  {stat.suffix}
                </h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Experience Timeline */}
        <div className="max-w-3xl mx-auto">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative pl-8 pb-12 last:pb-0"
            >
              {/* Timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

              {/* Timeline dot */}
              <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-primary" />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{experience.title}</h3>
                  <BadgeCheck className="w-5 h-5 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground">
                  {experience.company} • {experience.period}
                </div>
                <p className="text-muted-foreground">
                  {experience.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
