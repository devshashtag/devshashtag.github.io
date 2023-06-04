import { categoryTemplate, cardTemplate, getJSON } from '/assets/js/modules/template.js';

const categoryCard = document.querySelector('.category__cards');

// toggle card modal
categoryCard.addEventListener('click', function (e) {
  const elm = e.target;
  const card = elm.closest('.category__card');

  if (!card) return;

  const modalToggles = [
    // modal - open
    elm.classList.contains('card__name'),
    elm.parentElement.classList.contains('card__image'),
    // modal - close
    elm.classList.contains('card__modal'),
    elm.parentElement.classList.contains('modal__close'),
  ];

  // toggle modal
  if (modalToggles.includes(true)) {
    card.classList.toggle('modal--active');
    document.body.classList.toggle('no-scroll');
  }
});

const projectCardsAPI = '/assets/js/data/projects.json';
const projectCards = await getJSON(projectCardsAPI);

for (const card of projectCards) {
  const categoryTeamWork = categoryTemplate(card['category'], true);
  const categorySolo = categoryTemplate(card['category'], false);
  const projects = card['projects'];
  let teamwork = '';
  let solo = '';

  for (const project of projects) {
    if (project.teamwork) teamwork += cardTemplate(project);
    else solo += cardTemplate(project);
  }

  // categories
  categoryCard.insertAdjacentHTML('beforeend', categoryTeamWork + teamwork);
  categoryCard.insertAdjacentHTML('beforeend', categorySolo + solo);
}
