import { categoryTemplate, cardTemplate, getJSON } from '/assets/js/modules/template.js';

const projectsCategories = document.querySelector('.projects__categories');
const cardCategories = document.querySelector('.category__cards');

function setModalEvent() {
  projectsCategories.addEventListener('click', (e) => {
    try {
      const elm = e.target;
      const categoryCard = elm.closest('.category__card');
      const modalClose = categoryCard.querySelector('.modal__header button i');

      const modalToggles = [
        // modal - open
        elm.classList.contains('card__caption'),
        elm.parentElement.classList.contains('card__image'),
        // modal - close
        elm.classList.contains('card__modal'),
        elm === modalClose,
      ];

      // toggle modal
      if (modalToggles.includes(true)) {
        if (categoryCard.classList.contains('modal--active')) {
          categoryCard.classList.toggle('modal--active');
          document.body.classList.toggle('no-scroll');
        } else {
          document.body.classList.toggle('no-scroll');
          categoryCard.classList.toggle('modal--active');
        }
      }
    } catch (err) {
      return;
    }
  });
}

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
  cardCategories.insertAdjacentHTML('beforeend', categoryTeamWorkHTML + teamworkCardsHTML);

  // category solo
  const categorySoloHTML = categoryTemplate(category, false);
  const soloCardsHTML = solo.reduce((html, current) => html + current, '');
  cardCategories.insertAdjacentHTML('beforeend', categorySoloHTML + soloCardsHTML);
}

// set modal event
setModalEvent();
