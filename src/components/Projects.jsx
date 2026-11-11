import SectionHead from './SectionHead.jsx';
import ProjectCard from './ProjectCard.jsx';
import { projects } from '../data/projects.js';

export default function Projects() {
  const [featured, ...rest] = projects;
  return (
    <section id="progetti" className="section container" aria-labelledby="projects-title">
      <SectionHead id="projects-title" index="02" kicker="Progetti" title="Problemi reali, architetture esplicite.">
        Ogni progetto è raccontato nello stesso ordine in cui l’ho affrontato: prima il vincolo, poi la struttura,
        infine gli strumenti. Tutto il codice è pubblico su GitHub.
      </SectionHead>

      <div data-reveal>
        <ProjectCard project={featured} />
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
