"use client";

import useReveal from "../Reveal";

export default function TutorialSection() {
  useReveal();

  const steps = [
    {
      id: 1,
      title: "Input and Set Budget",
      desc: "Set your monthly budget easily",
      img: "/images/step-1.png",
    },
    {
      id: 2,
      title: "Track and Categories Budget",
      desc: "Track every transaction clearly",
      img: "/images/step-2.png",
    },
    {
      id: 3,
      title: "Manage Budget and Goals",
      desc: "Control spending and reach goals",
      img: "/images/step-3.png",
    },
  ];

  return (
    <section
      id="tutorial"
      className="tutorial-bg min-h-screen flex flex-col items-center px-6 py-20 gap-12"
    >
      <h2 className="text-2xl md:text-3xl font-semibold text-center reveal">
        How It Works Step by Step
      </h2>

      <div className="flex flex-col gap-10 w-full max-w-4xl">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`reveal flex flex-col md:flex-row items-center gap-6 bg-white/5 p-6 rounded-2xl backdrop-blur-lg ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            <img
              src={step.img}
              alt="step"
              className="w-40 md:w-52"
            />

            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-white/70">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}