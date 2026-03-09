'use client';
import { useState, useEffect } from "react";

export default function WaitlistModal({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";

      const handleEsc = (e) => {
        if (e.key === "Escape") onClose(false);
      };

      window.addEventListener("keydown", handleEsc);

      return () => {
        document.body.style.overflow = "auto";
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [open, onClose]);

  if (!open) return null;

const submit = async () => {
  if (!email.includes("@")) {
    alert("Invalid email");
    return;
  }

  setLoading(true);

  try {
const res = await fetch("/api/waitlist", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ email })
});

const text = await res.text();
console.log("API RESPONSE:", text);

if (!res.ok) {
  throw new Error("Request failed");
}

const data = JSON.parse(text);

    if (data.success) {
      setSuccess(true);
      setEmail("");
    } else {
      alert("Failed to join waitlist");
    }

  } catch (error) {
    console.error("Fetch error:", error);
    alert("Something went wrong");
  }

  setLoading(false);
};

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
        bg-black/60 backdrop-blur-sm px-4 animate-fadeIn"
      onClick={() => onClose()} 
    >
            <div
        onClick={(e) => e.stopPropagation()}
        className="glass p-10 rounded-3xl w-full max-w-md text-center shadow-2xl animate-scaleIn"
      >
        {!success ? (
          <>
            <h2 className="text-2xl font-bold mb-6">
              Join the Waitlist
            </h2>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 mb-6 outline-none focus:ring-2 focus:ring-white/40"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={submit}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-white text-black font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition"
            >
              {loading && (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              )}
              {loading ? "Submitting..." : "Join Now"}
            </button>

            <button
              onClick={() => onClose()}
              className="mt-4 text-sm text-white/60 hover:text-white"
            >
              Cancel
            </button>
          </>
        ) : (
          <div className="py-10">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-500 rounded-full animate-scaleIn">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="mt-6 text-green-400 font-semibold">
              You're on the list 🚀
            </p>
          </div>
        )}
      </div>
    </div>
  );
}