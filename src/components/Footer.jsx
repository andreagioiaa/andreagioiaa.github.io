export default function Footer() {
  return (
    <footer className="footer container">
      <p className="mono">© {new Date().getFullYear()} Andrea Gioia</p>
      <p className="mono footer__credits">
        Costruito con React + Vite · GSAP · Lenis · componenti{' '}
        <a href="https://reactbits.dev" target="_blank" rel="noopener noreferrer">React Bits</a>
      </p>
    </footer>
  );
}
