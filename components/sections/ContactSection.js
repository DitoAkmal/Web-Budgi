'use client';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="contact-bg min-h-screen flex items-center justify-center px-4 py-20"
    >
      <div className="w-full max-w-4xl mx-auto bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10">

        {/* Title */}
        <div className="text-center mb-10 max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            Contact Us
          </h2>
          <p className="text-white/60 text-sm">
            Have questions or suggestion. Reach out to us.
          </p>
        </div>

        {/* Form centered */}
        <form className="flex flex-col gap-4 max-w-md mx-auto w-full">

          <input
            type="text"
            placeholder="Your Name"
            className="bg-white/30 border border-black/30 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#BC9CC6]"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="bg-white/30 border border-black/30 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#BC9CC6]"
          />

          <textarea
            rows="4"
            placeholder="Your Message"
            className="bg-white/30 border border-black/30 rounded-lg px-4 py-3 text-sm outline-none resize-none focus:border-[#BC9CC6]"
          />

          <button
            type="submit"
            className="mt-2 bg-[#BC9CC6] text-black py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Send Message
          </button>

        </form>

      </div>
    </section>
  );
}