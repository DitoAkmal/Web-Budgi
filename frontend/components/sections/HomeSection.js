'use client';

import { useEffect, useState } from 'react';

export default function HomeSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', background:
        `linear-gradient( to bottom right, #ffffff 3%, #192c89 15%, #152573 19%, #121e5c 25%, #101b55 31%, #0f194e 32%, #0a0f2f 48%)`,
      }}
    >
      {/* Ambient */}
      <div
        style={{
          position: 'absolute', top: '20%', right: '10%',
          width: 400, height: 400, borderRadius: '50%', background:
            'radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)',
        }}
      />

      <div
        style={{
          position: 'absolute', bottom: '10%', left: '5%', width: 300, height: 300, borderRadius: '50%', background:  
          'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
        }}
      />

      <div
        style={{
           position: 'absolute', top: '50%', right: '-400px', transform: 'translateY(-50%)', width: 620, height: 620,
            borderRadius: '50%', background: 'radial-gradient(circle at center, #4FA3FF 0%, #3082E9 25%, #1E3A8A 55%, rgba(15,25,78,0.4) 75%, transparent 100%)',
             filter: 'blur(60px)', pointerEvents: 'none',
        }}
      />

      {/* Hero */}
      <div
        style={{
          flex: 1, display: 'flex', alignItems: 'center',
          padding: '120px 64px 80px', gap: 48, maxWidth: 1280, margin: '0 auto', width: '100%',
        }}
      >
        {/* Left */}
        <div style={{ flex: 1, maxWidth: 560 }}>
          <div
            style={{
              display: 'inline-flex', alignItems: 'center',
              gap: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 100, padding: '6px 16px',
              fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 32,
            }}
          >
            <span
              style={{
                width: 6, height: 6, borderRadius: '50%', background: '#3b82f6',
              }}
            />
            Smart Finance Tracker
          </div>

          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '16px',
              padding: '16px 24px', borderRadius: '16px',
              background: 'linear-gradient(135deg, #5C6AC4, #6B7FD7)',
              color: '#E5E7EB', fontFamily: 'sans-serif',
            }}
          >
            <span
              style={{
                fontSize: '64px', fontWeight: 800,
                lineHeight: 1, color: '#E5E7EB',
              }}
            >
              You
            </span>

            <div
              style={{
                fontSize: '20px',
                fontWeight: 500,
                lineHeight: 1.4,
              }}
            >
              <div>’re Not Bad With Money</div>
              <div>Just Don’t Track It</div>
            </div>
          </div>

          <p
            style={{
              color: 'rgba(255,255,255,0.6)',
              marginBottom: 40, maxWidth: 420,
            }}
          >
            Track expenses, scan receipts, and analyze spending so you stay in
            control.
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
                  fontSize: 10, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)',
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

        {/* Right Image */}
        <div
          style={{
            flex: 1, display: 'flex', justifyContent: 'flex-end',
            position: 'relative', paddingRight: 40,
          }}
        >
          <img
            src="/images/phone-back.png"
            alt="phone back"
            style={{
              position: 'absolute', width: 300,
              transform: 'rotate(-6deg)', left: 40, bottom: 0,
            }}
          />

          <img
            src="/images/phone-front.png"
            alt="phone front"
            style={{
              width: 340, transform: 'rotate(3deg)',
            }}
          />
        </div>
      </div>
    </section>
  );
}