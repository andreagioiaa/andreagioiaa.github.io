import SectionHead from './SectionHead.jsx';
import Magnet from './reactbits/Magnet.jsx';

const links = [
  { label: 'Email', value: 'andreagioia.me@gmail.com', href: 'mailto:andreagioia.me@gmail.com' },
  { label: 'LinkedIn', value: 'in/andrea-gioia', href: 'https://www.linkedin.com/in/andrea-gioia-84a7b7256/', external: true },
  { label: 'GitHub', value: 'andreagioiaa', href: 'https://github.com/andreagioiaa', external: true }
];

export default function Contact() {
  return (
    <section id="contatti" className="section container contact" aria-labelledby="contact-title">
      <SectionHead id="contact-title" index="06" kicker="Contatti" title="Hai un problema con vincoli veri? Parliamone." />

      <ul className="contact__links" data-stagger>
        {links.map(l => (
          <li key={l.label}>
            <Magnet padding={40} magnetStrength={4} wrapperClassName="contact__magnet" style={{ display: 'block' }}>
              <a
                className="contact__link"
                href={l.href}
                {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="mono">{l.label}</span>
                <strong>{l.value}</strong>
              </a>
            </Magnet>
          </li>
        ))}
      </ul>

      <div className="status" data-reveal>
        <span className="status__dot" aria-hidden="true" />
        <p>
          <strong>Stato:</strong> focus sul completamento degli studi. Disponibile per collaborazioni mirate e progetti a
          breve termine. Base a Cormòns (GO), da remoto ovunque.
        </p>
      </div>
    </section>
  );
}
