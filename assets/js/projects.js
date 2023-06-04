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
  const category = card['category'];
  const projects = card['projects'];

  let teamwork = [];
  let solo = [];

  for (const project of projects) {
    if (project.teamwork) {
      teamwork.push(cardTemplate(project));
    } else {
      solo.push(cardTemplate(project));
    }
  }

  // category teamwork
  const categoryTeamWorkHTML = categoryTemplate(category, true);
  const teamworkCardsHTML = teamwork.reduce((html, current) => html + current, '');
  categoryCard.insertAdjacentHTML('beforeend', categoryTeamWorkHTML + teamworkCardsHTML);

  // category solo
  const categorySoloHTML = categoryTemplate(category, false);
  const soloCardsHTML = solo.reduce((html, current) => html + current, '');
  categoryCard.insertAdjacentHTML('beforeend', categorySoloHTML + soloCardsHTML);
}
