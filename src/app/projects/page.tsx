"use client";
import React from "react";
import Image from "next/image";

function useIsVisible(ref: React.RefObject<HTMLDivElement | null>) {
  const [isIntersecting, setIntersecting] = React.useState(false);
  React.useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const threshold = isMobile ? 0.2 : 0.75;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return isIntersecting;
}

const projects = [
  {
    title: "Personal Portfolio",
    description:
      "A modern, animated portfolio website built with Next.js, TypeScript, and Tailwind CSS.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "#",
    github: "#",
    role: "Solo Developer",
    challenge:
      "Designing a flexible, easily updatable portfolio with strong personal branding.",
    image: "/portfolio-placeholder.png",
    video: "",
  },
  {
    title: "Freelance Dashboard",
    description:
      "A dashboard for freelancers to manage clients, projects, and invoices.",
    tech: ["React", "Node.js", "MongoDB"],
    link: "#",
    github: "#",
    role: "Full-Stack Developer",
    challenge: "Building a secure, scalable dashboard with real-time updates.",
    image: "/dashboard-placeholder.png",
    video: "",
  },
  {
    title: "Anonymerveille E-Commerce",
    description:
      "A privacy-first e-commerce site for unique goods, with anonymous checkout and real-time chat support.",
    tech: ["Next.js", "Stripe", "Socket.io", "MongoDB"],
    link: "#",
    github: "#",
    role: "Lead Developer",
    challenge: "Integrating real-time chat and secure, anonymous payments.",
    image: "/anonymerveille-placeholder.png",
    video: "",
  },
  // Add more projects here easily
];

function ProjectCard({
  project,
  cardRef,
}: {
  project: (typeof projects)[0];
  cardRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const internalRef = React.useRef<HTMLDivElement>(null);
  const ref = cardRef || internalRef;
  const isVisible = useIsVisible(ref);
  return (
    <div
      ref={ref}
      className={`w-full py-16 px-4 flex justify-center bg-theme transition-opacity ease-in duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="w-full flex flex-col md:flex-row items-center gap-10 card max-w-screen-lg mx-auto p-6 md:p-12 rounded-2xl">
        {/* Left: Image or Video */}
        <div className="flex-1 flex justify-center">
          {project.video ? (
            <video
              src={project.video}
              controls
              className="rounded-2xl shadow-lg object-cover w-full max-w-md"
              style={{ maxHeight: 320 }}
            />
          ) : (
            <Image
              src={project.image}
              alt={project.title + " screenshot"}
              width={480}
              height={320}
              className="rounded-2xl shadow-lg object-cover w-full max-w-md"
            />
          )}
        </div>
        {/* Right: Text Content */}
        <div className="flex-1 flex flex-col justify-center items-start">
          <h2 className="text-4xl font-bold btn-primary mb-4">
            {project.title}
          </h2>
          <p className="text-xl text-theme mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-3 mb-4">
            {project.tech.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 btn-accent rounded text-base font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="text-lg text-theme mb-2">
            <b>Role:</b> {project.role}
          </div>
          <div className="text-lg text-theme mb-4">
            <b>Challenge:</b> {project.challenge}
          </div>
          <div className="flex gap-4 mt-2">
            {project.link && project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 btn-primary rounded font-semibold text-lg"
              >
                Live
              </a>
            )}
            {project.github && project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 btn-accent rounded font-semibold text-lg"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  // Ref for the first project card
  const firstCardRef = React.useRef<HTMLDivElement>(null);
  const firstCardVisible = useIsVisible(firstCardRef);
  return (
    <section className="flex flex-col items-center justify-center w-full bg-theme p-0 overflow-hidden animate-fade-in transition-opacity ease-in duration-700">
      <h1
        className={`text-6xl mt-20 text-theme transition-opacity duration-700 ease-in ${
          firstCardVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        My Projects
      </h1>
      {projects.map((project, idx) =>
        idx === 0 ? (
          <ProjectCard key={idx} project={project} cardRef={firstCardRef} />
        ) : (
          <ProjectCard key={idx} project={project} />
        )
      )}
    </section>
  );
}

// Add fade-in animation
// In globals.css, add:
// @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
// .animate-fade-in { animation: fade-in 1s ease; }
