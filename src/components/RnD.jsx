import SectionHead from './SectionHead.jsx';

const items = [
  {
    title: 'ASD Roubis',
    body: 'Gestione della squadra per i tornei estivi e della comunicazione social.',
    href: '/red/asdroubis.html'
  },
  {
    title: 'BeSports 2023',
    body: 'Tornei virtuali su EA FC / FIFA rappresentando l’FC Südtirol.',
    href: '/red/besports_2023.html'
  },
  {
    title: 'Hackathon Clover Venture',
    body: 'Partecipazione all’hackathon di Clover Venture a Udine (maggio 2026).'
  }
];

export default function RnD() {
  return (
    <section id="rnd" className="section container" aria-labelledby="rnd-title">
      <SectionHead id="rnd-title" index="05" kicker="R&D personale" title="Fuori dal codice, stesso metodo." />
      <ul className="rnd" data-stagger>
        {items.map(it => {
          const inner = (
            <>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
              {it.href ? <span className="rnd__arrow" aria-hidden="true">→</span> : null}
            </>
          );
          return (
            <li key={it.title}>
              {it.href ? (
                <a href={it.href} className="rnd__item">
                  {inner}
                </a>
              ) : (
                <div className="rnd__item">{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
