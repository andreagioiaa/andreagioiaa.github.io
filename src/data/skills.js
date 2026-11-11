// Hard skills ricavate dal codice reale dei repository.
// `usedIn` collega ogni area ai progetti in cui è applicata.

export const skillGroups = [
  {
    title: 'Low-level & IoT',
    lead: 'Dove ogni milliampere e ogni byte contano.',
    skills: ['C++', 'Arduino', 'ESP32-S3', 'I²C · sensori', 'LTE / GNSS', 'Deep sleep & power management'],
    usedIn: ['IoT PetTracker']
  },
  {
    title: 'Linguaggi & Mobile',
    lead: 'Lo strumento giusto per il livello giusto.',
    skills: ['Python', 'Dart', 'Flutter', 'JavaScript', 'Java'],
    usedIn: ['StudyFlow', 'CAlcool', 'IoT PetTracker']
  },
  {
    title: 'Backend & Database',
    lead: 'Dati che arrivano sporchi, escono strutturati.',
    skills: ['PocketBase', 'SQL', 'SQLite', 'MySQL', 'Node.js · Express', 'Firebase FCM', 'REST / HTTPS'],
    usedIn: ['IoT PetTracker', 'StudyFlow']
  },
  {
    title: 'Data & Analisi',
    lead: 'Misurare prima di affermare.',
    skills: ['pandas', 'NumPy', 'SciPy', 'scikit-learn', 'NetworkX', 'GeoPandas', 'Jupyter'],
    usedIn: ['Anatomia di un trasferimento', 'Rete di co-autorialità', 'Benchmark ordinamento']
  },
  {
    title: 'Web Stack',
    lead: 'Interfacce veloci, accessibili, misurabili.',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vite', 'GSAP', 'PHP'],
    usedIn: ['Questo sito']
  },
  {
    title: 'Sistemi & Tooling',
    lead: 'Un ambiente riproducibile vale più di un IDE.',
    skills: ['Linux', 'WSL', 'Bash', 'Git / GitHub', 'PyInstaller', 'LaTeX'],
    usedIn: ['Tutti i progetti']
  }
];

export const aiWorkflows = [
  {
    title: 'LLM locali',
    tool: 'Ollama',
    body: 'Modelli eseguiti in locale: privacy dei dati, costo marginale zero, latenza prevedibile. Il cloud diventa una scelta, non un obbligo.'
  },
  {
    title: 'Model Context Protocol',
    tool: 'MCP',
    body: 'Un protocollo standard per collegare un LLM a file, API e tool. Il modello smette di indovinare e inizia a leggere il contesto reale.'
  },
  {
    title: 'Tool agentici',
    tool: 'OpenCode · REA',
    body: 'Agenti che leggono il codice, pianificano, eseguono comandi e iterano. Li uso per delegare il lavoro meccanico, non il giudizio.'
  },
  {
    title: 'Sviluppo assistito da AI',
    tool: 'AI-in-the-loop',
    body: 'Specifica chiara, contesto completo, review umana, test. L’AI accelera il ciclo; la responsabilità dell’architettura resta mia.'
  }
];

export const aiPipeline = ['Specifica', 'Contesto (MCP)', 'Agente', 'Review umana', 'Test'];

export const softSkills = ['Problem solving', 'Team working', 'Adattabilità', 'Comunicazione tecnica'];
