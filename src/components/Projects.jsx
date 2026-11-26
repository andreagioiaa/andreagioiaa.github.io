import SectionHead from './SectionHead.jsx';
import ProjectCard from './ProjectCard.jsx';
import { projects } from '../data/projects.js';

export default function Projects() {
  const featured = projects.filter(p => p.featured);
  const rest = projects.filter(p => !p.featured);
  return (
    <section id="progetti" className="section container" aria-labelledby="projects-title">
      <SectionHead id="projects-title" index="02" kicker="Progetti" title="Problemi reali, architetture esplicite.">
        Ogni progetto parte da ciò che si vede, con schermate reali delle app e dei risultati, poi segue l’ordine in cui
        l’ho affrontato: prima il vincolo, poi la struttura, infine gli strumenti.
      </SectionHead>

      <div className="projects-featured">
        {featured.map(p => (
          <div key={p.id} data-reveal>
            <ProjectCard project={p} />
          </div>
        ))}
      </div>

      <div className="projects-grid" data-stagger>
        {rest.map(p => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      <p className="more" data-reveal>
        <a href="https://github.com/andreagioiaa" target="_blank" rel="noopener noreferrer" className="link">
          Tutti i repository su github.com/andreagioiaa →
        </a>
      </p>
    </section>
  );
}
