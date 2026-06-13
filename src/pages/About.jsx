import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './About.css';

/* ── Reveal hook (fade-up + 3D tilt) ── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('av-visible'); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── Counter hook ── */
function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        setStarted(true);
        const steps = 60;
        const inc = target / steps;
        let cur = 0;
        const t = setInterval(() => {
          cur += inc;
          if (cur >= target) { setCount(target); clearInterval(t); }
          else setCount(Math.floor(cur));
        }, duration / steps);
        obs.unobserve(el);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration, started]);

  return [count, ref];
}

/* ── Diamond ── */
const Diamond = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="av-diamond">
    <path d="M12 2L22 12L12 22L2 12Z"/>
  </svg>
);

/* ── Hero Section ── */
function AboutHero() {
  return (
    <section className="av-hero">
      <div className="av-hero-bg" style={{ backgroundImage: 'url(/about_hero.png)' }} />
      <div className="av-hero-overlay" />
      <div className="av-hero-body">
        <p className="av-eyebrow"><Diamond /> OUR STORY <Diamond /></p>
        <div className="av-divider"><span /><Diamond /><span /></div>
        <h1 className="av-hero-title text-display">Born From a Love of<br />Good Conversations</h1>
        <p className="av-hero-sub text-body">From a small dream in Jubilee Hills to a community of thousands.</p>
      </div>
      <div className="av-hero-scroll"><span className="av-scroll-line" /><span className="av-scroll-text text-ui">Scroll</span></div>
    </section>
  );
}

/* ── Breadcrumb strip ── */
function Breadcrumb() {
  return (
    <div className="av-breadcrumb text-ui">
      <span>Home</span><span className="av-bc-sep">›</span><span className="av-bc-active">About Us</span>
    </div>
  );
}

/* ── Our Story Section ── */
function OurStory() {
  const ref = useReveal();
  return (
    <section className="av-section av-story av-reveal" ref={ref}>
      <div className="av-container av-story-inner">
        <div className="av-story-img-col">
          <div className="av-story-img-frame">
            <img src="/about.png" alt="Cafe story" />
            <div className="av-img-border" />
          </div>
          <div className="av-year-badge text-display">
            <span>Est.</span>
            <strong>2026</strong>
          </div>
        </div>
        <div className="av-story-text-col">
          <p className="av-eyebrow"><Diamond /> Who We Are</p>
          <h2 className="av-section-title text-display">More Than a Cafe.<br />A Philosophy.</h2>
          <div className="av-gold-bar" />
          <p className="text-body">
            Cafe began with a simple belief — that the best conversations happen over great coffee. 
            We set out to create a space in Jubilee Hills, Hyderabad, where ideas could flow as freely 
            as our espresso.
          </p>
          <p className="text-body" style={{ marginTop: '1.2rem' }}>
            What started as a cozy corner cafe has grown into a thriving community hub — a second home 
            for students, remote workers, artists, and anyone who simply needs a quiet corner to think.
          </p>
          <p className="text-body" style={{ marginTop: '1.2rem' }}>
            Every bean is ethically sourced. Every dish is made with intention. Every corner of our space 
            is designed to make you feel like you belong.
          </p>
          <div className="av-story-pills">
            {['Ethically Sourced', 'Community First', 'Crafted With Love', 'Locally Inspired'].map((t, i) => (
              <span key={i} className="av-pill text-ui">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Stats Strip ── */
function StatStrip() {
  const [c1, r1] = useCounter(50000);
  const [c2, r2] = useCounter(12);
  const [c3, r3] = useCounter(5);
  const [c4, r4] = useCounter(48);

  return (
    <section className="av-stats">
      <div className="av-container av-stats-grid">
        <div className="av-stat" ref={r1}>
          <p className="av-stat-num text-display">{c1.toLocaleString()}+</p>
          <p className="av-stat-lbl text-ui">Cups Served</p>
        </div>
        <div className="av-stat" ref={r2}>
          <p className="av-stat-num text-display">{c2}</p>
          <p className="av-stat-lbl text-ui">Community Events</p>
        </div>
        <div className="av-stat" ref={r3}>
          <p className="av-stat-num text-display">{c3}+</p>
          <p className="av-stat-lbl text-ui">Years of Brewing</p>
        </div>
        <div className="av-stat" ref={r4}>
          <p className="av-stat-num text-display">{c4 / 10}★</p>
          <p className="av-stat-lbl text-ui">Average Rating</p>
        </div>
      </div>
    </section>
  );
}

/* ── Our Values ── */
const VALUES = [
  { icon: '🌿', title: 'Locally Sourced', body: 'We partner with Hyderabad farms and local bakers to bring you the freshest produce daily.' },
  { icon: '🤝', title: 'Community First', body: 'Our space is built for people. Events, clubs, and open mics — Theory belongs to everyone.' },
  { icon: '♻️', title: 'Sustainability', body: 'Eco-packaging, zero-waste initiatives, and responsible sourcing at every step.' },
  { icon: '🎨', title: 'Creative Expression', body: 'We host artists, writers, and musicians. Creativity is always welcome here.' },
];

function OurValues() {
  const ref = useReveal(0.1);
  return (
    <section className="av-section av-values av-reveal" ref={ref}>
      <div className="av-container">
        <div className="av-section-header">
          <p className="av-eyebrow"><Diamond /> What We Stand For</p>
          <h2 className="av-section-title text-display">Our Values</h2>
          <div className="av-gold-bar av-centered" />
        </div>
        <div className="av-values-grid">
          {VALUES.map((v, i) => (
            <div className="av-value-card" key={i} style={{ '--vi': i }}>
              <span className="av-value-icon">{v.icon}</span>
              <h3 className="text-display">{v.title}</h3>
              <p className="text-body">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Behind the Brew ── */
const PROCESS = [
  { num: '01', title: 'We Source Ethically', body: 'Our beans come from certified ethical farms in Coorg, Chikmagalur, and select international estates.' },
  { num: '02', title: 'We Roast In-House', body: 'Small-batch roasting ensures peak freshness. Every profile is dialed in for optimal flavor.' },
  { num: '03', title: 'We Brew with Precision', body: 'From espresso to cold brew — our baristas are trained to extract the perfect cup, every time.' },
];

function BehindTheBrew() {
  const ref = useReveal(0.1);
  return (
    <section className="av-section av-brew av-reveal" ref={ref}>
      <div className="av-brew-bg" style={{ backgroundImage: 'url(/hero2.png)' }} />
      <div className="av-brew-overlay" />
      <div className="av-container av-brew-inner">
        <div className="av-section-header" style={{ textAlign: 'center' }}>
          <p className="av-eyebrow" style={{ color: '#c9a84c' }}><Diamond /> The Process</p>
          <h2 className="av-section-title text-display" style={{ color: '#fff' }}>Behind the Brew</h2>
          <div className="av-gold-bar av-centered" />
        </div>
        <div className="av-process-steps">
          {PROCESS.map((s, i) => (
            <div className="av-step" key={i} style={{ '--si': i }}>
              <div className="av-step-num text-display">{s.num}</div>
              <div className="av-step-line" />
              <div className="av-step-body">
                <h3 className="text-display">{s.title}</h3>
                <p className="text-body">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Meet the Team ── */
const TEAM = [
  { name: 'Arjun Reddy', role: 'Founder & Visionary', quote: '"A great cafe changes your whole day."', img: '/slide1.png' },
  { name: 'Priya Sharma', role: 'Head Barista', quote: '"Every cup is a tiny work of art."', img: '/slide2.png' },
  { name: 'Ravi Kumar', role: 'Head Chef', quote: '"Food is how we say we care."', img: '/slide3.png' },
];

function MeetTheTeam() {
  const ref = useReveal(0.08);
  return (
    <section className="av-section av-team av-reveal" ref={ref}>
      <div className="av-container">
        <div className="av-section-header">
          <p className="av-eyebrow"><Diamond /> The People Behind the Magic</p>
          <h2 className="av-section-title text-display">Meet the Team</h2>
          <div className="av-gold-bar av-centered" />
        </div>
        <div className="av-team-grid">
          {TEAM.map((m, i) => (
            <div className="av-team-card" key={i} style={{ '--ti': i }}>
              <div className="av-team-img-wrap">
                <img src={m.img} alt={m.name} />
                <div className="av-team-img-overlay" />
              </div>
              <div className="av-team-body text-center">
                <h3 className="text-display">{m.name}</h3>
                <p className="av-team-role text-ui">{m.role}</p>
                <p className="av-team-quote text-body">{m.quote}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA Strip ── */
function AboutCTA() {
  const ref = useReveal(0.2);
  return (
    <section className="av-cta av-reveal" ref={ref}>
      <div className="av-cta-bg" style={{ backgroundImage: 'url(/outdoor.png)' }} />
      <div className="av-cta-overlay" />
      <div className="av-cta-body text-center">
        <p className="av-eyebrow" style={{ color: '#c9a84c' }}><Diamond /> Come Say Hello</p>
        <h2 className="av-section-title text-display" style={{ color: '#fff', fontSize: 'clamp(2.2rem,5vw,3.8rem)' }}>
          Reserve Your Table Today
        </h2>
        <div className="av-gold-bar av-centered" />
        <p className="text-body" style={{ color: 'rgba(255,255,255,0.82)', maxWidth: '560px', margin: '0 auto 2.5rem' }}>
          Come experience Cafe for yourself. We'd love to welcome you to our community.
        </p>
        <div className="av-cta-btns">
          <Link to="/reserve" className="av-btn-gold text-ui">BOOK A TABLE</Link>
          <Link to="/contact" className="av-btn-outline text-ui">CONTACT US</Link>
        </div>
      </div>
    </section>
  );
}

/* ── Main ── */
export default function About() {
  return (
    <div className="av-page">
      <AboutHero />
      <Breadcrumb />
      <OurStory />
      <StatStrip />
      <OurValues />
      <BehindTheBrew />
      <MeetTheTeam />
      <AboutCTA />
    </div>
  );
}
