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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const link = (id) => (
    <a
      href={`#${id}`}
      onClick={() => setMobileOpen(false)}
      className={`relative text-sm transition
      ${active === id ? "text-[#BC9CC6]" : "text-[#BC9CC6]/70 hover:text-white"}`}
    >
      {id.charAt(0).toUpperCase() + id.slice(1)}

      <span
        className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all
        ${active === id ? "w-full" : "w-0 group-hover:w-full"}`}
      />
    </a>
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-4 flex justify-between items-center transition
        ${scrolled
            ? "bg-black/50 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"}`}
      >
        <a href="#home" className="flex items-center gap-3">
          <Image src="/logo.png" alt="logo" width={38} height={38} />
          <span className="font-bold text-lg">BUDGI</span>
        </a>

        {/* desktop */}
        <div className="hidden md:flex items-center gap-8">
          {link("home")}
          {link("about")}
          {link("features")}
          {link("tutorial")}
          {link("review")}

          <button
            onClick={() => setOpenModal(true)}
            className="px-5 py-2 rounded-full bg-white text-black text-sm"
          >
            Join Waitlist
          </button>
        </div>

        {/* mobile button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* mobile dropdown */}
      <div
        className={`fixed top-20 left-0 right-0 z-40 transition-all duration-300
        ${mobileOpen ? "opacity-70 visible" : "opacity-0 invisible"}`}
      >
        <div className="bg-black/95 backdrop-blur-xl px-6 py-6 flex flex-col gap-4 text-center border-t border-white/10">
          
          {link("home")}
          {link("about")}
          {link("features")}
          {link("tutorial")}
          {link("review")}

          <button
            onClick={() => {
              setOpenModal(true);
              setMobileOpen(false);
            }}
            className="mt-2 px-5 py-2 rounded-full bg-white text-black text-sm"
          >
            Join Waitlist
          </button>

        </div>
      </div>

      <WaitlistModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}