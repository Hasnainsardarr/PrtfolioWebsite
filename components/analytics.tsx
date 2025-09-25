"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

const GA_MEASUREMENT_ID = "G-CWSDJTS2DY"

function sendPageView(url: string) {
  if (typeof window === "undefined") return
  // @ts-expect-error gtag may not be typed on window
  if (typeof window.gtag !== "function") return
  // @ts-expect-error gtag may not be typed on window
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  })
}

export default function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
    sendPageView(url)
  }, [pathname, searchParams])

  return null
}


