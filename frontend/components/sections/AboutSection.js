export default function AboutPage() {
  return (
    <section id="about"  
        style={{
        background: '#f4f6fb',
        minHeight: '100vh',
        padding: '80px 64px',
      }}
    >
      <div style={{
        background: "#f4f6fb",
        borderRadius: "32px 32px 0 0",
        padding: "64px 64px 80px",
        maxWidth: "100%",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 48, flexWrap: "wrap", gap: 24 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", color: "#3b82f6", textTransform: "uppercase", marginBottom: 8 }}>Understanding</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#0a0e2a", fontFamily: "'Syne', sans-serif", letterSpacing: "-0.02em" }}>Spending Behavior</div>
            </div>
            <p style={{ maxWidth: 260, fontSize: 13, color: "#888", lineHeight: 1.6, textAlign: "right" }}>
              A look at how people relate<br />their money and why most lose track
            </p>
          </div>
 
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {/* Awareness Cap */}
            <div style={{ background: "#fff", borderRadius: 20, padding: 28, boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 11, letterSpacing: "0.08em", color: "#999", textTransform: "uppercase", marginBottom: 16 }}>Awareness Cap</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 52, fontWeight: 900, color: "#0a0e2a", lineHeight: 1 }}>
                53<span style={{ fontSize: 24 }}>%</span>
              </div>
              <p style={{ fontSize: 13, color: "#666", marginTop: 12, lineHeight: 1.5 }}>feel their money disappears without knowing why</p>
            </div>
 
            {/* Spending Behavior */}
            <div style={{ background: "#fff", borderRadius: 20, padding: 28, boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 11, letterSpacing: "0.08em", color: "#999", textTransform: "uppercase", marginBottom: 16 }}>Spending Behavior</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 60, marginBottom: 12 }}>
                {[30, 45, 35, 60, 50, 80, 65].map((h, i) => (
                  <div key={i} style={{
                    flex: 1, height: `${h}%`,
                    background: i >= 4 ? "#3b82f6" : "#e5e7eb",
                    borderRadius: "4px 4px 0 0",
                  }} />
                ))}
              </div>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#0a0e2a", marginBottom: 4 }}>Creeping Costs</p>
              <p style={{ fontSize: 12, color: "#888", lineHeight: 1.4 }}>small daily expenses quietly compound, most never see it coming</p>
            </div>
 
            {/* App Avoidance */}
            <div style={{ background: "#3b82f6", borderRadius: 20, padding: 28 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.08em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", marginBottom: 16 }}>App Avoidance</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 52, fontWeight: 900, color: "#fff", lineHeight: 1 }}>
                61<span style={{ fontSize: 24 }}>%</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 12, lineHeight: 1.5 }}>have never tracked their finances with an app</p>
            </div>
 
            {/* Core Issue */}
            <div style={{ background: "#0a0e2a", borderRadius: 20, padding: 28 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 16 }}>Core Issue</div>
              <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "#fff", lineHeight: 1.3 }}>
                People don&apos;t lack{" "}
                <span style={{ color: "#3b82f6" }}>Money</span>
                <br />they lack{" "}
                <span style={{ color: "#3b82f6" }}>Visibility.</span>
              </p>
            </div>
          </div>
 
          {/* Bottom text */}
          <div style={{ marginTop: 56, maxWidth: 700 }}>
            <p style={{ fontSize: 18, fontWeight: 600, color: "#0a0e2a", marginBottom: 12, lineHeight: 1.5, fontFamily: "'Syne', sans-serif" }}>
              Managing money should not feel complicated.
            </p>
            <p style={{ fontSize: 15, color: "#666", lineHeight: 1.7 }}>
              Budgi helps you track, understand, and take control of your finances all in one place. By turning everyday transactions into clear insights, Budgi makes it easier to see patterns, stay aware, and make better financial decisions over time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const card = {
  background: '#fff',
  borderRadius: 16,
  padding: 24,
};