// Progetti reali dal profilo GitHub (github.com/andreagioiaa).
// Formato scheda: Vetrina → Problema → Soluzione architetturale → Tech Stack.
//
// `media` descrive la vetrina grafica della scheda (vedi ProjectShowcase.jsx):
//   - layout 'phones': fila di schermate in cornice smartphone;
//   - layout 'stage':  una schermata grande (finestra desktop o figura) con
//                      selettore a miniature e, facoltativo, un telefono affiancato.
// Le immagini stanno in public/img/projects/<id>/<nome>-<larghezza>.webp:
// `sizes` elenca le larghezze generate, `ratio` è larghezza/altezza dell'originale.
// `repo: null` indica un repository privato (nessun link al codice).

const phone = (name, alt, caption) => ({ name, alt, caption, frame: 'phone', ratio: 9 / 16, sizes: [360, 720] });

export const projects = [
  {
    id: 'pettracker',
    featured: true,
    index: '01',
    title: 'IoT PetTracker',
    kind: 'IoT end-to-end · Embedded → Cloud → Mobile',
    repo: 'https://github.com/andreagioiaa/IoT_PetTracker',
    media: {
      layout: 'phones',
      label: 'Schermate dell’app Flutter',
      items: [
        phone('app-1', 'Mappa con l’area sicura disegnata attorno al campus', 'Area sicura sulla mappa'),
        phone('app-2', 'Editor della zona sicura su vista satellitare con quattro vertici trascinabili', 'Disegno del geofence'),
        phone('app-3', 'Percorso registrato durante un viaggio con passi, chilometri e durata', 'Sessione “in viaggio”'),
        phone('app-4', 'Form di creazione di una nuova area con nome, città e indirizzo', 'Nuova area'),
        phone('app-5', 'Dialogo che propone di creare l’area sulla posizione attuale', 'Area dalla posizione attuale'),
        phone('app-6', 'Timeline giornaliera delle attività: scappato, in viaggio, passeggiata', 'Timeline delle attività')
      ].map(m => ({ ...m, ratio: 1080 / 1920 }))
    },
    problem:
      'Sapere dov’è un animale, in tempo reale, con un dispositivo che vive a batteria al collo. Ogni secondo di radio accesa costa autonomia, ogni pacchetto perso costa fiducia: il vincolo non è il codice, è l’energia.',
    solution: [
      'Firmware C++ su ESP32-S3 (LilyGo T-SIM7670G-S3): modem LTE + GNSS e accelerometro BMA400 su I²C. Deep sleep con risveglio su interrupt di movimento e GNSS hot-start per accorciare il time-to-fix.',
      'Ingestione via HTTPS su PocketBase: i pacchetti grezzi passano da una tabella di staging, vengono elaborati da hook server-side e poi eliminati per tenere SQLite snello.',
      'Macchina a stati che classifica l’attività dell’animale, cron job di watchdog e split notturno delle sessioni.',
      'Microservizio Node.js/Express come bridge verso Firebase Cloud Messaging, perché il runtime JS di PocketBase (Goja) non supporta l’SDK Firebase.',
      'App Flutter multipiattaforma con mappa live, geofencing delle zone sicure e notifiche push di allontanamento.'
    ],
    flow: ['ESP32-S3 + GNSS', 'LTE · HTTPS', 'PocketBase hooks', 'FCM bridge', 'App Flutter'],
    stack: ['C++ / Arduino', 'ESP32-S3', 'LTE + GNSS', 'BMA400 (I²C)', 'PocketBase', 'SQLite', 'JavaScript', 'Node.js', 'Firebase FCM', 'Flutter / Dart', 'LaTeX']
  },
  {
    id: 'lectio',
    featured: true,
    index: '02',
    title: 'Lectio',
    kind: 'Desktop app · Studio offline-first · Python',
    repo: 'https://github.com/andreagioiaa/Lectio',
    media: {
      layout: 'stage',
      frame: 'window',
      windowTitle: 'Lectio',
      label: 'Schermate dell’app desktop',
      items: [
        { name: 'pomodoro', caption: 'Pomodoro', alt: 'Timer Pomodoro con stato della sessione e protezione dell’attenzione' },
        { name: 'analisi', caption: 'Analisi', alt: 'Dashboard con ore studiate, Quality Score e grafici dei tentativi di distrazione' },
        { name: 'flashcard', caption: 'Flashcard', alt: 'Archivio di flashcard con stati di ripetizione spaziata e filtri per materia' },
        { name: 'calendario', caption: 'Calendario', alt: 'Agenda giornaliera con lezioni colorate per materia e avvio rapido dello studio' },
        { name: 'blocco', caption: 'Blocco', alt: 'Impostazioni del blocco di siti web e applicazioni durante lo studio' },
        { name: 'materie', caption: 'Materie', alt: 'Pagina di una materia con countdown all’esame e materiali collegati' }
      ].map(m => ({ ...m, ratio: 1340 / 840, sizes: [720, 1360] }))
    },
    problem:
      'Lo studio si frammenta tra calendario, PDF, slide, videolezioni e notifiche. I tool esistenti vivono nel cloud, non bloccano davvero le distrazioni e non dicono quanto si è studiato sul serio.',
    solution: [
      'App desktop offline-first (nata come StudyFlow): UI CustomTkinter, stato in SQLite locale, distribuita come singolo eseguibile PyInstaller. Nessun server, nessun cloud.',
      'Timer Pomodoro su clock monotonic in un thread dedicato; ogni sessione è legata a materia, materiale o evento del calendario.',
      'Blocco distrazioni a livello di sistema: sezione gestita del file hosts tramite un processo guardiano elevato, kill dei processi in blacklist via psutil, listener loopback 80/443 (Host/SNI) e ripristino automatico su crash o heartbeat assente.',
      'Calendario .ics/iCal con RRULE/EXDATE oppure sync bidirezionale con Google Calendar (OAuth 2.0 PKCE, coda offline); flashcard con ripetizione spaziata SM-2 in stile Anki.',
      'Pipeline locale da PDF e slide a TXT/LaTeX/Word (PyMuPDF, OCR opzionale, ricostruzione delle formule) e trascrizione delle videolezioni con whisper.cpp: nessun dato lascia la macchina.',
      'Dashboard con Quality Score e grafici Matplotlib incorporati, importati in modo lazy per un avvio leggero; 19 suite di test pytest.'
    ],
    stack: ['Python', 'CustomTkinter', 'SQLite', 'psutil', 'whisper.cpp', 'FFmpeg', 'PyMuPDF', 'icalendar', 'OAuth 2.0 PKCE', 'Matplotlib', 'pytest', 'PyInstaller']
  },
  {
    id: 'roubis',
    index: '03',
    title: 'Roubis',
    kind: 'Web app full-stack · Next.js + Supabase',
    repo: null,
    media: {
      layout: 'stage',
      frame: 'window',
      windowTitle: 'roubis · eventi tra amici',
      label: 'Schermate della web app',
      companion: {
        name: 'm-event',
        alt: 'Dettaglio di un evento da smartphone con adesione e badge di stato',
        caption: 'Da smartphone',
        frame: 'phone',
        ratio: 780 / 1600,
        sizes: [360, 720]
      },
      items: [
        { name: 'dash', caption: 'Dashboard', alt: 'Dashboard del gruppo con contatori e prossimi eventi', ratio: 1280 / 820 },
        { name: 'evento', caption: 'Evento', alt: 'Dettaglio evento con partecipanti, voci di spesa e quota di ciascuno', ratio: 1280 / 1300 },
        { name: 'events', caption: 'Eventi', alt: 'Elenco degli eventi con filtri per stato e totale soldi', ratio: 1280 / 820 },
        { name: 'ricordi', caption: 'Ricordi', alt: 'Bacheca dei ricordi condivisi dal gruppo', ratio: 1280 / 820 }
      ].map(m => ({ ...m, sizes: [720, 1280] }))
    },
    problem:
      'Organizzare una grigliata tra amici vuol dire chat infinite: chi viene, chi porta cosa, quanto deve ciascuno. E chi non partecipa a una voce di spesa non dovrebbe pagarla.',
    solution: [
      'Next.js 16 (App Router, Server Actions) su Vercel e Supabase per Auth e PostgreSQL; UI responsive in Tailwind CSS v4 con animazioni GSAP e Lenis.',
      'Multi-tenant a gruppi: codici d’invito senza caratteri ambigui, ruoli admin/membro per gruppo e un trigger che garantisce sempre almeno un admin.',
      'Sicurezza nel database: Row Level Security su ogni tabella, revoke esplicito dei grant di anon, eventi riservati visibili solo a invitati e admin.',
      'Spese con quota personale: ogni voce è “a persona” o “totale da dividere” e ciascuno aderisce solo alle voci che lo riguardano; lista della spesa condivisa con spunte ed export .txt.',
      'Migrazioni SQL versionate, seed demo riproducibile e cron Vercel di keep-alive per restare nel piano gratuito.'
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'PostgreSQL', 'Row Level Security', 'Tailwind CSS v4', 'GSAP', 'Vercel']
  },
  {
    id: 'parkingudine',
    index: '04',
    title: 'ParkingUdine',
    kind: 'Web app mobile-first · TypeScript · Edge',
    repo: null,
    media: {
      layout: 'phones',
      label: 'Schermate della web app “Parcheggia a Udine”',
      items: [
        phone('form', 'Form con destinazione, ora di arrivo e durata della sosta', 'Una domanda'),
        phone('proposte', 'Tre proposte di parcheggio con costo stimato e minuti a piedi', 'Tre proposte'),
        phone('scheda', 'Scheda del parcheggio con tariffe, pagamenti e ricarica auto elettriche', 'Scheda parcheggio')
      ].map(m => ({ ...m, ratio: 780 / 1560 }))
    },
    problem:
      'Chi arriva a Udine sa dove deve andare, non dove lasciare l’auto. Tariffe a frazioni, forfait e fasce gratuite rendono difficile capire quale parcheggio convenga, e gli strumenti esistenti mostrano solo quanti posti sono liberi.',
    solution: [
      'Una domanda, una risposta: destinazione, orario e durata diventano tre proposte (la più rapida, il compromesso, la più economica) con costo stimato, minuti a piedi e “Portami lì” su Google Maps o Apple Mappe.',
      'Core di funzioni pure testate con Vitest: costo con frazioni, forfait e fasce gratuite, distanza a piedi, piano B quando il parcheggio rischia di essere pieno.',
      'Dataset generato da script: estrazione OpenStreetMap più parcheggi SSM curati a mano; i dati mancanti vengono tracciati, mai inventati.',
      'Un Cloudflare Worker sullo stesso deploy serve l’API dei posti liberi e, con un Cron Trigger ogni 5 minuti, storicizza le rilevazioni su D1 per stimare l’affluenza tipica.',
      'Frontend senza framework (TypeScript + Vite), Leaflet caricato solo quando serve, testi in i18n: progetto a costo zero.'
    ],
    flow: ['Form', 'treProposte()', 'Leaflet', 'Worker /api', 'D1 + Cron'],
    stack: ['TypeScript', 'Vite', 'Leaflet', 'OpenStreetMap', 'Vitest', 'Cloudflare Workers', 'D1 (SQLite)', 'Wrangler']
  },
  {
    id: 'calcool',
    index: '05',
    title: 'CAlcool',
    kind: 'Mobile app · Offline-first',
    repo: 'https://github.com/andreagioiaa/CAlcool',
    media: {
      layout: 'phones',
      label: 'Schermate dell’app Flutter',
      items: [
        phone('onboarding', 'Onboarding con nome, sesso, peso, altezza ed età', 'Profilo'),
        phone('home', 'Home con tasso alcolemico attuale, orari di rientro e timeline del giorno', 'BAC in tempo reale'),
        phone('bevanda', 'Selettore delle bevande per categoria con volume e gradazione', 'Scegli bevanda'),
        phone('libreria', 'Libreria delle bevande con conteggio delle consumazioni', 'Libreria drink')
      ].map(m => ({ ...m, ratio: 1 / 2 }))
    },
    problem:
      'Stimare il tasso alcolemico senza consegnare dati sensibili a un server. Le app comuni ignorano il cibo e l’andamento nel tempo.',
    solution: [
      'Motore di calcolo BAC basato sulle formule di Widmark e Watson, ricalcolato su profilo (età, peso, altezza, sesso).',
      'Modello di assorbimento bidirezionale: un pasto entro 3 ore (prima o dopo) attenua l’impatto del 25%, uno spuntino entro 1 ora del 10%.',
      'Zero rete: persistenza locale, timeline cronologica degli inserimenti, export/import JSON per il backup manuale.'
    ],
    stack: ['Flutter / Dart', 'Storage locale', 'JSON', 'Android', 'UI neumorfica']
  },
  {
    id: 'transfer',
    index: '06',
    title: 'Anatomia di un trasferimento',
    kind: 'Data Science · Analisi esplorativa',
    repo: 'https://github.com/andreagioiaa/Anatomia-di-un-trasferimento---Progetto-Data-Science',
    media: {
      layout: 'stage',
      frame: 'figure',
      label: 'Grafici dell’analisi',
      items: [
        { name: 'trend', caption: 'Spesa vs valore', alt: 'Spesa nominale e valore stimato per stagione, con aree di overspending', ratio: 1400 / 700, sizes: [720, 1400] },
        { name: 'scatter', caption: 'Volume vs spesa', alt: 'Dispersione tra numero di acquisti e spesa totale per stagione, con trend lineare', ratio: 1200 / 700, sizes: [720, 1400] },
        { name: 'heatmap', caption: 'Età × ruolo', alt: 'Heatmap del valore medio per fascia d’età e ruolo', ratio: 1000 / 500, sizes: [720, 1400] },
        { name: 'boxplot', caption: 'Età e valore', alt: 'Boxplot del valore di mercato per età in scala logaritmica', ratio: 1600 / 900, sizes: [720, 1400] }
      ]
    },
    problem:
      'Il calciomercato muove cifre enormi, ma quanto valgono davvero età, trend di mercato ed efficienza di un acquisto? Domande che meritano dati, non opinioni.',
    solution: [
      'Pipeline pandas sul dataset Transfermarkt (Kaggle): pulizia, join tra giocatori, club e valutazioni.',
      'Tre assi di analisi: trend storico delle spese, fattore età, efficienza dei trasferimenti.',
      'Test statistici con SciPy, modelli con scikit-learn, mappe con GeoPandas; output impaginato come slide direttamente dal notebook.'
    ],
    stack: ['Python', 'pandas', 'NumPy', 'SciPy', 'scikit-learn', 'GeoPandas', 'Seaborn', 'Jupyter']
  },
  {
    id: 'soccom',
    index: '07',
    title: 'Rete di co-autorialità DMIF',
    kind: 'Social Computing · Network analysis · Team',
    repo: 'https://github.com/andreagioiaa/Progetto-SocCom---2025-2026---Consegna-Gioia_Nicodemo_Gamberini',
    media: {
      layout: 'stage',
      frame: 'figure',
      label: 'Grafi interattivi esportati con PyVis',
      items: [
        { name: 'settori', caption: 'Per settore', alt: 'Grafo di co-autorialità colorato per settore scientifico', ratio: 1388 / 684, sizes: [720, 1380] },
        { name: 'ruoli', caption: 'Per ruolo', alt: 'Grafo di co-autorialità colorato per ruolo accademico', ratio: 1388 / 684, sizes: [720, 1380] }
      ]
    },
    problem:
      'Come collaborano davvero i docenti di un dipartimento? Le pubblicazioni sono pubbliche, la struttura della rete no.',
    solution: [
      'Script di estrazione dalle API Scopus (pybliometrics) per profili autore e relazioni di co-autorialità, salvati in CSV riproducibili.',
      'Grafo costruito con NetworkX e misure di centralità per settore e ruolo accademico.',
      'Visualizzazioni interattive esportate in HTML con PyVis/vis-network. Progetto sviluppato in team di tre.'
    ],
    stack: ['Python', 'pybliometrics', 'Scopus API', 'NetworkX', 'PyVis', 'pandas', 'Matplotlib']
  },
  {
    id: 'asd',
    index: '08',
    title: 'Benchmark algoritmi di ordinamento',
    kind: 'Algoritmi & Strutture Dati · Misurazione',
    repo: 'https://github.com/andreagioiaa/progetto_ASD__',
    media: {
      layout: 'stage',
      frame: 'figure',
      label: 'Grafici delle misurazioni',
      items: [
        { name: 'loglog-n', caption: 'Tempo vs n', alt: 'Tempo di esecuzione al variare di n in scala log-log con pendenze stimate', ratio: 3 / 2 },
        { name: 'casi-peggiori', caption: 'Caso peggiore', alt: 'Confronto dei casi peggiori di QuickSort e QuickSort 3-way su array ordinato', ratio: 3 / 2 },
        { name: 'confronto', caption: 'Lineare vs log', alt: 'Confronto degli algoritmi in scala lineare e logaritmica con complessità teoriche', ratio: 4738 / 1744 },
        { name: 'complessita', caption: 'Dispersione', alt: 'Dispersione dei tempi misurati con rette di regressione per algoritmo', ratio: 1536 / 754 }
      ].map(m => ({ ...m, sizes: [720, 1400] }))
    },
    problem:
      'La complessità asintotica dice come scala un algoritmo, non quanto costa su input reali. Serve misurare.',
    solution: [
      'Implementazioni di QuickSort, QuickSort 3-way, Counting Sort e Radix Sort.',
      'Harness di misurazione dei tempi su input generati, aggregazione dei casi medi e peggiori in CSV.',
      'Confronto teoria/pratica con grafici e relazione in LaTeX.'
    ],
    stack: ['Python', 'pandas', 'Matplotlib', 'Jupyter', 'LaTeX']
  }
];
