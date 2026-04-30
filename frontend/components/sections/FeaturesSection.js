'use client';

export default function FeaturesSection() {
  const features = [
    {
      id: 1,
      title: "Track Your Money Record",
      subtitle: "Income & Expenses in one place",
      preview: (
        <div style={{ background: "#0a0e2a", borderRadius: 12, padding: 16, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Balance</p>
          <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: 8 }}>
            Rp 500.000
            <span style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(59,130,246,0.3)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="3"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
            </span>
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: "Understand Spending",
      subtitle: "Trends & categories at a glance",
      preview: (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ position: "relative", width: 80, height: 80 }}>
            <svg viewBox="0 0 80 80" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
              <circle cx="40" cy="40" r="30" fill="none" stroke="#e5e7eb" strokeWidth="12" />
              <circle cx="40" cy="40" r="30" fill="none" stroke="#3b82f6" strokeWidth="12" strokeDasharray="188.4" strokeDashoffset="56.5" />
              <circle cx="40" cy="40" r="30" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray="188.4" strokeDashoffset="132" />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: 9, color: "#999" }}>Total</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#0a0e2a" }}>Value</div>
            </div>
          </div>
          <div style={{ marginLeft: 16 }}>
            {[
              { label: "Expense", color: "#3b82f6" },
              { label: "Income", color: "#10b981" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: item.color }} />
                <span style={{ fontSize: 11, color: "#555" }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Scan & Log",
      subtitle: "Snap a receipt, done in seconds.",
      preview: (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{
            width: 100, height: 130, borderRadius: 16,
            border: "2px dashed #d1d5db", display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column", gap: 8,
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="3"/>
              <path d="M3 9h18M9 3v18"/>
            </svg>
            <span style={{ fontSize: 10, color: "#94a3b8" }}>Scan receipt</span>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: "Split Bills Easily",
      subtitle: "Share expenses with friends and track who owes what",
      preview: (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 16px 16px" }}>
          <div style={{ background: "#f8fafc", borderRadius: 12, padding: 14 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#0a0e2a", marginBottom: 10 }}>Add Friend & Assign Order</p>
            <p style={{ fontSize: 10, color: "#94a3b8", marginBottom: 12 }}>Add and select your friend to assign the order</p>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {["#f87171", "#a78bfa", "#fbbf24"].map((color, i) => (
                <div key={i} style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: color, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, color: "#fff", fontWeight: 700,
                }}>
                  {["Y", "N", "D"][i]}
                </div>
              ))}
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                border: "2px dashed #d1d5db", display: "flex", alignItems: "center", justifyContent: "center",
                color: "#94a3b8", fontSize: 18,
              }}>+</div>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              {["You", "Nnj", "Danielle"].map((name, i) => (
                <span key={i} style={{ fontSize: 9, color: "#94a3b8" }}>{name}</span>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="features" 
        style={{ 
          background: "linear-gradient(135deg, #0E1748 0%, #313a94 100%)",overflow: "hidden", 
          minHeight: '100vh',
          padding: "80px 64px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{
          fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800,
          textAlign: "center", color: "#ffffff", letterSpacing: "-0.02em", marginBottom: 56,
        }}>
          Features
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
        }}>
          {features.map(f => (
            <div key={f.id} style={{
              background: "#fff",
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              display: "flex", flexDirection: "column",
              minHeight: 260,
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.06)";
              }}
            >
              {/* Header */}
              <div style={{ padding: "22px 22px 0" }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#0a0e2a", marginBottom: 4 }}>{f.title}</p>
                <p style={{ fontSize: 12, color: "#94a3b8" }}>{f.subtitle}</p>
              </div>
              {/* Preview */}
              <div style={{ flex: 1, display: "flex", marginTop: 16 }}>
                {f.preview}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}