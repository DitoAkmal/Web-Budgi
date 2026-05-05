'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true);
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function DonutChart({ active }) {
  const segments = [
    { color: "#ef4444", pct: 40, label: "food 40%" },
    { color: "#a855f7", pct: 32, label: "health 32%" },
    { color: "#22c55e", pct: 20, label: "transport 20%" },
  ];

  const R = 72;
  const cx = 110, cy = 110;
  const stroke = 28;
  const circumference = 2 * Math.PI * R;
  const gap = 3;

  const arcs = (() => {
    let angleDeg = -90;
    return segments.map(seg => {
      const arcDeg = (seg.pct / 100) * 360;
      const drawDeg = arcDeg - gap;
      const drawLen = (drawDeg / 360) * circumference;
      const startOffset = -(angleDeg / 360) * circumference;
      angleDeg += arcDeg;
      return { ...seg, drawLen, startOffset };
    });
  })();

  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) { setCount(0); return; }
    let v = 0;
    const total = 92;
    const steps = 40;
    const duration = 900;
    const id = setInterval(() => {
      v = Math.min(v + total / steps, total);
      setCount(Math.round(v));
      if (v >= total) clearInterval(id);
    }, duration / steps);
    return () => clearInterval(id);
  }, [active]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "100%" }}>
      <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width={220} height={220} viewBox="0 0 220 220">
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
          {arcs.map((arc, i) => {
            const drawnLen = active ? arc.drawLen : 0;
            return (
              <circle
                key={i}
                cx={cx} cy={cy} r={R}
                fill="none"
                stroke={arc.color}
                strokeWidth={stroke}
                strokeLinecap="butt"
                strokeDasharray={`${drawnLen} ${circumference - drawnLen}`}
                strokeDashoffset={arc.startOffset}
                style={{
                  transition: active
                    ? `stroke-dasharray 0.75s cubic-bezier(0.4,0,0.2,1) ${i * 0.18}s`
                    : "none",
                }}
              />
            );
          })}
          <text x={cx} y={cy - 8} textAnchor="middle" fill="#0a0e2a" fontSize="15" fontWeight="800" fontFamily="'Syne',sans-serif">
            {active ? `${count}%` : "0%"}
          </text>
          <text x={cx} y={cy + 12} textAnchor="middle" fill="#94a3b8" fontSize="11">Expense</text>
        </svg>
      </div>
      <div style={{ display: "flex", gap: 14, paddingBottom: 12, flexWrap: "wrap", justifyContent: "center" }}>
        {segments.map((seg, i) => (
          <div
            key={seg.label}
            style={{
              display: "flex", alignItems: "center", gap: 5,
              opacity: active ? 1 : 0,
              transform: active ? "translateY(0)" : "translateY(6px)",
              transition: active
                ? `opacity 0.4s ease ${0.55 + i * 0.1}s, transform 0.4s ease ${0.55 + i * 0.1}s`
                : "none",
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: seg.color, flexShrink: 0 }} />
            <span style={{ fontSize: 10, color: "#374151" }}>{seg.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Bar chart — SVG-based so all coordinates are pixel-precise, no layout drift
function BarChart({ active }) {
  const bars = [
    { label: "1-6",   value: 75000  },
    { label: "7-12",  value: 130000 },
    { label: "13-18", value: 155000 },
    { label: "19-24", value: 210000 },
    { label: "25-30", value: 260000 },
  ];

  const yLabels = [
    { label: "300k", value: 300000 },
    { label: "200k", value: 200000 },
    { label: "150k", value: 150000 },
    { label: "100k", value: 100000 },
    { label: "50k",  value: 50000  },
  ];

  const chartMax = 300000;

  // SVG fixed dimensions — reduce side padding to fill card width
  const W = 260, H = 220;
  const padL = 30, padR = 4, padT = 16, padB = 22;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  // Animated bar heights (in SVG units)
  const [animH, setAnimH] = useState(bars.map(() => 0));
  const [showTooltip, setShowTooltip] = useState(false);

  const valToY = (v) => padT + chartH - (v / chartMax) * chartH;

  useEffect(() => {
    if (!active) {
      setAnimH(bars.map(() => 0));
      setShowTooltip(false);
      return;
    }

    const timers = bars.map((bar, i) =>
      setTimeout(() => {
        const targetH = (bar.value / chartMax) * chartH;
        const steps = 28;
        const duration = 500;
        let step = 0;
        const id = setInterval(() => {
          step++;
          const eased = 1 - Math.pow(1 - step / steps, 3);
          setAnimH(prev => {
            const next = [...prev];
            next[i] = targetH * eased;
            return next;
          });
          if (step >= steps) clearInterval(id);
        }, duration / steps);
      }, i * 100)
    );

    const tt = setTimeout(() => setShowTooltip(true), 680);
    return () => { timers.forEach(clearTimeout); clearTimeout(tt); };
  }, [active]);

  // Bar x positions: divide chartW into equal slots with a fixed gap between bars
  const gap = 6;
  const slotW = chartW / bars.length;
  const barW = slotW * 1 - gap;

  // Tooltip for first bar
  const tipBar = bars[0];
  const tipX = padL + slotW * 0.5;
  const tipY = valToY(tipBar.value) - 12;
  const tipW = 58, tipH = 18, tipR = 4;

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#fff",
      borderRadius: 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
      overflow: "hidden",
    }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", height: "100%", display: "block" }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Gradient def for bars */}
        <defs>
          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
        </defs>

        {/* Y-axis labels + dotted grid lines */}
        {yLabels.map(({ label, value }) => {
          const y = valToY(value);
          return (
            <g key={label} opacity={active ? 1 : 0} style={{ transition: active ? "opacity 0.4s ease 0.15s" : "none" }}>
              {/* Label */}
              <text
                x={padL - 4}
                y={y + 3}
                textAnchor="end"
                fontSize="7.5"
                fill="#94a3b8"
                fontFamily="sans-serif"
              >
                {label}
              </text>
              {/* Dotted line */}
              <line
                x1={padL}
                y1={y}
                x2={W - padR}
                y2={y}
                stroke="#d1d5db"
                strokeWidth="0.8"
                strokeDasharray="3 6"
              />
            </g>
          );
        })}

        {/* Bars + X labels */}
        {bars.map((bar, i) => {
          const cx = padL + slotW * i + slotW / 2;
          const bx = cx - barW / 2;
          const bh = animH[i];
          const by = padT + chartH - bh;

          return (
            <g key={bar.label}>
              {/* Bar */}
              <rect
                x={bx}
                y={by}
                width={barW}
                height={bh}
                rx={2}
                ry={2}
                fill="url(#barGrad)"
              />
              {/* X label */}
              <text
                x={cx}
                y={H - 6}
                textAnchor="middle"
                fontSize="7"
                fill="#94a3b8"
                fontFamily="sans-serif"
                opacity={active ? 1 : 0}
                style={{ transition: active ? `opacity 0.3s ease ${i * 0.1}s` : "none" }}
              >
                {bar.label}
              </text>
            </g>
          );
        })}

        {/* Tooltip on first bar */}
        {showTooltip && (
          <g opacity={showTooltip ? 1 : 0} style={{ transition: "opacity 0.3s ease" }}>
            {/* Box */}
            <rect
              x={tipX - 4}
              y={tipY - tipH}
              width={tipW}
              height={tipH}
              rx={tipR}
              ry={tipR}
              fill="#ffffff"
              stroke="#e5e7eb"
              strokeWidth="0.8"
              filter="drop-shadow(0 1px 4px rgba(0,0,0,0.12))"
            />
            {/* Caret */}
            <polygon
              points={`${tipX + 6},${tipY} ${tipX + 2},${tipY - 5} ${tipX + 10},${tipY - 5}`}
              fill="#ffffff"
            />
            {/* Text */}
            <text
              x={tipX + tipW / 2 - 4}
              y={tipY - tipH / 2 + 3}
              textAnchor="middle"
              fontSize="8"
              fontWeight="700"
              fill="#111827"
              fontFamily="sans-serif"
            >
              Rp75.000
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

function TrackMoneyCard() {
  const [on, setOn] = useState(false);
  return (
    <div
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      style={{
        borderRadius: 20, overflow: "hidden", position: "relative",
        height: "100%", background: "#fff", cursor: "default",
        boxShadow: on ? "0 20px 48px rgba(0,0,0,0.18)" : "0 2px 16px rgba(0,0,0,0.07)",
        transform: on ? "translateY(-5px)" : "translateY(0)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div style={{
        position: "absolute", inset: 0, padding: "22px 22px 18px",
        display: "flex", flexDirection: "column",
        opacity: on ? 0 : 1, transform: on ? "scale(0.97)" : "scale(1)",
        transition: "opacity 0.28s, transform 0.28s",
        pointerEvents: on ? "none" : "auto", zIndex: 2,
      }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#0a0e2a", textAlign: "center", marginBottom: 3 }}>
          Track Your Money Record
        </p>
        <p style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", marginBottom: 16 }}>
          Income & Expenses in one place
        </p>
        <div style={{
          flex: 1, background: "linear-gradient(135deg, #0a0e2a, #1a2468)",
          borderRadius: 14, padding: "18px 20px",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginBottom: 10 }}>Balance</p>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 900, color: "#fff" }}>
              Rp 500.000
            </span>
            <div style={{ width: 20, height: 20, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div style={{
        position: "absolute", inset: 0,
        opacity: on ? 1 : 0, transform: on ? "scale(1)" : "scale(1.03)",
        transition: "opacity 0.3s, transform 0.3s",
        zIndex: 3,
      }}>
        <Image src="/images/Feature 1-2.png" alt="Track Money" fill style={{ objectFit: "cover", objectPosition: "center top" }} sizes="600px" priority />
      </div>
    </div>
  );
}

function SpendingCard() {
  const [on, setOn] = useState(false);
  // savedTab persists the last active tab across hover sessions
  const [savedTab, setSavedTab] = useState("donut");
  const [tab, setTab] = useState("donut");

  const handleMouseEnter = () => {
    setTab(savedTab);
    setOn(true);
  };

  const handleMouseLeave = () => {
    setSavedTab(tab);
    setOn(false);
  };

  const handleTabChange = (newTab) => {
    setTab(newTab);
    setSavedTab(newTab);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        borderRadius: 20,
        overflow: "hidden",
        position: "relative",
        height: "100%",
        background: "#fff",
        boxShadow: on ? "0 20px 48px rgba(0,0,0,0.18)" : "0 2px 16px rgba(0,0,0,0.07)",
        transform: on ? "translateY(-5px)" : "translateY(0)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "default",
      }}
    >
      {/* Default state: reflects savedTab with a small preview and badge */}
      <div style={{
        position: "absolute", inset: 0,
        padding: "24px 22px",
        display: "flex", flexDirection: "column",
        opacity: on ? 0 : 1,
        transform: on ? "scale(0.97)" : "scale(1)",
        transition: "opacity 0.28s ease, transform 0.28s ease",
        pointerEvents: on ? "none" : "auto",
        zIndex: 2,
      }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#0a0e2a", textAlign: "center", marginBottom: 3 }}>
          Understand Spending
        </p>
        <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", marginBottom: 14 }}>
          Trends & categories at a glance
        </p>
        <div style={{ flex: 1, position: "relative", borderRadius: 12, overflow: "hidden" }}>
          {savedTab === "donut" ? (
            <Image src="/images/Feature 2-1.png" alt="Spending preview" fill style={{ objectFit: "contain", objectPosition: "center" }} sizes="300px" />
          ) : (
            // Mini static bar preview for income tab saved state
            <div style={{
              width: "100%", height: "100%",
              background: "#ffffff", borderRadius: 12,
              display: "flex", alignItems: "flex-end",
              justifyContent: "center", gap: 6, padding: "16px 20px 20px",
              boxSizing: "border-box",
            }}>
              {[25, 50, 63, 83, 97].map((h, i) => (
                <div key={i} style={{
                  flex: 1, height: `${h}%`,
                  background: "linear-gradient(180deg, #4ade80 0%, #16a34a 100%)",
                  borderRadius: "3px 3px 0 0",
                }} />
              ))}
            </div>
          )}
          {/* Badge showing which tab is saved */}
          <div style={{
            position: "absolute", top: 8, right: 8,
            background: savedTab === "donut" ? "#ef4444" : "#22c55e",
            color: "#fff", fontSize: 8, fontWeight: 700,
            borderRadius: 4, padding: "2px 6px",
          }}>
            {savedTab === "donut" ? "Expense" : "Income"}
          </div>
        </div>
      </div>

      {/* Hover state: interactive tabs */}
      <div style={{
        position: "absolute", inset: 0,
        background: "#fff",
        opacity: on ? 1 : 0,
        transition: "opacity 0.3s",
        zIndex: 3,
        display: "flex", flexDirection: "column",
        pointerEvents: on ? "auto" : "none",
      }}>
        {/* Tab bar */}
        <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb", flexShrink: 0 }}>
          {["Expense", "Income"].map(t => {
            const isActive = (t === "Expense" && tab === "donut") || (t === "Income" && tab === "bar");
            return (
              <button
                key={t}
                onClick={() => handleTabChange(t === "Expense" ? "donut" : "bar")}
                style={{
                  flex: 1, padding: "11px 0", fontSize: 12,
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? "#000" : "rgba(0,0,0,0.38)",
                  background: "none", border: "none",
                  borderBottom: isActive ? "2.5px solid #000" : "2.5px solid transparent",
                  cursor: "pointer", marginBottom: "-1px",
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Expense: donut chart */}
        <div style={{
          position: "absolute", top: 44, left: 0, right: 0, bottom: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: tab === "donut" ? 1 : 0,
          transition: "opacity 0.35s",
          pointerEvents: tab === "donut" ? "auto" : "none",
          padding: 8,
        }}>
          <DonutChart active={on && tab === "donut"} />
        </div>

        {/* Income: SVG bar chart */}
        <div style={{
          position: "absolute", top: 44, left: 0, right: 0, bottom: 0,
          opacity: tab === "bar" ? 1 : 0,
          transition: "opacity 0.35s",
          pointerEvents: tab === "bar" ? "auto" : "none",
          padding: 4,
          display: "flex", alignItems: "stretch",
        }}>
          <BarChart active={on && tab === "bar"} />
        </div>
      </div>
    </div>
  );
}

function ScanCard() {
  const [on, setOn] = useState(false);
  const [scanPos, setScanPos] = useState(20);

  useEffect(() => {
    const id = setInterval(() => {
      setScanPos(p => p >= 80 ? 20 : p + 1.5);
    }, 40);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      style={{
        borderRadius: 20, overflow: "hidden", position: "relative",
        height: "100%", background: "#fff", cursor: "default",
        boxShadow: on ? "0 20px 48px rgba(0,0,0,0.18)" : "0 2px 16px rgba(0,0,0,0.07)",
        transform: on ? "translateY(-5px)" : "translateY(0)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div style={{
        position: "absolute", inset: 0, padding: "22px 22px 18px",
        display: "flex", flexDirection: "column", alignItems: "center",
        opacity: on ? 0 : 1, transform: on ? "translateY(-8px) scale(0.97)" : "translateY(0) scale(1)",
        transition: "opacity 0.28s, transform 0.28s",
        pointerEvents: on ? "none" : "auto", zIndex: 2,
      }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#0a0e2a", textAlign: "center", marginBottom: 3 }}>Scan & Log</p>
        <p style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", marginBottom: 16 }}>Snap a receipt, done in seconds.</p>
        <div style={{
          width: 110, height: 188, borderRadius: 22,
          background: "#1a1a2e", border: "2.5px solid rgba(255,255,255,0.08)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.22)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden", gap: 10,
        }}>
          <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 36, height: 9, background: "#000", borderRadius: 5 }} />
          <div style={{ position: "relative", width: 64, height: 64, marginTop: 10 }}>
            {[
              { top: 0, left: 0, borderTop: "2.5px solid #3b82f6", borderLeft: "2.5px solid #3b82f6", borderRadius: "3px 0 0 0" },
              { top: 0, right: 0, borderTop: "2.5px solid #3b82f6", borderRight: "2.5px solid #3b82f6", borderRadius: "0 3px 0 0" },
              { bottom: 0, left: 0, borderBottom: "2.5px solid #3b82f6", borderLeft: "2.5px solid #3b82f6", borderRadius: "0 0 0 3px" },
              { bottom: 0, right: 0, borderBottom: "2.5px solid #3b82f6", borderRight: "2.5px solid #3b82f6", borderRadius: "0 0 3px 0" },
            ].map((s, i) => <div key={i} style={{ position: "absolute", width: 14, height: 14, ...s }} />)}
            <div style={{
              position: "absolute", left: 4, right: 4, height: 1.5,
              background: "linear-gradient(90deg, transparent, #3b82f6 30%, #60a5fa, #3b82f6 70%, transparent)",
              top: `${scanPos}%`,
              boxShadow: "0 0 8px rgba(59,130,246,0.7)",
              transition: "top 0.04s linear",
            }} />
            <div style={{ position: "absolute", inset: 10, display: "flex", flexDirection: "column", gap: 4, justifyContent: "center" }}>
              {[100, 60, 80, 45, 70].map((w, i) => (
                <div key={i} style={{ height: 2.5, borderRadius: 2, background: `rgba(255,255,255,${0.08 + i * 0.04})`, width: `${w}%` }} />
              ))}
            </div>
          </div>
          <p style={{ fontSize: 7, color: "rgba(255,255,255,0.2)", textAlign: "center", maxWidth: 76, lineHeight: 1.4 }}>Align receipt within frame</p>
          <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 28, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.15)" }} />
        </div>
      </div>
      <div style={{
        position: "absolute", inset: 0,
        opacity: on ? 1 : 0, transform: on ? "scale(1)" : "scale(1.03)",
        transition: "opacity 0.3s, transform 0.3s",
        zIndex: 3,
      }}>
        <Image src="/images/Feature 3-2.png" alt="Scan bills" fill style={{ objectFit: "cover", objectPosition: "center" }} sizes="600px" />
      </div>
    </div>
  );
}

function SplitCard() {
  const [on, setOn] = useState(false);
  return (
    <div
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      style={{
        borderRadius: 20, overflow: "hidden", position: "relative",
        height: "100%", background: "#fff", cursor: "default",
        boxShadow: on ? "0 20px 48px rgba(0,0,0,0.18)" : "0 2px 16px rgba(0,0,0,0.07)",
        transform: on ? "translateY(-5px)" : "translateY(0)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div style={{
        position: "absolute", inset: 0, padding: "22px 22px 18px",
        display: "flex", flexDirection: "column",
        opacity: on ? 0 : 1, transform: on ? "scale(0.97)" : "scale(1)",
        transition: "opacity 0.28s, transform 0.28s",
        pointerEvents: on ? "none" : "auto", zIndex: 2,
      }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#0a0e2a", textAlign: "center", marginBottom: 3 }}>Split Bills Easily</p>
        <p style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", marginBottom: 14 }}>Share expenses with friends and track who owes what</p>
        <div style={{
          flex: 1, background: "#f8fafc", border: "1px solid #e5e7eb",
          borderRadius: 14, padding: "14px 16px",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#0a0e2a", marginBottom: 3 }}>Add Friend & Assign Order</p>
          <p style={{ fontSize: 10, color: "#94a3b8", marginBottom: 16 }}>Add and select your friend to assign the order</p>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            {[
              { bg: "#fca5a5", l: "You", t: "Y" },
              { bg: "#93c5fd", l: "Minji", t: "M" },
              { bg: "#fde68a", l: "Danielle", t: "D" },
            ].map(({ bg, l, t }) => (
              <div key={l} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>{t}</div>
                <span style={{ fontSize: 9, color: "#64748b" }}>{l}</span>
              </div>
            ))}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", border: "1.5px dashed #cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#94a3b8" }}>+</div>
              <span style={{ fontSize: 9, color: "#94a3b8" }}>Add</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{
        position: "absolute", inset: 0,
        opacity: on ? 1 : 0, transform: on ? "scale(1)" : "scale(1.04)",
        transition: "opacity 0.3s, transform 0.3s",
        zIndex: 3,
      }}>
        <Image src="/images/Feature 4-2.png" alt="Split bills" fill style={{ objectFit: "cover", objectPosition: "center" }} sizes="600px" />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(0deg, rgba(10,14,42,0.7) 0%, rgba(10,14,42,0.1) 50%, transparent 100%)",
        }} />
        <div style={{ position: "absolute", bottom: 18, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 3 }}>Split with anyone</p>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>Track who paid and who owes</p>
        </div>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const [sRef, inView] = useInView(0.06);

  return (
    <section
      id="features"
      ref={sRef}
      style={{
        background: "#0a0e2a",
        padding: "90px 64px 110px",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: 900, height: 900, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <h2 style={{
          fontFamily: "'Syne',sans-serif",
          fontSize: "clamp(28px,4vw,46px)",
          fontWeight: 900, textAlign: "center",
          color: "#fff", letterSpacing: "-0.02em",
          marginBottom: 52,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}>
          Features
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "320px 320px",
          gap: 20,
        }}>
          {[TrackMoneyCard, SpendingCard, ScanCard, SplitCard].map((C, i) => (
            <div
              key={i}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(36px)",
                transition: `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`,
              }}
            >
              <C />
            </div>
          ))}
        </div>

        <p style={{
          textAlign: "center", marginTop: 28,
          fontSize: 11, color: "rgba(255,255,255,0.18)",
          letterSpacing: "0.08em", textTransform: "uppercase",
          opacity: inView ? 1 : 0, transition: "opacity 0.8s ease 0.5s",
        }}>
          Hover to explore
        </p>
      </div>
    </section>
  );
}