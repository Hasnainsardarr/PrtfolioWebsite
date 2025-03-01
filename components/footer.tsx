import { Github, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-12 border-t">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-muted-foreground mb-4 md:mb-0">© 2024. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/Hasnainsardarr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/husnainsardarrr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://instagram.com/hasnainsardarr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

