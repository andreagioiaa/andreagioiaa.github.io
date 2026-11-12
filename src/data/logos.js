// Loghi dello stack (Simple Icons, CC0). Ogni riga diventa un LogoLoop.
import {
  siCplusplus, siArduino, siEspressif, siPython, siDart, siFlutter, siJavascript, siOpenjdk,
  siPocketbase, siSqlite, siMysql, siNodedotjs, siExpress, siFirebase,
  siPandas, siNumpy, siScipy, siScikitlearn, siJupyter,
  siHtml5, siCss, siReact, siVite, siGsap, siPhp,
  siLinux, siGnubash, siGit, siGithub, siLatex, siOllama, siModelcontextprotocol
} from 'simple-icons';

const entry = (icon, title = icon.title) => ({ icon, title });

export const logoRows = [
  {
    label: 'Hardware & linguaggi',
    items: [
      entry(siCplusplus, 'C++'),
      entry(siArduino),
      entry(siEspressif, 'ESP32'),
      entry(siPython),
      entry(siDart),
      entry(siFlutter),
      entry(siJavascript),
      entry(siOpenjdk, 'Java')
    ]
  },
  {
    label: 'Backend & dati',
    items: [
      entry(siPocketbase),
      entry(siSqlite),
      entry(siMysql),
      entry(siNodedotjs, 'Node.js'),
      entry(siExpress),
      entry(siFirebase),
      entry(siPandas),
      entry(siNumpy),
      entry(siScipy),
      entry(siScikitlearn, 'scikit-learn'),
      entry(siJupyter)
    ]
  },
  {
    label: 'Web, sistemi & AI',
    items: [
      entry(siHtml5, 'HTML5'),
      entry(siCss, 'CSS'),
      entry(siReact),
      entry(siVite),
      entry(siGsap, 'GSAP'),
      entry(siPhp, 'PHP'),
      entry(siLinux, 'Linux / WSL'),
      entry(siGnubash, 'Bash'),
      entry(siGit),
      entry(siGithub),
      entry(siLatex, 'LaTeX'),
      entry(siOllama),
      entry(siModelcontextprotocol, 'MCP')
    ]
  }
];

// Colore di brand all'hover; i marchi troppo scuri per lo sfondo diventano bianchi.
export function hoverColorFor(hex) {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(v => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum < 0.08 ? '#ffffff' : `#${hex}`;
}
