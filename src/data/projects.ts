import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiStripe,
  SiSocketdotio,
} from "react-icons/si";

export const techIcons = {
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  tailwind: SiTailwindcss,
  react: FaReact,
  node: FaNodeJs,
  mongodb: SiMongodb,
  stripe: SiStripe,
  socketio: SiSocketdotio,
  // Add more as needed
};

export const projects = [
  {
    title: "Personal Portfolio",
    description:
      "A modern, animated portfolio website built with Next.js, TypeScript, and Tailwind CSS.",
    tech: ["nextjs", "typescript", "tailwind"],
    media: [
      { type: "image" as const, src: "/profile-placeholder.png" },
      { type: "image" as const, src: "https://placehold.co/480x320/png" },
      {
        type: "video" as const,
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
    codeUrl: "https://github.com/yourusername/portfolio",
    liveUrl: "https://portfolio-demo.example.com",
  },
  {
    title: "Freelance Dashboard",
    description:
      "A dashboard for freelancers to manage clients, projects, and invoices.",
    tech: ["react", "node", "mongodb"],
    media: [
      { type: "image" as const, src: "/dashboard-placeholder.png" },
      { type: "image" as const, src: "https://placehold.co/480x320/jpg" },
      {
        type: "video" as const,
        src: "https://www.w3schools.com/html/movie.mp4",
      },
    ],
    codeUrl: "https://github.com/yourusername/freelance-dashboard",
    liveUrl: "https://dashboard-demo.example.com",
  },
  {
    title: "Anonymerveille E-Commerce",
    description:
      "A privacy-first e-commerce site for unique goods, with anonymous checkout and real-time chat support.",
    tech: ["nextjs", "stripe", "socketio", "mongodb"],
    media: [
      { type: "image" as const, src: "/anonymerveille-placeholder.png" },
      { type: "image" as const, src: "https://placehold.co/480x320/webp" },
      {
        type: "video" as const,
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
    codeUrl: "https://github.com/yourusername/anonymerveille",
    liveUrl: "https://anonymerveille-demo.example.com",
  },
  // Add more projects here easily
];
