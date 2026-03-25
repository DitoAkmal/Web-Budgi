
'use client';
import Reveal from "../Reveal";

export default function FeaturesSection(){
  return(
    <section id="features" className="section-bg features-gradient min-h-screen flex flex-col items-center justify-center gap-10">
      <Reveal>
        <div className="floating-box reveal w-[70%] text-center">
          Big Floating Box
        </div>
      </Reveal>

      <div className="flex gap-6">
        <div className="w-40 h-40 bg-gray-300 rounded-xl"/>
        <div className="w-40 h-40 bg-gray-300 rounded-xl"/>
        <div className="w-40 h-40 bg-gray-300 rounded-xl"/>
      </div>
    </section>
  )
}