"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import Script from "next/script"

export default function Hero() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const [threeLoaded, setThreeLoaded] = useState(false)
  const [vantaLoaded, setVantaLoaded] = useState(false)
  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const [vantaFailed, setVantaFailed] = useState(false) // Track failure state

  useEffect(() => {
    if (!threeLoaded || !vantaLoaded || !vantaRef.current || vantaEffect || vantaFailed) return

    try {
      // @ts-ignore
      const effect = window.VANTA.WAVES({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x101013,
        waveHeight: 20.0,
        waveSpeed: 0.75,
        zoom: 0.75,
      })

      setVantaEffect(effect)
    } catch (error) {
      console.error("Failed to initialize Vanta effect:", error)
      setVantaFailed(true) // If error occurs, show fallback image
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [threeLoaded, vantaLoaded, vantaEffect, vantaFailed])

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        onLoad={() => setThreeLoaded(true)}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js"
        onLoad={() => setVantaLoaded(true)}
      />

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          ref={vantaRef}
          className="absolute inset-0 z-0"
          style={{
            minHeight: "100vh",
            backgroundColor: vantaFailed ? "transparent" : "#101013", // Show fallback only if failed
            backgroundImage: vantaFailed ? "url('/portfoliobg.jpg')" : "none", 
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container px-4 mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 text-white">
              Hello, I am  
              <br />
              Husnain Sardar
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              A Freelance Data Analyst with 3+ years of experience helping businesses thrive with data.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="text-sm text-gray-400"
          >
            Scroll Down
          </motion.div>
        </div>
      </section>
    </>
  )
}
