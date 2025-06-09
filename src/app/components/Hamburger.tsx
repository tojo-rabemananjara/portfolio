import React from "react";

type HamburgerProps = {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Hamburger({ menuOpen, setMenuOpen }: HamburgerProps) {
  return (
    <button
      className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded focus:outline-none relative z-50"
      aria-label="Open menu"
      onClick={() => setMenuOpen((v) => !v)}
    >
      <span
        className="block w-7 h-1 fg-theme rounded transition-all duration-300 mb-1"
        style={{
          transform: menuOpen ? "rotate(45deg) translateY(11px)" : "none",
        }}
      />
      <span
        className={`block w-7 h-1 fg-theme rounded transition-all duration-300 mb-1 ${
          menuOpen ? "opacity-0" : ""
        }`}
      />
      <span
        className="block w-7 h-1 fg-theme rounded transition-all duration-300"
        style={{
          transform: menuOpen ? "rotate(-45deg) translateY(-11px)" : "none",
        }}
      />
    </button>
  );
}
