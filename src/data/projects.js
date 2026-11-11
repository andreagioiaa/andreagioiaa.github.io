// Progetti reali dal profilo GitHub (github.com/andreagioiaa).
// Formato scheda: Problema → Soluzione architetturale → Tech Stack.

export const projects = [
  {
    id: 'pettracker',
    featured: true,
    index: '01',
    title: 'IoT PetTracker',
    kind: 'IoT end-to-end · Embedded → Cloud → Mobile',
    repo: 'https://github.com/andreagioiaa/IoT_PetTracker',
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
    id: 'studyflow',
    index: '02',
    title: 'StudyFlow',
    kind: 'Desktop app · Automazione Python',
    repo: 'https://github.com/andreagioiaa/StudyApp',
    problem:
      'Lo studio si frammenta tra calendario, PDF, videolezioni e notifiche. I tool esistenti vivono nel cloud e non bloccano davvero le distrazioni.',
    solution: [
      'App desktop offline-first: UI CustomTkinter, stato in SQLite locale, distribuita come singolo eseguibile PyInstaller.',
      'Timer Pomodoro su clock monotonic in un thread dedicato, indipendente dalla navigazione della UI.',
      'Blocco distrazioni a livello di sistema: sezione gestita del file hosts, kill dei processi in blacklist via psutil, listener loopback 80/443 (Host/SNI) e ripristino automatico su crash o heartbeat assente.',
      'Import .ics con ricorrenze RRULE/EXDATE e trascrizione locale delle videolezioni con whisper.cpp: nessun dato lascia la macchina.'
    ],
    stack: ['Python', 'CustomTkinter', 'SQLite', 'psutil', 'whisper.cpp', 'FFmpeg', 'icalendar', 'pytest', 'PyInstaller']
  },
  {
    id: 'calcool',
    index: '03',
    title: 'CAlcool',
    kind: 'Mobile app · Offline-first',
    repo: 'https://github.com/andreagioiaa/CAlcool',
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
    index: '04',
    title: 'Anatomia di un trasferimento',
    kind: 'Data Science · Analisi esplorativa',
    repo: 'https://github.com/andreagioiaa/Anatomia-di-un-trasferimento---Progetto-Data-Science',
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
    index: '05',
    title: 'Rete di co-autorialità DMIF',
    kind: 'Social Computing · Network analysis · Team',
    repo: 'https://github.com/andreagioiaa/Progetto-SocCom---2025-2026---Consegna-Gioia_Nicodemo_Gamberini',
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
    index: '06',
    title: 'Benchmark algoritmi di ordinamento',
    kind: 'Algoritmi & Strutture Dati · Misurazione',
    repo: 'https://github.com/andreagioiaa/progetto_ASD__',
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
