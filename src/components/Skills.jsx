import { useEffect, useState } from 'react';
import SectionHead from './SectionHead.jsx';
import LogoLoop from './reactbits/LogoLoop.jsx';
import { softSkills } from '../data/skills.js';
import { logoRows, hoverColorFor } from '../data/logos.js';

const Icon = ({ icon }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d={icon.path} />
  </svg>
);

const toLoopItems = items =>
  items.map(({ icon, title }) => ({
    node: <Icon icon={icon} />,
    title,
    ariaLabel: title,
    hoverColor: hoverColorFor(icon.hex)
  }));

const rows = logoRows.map(r => ({ ...r, loop: toLoopItems(r.items) }));

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = e => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

export default function Skills() {
  const reduced = useReducedMotion();

  return (
    <section id="competenze" className="section container" aria-labelledby="skills-title">
      <SectionHead id="skills-title" index="03" kicker="Competenze" title="Uno stack verticale, dal registro al grafico.">
        Solo tecnologie che compaiono nel codice dei miei repository. Passa sopra a un logo per fermare il nastro.
      </SectionHead>

      <div className="logo-rows" data-stagger>
        {rows.map((row, i) => (
          <div key={row.label} className="logo-row">
            <h3 className="logo-row__label mono">
              <span>{String(i + 1).padStart(2, '0')}</span> {row.label}
            </h3>
            {reduced ? (
              // Con reduced motion: griglia statica, tutti i loghi visibili.
              <ul className="logo-static" aria-label={row.label}>
                {row.loop.map(item => (
                  <li key={item.title} style={{ '--logo-hover': item.hoverColor }}>
                    {item.node}
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <LogoLoop
                logos={row.loop}
                speed={i % 2 ? 36 : 44}
                direction={i % 2 ? 'right' : 'left'}
                logoHeight={40}
                gap={56}
                labels="below"
                pauseOnHover
                scaleOnHover
                fadeOut
                fadeOutWidth={0.1}
                ariaLabel={row.label}
                className="logo-row__loop"
              />
            )}
          </div>
        ))}
      </div>

      <div className="soft" data-reveal>
        <h3 className="mono">Metodo &amp; soft skill</h3>
        <ul className="chips chips--outline">
          {softSkills.map(s => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
