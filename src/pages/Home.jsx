import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Phone, MapPin, Clock, Mail } from 'lucide-react';
import './Home.css';

/* ─── Intersection Observer hook ─── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('is-visible'); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── Hero Slides Data ─── */
const SLIDES = [
  { img: '/slide1.png', sub: 'CRAFTED WITH LOVE', heading: 'Getting your\nwish done',  body: 'Savor the art of flavor' },
  { img: '/slide2.png', sub: 'EST. 2026 — HYDERABAD', heading: 'Think.\nSip. Belong.', body: 'An intellectual home in the heart of the city.' },
  { img: '/slide3.png', sub: 'OPEN DAILY 8AM – 11PM',  heading: 'Come As\nYou Are.',   body: 'Whether working or dreaming — we have a seat for you.' },
];

/* ─── Diamond ornament SVG ─── */
const Diamond = ({ size = 16, className = '' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L22 12L12 22L2 12Z"/>
  </svg>
);

/* ─── Hero Slider ─── */
function HeroSlider() {
  const [cur, setCur]  = useState(0);
  const [dir, setDir]  = useState(1); // 1=next -1=prev
  const [anim, setAnim] = useState(false);

  const go = useCallback((nextIdx, direction) => {
    if (anim) return;
    setDir(direction);
    setAnim(true);
    setTimeout(() => {
      setCur(nextIdx);
      setAnim(false);
    }, 700);
  }, [anim]);

  const next = () => go((cur + 1) % SLIDES.length,  1);
  const prev = () => go((cur - 1 + SLIDES.length) % SLIDES.length, -1);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [cur]);

  const s = SLIDES[cur];

  return (
    <section className="hero">
      {/* Background with 3-D Ken-Burns + slide */}
      <div className={`hero-bg-wrap ${anim ? (dir > 0 ? 'exit-left' : 'exit-right') : 'enter'}`}>
        <div className="hero-bg" style={{ backgroundImage: `url(${s.img})` }} />
      </div>
      <div className="hero-vignette" />

      {/* Content */}
      <div className={`hero-body ${anim ? 'body-exit' : 'body-enter'}`}>
        <p className="hero-sub-label text-ui">
          <span className="ornament">◆</span>
          {s.sub}
          <span className="ornament">◆</span>
        </p>
        <div className="hero-divider">
          <span className="divider-line" /><Diamond size={14} /><span className="divider-line" />
        </div>
        <h1 className="hero-title text-display">
          {s.heading.split('\n').map((l, i) => <span key={i}>{l}<br/></span>)}
        </h1>
        <p className="hero-body-text text-body">{s.body}</p>
        <Link to="/menu" className="btn-hero-cta text-ui">VIEW MENU</Link>
      </div>

      {/* Nav arrows */}
      <button className="arrow arrow-left"  onClick={prev} aria-label="Previous"><ChevronLeft  size={22}/></button>
      <button className="arrow arrow-right" onClick={next} aria-label="Next"><ChevronRight size={22}/></button>

      {/* Slide counter */}
      <div className="slide-counter text-ui">
        {String(cur + 1).padStart(2,'0')} / {String(SLIDES.length).padStart(2,'0')}
      </div>


    </section>
  );
}

/* ─── Marquee ticker ─── */
function Marquee() {
  const items = ['Artisanal Brews', 'All-Day Breakfast', 'Dessert Bar', 'Community Events', 'Live Music Nights', 'Work-Friendly Spaces', 'Locally Sourced', 'Crafted With Love'];
  const doubled = [...items, ...items];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map((t, i) => (
          <span key={i} className="marquee-item text-ui">
            <Diamond size={10} className="marquee-diamond"/> {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── About Section ─── */
function About() {
  const ref = useReveal();
  return (
    <section className="section-about reveal-section" ref={ref}>
      <div className="about-inner">
        <div className="about-img-col">
          <div className="about-img-frame">
            <img src="/about.png" alt="Cafe Interior" />
            <div className="about-img-accent" />
          </div>
          <div className="about-stat-badge">
            <p className="stat-big text-display">5+</p>
            <p className="stat-small text-ui">Years of Brewing</p>
          </div>
        </div>
        <div className="about-text-col">
          <p className="section-eyebrow text-ui"><span className="ornament-gold">◆</span> Our Story</p>
          <h2 className="section-title text-display">More Than a Cafe.<br />A Community.</h2>
          <div className="gold-divider" />
          <p className="text-body">
            Cafe was born in the heart of Jubilee Hills with one purpose — to create
            a space where every cup is crafted with care and every corner feels like home.
          </p>
          <p className="text-body" style={{marginTop:'1rem'}}>
            We pair ethically-sourced artisan coffee with fresh, locally-inspired food and
            an ambiance that makes you want to stay for hours.
          </p>
          <div className="about-features">
            {['Locally Sourced Ingredients','Community-First Culture','Sustainable Practices'].map((f,i) => (
              <div className="about-feature" key={i}>
                <Diamond size={10} className="feature-diamond"/> <span className="text-ui">{f}</span>
              </div>
            ))}
          </div>
          <Link to="/about" className="btn-gold text-ui">DISCOVER OUR STORY</Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Specialties Section ─── */
const SPECIALS = [
  { img:'/avocado.png',    name:'Avocado Toast',      tag:'Breakfast',  price:'₹390' },
  { img:'/matcha.png',     name:'Matcha Latte',        tag:'Beverages',  price:'₹310' },
  { img:'/burger.png',     name:'Signature Burger',    tag:'Mains',      price:'₹550' },
  { img:'/cake.png',       name:'Chocolate Cake',      tag:'Desserts',   price:'₹380' },
];

function Specials() {
  const ref = useReveal(0.08);
  return (
    <section className="section-specials reveal-section" ref={ref}>
      <div className="container-wide">
        <div className="section-header-center">
          <p className="section-eyebrow text-ui"><span className="ornament-gold">◆</span> Crafted With Intention</p>
          <h2 className="section-title text-display">Our Signature Picks</h2>
          <div className="gold-divider mx-auto" />
        </div>
        <div className="specials-grid">
          {SPECIALS.map((item, i) => (
            <div className="special-card" key={i} style={{ '--i': i }}>
              <div className="special-card-img">
                <img src={item.img} alt={item.name} loading="lazy"/>
                <div className="special-card-overlay">
                  <span className="special-tag text-ui">{item.tag}</span>
                </div>
              </div>
              <div className="special-card-body">
                <h3 className="text-display">{item.name}</h3>
                <span className="special-price text-ui">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-3">
          <Link to="/menu" className="btn-gold text-ui">VIEW FULL MENU</Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Dark Parallax CTA ─── */
function DarkCTA() {
  const ref = useReveal(0.15);
  return (
    <section className="section-dark-cta reveal-section" ref={ref}>
      <div className="dark-cta-bg" style={{ backgroundImage: 'url(/slide2.png)' }} />
      <div className="dark-cta-overlay" />
      <div className="dark-cta-body text-center">
        <p className="section-eyebrow text-ui" style={{color:'var(--accent)'}}>
          <span className="ornament-gold">◆</span> Don't Wait
        </p>
        <h2 className="section-title text-display" style={{color:'#fff', fontSize:'clamp(2.5rem,5vw,4rem)'}}>
          Reserve Your Spot
        </h2>
        <div className="gold-divider mx-auto" />
        <p className="text-body" style={{color:'rgba(255,255,255,0.8)', maxWidth:'560px', margin:'0 auto 2.5rem'}}>
          Whether it's a study session, birthday brunch, or a spontaneous coffee date —
          we have a table waiting for you.
        </p>
        <Link to="/reserve" className="btn-gold text-ui">BOOK A TABLE</Link>
      </div>
    </section>
  );
}

/* ─── Pillars ─── */
const PILLARS = [
  { icon:'☕', title:'Artisanal Brews',       body:'Single-origin beans, expertly roasted and brewed each morning.' },
  { icon:'📚', title:'Work-Friendly',          body:'Fast Wi-Fi, ample power, and an inspiring focus environment.' },
  { icon:'🎵', title:'Curated Ambiance',       body:'A handpicked soundtrack — from jazz to lo-fi, always on point.' },
  { icon:'🌿', title:'Locally Sourced',         body:'Fresh Hyderabad produce. We support local, always.' },
];

function Pillars() {
  const ref = useReveal(0.1);
  return (
    <section className="section-pillars reveal-section" ref={ref}>
      <div className="container-wide">
        <div className="section-header-center">
          <p className="section-eyebrow text-ui"><span className="ornament-gold">◆</span> Why Theory</p>
          <h2 className="section-title text-display">The Experience</h2>
          <div className="gold-divider mx-auto" />
        </div>
        <div className="pillars-grid">
          {PILLARS.map((p, i) => (
            <div className="pillar-item" key={i} style={{ '--i': i }}>
              <span className="pillar-emoji">{p.icon}</span>
              <h3 className="text-display">{p.title}</h3>
              <p className="text-body">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Stats ─── */
function Stats() {
  const ref = useReveal(0.2);
  return (
    <section className="section-stats reveal-section" ref={ref}>
      <div className="container-wide stats-row">
        {[['5+','Years Brewing'],['50K+','Cups Served'],['4.8★','Average Rating'],['12','Events Hosted']].map(([n,l],i)=>(
          <div className="stat-col text-center" key={i}>
            <p className="big-num text-display">{n}</p>
            <p className="stat-lbl text-ui">{l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Gallery Teaser ─── */
const GALLERY_IMGS = ['/yogurt.png','/bagel.png','/iced_coffee.png','/cake.png','/matcha.png','/coffee.png'];
function GalleryTeaser() {
  const ref = useReveal(0.08);
  return (
    <section className="section-gallery reveal-section" ref={ref}>
      <div className="container-wide">
        <div className="section-header-center">
          <p className="section-eyebrow text-ui" style={{color:'var(--accent)'}}>
            <span className="ornament-gold">◆</span> Follow the Vibe
          </p>
          <h2 className="section-title text-display" style={{color:'#fff'}}>@cafe</h2>
          <div className="gold-divider mx-auto" />
        </div>
        <div className="gallery-mosaic">
          {GALLERY_IMGS.map((src, i) => (
            <div className={`mosaic-cell cell-${i}`} key={i}>
              <img src={src} alt="Gallery" loading="lazy"/>
              <div className="mosaic-hover"><span>📷</span></div>
            </div>
          ))}
        </div>
        <div className="text-center mt-3">
          <Link to="/gallery" className="btn-outline-light text-ui">VIEW FULL GALLERY</Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
const TESTIMONIALS = [
  { q:'The lavender honey latte is absolutely divine. My morning ritual, always.', name:'Priya M.', stars:5 },
  { q:'Best work-from-cafe in Hyderabad. Fast Wi-Fi, great food, incredibly warm staff.', name:'Rohan K.', stars:5 },
  { q:'Avocado toast and the iced coffee combo — unbeatable. The ambiance is chef\'s kiss.', name:'Sneha T.', stars:5 },
];
function Testimonials() {
  const [idx, setIdx] = useState(0);
  const ref = useReveal(0.2);
  useEffect(() => { const t = setInterval(() => setIdx(i => (i+1) % TESTIMONIALS.length), 4500); return () => clearInterval(t); }, []);
  return (
    <section className="section-testimonials reveal-section" ref={ref}>
      <div className="container-wide text-center">
        <p className="section-eyebrow text-ui"><span className="ornament-gold">◆</span> Guest Voices</p>
        <h2 className="section-title text-display">What Our Guests Say</h2>
        <div className="gold-divider mx-auto" />
        <div className="testimonial-box" key={idx}>
          <div className="stars-row">{'★'.repeat(TESTIMONIALS[idx].stars)}</div>
          <p className="t-quote text-display">"{TESTIMONIALS[idx].q}"</p>
          <p className="t-author text-ui">— {TESTIMONIALS[idx].name}</p>
        </div>
        <div className="t-dots">
          {TESTIMONIALS.map((_,i)=>(<button key={i} className={`t-dot ${i===idx?'active':''}`} onClick={()=>setIdx(i)}/>))}
        </div>
      </div>
    </section>
  );
}

/* ─── Events Preview ─── */
const EVENTS = [
  { title:'Jazz & Brew Night', date:'Friday, 8 PM', tag:'Live Music', img:'/slide1.png' },
  { title:'Sunday Book Club',  date:'Sunday, 11 AM',tag:'Community', img:'/slide2.png' },
  { title:'Latte Art Workshop',date:'Wednesday, 4 PM',tag:'Workshop', img:'/slide3.png' },
];
function Events() {
  const ref = useReveal(0.1);
  return (
    <section className="section-events reveal-section" ref={ref}>
      <div className="container-wide">
        <div className="section-header-center">
          <p className="section-eyebrow text-ui"><span className="ornament-gold">◆</span> What's Brewing</p>
          <h2 className="section-title text-display">Upcoming at Theory</h2>
          <div className="gold-divider mx-auto" />
        </div>
        <div className="events-grid">
          {EVENTS.map((e, i) => (
            <div className="event-card" key={i} style={{ '--i': i }}>
              <div className="event-img-wrap">
                <img src={e.img} alt={e.title} loading="lazy"/>
                <span className="event-tag text-ui">{e.tag}</span>
              </div>
              <div className="event-body">
                <p className="event-date text-ui">{e.date}</p>
                <h3 className="text-display">{e.title}</h3>
                <Link to="/events" className="btn-text-link text-ui">RSVP →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── WhatsApp Float ─── */
function WAFloat() {
  return (
    <a href="https://wa.me/918367696769" target="_blank" rel="noopener noreferrer" className="wa-float" aria-label="WhatsApp">
      <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  );
}

/* ─── Main ─── */
export default function Home() {
  return (
    <div className="home-page">
      <HeroSlider />
      <Marquee />
      <About />
      <Specials />
      <DarkCTA />
      <Pillars />
      <Stats />
      <GalleryTeaser />
      <Testimonials />
      <Events />
      <WAFloat />
    </div>
  );
}
