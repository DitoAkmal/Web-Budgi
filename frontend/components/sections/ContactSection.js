'use client';
import { useState } from "react";
import Image from "next/image";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.name || !form.email || !form.message) return "All fields are required";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Invalid email format";
    if (form.message.length < 3) return "Message too short";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError(""); setLoading(true);
    try {
      await fetch("https://script.google.com/macros/s/AKfycbyvvWeekEiDk4divOlnRzLgVgAI5DXI60p1pMcyB8xfgdQcPxZHcF0GD0hme5DUFbmx/exec", {
        method: "POST", body: JSON.stringify(form),
      });
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSuccess(false), 3000);
    } catch { setError("Failed to send message"); }
    setLoading(false);
  };

  return (
    <>
      {/* Review / Contact Section */}
      <section id="review" style={{ background: "#f4f6fb", padding: "80px 64px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800,
            textAlign: "center", color: "#0a0e2a", marginBottom: 8,
          }}>User Review</h2>
          <p style={{ textAlign: "center", color: "#94a3b8", fontSize: 14, marginBottom: 40 }}>
            Have a suggestion? Reach out to us.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { name: "name", placeholder: "Your Name", type: "text" },
              { name: "email", placeholder: "Your Email", type: "email" },
            ].map(f => (
              <input
                key={f.name}
                type={f.type}
                name={f.name}
                value={form[f.name]}
                onChange={handleChange}
                placeholder={f.placeholder}
                style={{
                  background: "#fff", border: "1.5px solid #e5e7eb",
                  borderRadius: 12, padding: "14px 18px", fontSize: 14,
                  outline: "none", color: "#0a0e2a",
                  fontFamily: "inherit",
                  transition: "border-color 0.2s",
                }}
                onFocus={e => e.target.style.borderColor = "#3b82f6"}
                onBlur={e => e.target.style.borderColor = "#e5e7eb"}
              />
            ))}
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder="Your Message"
              style={{
                background: "#fff", border: "1.5px solid #e5e7eb",
                borderRadius: 12, padding: "14px 18px", fontSize: 14,
                outline: "none", color: "#0a0e2a", resize: "none",
                fontFamily: "inherit",
                transition: "border-color 0.2s",
              }}
              onFocus={e => e.target.style.borderColor = "#3b82f6"}
              onBlur={e => e.target.style.borderColor = "#e5e7eb"}
            />
            {error && <p style={{ color: "#ef4444", fontSize: 13, textAlign: "center" }}>{error}</p>}
            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? "#94a3b8" : "#0a0e2a",
                color: "#fff", border: "none",
                borderRadius: 12, padding: "14px",
                fontSize: 14, fontWeight: 700, cursor: "pointer",
                fontFamily: "'Syne', sans-serif",
                transition: "background 0.2s",
              }}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
        {success && (
          <div style={{
            position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)",
            background: "#0a0e2a", color: "#fff",
            padding: "12px 28px", borderRadius: 100, fontSize: 14, fontWeight: 600,
            zIndex: 999, boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}>
            Message sent successfully
          </div>
        )}
      </section>

      {/* Footer */}
      <footer style={{
        background: "#004191",
        padding: "60px 64px 40px",
        color: "#fff",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 40, marginBottom: 48 }}>
            {/* Brand */}
            <div>
              <a href="#home" style={{ display: "flex", alignItems: "center", gap: 0, textDecoration: "none" }}>
                <div style={{ position: "relative", width: 30, height: 30 }}>
                  <Image
                    src="/logo.png"
                    alt="Budgi Logo"
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="30px"
                    priority
                  />
                </div>
                <span style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "#fff",
                }}>udgi</span>
              </a>
              <p style={{ fontSize: 13, lineHeight: 1.6, maxWidth: 220, color: "#fff" }}>
                Smart finance tracking for everyone.
              </p>
                <a
                  href="https://play.google.com/store/apps"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center', gap: 12,
                    background: '#000', color: '#fff',
                    padding: '10px 18px',  borderRadius: 12,
                    textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  <img
                    src="/images/android.png"
                    alt="Android"
                    style={{
                    width: 26, height: 26, objectFit: 'contain',
                    }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                    <span
                      style={{
                        fontSize: 10, letterSpacing: '0.08em', color: '#fff',
                      }}
                    >
                      GET IT ON
                    </span>

                    <span
                      style={{
                        fontSize: 16, fontWeight: 600,
                      }}
                    >
                      Google Play
                    </span>
                  </div>
                </a>
              </div>
            {/* Links */}
            <div style={{ display: "flex", gap: 64, flexWrap: "wrap" }}>
              <div>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 16 }}>Product</p>
                {["Features", "Download", "Pricing"].map(l => (
                  <a key={l} href="#" style={{ display: "block", color: "#fff", fontSize: 13, marginBottom: 10, textDecoration: "none" }}>{l}</a>
                ))}
              </div>
              <div>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 16 }}>Company</p>
                {["About", "Contact Us", "FAQ"].map(l => (
                  <a key={l} href="#" style={{ display: "block", color: "#fff", fontSize: 13, marginBottom: 10, textDecoration: "none" }}>{l}</a>
                ))}
              </div>
              <div>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 16 }}>Legal</p>
                {["Privacy Policy", "Terms of Service"].map(l => (
                  <a key={l} href="#" style={{ display: "block", color: "#fff", fontSize: 13, marginBottom: 10, textDecoration: "none" }}>{l}</a>
                ))}
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #fff", paddingTop: 24, textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "#fff" }}>
              Copyright 2026 - Budgi. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}