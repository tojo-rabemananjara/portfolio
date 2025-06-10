import React from "react";
import Image from "next/image";
import { IconType } from "react-icons";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export type Project = {
  title: string;
  description: string;
  tech: string[];
  media: { type: "image" | "video"; src: string }[];
  codeUrl?: string;
  liveUrl?: string | null;
  index?: number;
};

interface ProjectCardProps {
  project: Project;
  techIcons: Record<string, IconType>;
  cardRef?: React.RefObject<HTMLDivElement | null>;
  children?: React.ReactNode;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  techIcons,
  cardRef,
  children,
}) => {
  const internalRef = React.useRef<HTMLDivElement>(null);
  const ref = cardRef || internalRef;
  const [isIntersecting, setIntersecting] = React.useState(false);
  React.useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const threshold = isMobile ? 0.2 : 0.85;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return (
    <div
      ref={ref}
      className={`mx-auto py-8 px-2 flex justify-center bg-theme transition-opacity ease-in duration-700 overflow-x-hidden ${
        isIntersecting ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="w-full max-w-screen-lg flex flex-col md:flex-row items-center gap-x-10 card p-2 md:p-8 rounded-2xl shadow-lg max-w-full">
        {/* Left: Media Carousel + Links */}
        <div className="flex-1 flex flex-col items-center w-full max-w-md ">
          <Swiper
            spaceBetween={16}
            slidesPerView={1}
            className="w-full h-full rounded-2xl max-w-full"
            navigation={{
              nextEl: `.swiper-button-next-${project.index}`,
              prevEl: `.swiper-button-prev-${project.index}`,
            }}
            mousewheel={{ forceToAxis: true }}
            modules={[Navigation, Mousewheel]}
          >
            {project.media.map((media, idx) => (
              <SwiperSlide
                key={idx}
                className="flex justify-center items-center w-full max-w-full"
              >
                {media.type === "video" ? (
                  <video
                    src={media.src}
                    controls
                    className="rounded-2xl shadow-lg object-cover w-full max-h-80 max-w-full"
                  />
                ) : (
                  <Image
                    src={media.src}
                    alt={`${project.title} media ${idx + 1}`}
                    width={480}
                    height={320}
                    className="rounded-2xl shadow-lg object-cover w-full max-h-80 max-w-full"
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Swiper navigation arrows */}
          <div className="flex justify-center gap-8 w-full mt-2 mb-2">
            <button
              className={`swiper-button-prev-${project.index} swiper-nav-btn`}
              aria-label="Previous media"
            >
              <FaChevronLeft />
            </button>
            <button
              className={`swiper-button-next-${project.index} swiper-nav-btn`}
              aria-label="Next media"
            >
              <FaChevronRight />
            </button>
          </div>
          <div className="flex justify-center gap-8 w-full mt-4 mb-2">
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2 text-theme-link hover:text-theme-link-hover text-xl font-medium"
                aria-label="View Code"
              >
                <FaGithub />
                <span>View Code</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent flex items-center gap-2 text-theme-link hover:text-theme-link-hover text-xl font-medium"
                aria-label="Live Preview"
              >
                <FaExternalLinkAlt />
                <span>Live Preview</span>
              </a>
            )}
          </div>
        </div>
        {/* Right: Text Content */}
        <div className="flex-1 flex flex-col justify-center items-start w-full">
          <h2 className="text-2xl md:text-3xl m-auto sb-4">{project.title}</h2>
          <p className="text-lg md:text-xl text-theme mb-4">
            {project.description}
          </p>
          <h3 className="text-lg m-auto text-muted md:text-xl text-theme mb-2">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-3 mb-4 items-center">
            {project.tech.map((tag, i) => {
              const Icon = techIcons[tag];
              return Icon ? (
                <span
                  key={i}
                  className="flex items-center gap-1 px-2 py-1 rounded text-base font-medium"
                >
                  {React.createElement(Icon as React.ElementType, {
                    className: "inline-block text-xl align-middle",
                    style: { color: getTechColor(tag) },
                  })}
                  <span className="ml-1 md:inline font-semibold">
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </span>
                </span>
              ) : (
                <span
                  key={i}
                  className="px-2 py-1 rounded text-base font-medium"
                >
                  {tag}
                </span>
              );
            })}
          </div>
          {/* Children slot for extra info */}
          {children && <div className="mt-4 w-full">{children}</div>}
        </div>
      </div>
    </div>
  );
};

// Helper: Official tech colors
function getTechColor(tag: string) {
  switch (tag) {
    case "nextjs":
      return "#000";
    case "typescript":
      return "#3178c6";
    case "tailwind":
      return "#38bdf8";
    case "react":
      return "#61dafb";
    case "node":
      return "#43853d";
    case "mongodb":
      return "#47A248";
    case "stripe":
      return "#635bff";
    case "socketio":
      return "#010101";
    default:
      return "inherit";
  }
}

export default ProjectCard;
