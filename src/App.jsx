import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, initSmoothScroll, scrollToId } from './lib/motion.js';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import AIWorkflows from './components/AIWorkflows.jsx';
import RnD from './components/RnD.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

gsap.registerPlugin(useGSAP);

export default function App() {
  const rootRef = useRef(null);

  // Smooth scroll globale + deep link (#progetti, redirect dalle vecchie pagine).
  useEffect(() => {
    const destroy = initSmoothScroll();
    const hash = decodeURIComponent(location.hash.slice(1));
    let timer;
    if (hash) {
      // Attende layout e font prima di calcolare l'offset.
      timer = setTimeout(() => {
        ScrollTrigger.refresh();
        scrollToId(hash, { immediate: true });
      }, 120);
    }
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', onLoad);
      destroy();
    };
  }, []);

  // Reveal on scroll: solo transform/opacity (compositing GPU → 60 FPS).
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('[data-reveal]').forEach(el => {
          gsap.from(el, {
            y: 36,
            autoAlpha: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true }
          });
        });

        gsap.utils.toArray('[data-stagger]').forEach(group => {
          const items = group.querySelectorAll(':scope > *');
          gsap.set(items, { y: 40, autoAlpha: 0 });
          ScrollTrigger.batch(items, {
            start: 'top 90%',
            once: true,
            onEnter: batch =>
              gsap.to(batch, {
                y: 0,
                autoAlpha: 1,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.08,
                overwrite: true
              })
          });
        });

        // Linee che si disegnano sotto i titoli di sezione.
        gsap.utils.toArray('.section-head__rule').forEach(rule => {
          gsap.from(rule, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: { trigger: rule, start: 'top 90%', once: true }
          });
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef}>
      <a className="skip-link" href="#main">Salta al contenuto</a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <AIWorkflows />
        <RnD />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
