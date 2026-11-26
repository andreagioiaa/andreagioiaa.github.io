import { useCallback, useEffect, useRef, useState } from 'react';
import { setScrollLocked } from '../lib/motion.js';

/*
 * Vetrina grafica di un progetto: schermate reali delle app e grafici prodotti.
 * Due layout (vedi src/data/projects.js):
 *  - 'phones': fila di cornici smartphone;
 *  - 'stage':  una schermata grande (finestra desktop o figura) con selettore a schede
 *              e, facoltativo, un telefono "companion" sovrapposto.
 * Ogni immagine si apre in un lightbox navigabile da tastiera.
 */

const url = (pid, m, w) => `/img/projects/${pid}/${m.name}-${w}.webp`;
const srcSet = (pid, m) => m.sizes.map(w => `${url(pid, m, w)} ${w}w`).join(', ');
const largest = (pid, m) => url(pid, m, m.sizes[m.sizes.length - 1]);

const ZoomIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Lightbox({ pid, items, index, label, onClose, onMove }) {
  const ref = useRef(null);
  const isOpen = index !== null;

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
    if (!isOpen || items.length < 2) return undefined;
    const onKey = e => {
      if (e.key === 'ArrowRight') onMove(1);
      if (e.key === 'ArrowLeft') onMove(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, items.length, onMove]);

  const m = isOpen ? items[index] : null;

  return (
    <dialog
      ref={ref}
      className={`lightbox${m?.frame === 'phone' ? ' lightbox--phone' : ''}`}
      aria-label={label}
      onClose={onClose}
      onClick={e => e.target === ref.current && onClose()}
    >
      {m ? (
        <>
          <figure>
            <img src={largest(pid, m)} alt={m.alt} />
            <figcaption className="mono">
              {index + 1} / {items.length} — {m.caption}
            </figcaption>
          </figure>
          <button className="lightbox__btn lightbox__close" onClick={onClose} aria-label="Chiudi">×</button>
          {items.length > 1 ? (
            <>
              <button className="lightbox__btn lightbox__prev" onClick={() => onMove(-1)} aria-label="Immagine precedente">‹</button>
              <button className="lightbox__btn lightbox__next" onClick={() => onMove(1)} aria-label="Immagine successiva">›</button>
            </>
          ) : null}
        </>
      ) : null}
    </dialog>
  );
}

function useLightbox(count) {
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);
  const move = useCallback(d => setOpen(i => (i === null ? i : (i + d + count) % count)), [count]);
  return { open, setOpen, close, move };
}

function PhoneShot({ pid, m, sizes, onOpen, className = '' }) {
  return (
    <button type="button" className={`device device--phone ${className}`} onClick={onOpen}>
      <span className="device__screen" style={{ aspectRatio: m.ratio }}>
        <img src={url(pid, m, m.sizes[0])} srcSet={srcSet(pid, m)} sizes={sizes} alt={m.alt} loading="lazy" decoding="async" />
      </span>
      <span className="device__zoom" aria-hidden="true"><ZoomIcon /></span>
      <span className="sr-only">Ingrandisci: {m.caption}</span>
    </button>
  );
}

function Phones({ pid, media, featured }) {
  const { items, label } = media;
  const lb = useLightbox(items.length);
  return (
    <div className={`showcase showcase--phones${featured ? ' showcase--wide' : ''}`} style={{ '--n': items.length }}>
      <ul className="phones" aria-label={label}>
        {items.map((m, i) => (
          <li key={m.name}>
            <PhoneShot pid={pid} m={m} sizes="(max-width: 760px) 45vw, 200px" onOpen={() => lb.setOpen(i)} />
            <span className="device__caption mono">{m.caption}</span>
          </li>
        ))}
      </ul>
      <Lightbox pid={pid} items={items} index={lb.open} label={label} onClose={lb.close} onMove={lb.move} />
    </div>
  );
}

function Stage({ pid, media, featured }) {
  const { items, label, frame, windowTitle, companion } = media;
  const all = companion ? [...items, companion] : items;
  const lb = useLightbox(all.length);
  const [active, setActive] = useState(0);
  const tabsRef = useRef(null);
  const cur = items[active];
  const ratio = items[0].ratio;

  const onTabKey = e => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (active + d + items.length) % items.length;
    setActive(next);
    tabsRef.current?.querySelectorAll('[role="tab"]')[next]?.focus();
  };

  const viewSizes = featured ? '(max-width: 1024px) 92vw, 1100px' : '(max-width: 1024px) 92vw, 560px';

  return (
    <div className={`showcase showcase--stage showcase--${frame}${companion ? ' has-companion' : ''}${featured ? ' showcase--wide' : ''}`}>
      <div className="stage">
        <div className="stage__frame">
          {frame === 'window' ? (
            <div className="stage__bar" aria-hidden="true">
              <span className="stage__dots"><i /><i /><i /></span>
              <span className="stage__title mono">{windowTitle} — {cur.caption}</span>
            </div>
          ) : null}
          <button
            type="button"
            className="stage__view"
            style={{ aspectRatio: frame === 'window' ? ratio : 16 / 9 }}
            onClick={() => lb.setOpen(active)}
            id={`${pid}-panel`}
            role={items.length > 1 ? 'tabpanel' : undefined}
            aria-label={`Ingrandisci: ${cur.alt}`}
          >
            {items.map((m, i) => (
              <img
                key={m.name}
                className={i === active ? 'is-active' : undefined}
                src={url(pid, m, m.sizes[0])}
                srcSet={srcSet(pid, m)}
                sizes={viewSizes}
                alt={i === active ? m.alt : ''}
                aria-hidden={i === active ? undefined : 'true'}
                loading="lazy"
                decoding="async"
              />
            ))}
            <span className="device__zoom" aria-hidden="true"><ZoomIcon /></span>
          </button>
        </div>
        {companion ? (
          <PhoneShot
            pid={pid}
            m={companion}
            sizes="(max-width: 760px) 30vw, 160px"
            className="stage__companion"
            onOpen={() => lb.setOpen(items.length)}
          />
        ) : null}
      </div>

      {items.length > 1 ? (
        <div className="stage__tabs" role="tablist" aria-label={label} ref={tabsRef} onKeyDown={onTabKey}>
          {items.map((m, i) => (
            <button
              key={m.name}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls={`${pid}-panel`}
              tabIndex={i === active ? 0 : -1}
              className="stage__tab mono"
              onClick={() => setActive(i)}
            >
              <span>{String(i + 1).padStart(2, '0')}</span> {m.caption}
            </button>
          ))}
        </div>
      ) : null}

      <Lightbox pid={pid} items={all} index={lb.open} label={label} onClose={lb.close} onMove={lb.move} />
    </div>
  );
}

export default function ProjectShowcase({ pid, media, featured = false }) {
  if (!media) return null;
  return media.layout === 'phones' ? (
    <Phones pid={pid} media={media} featured={featured} />
  ) : (
    <Stage pid={pid} media={media} featured={featured} />
  );
}
