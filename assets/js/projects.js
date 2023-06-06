import { projectsCategoryTemplate, projectsCardTemplate, getJSON } from '/assets/js/modules/template.js';

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
  const categoryTeamWork = projectsCategoryTemplate(card['category'], true);
  const categorySolo = projectsCategoryTemplate(card['category'], false);
  const projects = card['projects'];
  let teamwork = '';
  let solo = '';

  for (const project of projects) {
    if (project.teamwork) teamwork += projectsCardTemplate(project);
    else solo += projectsCardTemplate(project);
  }

  // categories
  if (teamwork) categoryCard.insertAdjacentHTML('beforeend', categoryTeamWork + teamwork);
  if (solo) categoryCard.insertAdjacentHTML('beforeend', categorySolo + solo);
}
