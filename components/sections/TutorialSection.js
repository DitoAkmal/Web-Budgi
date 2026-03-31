'use client';

import useReveal from "../Reveal";

export default function TutorialSection() {
  useReveal();

  const steps = [
    {
      id: 1,
      title: "Input and Set Budget",
      img: "/images/step-1.png",
    },
    {
      id: 2,
      title: "Track and Categories Budget",
      img: "/images/step-2.png",
    },
    {
      id: 3,
      title: "Manage Budget and Goals",
      img: "/images/step-3.png",
    },
  ];

  return (
    <section
      id="tutorial"
      className="tutorial-bg min-h-screen flex flex-col justify-center px-6 py-20"
    >
      {/* Title */}
      <div className="max-w-6xl w-full mx-auto mb-16">
        <h2 className=" text-center text-3xl md:text-4xl font-semibold">
          How It Works Step-by
          <br />
          Step Guide
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative max-w-6xl w-full mx-auto">

        {/* Garis */}
        <div className="hidden md:block absolute border-t border-dashed border-black/40 top-[72px] left-[8%] w-[84%]" />
        {/* Steps */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0">

          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center relative z-10"
            >
              {/* Circle Image */}
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-lg border border-white/30 shadow-lg">
                <img
                  src={step.img}
                  alt="step"
                  className="w-24 md:w-28"
                />
              </div>

              {/* Text Box */}
              <div className="mt-4 px-4 py-2 rounded-lg bg-white/40 border border-white/10">
                <p className="text-sm font-semibold md:text-base text-black">
                  {step.title}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}