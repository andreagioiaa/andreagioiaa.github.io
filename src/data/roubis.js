/**
 * Post Instagram di ASD Roubis mostrati nella galleria R&D.
 *
 * Per aggiungere un post:
 *  1. salva la foto in public/img/roubis/<id>-800.webp (lato lungo ~800px);
 *  2. aggiungi qui una voce con la data di pubblicazione (YYYY-MM-DD),
 *     una descrizione per l'attributo alt e il link al post.
 *
 * L'ordine dell'array non conta: la galleria ordina per data, dal più vecchio.
 */
const posts = [
  // { id: '2022-san-valeriano', date: '2022-07-15', alt: 'Prima apparizione al torneo di San Valeriano', url: 'https://www.instagram.com/p/XXXXXXXXXXX/' },
];

export const roubisPosts = [...posts].sort((a, b) => a.date.localeCompare(b.date));
export const roubisSrc = id => `/img/roubis/${id}-800.webp`;
