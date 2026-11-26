import SpotlightCard from './reactbits/SpotlightCard.jsx';
import ProjectShowcase from './ProjectShowcase.jsx';

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M12 2A10 10 0 0 0 8.84 21.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" strokeLinecap="round" />
  </svg>
);

const LiveIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Installer in public/downloads (lista generata da vite.config.js al momento della build).
const PLATFORM = { exe: 'Windows', msi: 'Windows', apk: 'Android' };
const mb = bytes => `${(bytes / 1048576).toFixed(bytes < 10485760 ? 1 : 0)} MB`;

function downloadsFor(project) {
  const prefix = project.title.toLowerCase();
  return __DOWNLOADS__.filter(d => d.file.toLowerCase().startsWith(`${prefix}.`)).map(d => {
    const ext = d.file.split('.').pop().toLowerCase();
    return {
      type: 'download',
      href: `/downloads/${d.file}`,
      download: d.file,
      label: `Scarica per ${PLATFORM[ext]}`,
      detail: `.${ext} · ${mb(d.size)}`
    };
  });
}

export default function ProjectCard({ project }) {
  const { index, title, kind, repo, problem, solution, stack, flow, featured, media } = project;
  const links = [...downloadsFor(project), ...(project.links ?? [])];
  const headingId = `p-${project.id}`;

  return (
    <SpotlightCard
      className={`project${featured ? ' project--featured' : ''}`}
      spotlightColor="#ff5e00"
      intensity={0.12}
      spotlightSize={featured ? 420 : 300}
      theme="dark"
      flare={false}
      role="article"
      aria-labelledby={headingId}
    >
      <header className="project__head">
        <span className="project__index mono">{index}</span>
        <div>
          <p className="project__kind mono">{kind}</p>
          <h3 id={headingId} className="project__title">{title}</h3>
        </div>
        <div className="project__actions">
          {links.map(l => (
            <a
              key={l.href}
              className="project__repo project__repo--action"
              href={l.href}
              {...(l.type === 'download'
                ? { download: l.download, title: l.detail }
                : { target: '_blank', rel: 'noopener noreferrer' })}
            >
              {l.type === 'download' ? <DownloadIcon /> : <LiveIcon />}
              <span>{l.label}</span>
              <span className="sr-only"> — {title}{l.detail ? ` (${l.detail})` : ''}</span>
            </a>
          ))}
          {repo ? (
            <a className="project__repo" href={repo} target="_blank" rel="noopener noreferrer">
              <GitHubIcon />
              <span>Codice</span>
              <span className="sr-only"> di {title} su GitHub</span>
            </a>
          ) : (
            <span className="project__repo project__repo--private" title="Il codice sorgente è in un repository privato">
              <LockIcon />
              <span>Repo privato</span>
            </span>
          )}
        </div>
      </header>

      <ProjectShowcase pid={project.id} media={media} featured={featured} />

      <div className="project__body">
        <div className="project__block">
          <h4 className="project__label mono">
            <span>A</span> Problema
          </h4>
          <p className="project__problem">{problem}</p>
        </div>

        <div className="project__block">
          <h4 className="project__label mono">
            <span>B</span> Soluzione architetturale
          </h4>
          {flow ? (
            <ol className="flow" aria-label="Flusso dei dati">
              {flow.map(step => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          ) : null}
          <ul className="project__solution">
            {solution.map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="project__block">
          <h4 className="project__label mono">
            <span>C</span> Tech stack
          </h4>
          <ul className="chips">
            {stack.map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </SpotlightCard>
  );
}
