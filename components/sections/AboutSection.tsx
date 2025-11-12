"use client";

import { useEffect, useState } from "react";
import { Code, Rocket, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("about");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const highlights = [
    {
      icon: Code,
      title: "Clean & Scalable Code",
      description:
        "I focus on building maintainable and modular architectures using modern technologies like React, Node.js, and TypeScript.",
    },
    {
      icon: Rocket,
      title: "High Performance & Reliability",
      description:
        "Every project I build is optimized for speed, performance, and reliability — ensuring smooth, responsive user experiences.",
    },
    {
      icon: Users,
      title: "Human-Centered Design",
      description:
        "I craft solutions with empathy — translating real-world needs into intuitive, accessible, and visually engaging interfaces.",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile visual */}
            <div
              className={`transition-all duration-1000 delay-200 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl transform rotate-6 shadow-xl"></div>
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden aspect-square flex items-center justify-center shadow-lg">
                  <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-6xl font-bold text-white tracking-wide">
                      JB
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text content */}
            <div
              className={`transition-all duration-1000 delay-400 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Turning Ideas into Impactful Digital Experiences
              </h3>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                I’m{" "}
                <span className="font-semibold text-foreground">Jay Borad</span>
                , a passionate Full-Stack Developer who loves solving real-world
                problems with clean, efficient, and creative solutions. My work
                blends strong technical expertise with a design-driven mindset
                to create applications that not only work beautifully but feel
                effortless to use.
              </p>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Over the past few years, I’ve worked on scalable web and mobile
                projects using technologies like{" "}
                <strong>React, React Native, Node.js, and MongoDB</strong>. I’m
                always exploring new tools, contributing to open-source, and
                helping others learn how to build better software.
              </p>

              <div className="grid grid-cols-1 gap-4">
                {highlights.map((highlight, index) => (
                  <Card
                    key={index}
                    className="p-4 border-2 hover:border-blue-600 transition-all duration-300 hover:shadow-lg group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg group-hover:scale-110 transition-transform">
                        <highlight.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-1">
                          {highlight.title}
                        </h4>
                        <p className="text-muted-foreground">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
