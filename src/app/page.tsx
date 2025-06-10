"use client";
import React, { useRef, useEffect, useState } from "react";
import Navbar, { NavbarLink } from "./components/Navbar";
import { AboutSection } from "./about/page";
import ProjectsSection from "./projects/page";
import { ContactSection, FooterSection } from "./contact/page";
import { useSectionVisible } from "./hooks/useSectionVisible";
import { HomeSection } from "./components/HomeSection";

const navLinks: NavbarLink[] = [
  { name: "Home", href: "#home" },
  { name: "About Me", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Reach Out", href: "#contact" },
];

type SectionId = "home" | "about" | "projects" | "contact";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}

export default function HomePage() {
  // Refs for each section
  const homeRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  const isMobile = useIsMobile();

  // Visibility for each section
  const homeVisible = useSectionVisible(homeRef, isMobile ? 0.2 : 1);
  const aboutVisible = useSectionVisible(aboutRef, isMobile ? 0.2 : 0.8);
  const projectsVisible = useSectionVisible(projectsRef, isMobile ? 0.1 : 0.3);
  const contactVisible = useSectionVisible(contactRef, isMobile ? 0.1 : 0.5);

  // Track which section is active for nav underline
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  useEffect(() => {
    const inViews: [SectionId, boolean][] = [
      ["home", homeVisible],
      ["about", aboutVisible],
      ["projects", projectsVisible],
      ["contact", contactVisible],
    ];
    const firstInView = inViews.find(([, visible]) => visible);
    if (firstInView && firstInView[0] !== activeSection) {
      setActiveSection(firstInView[0]);
    } else if (!firstInView && activeSection !== "home") {
      setActiveSection("home");
    }
  }, [
    homeVisible,
    aboutVisible,
    projectsVisible,
    contactVisible,
    activeSection,
  ]);
  const sectionRefs: Record<
    SectionId,
    React.RefObject<HTMLDivElement | null>
  > = {
    home: homeRef,
    about: aboutRef,
    projects: projectsRef,
    contact: contactRef,
  };

  const sectionComponents: Record<SectionId, React.ReactNode> = {
    home: <HomeSection />,
    about: <AboutSection />,
    projects: <ProjectsSection />,
    contact: <ContactSection />,
  };

  const inViews: [SectionId, boolean][] = [
    ["home", homeVisible],
    ["about", aboutVisible],
    ["projects", projectsVisible],
    ["contact", contactVisible],
  ];

  // Project card refs and visibility
  const [activeProjectId, setActiveProjectId] = useState<string>("");
  // The projectDropdown can be hardcoded or imported from a config if needed
  const projectDropdown = [
    { title: "Personal Portfolio", id: "project-0" },
    { title: "Freelance Dashboard", id: "project-1" },
    { title: "Anonymerveille E-Commerce", id: "project-2" },
    // Add more if you add more projects
  ];

  return (
    <>
      <Navbar
        navLinks={navLinks}
        resumeUrl="/resume.pdf"
        activeSection={activeSection}
        projectDropdown={projectDropdown}
        activeProjectId={activeProjectId}
      />
      <main className="flex flex-col items-center bg-theme animate-fade-in">
        {inViews.map(([sectionId, visible]) => (
          <section key={sectionId} id={sectionId}>
            <div
              ref={sectionRefs[sectionId]}
              className={`transition-opacity ease-in duration-700 ${
                visible ? "opacity-100" : "opacity-0"
              }`}
            >
              {sectionId === "projects" ? (
                <ProjectsSection onActiveProjectChange={setActiveProjectId} />
              ) : (
                sectionComponents[sectionId]
              )}
            </div>
          </section>
        ))}
        <FooterSection />
      </main>
    </>
  );
}
