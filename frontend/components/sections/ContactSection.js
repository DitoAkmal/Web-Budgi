'use client';
import { useState, useEffect } from "react";
import Image from "next/image";

// ─── Legal Modal ─────────────────────────────────────────────────────────────
function LegalModal({ type, onClose }) {
  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const isPrivacy = type === "privacy";

  const privacyContent = [
    {
      heading: "1. Information We Collect",
      body: "We collect information you provide directly to us, such as your name, email address, and financial data you choose to enter into Budgi. We also collect usage data automatically, including device information, log data, and analytics.",
    },
    {
      heading: "2. How We Use Your Information",
      body: "We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and respond to your comments and questions.",
    },
    {
      heading: "3. Data Storage and Security",
      body: "Your data is stored securely using industry-standard encryption. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
    },
    {
      heading: "4. Data Sharing",
      body: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.",
    },
    {
      heading: "5. Your Rights",
      body: "You have the right to access, correct, or delete your personal data at any time. You may also request a copy of the data we hold about you by contacting us at privacy@budgi.app.",
    },
    {
      heading: "6. Cookies",
      body: "We use cookies and similar tracking technologies to track activity on our service and hold certain information to improve your experience. You can instruct your browser to refuse all cookies.",
    },
    {
      heading: "7. Changes to This Policy",
      body: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date.",
    },
    {
      heading: "8. Contact Us",
      body: "If you have any questions about this Privacy Policy, please contact us at privacy@budgi.app or through the contact form on our website.",
    },
  ];

  const termsContent = [
    {
      heading: "1. Acceptance of Terms",
      body: "By downloading, installing, or using Budgi, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our application.",
    },
    {
      heading: "2. Description of Service",
      body: "Budgi is a personal finance tracking application that allows users to record expenses, scan receipts, analyze spending patterns, and split bills with others. The service is provided as-is.",
    },
    {
      heading: "3. User Accounts",
      body: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.",
    },
    {
      heading: "4. Acceptable Use",
      body: "You agree not to use Budgi for any unlawful purpose or in any way that could harm, disable, or impair the service. You may not attempt to gain unauthorized access to any part of the service or its related systems.",
    },
    {
      heading: "5. Financial Data Disclaimer",
      body: "Budgi is a personal finance tracking tool and does not provide financial advice. The information provided within the app is for informational purposes only. Always consult a qualified financial advisor for financial decisions.",
    },
    {
      heading: "6. Intellectual Property",
      body: "All content, features, and functionality of Budgi, including but not limited to text, graphics, logos, and software, are owned by Budgi and are protected by applicable intellectual property laws.",
    },
    {
      heading: "7. Limitation of Liability",
      body: "To the maximum extent permitted by law, Budgi shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.",
    },
    {
      heading: "8. Termination",
      body: "We reserve the right to terminate or suspend your account and access to the service at our sole discretion, without notice, for conduct that we believe violates these Terms of Service.",
    },
    {
      heading: "9. Changes to Terms",
      body: "We reserve the right to modify these Terms of Service at any time. We will provide notice of significant changes. Your continued use of Budgi after such changes constitutes your acceptance of the new terms.",
    },
    {
      heading: "10. Contact",
      body: "For questions about these Terms of Service, contact us at legal@budgi.app.",
    },
  ];

  const content = isPrivacy ? privacyContent : termsContent;
  const title = isPrivacy ? "Privacy Policy" : "Terms of Service";
  const effectiveDate = "Effective Date: January 1, 2026";

  return (
    // Backdrop
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(10, 14, 42, 0.7)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        animation: "fadeInBackdrop 0.2s ease",
      }}
    >
      {/* Modal box */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 24,
          width: "100%",
          maxWidth: 600,
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 32px 80px rgba(0,0,0,0.3)",
          animation: "scaleInModal 0.25s cubic-bezier(0.34,1.56,0.64,1)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "24px 28px 20px",
          borderBottom: "1px solid #f1f5f9",
          flexShrink: 0,
        }}>
          <div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800,
              color: "#0a0e2a", margin: 0, marginBottom: 4,
            }}>
              {title}
            </h2>
            <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>{effectiveDate}</p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 36, height: 36, borderRadius: "50%",
              border: "none", background: "#f1f5f9",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", flexShrink: 0,
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#e2e8f0"}
            onMouseLeave={e => e.currentTarget.style.background = "#f1f5f9"}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div style={{
          overflowY: "auto",
          padding: "24px 28px 32px",
          flex: 1,
        }}>
          <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7, marginBottom: 24 }}>
            {isPrivacy
              ? "Your privacy is important to us. This policy explains how Budgi collects, uses, and protects your personal information."
              : "Please read these Terms of Service carefully before using the Budgi application. These terms govern your use of our service."}
          </p>

          {content.map(({ heading, body }, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <h3 style={{
                fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700,
                color: "#0a0e2a", marginBottom: 6,
              }}>
                {heading}
              </h3>
              <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7, margin: 0 }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          padding: "16px 28px",
          borderTop: "1px solid #f1f5f9",
          flexShrink: 0,
          display: "flex", justifyContent: "flex-end",
        }}>
          <button
            onClick={onClose}
            style={{
              background: "#0a0e2a", color: "#fff",
              border: "none", borderRadius: 10,
              padding: "10px 24px", fontSize: 13, fontWeight: 700,
              cursor: "pointer", fontFamily: "'Syne', sans-serif",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Close
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInBackdrop {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleInModal {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  // null | "privacy" | "terms"
  const [modal, setModal] = useState(null);

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

  const productLinks = [
    { label: "Features", href: "#features" },
    { label: "Download", href: "#home"     },
    { label: "About",    href: "#about"    },
  ];

  const companyLinks = [
    { label: "Contact Us",       href: "#review",  modal: null        },
    { label: "Privacy Policy",   href: null,       modal: "privacy"   },
    { label: "Terms of Service", href: null,       modal: "terms"     },
  ];

  return (
    <>
      {/* Legal modals */}
      {modal && <LegalModal type={modal} onClose={() => setModal(null)} />}

      {/* Wrapper: background matches contact so footer's border-radius has no dark gap behind it */}
      <div style={{ background: "#f4f6fb" }}>

      {/* Contact Section */}
      <section id="review" style={{ padding: "80px 64px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800,
            textAlign: "center", color: "#0a0e2a", marginBottom: 8,
          }}>Contact Us</h2>
          <p style={{ textAlign: "center", color: "#94a3b8", fontSize: 14, marginBottom: 40 }}>
            Have something to say? Reach out to us.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { name: "name",  placeholder: "Your Name",  type: "text"  },
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
                  outline: "none", color: "#0a0e2a", fontFamily: "inherit",
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
                fontFamily: "inherit", transition: "border-color 0.2s",
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
                color: "#fff", border: "none", borderRadius: 12, padding: "14px",
                fontSize: 14, fontWeight: 700, cursor: "pointer",
                fontFamily: "'Syne', sans-serif", transition: "background 0.2s",
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
        borderRadius: "32px 32px 0 0",
        position: "relative",
        zIndex: 2,
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-start", flexWrap: "wrap", gap: 40, marginBottom: 48,
          }}>
            {/* Brand */}
            <div>
              <a href="#home" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
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
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 900, fontSize: 18, letterSpacing: "-0.04em",
                  background: "linear-gradient(90deg, #93c5fd 30%, #0400ff 70%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>udgi</span>
              </a>
              <p style={{ fontSize: 13, lineHeight: 1.6, maxWidth: 220, color: "#fff", marginTop: 8 }}>
                Smart finance tracking for everyone.
              </p>
              <a
                href="https://play.google.com/store/apps"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 12,
                  background: "#000", color: "#fff",
                  padding: "10px 18px", borderRadius: 12,
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.2)",
                  marginTop: 16,
                }}
              >
                <img src="/images/android.png" alt="Android" style={{ width: 26, height: 26, objectFit: "contain" }} />
                <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                  <span style={{ fontSize: 10, letterSpacing: "0.08em", color: "rgba(255,255,255,0.7)" }}>GET IT ON</span>
                  <span style={{ fontSize: 16, fontWeight: 600 }}>Google Play</span>
                </div>
              </a>
            </div>

            {/* Links */}
            <div style={{ display: "flex", gap: 64, flexWrap: "wrap" }}>
              {/* Product */}
              <div>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 16 }}>Product</p>
                {productLinks.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    style={{
                      display: "block", color: "#fff", fontSize: 13,
                      marginBottom: 10, textDecoration: "none",
                      opacity: 0.85, transition: "opacity 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "0.85"}
                  >
                    {label}
                  </a>
                ))}
              </div>

              {/* Company */}
              <div>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 16 }}>Company</p>
                {companyLinks.map(({ label, href, modal: m }) =>
                  m ? (
                    // Privacy Policy and Terms open a modal
                    <button
                      key={label}
                      onClick={() => setModal(m)}
                      style={{
                        display: "block", color: "#fff", fontSize: 13,
                        marginBottom: 10, textDecoration: "none",
                        background: "none", border: "none", padding: 0,
                        cursor: "pointer", textAlign: "left",
                        opacity: 0.85, transition: "opacity 0.2s",
                        fontFamily: "inherit",
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                      onMouseLeave={e => e.currentTarget.style.opacity = "0.85"}
                    >
                      {label}
                    </button>
                  ) : (
                    <a
                      key={label}
                      href={href}
                      style={{
                        display: "block", color: "#fff", fontSize: 13,
                        marginBottom: 10, textDecoration: "none",
                        opacity: 0.85, transition: "opacity 0.2s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                      onMouseLeave={e => e.currentTarget.style.opacity = "0.85"}
                    >
                      {label}
                    </a>
                  )
                )}
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.3)", paddingTop: 24, textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "#fff" }}>
              Copyright 2026 - Budgi. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      </div> {/* end wrapper */}
    </>
  );
}