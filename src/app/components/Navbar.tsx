"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hamburger from "./Hamburger";
import { FaChevronDown } from "react-icons/fa";

export type NavbarLink = { name: string; href: string };

interface NavbarProps {
  navLinks: NavbarLink[];
  resumeUrl?: string;
  activeSection: string;
  projectDropdown?: { title: string; id: string }[];
  activeProjectId?: string;
}

interface NavLinksProps {
  activeSection: string;
  onLinkClick?: () => void;
  linkClassName?: string;
  resumeClassName?: string;
  navLinks: NavbarLink[];
  resumeUrl?: string;
  projectDropdown?: { title: string; id: string }[];
  activeProjectId?: string;
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const yOffset = -80; // Adjust this value to match your navbar height
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

function NavLinks({
  activeSection,
  onLinkClick,
  linkClassName = "",
  resumeClassName = "",
  navLinks,
  resumeUrl = "/resume.pdf",
  projectDropdown = [],
  activeProjectId = "",
}: NavLinksProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);
  return (
    <>
      {navLinks.map(({ name, href }) => {
        const sectionId = href.replace("#", "");
        const isActive = activeSection === sectionId;
        if (name === "Projects" && projectDropdown.length > 0) {
          return (
            <li key={name} className="relative" ref={dropdownRef}>
              <button
                type="button"
                className={`text-theme link transition-colors duration-200 ease-in-out flex items-center gap-1${
                  isActive ? " link-active" : ""
                } ${linkClassName}`}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setDropdownOpen((v) => !v)}
                onBlur={() => setDropdownOpen(false)}
              >
                {name}
                <span
                  className={`transition-transform mt-1 ${
                    dropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  style={{ fontSize: "0.8em" }}
                >
                  <FaChevronDown />
                </span>
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute left-0 mt-2 w-60 bg-theme shadow-xl rounded-xl z-50 py-3 text-theme"
                    style={{ minWidth: 220 }}
                  >
                    {projectDropdown.map((proj) => (
                      <li key={proj.id}>
                        <button
                          type="button"
                          className={`block w-full text-left pl-4 py-2 font-medium hover:pl-5.5 transition-all duration-150 ${
                            activeProjectId === proj.id
                              ? " underline font-semi-bold link-active text-theme"
                              : ""
                          }`}
                          onClick={() => {
                            scrollToSection(proj.id);
                            setDropdownOpen(false);
                            if (onLinkClick) onLinkClick();
                          }}
                        >
                          {proj.title}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          );
        }
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
          className={`btn-accent rounded font-semibold text-theme ${resumeClassName} whitespace-nowrap max-w-xs flex items-center justify-center text-center`}
          onClick={onLinkClick}
        >
          My Resume
        </a>
      </li>
    </>
  );
}

export default function Navbar({
  navLinks,
  resumeUrl,
  activeSection,
  projectDropdown = [],
  activeProjectId = "",
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b shadow-lg bg-theme">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-3xl transition-all duration-200">
            T
          </div>
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="text-2xl tracking-tight drop-shadow transition-colors duration-200 ease-in-out text-theme"
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
            projectDropdown={projectDropdown}
            activeProjectId={activeProjectId}
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
                    projectDropdown={projectDropdown}
                    activeProjectId={activeProjectId}
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
