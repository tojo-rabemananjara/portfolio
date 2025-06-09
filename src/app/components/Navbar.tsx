"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hamburger from "./Hamburger";

export type NavbarLink = { name: string; href: string };

interface NavbarProps {
  navLinks: NavbarLink[];
  resumeUrl?: string;
}

interface NavLinksProps {
  activeSection: string;
  onLinkClick?: () => void;
  linkClassName?: string;
  resumeClassName?: string;
  navLinks: NavbarLink[];
  resumeUrl?: string;
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const yOffset = -80; // Adjust this value to match your navbar height
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0]);
  useEffect(() => {
    const handleScroll = () => {
      let found = sectionIds[0];
      const threshold = 100; // px from top of viewport, adjust as needed
      for (let i = 0; i < sectionIds.length; i++) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top - threshold <= 0) {
            found = id;
          } else {
            break;
          }
        }
      }
      setActive(found);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);
  return active;
}

function NavLinks({
  activeSection,
  onLinkClick,
  linkClassName = "",
  resumeClassName = "",
  navLinks,
  resumeUrl = "/resume.pdf",
}: NavLinksProps) {
  return (
    <>
      {navLinks.map(({ name, href }) => {
        const sectionId = href.replace("#", "");
        const isActive = activeSection === sectionId;
        return (
          <li key={name}>
            <button
              type="button"
              className={`text-theme link transition-colors duration-200 ease-in-out${
                isActive ? " link-active" : ""
              } ${linkClassName}`}
              aria-current={isActive ? "page" : undefined}
              onClick={() => {
                scrollToSection(sectionId);
                if (onLinkClick) onLinkClick();
              }}
            >
              {name}
            </button>
          </li>
        );
      })}
      <li>
        <a
          href={resumeUrl}
          download
          className={`btn-accent rounded font-semibold text-theme ${resumeClassName}`}
          onClick={onLinkClick}
        >
          Resume
        </a>
      </li>
    </>
  );
}

export default function Navbar({ navLinks, resumeUrl }: NavbarProps) {
  const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
  const activeSection = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHomeActive = activeSection === "about" || activeSection === "home";

  return (
    <nav className="sticky top-0 z-50 border-b shadow-lg bg-theme">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Go to Home"
            onClick={() => scrollToSection("home")}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-3xl font-bold transition-all duration-200
              ${
                isHomeActive
                  ? "bg-theme text-theme border-2 border-theme ring-2 ring-primary"
                  : "btn-primary"
              }
            `}
            style={{ outline: "none" }}
          >
            T
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className={`text-2xl tracking-tight drop-shadow transition-colors duration-200 ease-in-out text-theme link${
              isHomeActive ? " link-active underline underline-offset-4" : ""
            }`}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            Tojo Rabemananjara
          </button>
        </div>
        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 items-center text-lg font-medium">
          <NavLinks
            activeSection={activeSection}
            navLinks={navLinks}
            resumeUrl={resumeUrl}
          />
        </ul>
        {/* Hamburger for Mobile */}
        <Hamburger menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        {/* Mobile Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/60 z-40 flex justify-end md:hidden"
              onClick={() => setMenuOpen(false)}
            >
              <motion.div
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                exit={{ x: 100 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-64 bg-theme h-full shadow-lg p-8 flex flex-col gap-6"
                onClick={(e) => e.stopPropagation()}
              >
                <ul className="flex flex-col gap-6 text-lg font-medium">
                  <NavLinks
                    activeSection={activeSection}
                    navLinks={navLinks}
                    resumeUrl={resumeUrl}
                    onLinkClick={() => setMenuOpen(false)}
                    resumeClassName=""
                  />
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
