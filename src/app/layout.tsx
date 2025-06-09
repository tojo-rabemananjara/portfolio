import "./globals.css";
import Navbar, { NavbarLink } from "./components/Navbar";

export const metadata = {
  title: "Tojo Rabemananjara | Portfolio",
  description:
    "Tojo Rabemananjara - Full-Stack Developer, Problem Solver, Mentor. Empowering communities through scalable software.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navLinks: NavbarLink[] = [
    { name: "About Me", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Reach Out", href: "#contact" },
  ];
  return (
    <html lang="en">
      <body>
        <Navbar navLinks={navLinks} resumeUrl="/resume.pdf" />
        <div>{children}</div>
      </body>
    </html>
  );
}
