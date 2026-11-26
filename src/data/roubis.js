/**
 * Post Instagram di ASD Roubis mostrati nella galleria R&D.
 *
 * L'ordine dell'array è quello di visualizzazione.
 * Per aggiungere un post:
 *  1. salva la foto in public/img/roubis/<id>-800.webp (lato lungo 800px);
 *  2. aggiungi qui una voce con etichetta, descrizione (alt) e link al post.
 */
export const roubisPosts = [
  {
    id: 'annunciofondazione',
    label: 'Fondazione 2023',
    alt: 'Annuncio della fondazione: le prime maglie ASD Roubis',
    url: 'https://www.instagram.com/p/CuSSvY3LVFm/'
  },
  {
    id: 'mossa2023',
    label: 'Mossa 2023',
    alt: 'Brindisi sul campo a fine serata al torneo di Mossa',
    url: 'https://www.instagram.com/p/CwNhroMsXhn/'
  },
  {
    id: 'sanvaleriano2023',
    label: 'San Valeriano 2023',
    alt: 'Foto di squadra al torneo di San Valeriano',
    url: 'https://www.instagram.com/p/CuUoD6YsnRd/'
  },
  {
    id: 'sanvaleriano2025',
    label: 'San Valeriano 2025',
    alt: 'Squadra e staff davanti alla porta al torneo di San Valeriano',
    url: 'https://www.instagram.com/p/DXrAtuzD54E/'
  },
  {
    id: 'mossa2025',
    label: 'Mossa 2025',
    alt: 'Foto di gruppo notturna con le squadre di calcio e pallavolo al torneo di Mossa',
    url: 'https://www.instagram.com/p/DXt35VDAjg7/'
  }
];

export const roubisSrc = id => `/img/roubis/${id}-800.webp`;
