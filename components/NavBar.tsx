"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/simulation", label: "Simulation" },
  { href: "/explanation", label: "Explanation" },
  { href: "/quiz", label: "Quiz" },
  { href: "/pastpapers", label: "Past Papers" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "rgba(255,250,243,0.82)",
        backdropFilter: "saturate(150%) blur(10px)",
        borderBottom: "1.5px solid rgba(30,35,51,0.09)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "'Nunito', system-ui",
            fontWeight: 800,
            fontSize: 16,
            color: "#1e2333",
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          📐 EdLab Math
        </Link>

        <div style={{ marginLeft: "auto", display: "flex", gap: 4, flexWrap: "wrap" }}>
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "'Inter', system-ui",
                  fontWeight: 600,
                  fontSize: 14,
                  padding: "8px 14px",
                  borderRadius: 12,
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "background .18s ease, color .18s ease",
                  ...(active
                    ? {
                        background: "#fff",
                        color: "#1e2333",
                        border: "1.5px solid rgba(30,35,51,0.12)",
                        boxShadow: "0 1px 3px rgba(30,35,51,.05), 0 3px 10px rgba(30,35,51,.07)",
                      }
                    : {
                        background: "transparent",
                        color: "#64748b",
                        border: "1.5px solid transparent",
                      }),
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
