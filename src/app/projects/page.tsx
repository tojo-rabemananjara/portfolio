"use client";
import React, { useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import { projects, techIcons } from "../../data/projects";
import { useProjectRefsAndVisibles } from "../hooks/useProjectRefsAndVisibles";

export interface ProjectsSectionProps {
  onActiveProjectChange?: (id: string) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onActiveProjectChange,
}) => {
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 768 : false;
  const { refs: projectRefs, visibles } = useProjectRefsAndVisibles(
    projects.length,
    isMobil
  );

  useEffect(() => {
    const idx = visibles.findIndex((v) => v);
    if (idx !== -1 && onActiveProjectChange) {
      onActiveProjectChange(`project-${idx}`);
    }
  }, [visibles, onActiveProjectChange]);

  return (
    <section className="flex flex-col items-center justify-center w-full bg-theme p-0 overflow-hidden animate-fade-in transition-opacity ease-in duration-700">
      <h1
        className={`text-6xl z-40 mt-20 text-theme transition-opacity duration-700 ease-in`}
      >
        My Projects
      </h1>
      {projects.map((project, idx) => (
        <div
          id={`project-${idx}`}
          key={idx}
          ref={(ref) => {
            projectRefs.current[idx] = ref;
          }}
        >
          <ProjectCard
            project={{ ...project, index: idx }}
            techIcons={techIcons}
          />
        </div>
      ))}
    </section>
  );
};

export default ProjectsSection;

// Add fade-in animation
// In globals.css, add:
// @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
// .animate-fade-in { animation: fade-in 1s ease; }
