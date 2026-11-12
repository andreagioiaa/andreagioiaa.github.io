import { useCallback, useEffect, useRef, useState } from 'react';
import SectionHead from './SectionHead.jsx';
import { setScrollLocked } from '../lib/motion.js';

const photos = [
  { id: 'DSC_6275', alt: 'Setup e concentrazione pre-partita' },
  { id: 'DSC_6354', alt: 'Intervista post-match' },
  { id: 'DSC_6308', alt: 'Confronto con il compagno di squadra' }
];
const src = (id, w) => `/img/${id}-${w}.webp`;

const Ext = ({ href, children }) => (
  <a className="link" href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

function Lightbox({ index, onClose, onMove }) {
  const ref = useRef(null);

  const isOpen = index !== null;

  // Apertura/chiusura: dipende solo da isOpen, non dalla foto corrente.
  useEffect(() => {
    const dlg = ref.current;
    if (!isOpen) return undefined;
    if (!dlg.open) dlg.showModal();
    setScrollLocked(true);
    return () => {
      setScrollLocked(false);
      if (dlg.open) dlg.close();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = e => {
      if (e.key === 'ArrowRight') onMove(1);
      if (e.key === 'ArrowLeft') onMove(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onMove]);

  const photo = index !== null ? photos[index] : null;

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label="Galleria BeSports 2023"
      onClose={onClose}
      onClick={e => e.target === ref.current && onClose()}
    >
      {photo ? (
        <>
          <figure>
            <img src={src(photo.id, 1600)} alt={photo.alt} width="1600" height="1067" />
            <figcaption className="mono">
              {index + 1} / {photos.length} — {photo.alt}
            </figcaption>
          </figure>
          <button className="lightbox__btn lightbox__close" onClick={onClose} aria-label="Chiudi">×</button>
          <button className="lightbox__btn lightbox__prev" onClick={() => onMove(-1)} aria-label="Foto precedente">‹</button>
          <button className="lightbox__btn lightbox__next" onClick={() => onMove(1)} aria-label="Foto successiva">›</button>
        </>
      ) : null}
    </dialog>
  );
}

export default function RnD() {
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);
  const move = useCallback(d => setOpen(i => (i === null ? i : (i + d + photos.length) % photos.length)), []);

  return (
    <section id="rnd" className="section container" aria-labelledby="rnd-title">
      <SectionHead id="rnd-title" index="05" kicker="R&D personale" title="Fuori dal codice, stesso metodo.">
        Squadre da organizzare, tornei da preparare, idee da validare sotto pressione: è qui che alleno le competenze che il
        codice da solo non insegna.
      </SectionHead>

      <div className="rnd">
        <article id="rnd-besports" className="rnd-entry rnd-entry--featured" data-reveal>
          <div className="rnd-entry__meta mono">
            <span>2023</span>
            <span>eSports · EA FC</span>
            <span className="rnd-entry__badge">3°–4° posto</span>
          </div>
          <div className="rnd-entry__body">
            <h3>BeSports 2023</h3>
            <p className="rnd-entry__lead">
              Ho rappresentato l’<b>FC Südtirol</b> nel campionato virtuale di Serie B BeSports, organizzato da We Arena.
            </p>
            <p>
              È iniziato in modo del tutto inaspettato: un messaggio, una chiamata, la decisione di mettersi in gioco.
              Prima del torneo non avevo mai incontrato il mio compagno di squadra, eppure da quella collaborazione è
              nata un’intesa che dura ancora oggi. Torneo affrontato spalla a spalla con{' '}
              <Ext href="https://www.instagram.com/andrea_ablondi10/">Andrea Ablondi</Ext>, chiuso in posizione 3–4.
            </p>
            <ul className="gallery" aria-label="Foto del torneo">
              {photos.map((p, i) => (
                <li key={p.id}>
                  <button className="gallery__item" onClick={() => setOpen(i)} aria-label={`Apri foto: ${p.alt}`}>
                    <img
                      src={src(p.id, 800)}
                      srcSet={`${src(p.id, 800)} 800w, ${src(p.id, 1600)} 1600w`}
                      sizes="(max-width: 760px) 100vw, 33vw"
                      alt={p.alt}
                      width="800"
                      height="533"
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article id="rnd-asdroubis" className="rnd-entry" data-reveal>
          <div className="rnd-entry__meta mono">
            <span>2022 — oggi</span>
            <span>Community · Social</span>
          </div>
          <div className="rnd-entry__body">
            <h3>ASD Roubis</h3>
            <p className="rnd-entry__lead">
              Squadra di calcio e pallavolo nata tra amici per i tornei estivi.
            </p>
            <p>
              Prima apparizione nel 2022 al torneo di San Valeriano, poi la fondazione ufficiale nel 2023. Mi occupo della
              parte social: scrittura dei post, selezione e pubblicazione delle foto. Il{' '}
              <Ext href="https://www.instagram.com/asdroubis/">profilo Instagram</Ext> è gestito insieme a{' '}
              <Ext href="https://www.instagram.com/matteo.zonch/">Matteo Zonch</Ext>.
            </p>
          </div>
        </article>

        <article id="rnd-hackathon" className="rnd-entry" data-reveal>
          <div className="rnd-entry__meta mono">
            <span>Maggio 2026</span>
            <span>Hackathon · Udine</span>
          </div>
          <div className="rnd-entry__body">
            <h3>Hackathon Clover Venture</h3>
            <p className="rnd-entry__lead">
              Partecipazione all’hackathon di Clover Venture a Udine: un problema, un team, poche ore per passare
              dall’idea a qualcosa che funziona.
            </p>
          </div>
        </article>
      </div>

      <Lightbox index={open} onClose={close} onMove={move} />
    </section>
  );
}
