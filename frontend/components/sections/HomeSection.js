'use client';

import { useEffect, useRef, useState } from 'react';

export default function HomeSection() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      });
    };

    const el = heroRef.current;
    if (el) el.addEventListener('mousemove', handleMouseMove);
    return () => { if (el) el.removeEventListener('mousemove', handleMouseMove); };
  }, []);

  const px = mousePos.x;
  const py = mousePos.y;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=Inter:wght@300;400;500;600&display=swap');

        /* ── KEYFRAMES ───────────────────────── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px) rotate(3deg); }
          50%     { transform: translateY(-18px) rotate(3deg); }
        }
        @keyframes floatBack {
          0%,100% { transform: translateY(0px) rotate(-6deg); }
          50%     { transform: translateY(-12px) rotate(-6deg); }
        }
        @keyframes pulse-glow {
          0%,100% { opacity: .25; transform: scale(1); }
          50%     { opacity: .45; transform: scale(1.08); }
        }
        @keyframes drift {
          0%   { transform: translate(0,0) scale(1); }
          33%  { transform: translate(30px,-20px) scale(1.05); }
          66%  { transform: translate(-20px,15px) scale(.97); }
          100% { transform: translate(0,0) scale(1); }
        }
        @keyframes badgePop {
          0%   { opacity:0; transform: scale(.6) translateY(20px); }
          70%  { transform: scale(1.08) translateY(-4px); }
          100% { opacity:1; transform: scale(1) translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes borderGlow {
          0%,100% { box-shadow: 0 0 0 0 rgba(59,130,246,.0); }
          50%      { box-shadow: 0 0 24px 4px rgba(59,130,246,.35); }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes particleFly {
          0%   { opacity:0; transform: translateY(0) scale(0); }
          20%  { opacity:1; }
          100% { opacity:0; transform: translateY(-80px) scale(1.5); }
        }
        @keyframes rotateRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes badgeSlideLeft {
          from { opacity:0; transform:translateX(40px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes badgeSlideRight {
          from { opacity:0; transform:translateX(-40px); }
          to   { opacity:1; transform:translateX(0); }
        }

        /* ── HERO SECTION ────────────────────── */
        .hero-section {
          min-height: 110vh;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          background: linear-gradient(
            135deg,
            #ffffff 0%,
            #1a2a8a 10%,
            #0f1a6e 20%,
            #0c155a 28%,
            #090e42 38%,
            #060b30 55%
          );
          font-family: 'Inter', sans-serif;
        }

        /* ── BACKGROUND LAYERS ───────────────── */
        .bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle, rgba(255,255,255,.08) 1px, transparent 1px);
          background-size: 36px 36px;
          opacity: 1;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 80% 80% at 60% 50%, black 30%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 80% at 60% 50%, black 30%, transparent 100%);
        }
        .bg-orb-1 {
          position: absolute;
          top: 15%; right: 5%;
          width: 520px; height: 520px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(37,99,235,.3) 0%, transparent 70%);
          animation: drift 14s ease-in-out infinite, pulse-glow 6s ease-in-out infinite;
          pointer-events: none;
        }
        .bg-orb-2 {
          position: absolute;
          bottom: 5%; left: 2%;
          width: 340px; height: 340px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,.2) 0%, transparent 70%);
          animation: drift 18s ease-in-out infinite reverse;
          pointer-events: none;
        }
        .bg-orb-3 {
          position: absolute;
          top: 50%; right: -200px;
          transform: translateY(-50%);
          width: 640px; height: 640px;
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(79,163,255,.55) 0%,
            rgba(48,130,233,.4) 25%,
            rgba(30,58,138,.35) 55%,
            rgba(15,25,78,.2) 75%,
            transparent 100%);
          filter: blur(55px);
          animation: pulse-glow 8s ease-in-out infinite;
          pointer-events: none;
        }
        .scanline {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          opacity: .03;
        }
        .scanline::after {
          content: '';
          position: absolute;
          left: 0; right: 0;
          height: 2px;
          background: rgba(255,255,255,.8);
          animation: scanline 7s linear infinite;
        }

        /* ── HERO CONTENT ────────────────────── */
        .hero-inner {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 120px 72px 80px;
          gap: 56px;
          max-width: 1320px;
          margin: 0 auto;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        /* LEFT COLUMN */
        .hero-left {
          flex: 1;
          max-width: 580px;
        }
        .badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 100px;
          padding: 7px 18px;
          font-size: 12px;
          color: rgba(255,255,255,.65);
          margin-bottom: 36px;
          backdrop-filter: blur(10px);
          animation: slideRight .7s ease both;
          animation-delay: .1s;
        }
        .badge-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #3b82f6;
          box-shadow: 0 0 8px #3b82f6;
          animation: pulse-glow 2s infinite;
        }

        .headline-box {
          display: inline-flex;
          align-items: center;
          gap: 18px;
          padding: 18px 26px;
          border-radius: 18px;
          background: linear-gradient(135deg, #5c6ac4, #6b7fd7);
          margin-bottom: 32px;
          animation: fadeUp .8s ease both;
          animation-delay: .25s;
          position: relative;
          overflow: hidden;
        }
        .headline-box::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(255,255,255,.15) 50%,
            transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 3s ease infinite;
        }
        .headline-you {
          font-family: 'Syne', sans-serif;
          font-size: 72px;
          font-weight: 900;
          line-height: 1;
          color: #e5e7eb;
          letter-spacing: -2px;
        }
        .headline-rest {
          font-size: 22px;
          font-weight: 500;
          line-height: 1.45;
          color: #e5e7eb;
        }

        .hero-desc {
          color: rgba(255,255,255,.6);
          font-size: 16px;
          line-height: 1.7;
          max-width: 440px;
          margin-bottom: 44px;
          animation: fadeUp .8s ease both;
          animation-delay: .45s;
        }

        /* CTA */
        .cta-row {
          display: flex;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
          animation: fadeUp .8s ease both;
          animation-delay: .6s;
        }
        .btn-play {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          background: #000;
          color: #fff;
          padding: 12px 22px;
          border-radius: 14px;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,.18);
          transition: transform .2s, box-shadow .2s, background .2s;
          animation: borderGlow 3s ease-in-out infinite;
        }
        .btn-play:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(59,130,246,.4);
          background: #111;
        }
        .btn-play img { width: 28px; height: 28px; object-fit: contain; }
        .btn-play-labels { display: flex; flex-direction: column; line-height: 1; }
        .btn-play-top { font-size: 10px; letter-spacing: .1em; color: rgba(255,255,255,.65); }
        .btn-play-bottom { font-size: 17px; font-weight: 600; }

        .btn-demo {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,.07);
          color: rgba(255,255,255,.8);
          padding: 12px 22px;
          border-radius: 14px;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,.14);
          font-size: 14px;
          font-weight: 500;
          transition: background .2s, transform .2s, color .2s;
          backdrop-filter: blur(8px);
        }
        .btn-demo:hover {
          background: rgba(255,255,255,.13);
          color: #fff;
          transform: translateY(-2px);
        }

        /* STATS ROW */
        .stats-row {
          display: flex;
          gap: 32px;
          margin-top: 52px;
          animation: fadeUp .8s ease both;
          animation-delay: .75s;
        }
        .stat-item { display: flex; flex-direction: column; gap: 4px; }
        .stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: #fff;
        }
        .stat-label { font-size: 12px; color: rgba(255,255,255,.45); }
        .stat-div { width: 1px; background: rgba(255,255,255,.12); }

        /* RIGHT COLUMN — PHONE MOCKUP */
        .hero-right {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          position: relative;
          min-height: 580px;
          animation: fadeIn 1s ease both;
          animation-delay: .3s;
        }

        .phone-scene {
          position: relative;
          width: 520px;
          height: 580px;
        }

        .phone-back {
          position: absolute;
          width: 320px;
          left: 0px;
          bottom: 0;
          animation: floatBack 5s ease-in-out infinite;
          filter: drop-shadow(0 30px 60px rgba(0,0,0,.6));
          transition: transform .1s ease-out;
          z-index: 1;
        }
        .phone-front {
          position: absolute;
          width: 370px;
          right: 0px;
          top: 10px;
          animation: float 4.5s ease-in-out infinite;
          filter: drop-shadow(0 40px 80px rgba(0,0,0,.7));
          transition: transform .1s ease-out;
          z-index: 2;
        }

        /* FLOATING BADGES */
        .badge {
          position: absolute;
          background: rgba(10,15,40,.85);
          border: 1px solid rgba(255,255,255,.14);
          border-radius: 12px;
          padding: 10px 14px;
          backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
          z-index: 10;
          box-shadow: 0 8px 32px rgba(0,0,0,.4);
        }
        .badge-icon {
          width: 32px; height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
        }
        .badge-text { display: flex; flex-direction: column; gap: 2px; }
        .badge-title { font-size: 11px; color: rgba(255,255,255,.5); }
        .badge-val { font-size: 13px; font-weight: 600; color: #fff; }

        .badge-analytics {
          top: 40px; left: -20px;
          animation: badgePop .7s cubic-bezier(.34,1.56,.64,1) both;
          animation-delay: 1s;
        }
        .badge-tools {
          top: 10px; right: 0;
          animation: badgeSlideLeft .7s cubic-bezier(.34,1.56,.64,1) both;
          animation-delay: 1.2s;
        }
        .badge-filter {
          bottom: 90px; left: -30px;
          animation: badgePop .7s cubic-bezier(.34,1.56,.64,1) both;
          animation-delay: 1.4s;
        }
        .badge-expense {
          bottom: 40px; right: -10px;
          animation: badgeSlideLeft .7s cubic-bezier(.34,1.56,.64,1) both;
          animation-delay: 1.6s;
        }

        /* PARTICLES */
        .particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .particle {
          position: absolute;
          width: 3px; height: 3px;
          border-radius: 50%;
          background: rgba(59,130,246,.7);
          animation: particleFly var(--dur) ease-in-out var(--delay) infinite;
        }

        /* DECORATIVE RING */
        .deco-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(59,130,246,.15);
          pointer-events: none;
          animation: rotateRing 20s linear infinite;
        }

        /* ── RESPONSIVE ──────────────────────── */
        @media (max-width: 900px) {
          .hero-inner {
            flex-direction: column;
            padding: 100px 28px 60px;
            gap: 48px;
          }
          .hero-left { max-width: 100%; }
          .hero-right { width: 100%; min-height: 420px; justify-content: center; }
          .phone-scene { width: 400px; height: 460px; }
          .phone-back { width: 240px; }
          .phone-front { width: 290px; }
          .headline-you { font-size: 52px; }
        }
        @media (max-width: 600px) {
          .headline-box { flex-direction: column; align-items: flex-start; gap: 8px; }
          .headline-you { font-size: 42px; }
          .stats-row { gap: 20px; }
        }
      `}</style>

      <section id="home" className="hero-section" ref={heroRef}>

        {/* ── BACKGROUND ── */}
        <div className="bg-grid" />
        <div className="bg-orb-1" />
        <div className="bg-orb-2" />
        <div className="bg-orb-3" />
        <div className="scanline" />

        {/* Particles */}
        <div className="particles">
          {mounted && [...Array(14)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${10 + (i * 6.5) % 85}%`,
              top:  `${20 + (i * 11) % 65}%`,
              '--dur': `${3 + (i % 4)}s`,
              '--delay': `${(i * 0.4) % 3}s`,
            }} />
          ))}
        </div>

        {/* Deco rings */}
        <div className="deco-ring" style={{ width:300, height:300, top:'10%', right:'30%' }} />
        <div className="deco-ring" style={{ width:180, height:180, bottom:'15%', left:'25%', animationDuration:'14s', animationDirection:'reverse' }} />

        {/* ── HERO INNER ── */}
        <div className="hero-inner">

          {/* LEFT */}
          <div className="hero-left">

            {/* Pill badge */}
            <div className="badge-pill">
              <span className="badge-dot" />
              Smart Finance Tracker
            </div>

            {/* Headline */}
            <div className="headline-box">
              <span className="headline-you">You</span>
              <div className="headline-rest">
                <div>'re Not Bad With Money</div>
                <div>Just Don't Track It</div>
              </div>
            </div>

            {/* Description */}
            <p className="hero-desc">
              Track expenses, scan receipts, and analyze spending
              so you stay in control effortlessly.
            </p>

            {/* CTA */}
            <div className="cta-row">
              <a
                href="https://play.google.com/store/apps"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-play"
              >
                <img src="/images/android.png" alt="Android" />
                <div className="btn-play-labels">
                  <span className="btn-play-top">GET IT ON</span>
                  <span className="btn-play-bottom">Google Play</span>
                </div>
              </a>

              <a href="#features" className="btn-demo">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                See Features
              </a>
            </div>
          </div>

          {/* RIGHT — Phone scene */}
          <div className="hero-right">
            <div
              className="phone-scene"
              style={mounted ? {
                transform: `perspective(1200px) rotateY(${-px * 4}deg) rotateX(${py * 3}deg)`,
                transition: 'transform .15s ease-out',
              } : {}}
            >
              {/* Phone Back */}
              <img
                className="phone-back"
                src="/images/phone-back.png"
                alt="Budgi app back"
              />

              {/* Phone Front */}
              <img
                className="phone-front"
                src="/images/phone-front.png"
                alt="Budgi app front"
              />

              {/* ── FLOATING BADGES ── */}

              {/* Analytics badge */}
              <div className="badge badge-analytics">
                <div className="badge-icon" style={{ background: 'rgba(59,130,246,.2)' }}>
                  <svg width="18" height="18" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                </div>
                <div className="badge-text">
                  <span className="badge-title">Analytics</span>
                  <span className="badge-val">+24% this week</span>
                </div>
              </div>

              {/* Tools badge */}
              <div className="badge badge-tools">
                <div className="badge-icon" style={{ background: 'rgba(16,185,129,.15)' }}>
                  <svg width="18" height="18" fill="none" stroke="#10b981" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
                  </svg>
                </div>
                <div className="badge-text">
                  <span className="badge-val">smarter tools for tracking</span>
                </div>
              </div>

              {/* Filter badge */}
              <div className="badge badge-filter">
                <div className="badge-icon" style={{ background: 'rgba(139,92,246,.15)' }}>
                  <svg width="18" height="18" fill="none" stroke="#8b5cf6" strokeWidth="2" viewBox="0 0 24 24">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                  </svg>
                </div>
                <div className="badge-text">
                  <span className="badge-title">enhance filtering</span>
                  <span className="badge-val">Smart Sort</span>
                </div>
              </div>

              {/* Expense badge */}
              <div className="badge badge-expense">
                <div className="badge-icon" style={{ background: 'rgba(239,68,68,.15)', borderRadius: 8 }}>
                  <svg width="18" height="18" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="12" y1="19" x2="12" y2="5"/>
                    <polyline points="5 12 12 5 19 12"/>
                  </svg>
                </div>
                <div className="badge-text">
                  <span className="badge-title">Expenses</span>
                  <span className="badge-val">Rp. 21,000</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}