import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, scrollToId } from '../lib/motion.js';
import SplitText from './reactbits/SplitText.jsx';
import ShinyText from './reactbits/ShinyText.jsx';
import DotGrid from './reactbits/DotGrid.jsx';
import Magnet from './reactbits/Magnet.jsx';
import { CV_URL } from './Nav.jsx';

const layers = ['Firmware', 'Rete', 'Backend', 'Mobile', 'Dati', 'AI'];

export default function Hero() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('.hero__eyebrow', { y: 16, autoAlpha: 0, duration: 0.7 })
          .from('.hero__lead', { y: 24, autoAlpha: 0, duration: 0.9 }, 0.7)
          .from('.hero__actions > *', { y: 20, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, 0.9)
          .from('.hero__stack li', { y: 12, autoAlpha: 0, duration: 0.5, stagger: 0.06 }, 1.05);

        // Parallax in uscita: il contenuto scivola e sfuma, lo sfondo resta.
        gsap.to('.hero__content', {
          yPercent: -12,
          autoAlpha: 0.15,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true }
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section id="top" ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <DotGrid
          dotSize={3}
          gap={22}
          baseColor="#2a2622"
          activeColor="#ff5e00"
          proximity={150}
          shockRadius={240}
          shockStrength={4}
          glow={0.6}
          fade={0.35}
        />
        <div className="hero__vignette" />
      </div>

      <div className="hero__content container">
        <p className="hero__eyebrow">
          <ShinyText text="Andrea Gioia — IoT · Software Engineering · AI agentica" color="#8c8c96" shineColor="#ffffff" speed={3} />
        </p>

        <h1 id="hero-title" className="hero__title">
          <SplitText
            text="Dal silicio"
            tag="span"
            className="hero__line"
            splitType="chars"
            delay={35}
            duration={1}
            textAlign="left"
            trigger="load"
            mask
          />
          <SplitText
            text="all’agente."
            tag="span"
            className="hero__line hero__line--accent"
            splitType="chars"
            delay={35}
            duration={1}
            textAlign="left"
            trigger="load"
            mask
          />
        </h1>

        <p className="hero__lead">
          Scompongo ogni problema fino ai suoi vincoli fisici — <strong>energia, banda, latenza, memoria</strong> — e
          ricostruisco sistemi che li rispettano. Firmware su ESP32, backend event-driven, app Flutter, pipeline dati e
          workflow con LLM locali: un solo filo, dal sensore all’agente.
        </p>

        <div className="hero__actions">
          <Magnet padding={60} magnetStrength={3}>
            <a className="btn" href="#progetti" onClick={e => (e.preventDefault(), scrollToId('progetti'))}>
              Guarda i progetti
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
            </a>
          </Magnet>
          <Magnet padding={60} magnetStrength={3}>
            <a className="btn btn--ghost" href={CV_URL} download="CV_Gioia_Andrea.pdf">
              Scarica il CV
            </a>
          </Magnet>
        </div>

        <ul className="hero__stack" aria-label="Livelli dello stack su cui lavoro">
          {layers.map((l, i) => (
            <li key={l}>
              <span className="mono">{String(i).padStart(2, '0')}</span> {l}
            </li>
          ))}
        </ul>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
