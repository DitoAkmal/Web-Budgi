'use client';

import ImageFrame from "@/components/ImageFrame";

export default function HomeSection() {
  return (
    <section
  id="home"
  className="section-bg home-bg min-h-[calc(100dvh-80px)] pt-[80px] flex items-center justify-center relative">
      <div className="grid lg:grid-cols-2 gap-14 items-center w-full">

        <div className="space-y-8">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            One place to
            <br />
            manage, move, and
            <br />
            grow your money
          </h1>

          <p className="text-white/70 max-w-md">
            “Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod”
          </p>

          <div className="flex items-center gap-6">
            <button className="px-8 py-3 rounded-full bg-white text-black
              font-semibold hover:scale-105 transition">
              Get Started
            </button>

            <a className="text-white/60 hover:text-white transition">
              Learn More
            </a>
          </div>
        </div>

        <div className="relative">

          <div className="grid grid-cols-2 gap-6">

            <ImageFrame
              src="/images/stonks.jpg"
              className="h-[300px]"
            />

            <ImageFrame
              src="/images/sink.jpg"
              className="h-[300px]"
            />

            <ImageFrame
              src="/images/no-way.jpg"
              className="col-span-2 h-[400px]"
            />

          </div>
        </div>

      </div>
    </section>
  );
}