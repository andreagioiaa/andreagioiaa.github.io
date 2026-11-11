export default function SectionHead({ index, kicker, title, children, id }) {
  return (
    <header className="section-head">
      <p className="section-head__kicker mono" data-reveal>
        <span>{index}</span> {kicker}
      </p>
      <h2 id={id} className="section-head__title" data-reveal>
        {title}
      </h2>
      <span className="section-head__rule" aria-hidden="true" />
      {children ? (
        <p className="section-head__lead" data-reveal>
          {children}
        </p>
      ) : null}
    </header>
  );
}
