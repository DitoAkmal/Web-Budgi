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
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const link = (id) => (
    <a
      href={`#${id}`}
      onClick={() => setMobileOpen(false)}
      className={`relative transition-all duration-300 
      ${active === id ? "text-white" : "text-white/70 hover:text-white"}
      `}
    >
      {id.charAt(0).toUpperCase() + id.slice(1)}

      <span
        className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300
        ${active === id ? "w-full" : "w-0 group-hover:w-full"}
        `}
      />
    </a>
  );

  return (
    <>
      <nav
        className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-500
        px-6 md:px-10 py-4 flex justify-between items-center
        ${scrolled
            ? "bg-black/40 backdrop-blur-xl shadow-lg border-b border-white/10"
            : "bg-transparent"}
        `}
      >
        <a href="#home" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Budgi Logo"
            width={38}
            height={38}
            priority
            className="rounded-md"
          />
          <span className="font-bold text-lg tracking-wide">
            BUDGI
          </span>
        </a>

        {/*  Desktop  */}
        <div className="hidden md:flex items-center gap-8">
          {link("home")}
          {link("about")}
          {link("features")}
          {link("contact")}

          <button
            onClick={() => setOpenModal(true)}
            className="
              px-6 py-2 rounded-full bg-white text-black font-semibold
              hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            Join Waitlist
          </button>
        </div>

        {/* Mobile  */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      <div
        className={`
        fixed inset-0 bg-black/60 backdrop-blur-xl z-40
        flex flex-col items-center justify-center gap-8 text-xl
        transition-all duration-500
        ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      >
        {link("home")}
        {link("about")}
        {link("features")}
        {link("contact")}

        <button
          onClick={() => {
            setOpenModal(true);
            setMobileOpen(false);
          }}
          className="px-8 py-3 rounded-full bg-white text-black font-semibold"
        >
          Join Waitlist
        </button>
      </div>

      <WaitlistModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}