import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Projects from "@/components/projects"
import About from "@/components/about"
import Experience from "@/components/experience"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background pt-16">
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}

