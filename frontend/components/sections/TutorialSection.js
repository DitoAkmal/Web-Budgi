export default function TutorialPage() {
  return (

<section style={{
        background: "linear-gradient(135deg, #0a0e2a 0%, #1a2060 100%)",
        padding: "100px 64px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 600, margin: "0 auto" }}>
          <p style={{ fontSize: 13, letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: 20 }}>
            Get Started Today
          </p>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontSize: 40, fontWeight: 800,
            color: "#fff", letterSpacing: "-0.02em", marginBottom: 16, lineHeight: 1.15,
          }}>
            Download Budgi Now
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", marginBottom: 40 }}>
            Start managing your finances today
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://play.google.com/store/games?hl=id"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "#fff", color: "#0a0e2a",
                fontFamily: "'Syne', sans-serif", fontWeight: 700,
                fontSize: 13, padding: "14px 28px", borderRadius: 12,
                textDecoration: "none",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d=""/>
              </svg>
              Download APK
            </a>
            <a
              href="#features"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "transparent", color: "#fff",
                fontFamily: "'Syne', sans-serif", fontWeight: 700,
                fontSize: 13, padding: "14px 28px", borderRadius: 12,
                textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
        );
}