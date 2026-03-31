'use client';
import Link from "next/link";

export default function HomeSection() {
  return (
    <section
      id="home"
      className="section-bg home-bg min-h-[calc(100dvh-80px)] pt-[80px] flex items-center justify-cente
        text-center relative px-6"
    >
      <div className="max-w-4xl mx-auto space-y-8">

        <h1
          className="text-4xl  md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight text-black"
        >
          One place to manage
          <br/>
          your money
        </h1>

        <p className="text-black/50 md:text-3xl lg:text-2xl max-w-xl mx-auto">
          All your finances in one place.
          <br/>
Record, organize, and control your money in a simple and practical way.
        </p>

        <div className="flex items-center justify-center gap-6 pt-4">

          <a
             href="https://play.google.com/store/games?hl=id"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-full bg-black text-white font-semibold hover:scale-105 transition shadow-lg"
            >
            Download
            </a>

          <Link
          href="/#about"
          className="text-black/50 hover:text-black transition"
           >
           Learn More
            </Link>
        </div>
      </div>
    </section>
  );
}