/**
 * Foto delle gallerie R&D, ognuna collegata a un post esterno
 * (aperto dopo una conferma). L'ordine dell'array è quello di visualizzazione.
 *
 * Per aggiungere una foto: salvala in public/img/<cartella>/<nome>-800.webp
 * (lato lungo max 800px) e aggiungi una voce con dimensioni reali, alt e link.
 */
const IG = 'Instagram';
const LI = 'LinkedIn';

export const roubisPosts = [
  { src: '/img/roubis/annunciofondazione-800.webp', w: 450, h: 800, platform: IG,
    alt: 'Annuncio della fondazione: le prime maglie ASD Roubis', url: 'https://www.instagram.com/p/CuSSvY3LVFm/' },
  { src: '/img/roubis/mossa2023-800.webp', w: 600, h: 800, platform: IG,
    alt: 'Brindisi sul campo a fine serata al torneo di Mossa 2023', url: 'https://www.instagram.com/p/CwNhroMsXhn/' },
  { src: '/img/roubis/sanvaleriano2023-800.webp', w: 800, h: 600, platform: IG,
    alt: 'Foto di squadra al torneo di San Valeriano 2023', url: 'https://www.instagram.com/p/CuUoD6YsnRd/' },
  { src: '/img/roubis/sanvaleriano2025-800.webp', w: 800, h: 600, platform: IG,
    alt: 'Squadra e staff davanti alla porta al torneo di San Valeriano 2025', url: 'https://www.instagram.com/p/DXrAtuzD54E/' },
  { src: '/img/roubis/mossa2025-800.webp', w: 800, h: 600, platform: IG,
    alt: 'Foto di gruppo notturna con calcio e pallavolo al torneo di Mossa 2025', url: 'https://www.instagram.com/p/DXt35VDAjg7/' }
];

const HACKATHON_POST = 'https://www.linkedin.com/feed/update/urn:li:activity:7460974008205762562/';

export const hackathonPhotos = [
  { src: '/img/hackathon/hackathon-lavoro-800.webp', w: 800, h: 600, platform: LI,
    alt: 'I team al lavoro durante l’hackathon Clover Venture', url: HACKATHON_POST },
  { src: '/img/hackathon/hackathon-gruppo-800.webp', w: 480, h: 640, platform: LI,
    alt: 'Foto di gruppo con partecipanti e organizzatori dell’hackathon', url: HACKATHON_POST }
];
