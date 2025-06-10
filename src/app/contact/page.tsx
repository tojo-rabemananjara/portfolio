"use client";
import React from "react";

export function ContactSection() {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = React.useState<
    null | "success" | "error" | "loading"
  >(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const smsBody = encodeURIComponent(
    `Hi, this is ${form.name} (${form.email}): ${form.message}`
  );
  const smsHref = `sms:2406606468?body=${smsBody}`;

  return (
    <section className="flex flex-col items-center justify-center w-full bg-theme p-8 transition-opacity duration-1000 ease-in-out">
      <div>
        <h1 className="text-6xl mb-8 text-theme">Reach Out</h1>
        <p className="mb-4 text-lg text-theme text-center">
          You can send me an <b>email</b> or, on mobile, a <b>text message</b>!
          Fill out the form below.
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="p-4 rounded border bg-theme text-theme focus:outline-none text-lg"
            required
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="p-4 rounded border bg-theme text-theme focus:outline-none text-lg"
            required
            value={form.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="p-4 rounded border bg-theme text-theme focus:outline-none text-lg"
            rows={5}
            required
            value={form.message}
            onChange={handleChange}
          />
          <div className="flex flex-col sm:flex-row gap-4 mt-2 justify-center items-center w-full">
            <button
              type="submit"
              className="btn-primary font-semibold py-4 rounded text-lg w-full sm:w-auto"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending..." : "Send Email"}
            </button>
            {/* Show Send Text Message only on mobile */}
            <a
              href={smsHref}
              className="btn-accent font-semibold py-4 rounded text-lg w-full sm:w-auto block sm:hidden text-center"
              style={{ display: isMobile ? undefined : "none" }}
              onClick={() => {
                if (!form.name || !form.email || !form.message) {
                  alert(
                    "Please fill out all fields before sending a text message."
                  );
                }
              }}
            >
              Send Text Message
            </a>
          </div>
          {status === "success" && (
            <div className="text-green-600 text-center">
              Message sent! Thank you for reaching out.
            </div>
          )}
          {status === "error" && (
            <div className="text-red-600 text-center">
              Something went wrong. Please try again.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

// Footer Section
export function FooterSection() {
  return (
    <footer className="w-full bg-theme border-t mt-16 py-8 flex flex-col items-center text-theme text-center text-base">
      <div className="mb-2">
        &copy; {new Date().getFullYear()} Tojo Rabemananjara. All rights
        reserved.
      </div>
      <div className="flex gap-4 mb-2">
        <a
          href="mailto:tojorab@gmail.com"
          className="underline hover:text-blue-600"
        >
          Email
        </a>
        <a
          href="https://github.com/tojorabemananjara"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-600"
        >
          GitHub
        </a>
        <a href="/resume.pdf" className="underline hover:text-blue-600">
          Resume
        </a>
      </div>
      <div className="text-sm text-gray-500">
        Built with Next.js &amp; Tailwind CSS
      </div>
    </footer>
  );
}

// Add fade-in animation
// In globals.css, add:
// @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
// .animate-fade-in { animation: fade-in 1s ease; }
