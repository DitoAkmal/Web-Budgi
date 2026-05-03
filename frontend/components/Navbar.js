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
      (entries) => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }); },
      { threshold: 0.4 }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["home", "about", "features"];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, width: "100%", zIndex: 100,
        padding: "0 48px", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "background 0.3s, box-shadow 0.3s",
        background: scrolled ? "rgba(10,14,42,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}>
        {/* Logo */}
        <a href="#home" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <div style={{ position: "relative", width: 30, height: 30 }}>
            <Image
              src="/logo.png"
              alt="Budgi Logo"
              fill
              style={{ objectFit: "contain" }}
              sizes="30px"
              priority
            />
          </div>
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 900,
            fontSize: 18,
            letterSpacing: "-0.04em",
            background: "linear-gradient(90deg, #93c5fd 30%, #0400ff 70%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>udgi</span>
        </a>

        {/* Desktop: nav links + CTA all on the right */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: 36 }}>
          {navLinks.map(id => (
            <a key={id} href={`#${id}`} style={{
              fontSize: 14, fontWeight: active === id ? 600 : 400,
              color: active === id ? "#fff" : "rgba(255,255,255,0.5)",
              textDecoration: "none", transition: "color 0.2s",
            }}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}

          <a
            href="https://play.google.com/store/games?hl=id"
            target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", textDecoration: "none", padding: "8px 4px" }}
          >
            Download App
          </a>

          <button
            onClick={() => setOpenModal(true)}
            style={{
              fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700,
              background: "#3b82f6", color: "#fff", border: "none",
              padding: "9px 20px", borderRadius: 8, cursor: "pointer",
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
        <div style={{
          position: "fixed", top: 60, left: 0, right: 0, zIndex: 99,
          background: "rgba(10,14,42,0.98)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "20px 24px", display: "flex", flexDirection: "column", gap: 20,
        }}>
          {navLinks.map(id => (
            <a key={id} href={`#${id}`} onClick={() => setMobileOpen(false)} style={{
              fontSize: 16, fontWeight: 600,
              color: active === id ? "#fff" : "rgba(255,255,255,0.5)",
              textDecoration: "none",
            }}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
          <button
            onClick={() => { setOpenModal(true); setMobileOpen(false); }}
            style={{
              fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700,
              background: "#3b82f6", color: "#fff", border: "none",
              padding: "12px", borderRadius: 8, cursor: "pointer", marginTop: 8,
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