"use client";
import React, { useRef } from "react";
import useInView from "./useInView";

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { inView, outDirection } = useInView(sectionRef);
  let animClass = "fade-slide";
  if (inView) animClass += " in";
  else if (outDirection === "up") animClass += " out-up";
  else if (outDirection === "down") animClass += " out-down";

  return (
    <div
      ref={sectionRef}
      className={`flex flex-col items-center justify-center w-full bg-theme p-8 animate-fade-in ${animClass}`}
    >
      <h1 className="text-6xl mb-3 text-theme">About Me</h1>
      <div className="flex flex-col md:flex-row gap-10 mb-8">
        <ul className="flex-1 space-y-3 text-lg text-theme">
          <li>
            🎓 <b>Computer Engineering Graduate</b>
          </li>
          <li>
            📚 <b>Algebra 2 & Geometry Teacher</b> (2024–2025)
          </li>
          <li>
            💼 <b>Ex-Software Engineer</b> (x2 roles)
          </li>
          <li>
            ✝️ <b>Catholic</b> · Confirmed 03/30/2024
          </li>
          <li>
            🧪 <b>Biology Major</b> @ PGCC
          </li>
        </ul>
        <div className="flex-1 card p-6">
          <h2 className="text-2xl font-semibold btn-primary mb-2">
            Values & Motivation
          </h2>
          <p className="text-theme">
            I believe technology should serve people—especially the overlooked.
            My mission is to create tools that are simple, helpful, and
            accessible to all.
          </p>
        </div>
      </div>
      <p className="text-lg text-theme mb-2">
        Hi! I&apos;m{" "}
        <span className="font-semibold btn-primary">Tojo Rabemananjara</span>, a
        passionate software developer specializing in building beautiful,
        performant, and scalable web applications. I love working with modern
        technologies and am always eager to learn and take on new challenges.
      </p>
      <p className="text-theme">
        My expertise includes TypeScript, React, Next.js, Node.js, and more. I
        enjoy collaborating with teams and clients to create impactful digital
        experiences. When I&apos;m not coding, you&apos;ll find me exploring new
        tech, reading, or hiking.
      </p>
    </div>
  );
}

// Add fade-in animation
// In globals.css, add:
// @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
// .animate-fade-in { animation: fade-in 1s ease; }
