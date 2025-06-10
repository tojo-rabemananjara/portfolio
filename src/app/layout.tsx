import "./globals.css";

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
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
