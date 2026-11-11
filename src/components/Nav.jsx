import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, scrollToId } from '../lib/motion.js';

export const sections = [
  { id: 'chi-sono', label: 'Approccio' },
  { id: 'progetti', label: 'Progetti' },
  { id: 'competenze', label: 'Competenze' },
  { id: 'ai', label: 'AI' },
  { id: 'rnd', label: 'R&D' },
  { id: 'contatti', label: 'Contatti' }
];

export const CV_URL = '/assets/CV_Gioia_Andrea.pdf';

export default function Nav() {
  const navRef = useRef(null);
  const progressRef = useRef(null);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useGSAP(() => {
    // Barra di avanzamento: scaleX in scrub, nessun reflow.
    gsap.fromTo(
      progressRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
      }
    );

    ScrollTrigger.create({
      start: 40,
      end: 'max',
      onToggle: self => setScrolled(self.isActive)
    });

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 45%',
        end: 'bottom 45%',
        onToggle: self => self.isActive && setActive(id),
        onLeaveBack: () => id === sections[0].id && setActive('')
      });
    });
  });

  useEffect(() => {
    if (!open) return undefined;
    const onKey = e => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header ref={navRef} className={`nav${scrolled ? ' nav--scrolled' : ''}${open ? ' nav--open' : ''}`}>
      <div className="nav__inner">
        <a href="#top" className="nav__brand" onClick={e => go(e, 'top')}>
          Andrea<span>Gioia</span>
        </a>

        <button
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen(o => !o)}
        >
          <span className="sr-only">{open ? 'Chiudi menu' : 'Apri menu'}</span>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <nav id="nav-menu" className="nav__menu" aria-label="Sezioni">
          <ul>
            {sections.map(s => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={active === s.id ? 'is-active' : undefined}
                  aria-current={active === s.id ? 'true' : undefined}
                  onClick={e => go(e, s.id)}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn--small" href={CV_URL} download="CV_Gioia_Andrea.pdf">
            Scarica CV
          </a>
        </nav>
      </div>
      <span ref={progressRef} className="nav__progress" aria-hidden="true" />
    </header>
  );
}
