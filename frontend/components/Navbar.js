'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import WaitlistModal from "./sections/WaitlistModal";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [openModal, setOpenModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["home", "about", "features", "tutorial"];

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 100,
          padding: "16px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.3s",
          background: scrolled
            ? "rgba(10,15,46,0.9)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 22,
            color: "#fff",
          }}
        >
          <Image src="/logo.png" alt="Budgi" width={32} height={32} />
          udgi
        </a>

        {/* Desktop Links */}
        <div
          className="hidden md:flex"
          style={{ alignItems: "center", gap: 36 }}
        >
          {navLinks.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              style={{
                fontSize: 14,
                color: active === id ? "#fff" : "rgba(255,255,255,0.55)",
                textDecoration: "none",
                transition: "color 0.2s",
                fontWeight: active === id ? 600 : 400,
              }}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: 12 }}>
          <a
            href="https://play.google.com/store/games?hl=id"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
              padding: "8px 16px",
              transition: "color 0.2s",
            }}
          >
            Download App
          </a>
          <button
            onClick={() => setOpenModal(true)}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              background: "#3b82f6",
              color: "#fff",
              border: "none",
              padding: "10px 22px",
              borderRadius: 8,
              cursor: "pointer",
              transition: "opacity 0.2s",
            }}
          >
            Try Demo
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            zIndex: 99,
            background: "rgba(10,15,46,0.97)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {navLinks.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: active === id ? "#fff" : "rgba(255,255,255,0.55)",
                textDecoration: "none",
              }}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
          <button
            onClick={() => { setOpenModal(true); setMobileOpen(false); }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              background: "#3b82f6",
              color: "#fff",
              border: "none",
              padding: "12px",
              borderRadius: 8,
              cursor: "pointer",
              marginTop: 8,
            }}
          >
            Try Demo
          </button>
        </div>
      )}

      <WaitlistModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}