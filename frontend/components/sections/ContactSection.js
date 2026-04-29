'use client';

import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!form.name || !form.email || !form.message) {
      return "All fields are required";
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email)) {
      return "Invalid email format";
    }

    if (form.message.length < 3) {
      return "Message too short";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    try {
      await fetch("https://script.google.com/macros/s/AKfycbyvvWeekEiDk4divOlnRzLgVgAI5DXI60p1pMcyB8xfgdQcPxZHcF0GD0hme5DUFbmx/exec", {
        method: "POST",
        body: JSON.stringify(form),
      });

      setSuccess(true);
      setForm({ name: "", email: "", message: "" });

      setTimeout(() => setSuccess(false), 3000);

    } catch {
      setError("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="review"
      className="contact-bg min-h-screen flex items-center justify-center px-4 py-20"
    >
      <div className="w-full max-w-4xl mx-auto bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10">

        <div className="text-center mb-10 max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            User Review
          </h2>
          <p className="text-white/60 text-sm">
            Have a suggestion. Reach out to us.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-md mx-auto w-full"
        >

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            placeholder="Your Name"
            className="bg-white/30 border border-black/30 rounded-lg px-4 py-3 text-sm outline-none"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Your Email"
            className="bg-white/30 border border-black/30 rounded-lg px-4 py-3 text-sm outline-none"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="4"
            placeholder="Your Message"
            className="bg-white/30 border border-black/30 rounded-lg px-4 py-3 text-sm outline-none resize-none"
          />

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`mt-2 py-3 rounded-lg font-semibold transition
            ${loading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-[#BC9CC6] text-white hover:opacity-90"
            }`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

        </form>
      </div>

      {/* SUCCESS POPUP */}
      {success && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-[#BC9CC6] text-black px-6 py-3 rounded-full shadow-lg">
          Message sent successfully
        </div>
      )}
    </section>
  );
}