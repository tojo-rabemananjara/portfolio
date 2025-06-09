"use client";
import React, { useRef } from "react";
import { AboutSection } from "./about/page";
import { ProjectsSection } from "./projects/page";
import { ContactSection, FooterSection } from "./contact/page";
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

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(heroRef);
  return (
    <main className="flex flex-col items-center bg-theme animate-fade-in">
      <section id="home">
        <div
          ref={heroRef}
          className={`flex flex-col items-center justify-center w-full bg-theme p-8 transition-opacity ease-in duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="my-20 flex justify-center">
            <Image
              src="/profile-placeholder.png"
              alt="Tojo headshot"
              width={128}
              height={128}
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-6xl mb-3 text-theme">Hi, I&apos;m Tojo</h1>
          <p className="text-2xl text-theme mb-4">Engineer · Artist · Mentor</p>
          <p className="text-lg text-theme mb-5 max-w-[90%] text-center">
            Innovating at the Intersection of Technology, Humanity, and Beauty —
            in Harmony
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="#contact"
              className="px-5 py-2 btn-primary rounded font-semibold text-lg"
            >
              Reach Out
            </a>
            <a
              href="/resume.pdf"
              download
              className="px-5 py-2 btn-primary rounded font-semibold text-lg"
            >
              Resume
            </a>
          </div>
        </div>
      </section>
      <section id="about">
        <AboutSection />
      </section>
      <section id="projects">
        <ProjectsSection />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
      <FooterSection />
    </main>
  );
}
