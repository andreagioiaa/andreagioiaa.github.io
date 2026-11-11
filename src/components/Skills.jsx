import SectionHead from './SectionHead.jsx';
import { skillGroups, softSkills } from '../data/skills.js';

export default function Skills() {
  return (
    <section id="competenze" className="section container" aria-labelledby="skills-title">
      <SectionHead id="skills-title" index="03" kicker="Competenze" title="Uno stack verticale, dal registro al grafico.">
        Hard skill elencate solo se esiste codice che le dimostra. Accanto a ogni area, dove l’ho messa in pratica.
      </SectionHead>

      <div className="skills-grid" data-stagger>
        {skillGroups.map(g => (
          <article key={g.title} className="skill-group">
            <h3>{g.title}</h3>
            <p className="skill-group__lead">{g.lead}</p>
            <ul className="chips">
              {g.skills.map(s => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="skill-group__used mono">
              <span>↳</span> {g.usedIn.join(' · ')}
            </p>
          </article>
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
