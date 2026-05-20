import { Star, Award, TrendingUp, Users, CheckCircle, Zap } from "lucide-react";

const testimonials = [
  {
    quote:
      "Husnain delivered high quality work on short notice. Would gladly hire again.",
    name: "Nasir Majeed",
    role: <span className="text-green-500">Upwork Client</span>,
  },
  {
    quote:
      "One of the few freelancers who actually understands both the technical side and the business outcome. Saved us weeks of work.",
    name: "Steve Wantz",
    role: (
      <>
        Founder, <span className="text-purple-500">Prepium</span>
      </>
    ),
  },
  {
    quote: "Feels like working with a full team in one person.",
    name: "Nick Kepler",
    role: <span className="text-green-500">Upwork Client</span>,
  },
  {
    quote: "Husnain not only meets expectations but exceeds them every time.",
    name: "Mehul Patel",
    role: (
      <>
        Director <span className="text-orange-500">Fiserv</span>, Bank of
        America.
      </>
    ),
  },
  {
    quote: "What stood out was the thinking, not just the coding.",
    name: "Ling Xiao",
    role: (
      <>
        Founder, <span className="text-blue-500">Aceit.com</span>
      </>
    ),
  },
];

const achievements = [
  { text: "IBM certified in Agentic AI", icon: Award },
  { text: "100% Job Success Score on Upwork", icon: Star },
  { text: "Contributed to Aceit.com", icon: Zap },
  { text: "3000+ folowers on linkedIn", icon: TrendingUp },
  { text: "Partnered with Softexlogic", icon: Users },
  { text: "Stanford certified in Machine Learning", icon: Award },
  { text: "Worked Across 6+ Industries", icon: CheckCircle },
];

export default function TrustSection() {
  return (
    <section className="py-5 bg-background overflow-hidden relative border-b">
      <div className="container px-4 md:px-6 mx-auto mb-12 relative z-30">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Trusted by Individuals and Startups
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-8 relative z-10">
        {/* Row 1: Testimonials */}
        <div className="flex overflow-hidden group">
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] gap-4 px-2">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="w-[350px] flex-shrink-0 flex flex-col justify-between rounded-xl border border-border/50 bg-card/50 backdrop-blur-md p-6 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300"
              >
                <p className="text-muted-foreground text-sm italic mb-4 whitespace-normal">
                  "{t.quote}"
                </p>
                <div>
                  <h4 className="font-semibold text-foreground">{t.name}</h4>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Achievements */}
        <div className="flex overflow-hidden group mt-4">
          <div className="flex w-max animate-marquee-reverse group-hover:[animation-play-state:paused] gap-4 px-2">
            {[...achievements, ...achievements].map((a, i) => {
              const Icon = a.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 flex-shrink-0 rounded-full border border-border/50 bg-secondary/30 backdrop-blur-sm px-6 py-3 shadow-sm hover:bg-secondary/50 transition-colors duration-300"
                >
                  <Icon className="w-5 h-5 text-primary" />
                  <span className="font-medium text-sm text-foreground whitespace-nowrap">
                    {a.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Gradients for smooth edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background to-transparent z-20"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background to-transparent z-20"></div>
    </section>
  );
}
