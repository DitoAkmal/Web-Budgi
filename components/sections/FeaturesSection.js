'use client';

import { useEffect, useRef, useState } from "react";

export default function FeaturesSection() {
  const [active, setActive] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollRef = useRef(null);
  const velocity = useRef(0);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const tabs = [
    { id: 1, label: "Tracking" },
    { id: 2, label: "Analytics" },
    { id: 3, label: "Budgeting" },
    { id: 4, label: "Goals" },
  ];

  const images = {
    1: ["/images/f1.png", "/images/f2.png", "/images/f3.png"],
    2: ["/images/f4.png", "/images/f5.png", "/images/f6.png"],
    3: ["/images/f7.png", "/images/f8.png", "/images/f9.png"],
    4: ["/images/f10.png", "/images/f11.png", "/images/f12.png"],
  };

  const base = images[active];
  const data = [...base, ...base, ...base]; // infinite loop

  const cardWidth = 300;

  // SET AWAL KE TENGAH
  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.scrollLeft = base.length * cardWidth;
    }
  }, [active]);

  // LOOP HANDLER
  const handleLoop = () => {
    const container = scrollRef.current;
    const total = base.length * cardWidth;

    if (container.scrollLeft <= 0) {
      container.scrollLeft = total;
    }

    if (container.scrollLeft >= total * 2) {
      container.scrollLeft = total;
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleLoop);
    return () => container.removeEventListener("scroll", handleLoop);
  }, [active]);

  // SNAP
  const snapToCard = () => {
    const container = scrollRef.current;

    const index = Math.round(container.scrollLeft / cardWidth);
    const realIndex = index % base.length;

    container.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });

    setCurrentIndex(realIndex);
  };

  // MOMENTUM
  const momentumScroll = () => {
    const container = scrollRef.current;

    const step = () => {
      if (Math.abs(velocity.current) < 0.1) {
        snapToCard();
        return;
      }

      container.scrollLeft += velocity.current;
      velocity.current *= 0.95;

      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  // DRAG
  useEffect(() => {
    const container = scrollRef.current;

    const onDown = (e) => {
      isDown.current = true;
      startX.current = e.pageX || e.touches[0].pageX;
      scrollLeft.current = container.scrollLeft;
      velocity.current = 0;
    };

    const onMove = (e) => {
      if (!isDown.current) return;

      const x = e.pageX || e.touches[0].pageX;
      const walk = x - startX.current;

      velocity.current = -walk * 0.1;
      container.scrollLeft = scrollLeft.current - walk;
    };

    const onUp = () => {
      if (!isDown.current) return;
      isDown.current = false;
      momentumScroll();
    };

    container.addEventListener("mousedown", onDown);
    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseup", onUp);
    container.addEventListener("mouseleave", onUp);

    container.addEventListener("touchstart", onDown);
    container.addEventListener("touchmove", onMove);
    container.addEventListener("touchend", onUp);

    return () => {
      container.removeEventListener("mousedown", onDown);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseup", onUp);
      container.removeEventListener("mouseleave", onUp);

      container.removeEventListener("touchstart", onDown);
      container.removeEventListener("touchmove", onMove);
      container.removeEventListener("touchend", onUp);
    };
  }, [active]);

  // BUTTON
  const scrollNext = () => {
    scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
  };

  const scrollPrev = () => {
    scrollRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
  };

  return (
    <section className="features-bg min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-6xl bg-[#b79bbd] rounded-3xl p-8 md:p-12">

        <h2 className="text-center text-2xl md:text-3xl font-semibold mb-8">
          Smart Features
        </h2>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-6 py-2 rounded-full text-sm
              ${
                active === tab.id
                  ? "bg-white text-black"
                  : "border border-white/40 text-white/70"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="relative">

          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white text-black px-3 py-2 rounded-full"
          >
            ‹
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-scroll no-scrollbar cursor-grab active:cursor-grabbing"
          >
            {data.map((src, i) => (
              <img
                key={i}
                src={src}
                draggable={false}
                className="min-w-[260px] md:min-w-[300px] h-[200px] md:h-[260px] object-cover rounded-2xl"
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white text-black px-3 py-2 rounded-full"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}