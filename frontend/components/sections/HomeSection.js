'use client';
import Link from "next/link";

export default function HomeSection() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "120px 48px 80px",
        position: "relative",
        overflow: "hidden",
        background: "radial-gradient(ellipse 90% 70% at 65% 40%, #1a2a6e 0%, #0a0f2e 65%)",
        gap: 48,
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 15% 85%, rgba(37,99,235,0.18) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />

      {/* Left content */}
      <div style={{ flex: 1, maxWidth: 560, zIndex: 2 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 100,
            padding: "6px 16px",
            fontSize: 12,
            color: "rgba(255,255,255,0.6)",
            marginBottom: 28,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6", display: "inline-block" }} />
          Smart Finance Tracker
        </div>

        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(38px, 5vw, 60px)",
            fontWeight: 800,
            lineHeight: 1.1,
            margin: "0 0 24px",
            color: "#fff",
          }}
        >
          <span style={{ color: "#fff" }}>You</span>
          <span style={{ color: "rgba(255,255,255,0.7)", fontStyle: "italic" }}>
            {" "}are Not Bad{" "}
          </span>
          <br />
          With Money.{" "}
          <span style={{ color: "#3b82f6" }}>Just</span>
          <br />
          <span style={{ color: "#3b82f6" }}>Don{"'"}t Track It</span>
        </h1>

        <p
          style={{
            fontSize: 17,
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.58)",
            marginBottom: 40,
            maxWidth: 460,
          }}
        >
          Track expenses, scan receipts, and analyze spending
          so you stay in control effortlessly.
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <a
            href="https://play.google.com/store/games?hl=id"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#fff",
              color: "#0a0f2e",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              padding: "12px 24px",
              borderRadius: 10,
              textDecoration: "none",
              transition: "transform 0.2s",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.18 23.76c.28.16.6.21.93.16l12.47-11.47-3.17-3.2-10.23 14.51zm16.15-10.5L6.1 5.98 3.2.54C2.86.2 2.34.14 1.93.36L14.83 12.2l4.5 1.06zm1.96-1.7l-3.34-1.94-3.54 3.26 3.54 3.26 3.35-1.94c.95-.55.95-2.09-.01-2.64zM3.2.54L1.93.36C1.52.14 1.01.2.67.54L3.2 3.7l.01-.02L14.83 12.2z"/>
            </svg>
            GET IT ON Google Play
          </a>

          <Link
            href="/#about"
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.55)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(255,255,255,0.2)",
              paddingBottom: 2,
              transition: "color 0.2s",
            }}
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Right visual - phone mockup */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
          position: "relative",
        }}
        className="hidden md:flex"
      >
        <div style={{ position: "relative", width: 360, height: 460 }}>
          {/* Back phone */}
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 20,
              width: 210,
              height: 380,
              borderRadius: 28,
              background: "linear-gradient(145deg, rgba(37,99,235,0.5), rgba(10,15,46,0.9))",
              border: "1px solid rgba(59,130,246,0.4)",
              boxShadow: "0 24px 60px rgba(37,99,235,0.35)",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ padding: 20, width: "100%" }}>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>Analytics</p>
              <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 80 }}>
                {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${h}%`,
                      background: i === 5 ? "#3b82f6" : "rgba(59,130,246,0.3)",
                      borderRadius: 4,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Main phone */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: 230,
              height: 420,
              borderRadius: 32,
              background: "linear-gradient(160deg, #1e2a5e, #0a0f2e)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
              overflow: "hidden",
              padding: 20,
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                borderRadius: 14,
                padding: "16px 18px",
                marginBottom: 16,
              }}
            >
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>Balance</p>
              <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "#fff" }}>
                Rp 500.000
              </p>
            </div>

            <div style={{ marginBottom: 12 }}>
              {[
                { label: "Food", amount: "Rp 21.000", color: "#3b82f6" },
                { label: "Transport", amount: "Rp 12.000", color: "#10b981" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color }} />
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{item.label}</span>
                  </div>
                  <span style={{ fontSize: 12, color: "#fff", fontWeight: 600 }}>{item.amount}</span>
                </div>
              ))}
            </div>

            {/* Expense badge */}
            <div
              style={{
                position: "absolute",
                bottom: 28,
                right: -10,
                background: "#fff",
                color: "#0a0f2e",
                borderRadius: 12,
                padding: "10px 14px",
                fontSize: 11,
                fontWeight: 700,
                boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
              }}
            >
              <p style={{ margin: 0, fontSize: 10, color: "#666" }}>Expenses</p>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 800 }}>Rp 21.000</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}   