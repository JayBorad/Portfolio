"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  image: string;
}

export function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);

  const projects: Project[] = [
    {
      title: "Apparel AI – AI-Powered Fashion Visualizer",
      description:
        "An advanced AI-driven platform that generates realistic on-model visuals and videos for garments using Next.js, AWS, and OpenAI models. Includes secure Stripe payments and MongoDB-based content management.",
      technologies: [
        "Next.js",
        "TypeScript",
        "OpenAI API",
        "AWS",
        "MongoDB",
        "Stripe",
        "TailwindCSS",
      ],
      liveUrl: "https://www.apparelai.io/",
      image:
        "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "IPO Control – IPO Insights Dashboard",
      description:
        "A real-time IPO analytics and insights dashboard for tracking live subscriptions, allotments, and performance trends. Built using React, Tailwind, and Sanity CMS for structured financial data management.",
      technologies: ["React", "TailwindCSS", "Sanity CMS", "Chart.js", "Vercel"],
      liveUrl: "https://www.ipocontrol.in/",
      image:
        "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "Suuqa – Local Marketplace (Somalia)",
      description:
        "A full-stack marketplace enabling users to buy, sell, and hire locally with real-time updates via Socket.io. Integrated Firebase for authentication, AWS for media hosting, and Redux for scalable state management.",
      technologies: [
        "React",
        "TailwindCSS",
        "Redux",
        "Firebase",
        "Socket.io",
        "AWS",
      ],
      liveUrl: "https://suuqa.app/",
      image:
        "https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "TradEarth – Indian E-Commerce & Vendor Platform",
      description:
        "An end-to-end marketplace connecting artisans and buyers across India. Features vendor dashboards, real-time messaging, secure payments, and scalable Firebase backend with AWS integration.",
      technologies: [
        "React",
        "TailwindCSS",
        "Redux",
        "Firebase",
        "Socket.io",
        "AWS",
      ],
      liveUrl: "https://tradearth.in/",
      image:
        "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "ActivityKW – Activity Booking & Payment Platform",
      description:
        "A Kuwait-based booking platform inspired by BookMyShow, allowing users to discover, join, and pay for activities. Integrated Firebase for real-time booking, AWS for hosting, and Redux for performance optimization.",
      technologies: [
        "React",
        "TailwindCSS",
        "Redux",
        "Firebase",
        "AWS",
        "Stripe",
      ],
      liveUrl: "https://activitykw.com/dashboards",
      image:
        "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "Attackletics – AI-Driven Fitness Platform",
      description:
        "A fitness training web app integrating OpenAI-powered coaching assistance, custom workout tracking, and real-time analytics — built using Node.js, HTML, CSS, and vanilla JavaScript for optimized performance.",
      technologies: ["Node.js", "HTML", "CSS", "JavaScript", "OpenAI API"],
      liveUrl: "https://app.attackletics.com/",
      image:
        "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && setIsVisible(true)),
      { threshold: 0.1 }
    );

    const section = document.getElementById("projects");
    if (section) observer.observe(section);
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="projects" className="py-20 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full"></div>
            <p className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto">
              A selection of impactful projects showcasing my end-to-end skills —
              from frontend design and backend logic to AI integration and cloud deployment.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className={`group overflow-hidden border-2 hover:border-blue-600 transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Details */}
                <CardHeader>
                  <CardTitle className="text-2xl group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                      asChild
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
