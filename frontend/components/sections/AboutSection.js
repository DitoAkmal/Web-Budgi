'use client';

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function AnimatedNumber({ target, inView, suffix = "" }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 30);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <>{val}{suffix}</>;
}

export default function AboutSection() {
  const [sectionRef, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(null);
  const isMobile = useIsMobile();

  const cardStyle = (id) => ({
    borderRadius: 20,
    padding: isMobile ? 20 : 28,
    cursor: "default",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    transform: (!isMobile && hovered === id) ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
    boxShadow: (!isMobile && hovered === id)
      ? "0 20px 48px rgba(0,0,0,0.18)"
      : "0 4px 20px rgba(0,0,0,0.07)",
  });

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: '#f4f6fb',
        minHeight: '100vh',
        padding: isMobile ? '60px 20px' : '80px 64px',
        borderRadius: '32px 32px 0 0',
        marginTop: '-32px',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div style={{
        position: "absolute", top: -80, left: -80,
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "flex-end",
          marginBottom: isMobile ? 32 : 52,
          gap: 16,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}>
          <div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: isMobile ? "clamp(24px, 6vw, 32px)" : "clamp(28px, 4vw, 40px)",
              fontWeight: 900, color: "#0a0e2a", margin: 0,
              letterSpacing: "-0.02em", lineHeight: 1.1,
            }}>
              Understanding
            </h2>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: isMobile ? "clamp(24px, 6vw, 32px)" : "clamp(28px, 4vw, 40px)",
              fontWeight: 900, color: "#3b82f6", margin: 0,
              letterSpacing: "-0.02em", lineHeight: 1.1,
            }}>
              Spending Behavior
            </h2>
          </div>
          <p style={{
            maxWidth: isMobile ? "100%" : 280,
            fontSize: 12, color: "#94a3b8",
            lineHeight: 1.6,
            textAlign: isMobile ? "left" : "right",
            letterSpacing: "0.04em", textTransform: "uppercase",
          }}>
            A look at how people relate their money - and why most lose track
          </p>
        </div>

        {/* Mobile: single column layout */}
        {isMobile ? (
          <div style={{
            display: "flex", flexDirection: "column", gap: 16,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}>
            {/* Card Awareness */}
            <div style={{ ...cardStyle("awareness"), background: "#fff" }}>
              <p style={{ fontSize: 10, letterSpacing: "0.12em", color: "#94a3b8", textTransform: "uppercase", marginBottom: 12 }}>Awareness Gap</p>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 56, color: "#0a0e2a", lineHeight: 1, display: "flex", alignItems: "flex-start", gap: 2 }}>
                <AnimatedNumber target={53} inView={inView} />
                <span style={{ fontSize: 24, marginTop: 6 }}>%</span>
              </div>
              <p style={{ fontSize: 13, color: "#64748b", marginTop: 10, lineHeight: 1.55 }}>
                feel their money disappears without knowing why
              </p>
            </div>

            {/* Card Core Issue */}
            <div style={{
              ...cardStyle("core"),
              background: "#070C2B",
              padding: "28px",
            }}>
              <p style={{ fontSize: 11, letterSpacing: "0.18em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", margin: "0 0 16px" }}>Core Issue</p>
              <div style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 900,
                textTransform: "uppercase", lineHeight: 1.05,
                letterSpacing: "-0.02em",
                fontSize: "clamp(30px, 8vw, 42px)",
                color: "#E5E7EB",
              }}>
                <div>People</div>
                <div>Don&apos;t Lack</div>
                <div style={{ color: "#5B8CFF" }}>Money</div>
                <div>They Lack</div>
                <div style={{ color: "#5B8CFF" }}>Visibility.</div>
              </div>
            </div>

            {/* Card App Avoidance */}
            <div style={{
              ...cardStyle("app"),
              background: "#3b82f6",
              boxShadow: "0 4px 24px rgba(59,130,246,0.25)",
            }}>
              <p style={{ fontSize: 10, letterSpacing: "0.12em", color: "rgba(255,255,255,0.65)", textTransform: "uppercase", marginBottom: 12 }}>App Avoidance</p>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 56, color: "#fff", lineHeight: 1, display: "flex", alignItems: "flex-start", gap: 2 }}>
                <AnimatedNumber target={61} inView={inView} />
                <span style={{ fontSize: 24, marginTop: 6 }}>%</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 10, lineHeight: 1.55 }}>
                have never tracked their finances with an app
              </p>
            </div>

            {/* Card Spending Behavior */}
            <div style={{ ...cardStyle("spending"), background: "#fff" }}>
              <p style={{ fontSize: 10, letterSpacing: "0.12em", color: "#94a3b8", textTransform: "uppercase", marginBottom: 12 }}>Spending Behavior</p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 60, marginBottom: 14 }}>
                {[30, 38, 42, 35, 55, 72, 88].map((h, i) => (
                  <div key={i} style={{
                    flex: 1, height: inView ? `${h}%` : "0%",
                    background: i >= 4 ? "#3b82f6" : "#d1d5db",
                    borderRadius: "4px 4px 0 0",
                    transition: `height 0.8s ease ${0.3 + i * 0.07}s`,
                  }} />
                ))}
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#0a0e2a", marginBottom: 4 }}>Creeping Costs</p>
              <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>
                Small daily expenses quietly compound - most never see it coming
              </p>
            </div>

            {/* Card Tracking Habit */}
            <div style={{ ...cardStyle("tracking"), background: "#fff" }}>
              <p style={{ fontSize: 10, letterSpacing: "0.12em", color: "#94a3b8", textTransform: "uppercase", marginBottom: 12 }}>Tracking Habit</p>
              {[
                { label: "Rely on Memory", val: 87 },
                { label: "Track Consistently", val: 13 },
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: "#64748b", letterSpacing: "0.05em", textTransform: "uppercase" }}>{item.label}</span>
                    <span style={{ fontSize: 11, color: "#94a3b8" }}>{item.val}%</span>
                  </div>
                  <div style={{ height: 6, background: "#f1f5f9", borderRadius: 6, overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: inView ? `${item.val}%` : "0%",
                      background: i === 0 ? "#3b82f6" : "#cbd5e1",
                      borderRadius: 6,
                      transition: `width 1s ease ${0.5 + i * 0.15}s`,
                    }} />
                  </div>
                </div>
              ))}
              <p style={{ fontSize: 14, fontWeight: 700, color: "#0a0e2a", marginBottom: 4, marginTop: 8 }}>Memory Over Data</p>
              <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>
                Most people rely on gut feeling instead of consistent tracking.
              </p>
            </div>
          </div>
        ) : (
          /* Desktop: grid layout */
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "auto auto",
            gap: 16,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}>
            {/* Card 1: Awareness Gap */}
            <div
              style={{ ...cardStyle("awareness"), background: "#fff", gridColumn: "1 / 2", gridRow: "1 / 2" }}
              onMouseEnter={() => setHovered("awareness")}
              onMouseLeave={() => setHovered(null)}
            >
              <p style={{ fontSize: 10, letterSpacing: "0.12em", color: "#94a3b8", textTransform: "uppercase", marginBottom: 16 }}>Awareness Gap</p>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 64, color: "#0a0e2a", lineHeight: 1, display: "flex", alignItems: "flex-start", gap: 2 }}>
                <AnimatedNumber target={53} inView={inView} />
                <span style={{ fontSize: 28, marginTop: 8 }}>%</span>
              </div>
              <p style={{ fontSize: 13, color: "#64748b", marginTop: 14, lineHeight: 1.55 }}>
                feel their money disappears<br />without knowing why
              </p>
            </div>

            {/* Card 2: Spending Behavior */}
            <div
              style={{ ...cardStyle("spending"), background: "#fff", gridColumn: "2 / 3", gridRow: "1 / 2" }}
              onMouseEnter={() => setHovered("spending")}
              onMouseLeave={() => setHovered(null)}
            >
              <p style={{ fontSize: 10, letterSpacing: "0.12em", color: "#94a3b8", textTransform: "uppercase", marginBottom: 16 }}>Spending Behavior</p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 60, marginBottom: 18 }}>
                {[30, 38, 42, 35, 55, 72, 88].map((h, i) => (
                  <div key={i} style={{
                    flex: 1, height: inView ? `${h}%` : "0%",
                    background: i >= 4 ? "#3b82f6" : "#d1d5db",
                    borderRadius: "4px 4px 0 0",
                    transition: `height 0.8s ease ${0.3 + i * 0.07}s`,
                  }} />
                ))}
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#0a0e2a", marginBottom: 6 }}>Creeping Costs</p>
              <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>
                small daily expenses quietly compound -<br />most never see it coming
              </p>
            </div>

            {/* Card 3: Core Issue — spans both rows */}
            <div
              style={{
                ...cardStyle("core"),
                background: "#070C2B",
                gridColumn: "3 / 4",
                gridRow: "1 / 3",
                display: "flex", flexDirection: "column",
                justifyContent: "flex-start",
                padding: "28px", gap: "24px",
                minHeight: 420,
                boxShadow: hovered === "core" ? "0 24px 56px rgba(10,14,42,0.5)" : "0 8px 32px rgba(10,14,42,0.25)",
              }}
              onMouseEnter={() => setHovered("core")}
              onMouseLeave={() => setHovered(null)}
            >
              <p style={{ fontSize: 11, letterSpacing: "0.18em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", margin: 0 }}>Core Issue</p>
              <div style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 900,
                textTransform: "uppercase", lineHeight: 1.05,
                letterSpacing: "-0.02em",
                fontSize: "clamp(34px, 4vw, 48px)",
                color: "#E5E7EB",
              }}>
                <div>People</div>
                <div>Don&apos;t Lack</div>
                <div style={{ color: "#5B8CFF" }}>Money</div>
                <div>They Lack</div>
                <div style={{ color: "#5B8CFF" }}>Visibility.</div>
              </div>
            </div>

            {/* Card 4: App Avoidance */}
            <div
              style={{
                ...cardStyle("app"),
                background: "#3b82f6",
                gridColumn: "1 / 2", gridRow: "2 / 3",
                boxShadow: hovered === "app" ? "0 20px 48px rgba(59,130,246,0.5)" : "0 4px 24px rgba(59,130,246,0.25)",
              }}
              onMouseEnter={() => setHovered("app")}
              onMouseLeave={() => setHovered(null)}
            >
              <p style={{ fontSize: 10, letterSpacing: "0.12em", color: "rgba(255,255,255,0.65)", textTransform: "uppercase", marginBottom: 16 }}>App Avoidance</p>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 64, color: "#fff", lineHeight: 1, display: "flex", alignItems: "flex-start", gap: 2 }}>
                <AnimatedNumber target={61} inView={inView} />
                <span style={{ fontSize: 28, marginTop: 8 }}>%</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 14, lineHeight: 1.55 }}>
                have never tracked their finances<br />with an app
              </p>
            </div>

            {/* Card 5: Tracking Habit */}
            <div
              style={{ ...cardStyle("tracking"), background: "#fff", gridColumn: "2 / 3", gridRow: "2 / 3" }}
              onMouseEnter={() => setHovered("tracking")}
              onMouseLeave={() => setHovered(null)}
            >
              <p style={{ fontSize: 10, letterSpacing: "0.12em", color: "#94a3b8", textTransform: "uppercase", marginBottom: 16 }}>Tracking Habit</p>
              <div style={{ marginBottom: 18 }}>
                {[
                  { label: "Rely on Memory", val: 87 },
                  { label: "Track Consistently", val: 13 },
                ].map((item, i) => (
                  <div key={i} style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 11, color: "#64748b", letterSpacing: "0.05em", textTransform: "uppercase" }}>{item.label}</span>
                      <span style={{ fontSize: 11, color: "#94a3b8" }}>{item.val}%</span>
                    </div>
                    <div style={{ height: 6, background: "#f1f5f9", borderRadius: 6, overflow: "hidden" }}>
                      <div style={{
                        height: "100%",
                        width: inView ? `${item.val}%` : "0%",
                        background: i === 0 ? "#3b82f6" : "#cbd5e1",
                        borderRadius: 6,
                        transition: `width 1s ease ${0.5 + i * 0.15}s`,
                      }} />
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#0a0e2a", marginBottom: 6 }}>Memory Over Data</p>
              <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>
                most people rely on gut feeling instead<br />of consistent tracking.
              </p>
            </div>
          </div>
        )}

        {/* Divider */}
        <div style={{
          height: 1, background: "#d1d5db",
          margin: isMobile ? "40px 0 32px" : "56px 0 48px",
          opacity: inView ? 1 : 0,
          transition: "opacity 0.8s ease 0.5s",
        }} />

        {/* Bottom copy */}
        <div style={{
          maxWidth: 780,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease 0.6s, transform 0.7s ease 0.6s",
        }}>
          <p style={{ fontSize: isMobile ? "clamp(14px, 4vw, 16px)" : "clamp(16px, 2vw, 20px)", fontWeight: 600, color: "#0a0e2a", lineHeight: 1.55, marginBottom: 0 }}>
            Managing money shouldn&apos;t feel complicated.<br />
            Budgi helps you track, understand, and take control of your finances—all in one place.<br />
            By turning everyday transactions into clear insights,{" "}
            <span style={{ color: "#94a3b8", fontWeight: 400 }}>
              Budgi makes it easier to see patterns, stay aware, and make better financial decisions over time.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}