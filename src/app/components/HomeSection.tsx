import React from "react";
import Image from "next/image";

export function HomeSection() {
  return (
    <section className="flex flex-col items-center justify-center w-full bg-theme p-8 transition-opacity duration-1000 ease-in-out">
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
        Innovating at the Intersection of Technology, Humanity, and Beauty — in
        Harmony
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
          My Resume
        </a>
      </div>
    </section>
  );
}
