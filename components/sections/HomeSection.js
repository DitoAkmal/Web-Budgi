'use client';

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

        <p className="text-black/50 max-w-xl mx-auto">
          All your finances in one place.
          <br/>
Record, organize, and control your money in a simple and practical way.
        </p>

        <div className="flex items-center justify-center gap-6 pt-4">

          <button
            className="px-8 py-3 rounded-full bg-black text-white font-semibold hover:scale-105 transition shadow-lg "
          >
            Get Started
          </button>

          <a className="text-black/50 hover:text-black transition">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}