import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import Analytics from "../components/analytics"
import "./globals.css"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portfolio | Ai Engineer",
  description: "Portfolio website showcasing my skills and experience",
  icons: {
    icon: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hlogo-removebg-preview-lM02BbPpemfkB88D5S9pzabzPCVNlx.png",
        href: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hlogo-removebg-preview-lM02BbPpemfkB88D5S9pzabzPCVNlx.png",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-CWSDJTS2DY" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CWSDJTS2DY', { page_path: window.location.pathname });
          `}
        </Script>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <Analytics />
          <main className="relative flex min-h-screen flex-col">
            <ThemeToggle />
            {children}
            <Toaster />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

