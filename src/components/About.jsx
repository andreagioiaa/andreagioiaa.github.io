import SectionHead from './SectionHead.jsx';

const birth = new Date('2002-07-29');
const age = (() => {
  const now = new Date();
  let a = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) a--;
  return a;
})();

const principles = [
  {
    n: '01',
    title: 'Parti dai vincoli',
    body: 'Prima di scegliere uno stack chiedo: quanta energia, quanta banda, quanti millisecondi? L’architettura discende dalla fisica del problema, non dalla moda del momento.'
  },
  {
    n: '02',
    title: 'Misura, poi decidi',
    body: 'Un benchmark batte un’opinione. Profilo, confronto teoria e pratica, e lascio che siano i dati a scegliere tra due soluzioni.'
  },
  {
    n: '03',
    title: 'Automatizza il ripetibile',
    body: 'Se lo faccio due volte, la terza è uno script. Se richiede giudizio, resta umano. Gli agenti AI vivono esattamente su questo confine.'
  }
];

const facts = [
  <>Andrea, {age} anni, da <b>Cormòns</b> (GO), nel cuore del Collio friulano.</>,
  <>Studente di <b>Internet of Things, Big Data &amp; Machine Learning</b> all’Università di Udine (dal 2023).</>,
  <><b>9 mesi da sviluppatore software</b> (gennaio – settembre 2023): codice in produzione prima dell’università.</>,
  <>In campo con il <b>Farra Calcio</b> (Terza Categoria) e un passato competitivo negli eSports su EA FC.</>
];

export default function About() {
  return (
    <section id="chi-sono" className="section container" aria-labelledby="about-title">
      <SectionHead id="about-title" index="01" kicker="Approccio" title="Primi principi, non abitudini.">
        Lavoro trasversalmente sullo stack perché i problemi veri non rispettano i confini tra hardware, software e dati.
        Un bug di batteria può essere un problema di backend; una UI lenta può essere un problema di schema.
      </SectionHead>

      <div className="principles" data-stagger>
        {principles.map(p => (
          <article key={p.n} className="principle">
            <span className="principle__n mono">{p.n}</span>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </article>
        ))}
      </div>

      <ul className="facts" data-stagger>
        {facts.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
    </section>
  );
}
