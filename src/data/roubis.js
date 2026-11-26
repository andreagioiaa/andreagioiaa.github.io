/**
 * Post Instagram di ASD Roubis mostrati nella galleria R&D.
 *
 * L'ordine dell'array è quello di visualizzazione: dal post più vecchio al più recente.
 * Per aggiungere un post:
 *  1. salva la foto in public/img/roubis/<id>-800.webp (lato lungo 800px);
 *  2. aggiungi qui una voce con descrizione (alt), link al post e,
 *     se nota, la data di pubblicazione (YYYY-MM-DD).
 *
 * Senza `url` il click porta al profilo; senza `date` non viene mostrata l'etichetta.
 */
export const ROUBIS_PROFILE = 'https://www.instagram.com/asdroubis/';

const posts = [
  { id: 'roubis-01', alt: 'Le prime maglie ASD Roubis, provate tutti insieme', date: null, url: null },
  { id: 'roubis-02', alt: 'Foto di squadra prima di una partita del torneo estivo', date: null, url: null },
  { id: 'roubis-03', alt: 'Brindisi sul campo a fine serata', date: null, url: null },
  { id: 'roubis-04', alt: 'Squadra e staff davanti alla porta, con il portiere in maglia rossa', date: null, url: null },
  { id: 'roubis-05', alt: 'Foto di gruppo notturna con le squadre di calcio e pallavolo', date: null, url: null }
];

export const roubisPosts = posts.map(p => ({ ...p, url: p.url || ROUBIS_PROFILE }));
export const roubisSrc = id => `/img/roubis/${id}-800.webp`;
