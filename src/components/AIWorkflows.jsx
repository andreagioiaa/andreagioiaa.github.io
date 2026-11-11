import SectionHead from './SectionHead.jsx';
import SpotlightCard from './reactbits/SpotlightCard.jsx';
import { aiWorkflows, aiPipeline } from '../data/skills.js';

export default function AIWorkflows() {
  return (
    <section id="ai" className="section container" aria-labelledby="ai-title">
      <SectionHead id="ai-title" index="04" kicker="AI & Agentic Workflows" title="L’AI come strumento di ingegneria.">
        Non un chatbot a cui chiedere codice, ma un componente del sistema: modelli locali, contesto strutturato,
        agenti che eseguono e un umano che verifica.
      </SectionHead>

      <ol className="pipeline" data-stagger aria-label="Il mio ciclo di sviluppo assistito da AI">
        {aiPipeline.map((step, i) => (
          <li key={step}>
            <span className="mono">{String(i + 1).padStart(2, '0')}</span>
            {step}
          </li>
        ))}
      </ol>

      <div className="ai-grid" data-stagger>
        {aiWorkflows.map(w => (
          <SpotlightCard key={w.title} className="ai-card" spotlightColor="#ff5e00" intensity={0.1} spotlightSize={260} flare={false}>
            <p className="ai-card__tool mono">{w.tool}</p>
            <h3>{w.title}</h3>
            <p>{w.body}</p>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
