import { projectCategoryTemplate, projectCardTemplate, getJSON } from '/assets/js/modules/template.js';
import { sliderControls } from '/assets/js/modules/slider.js';

const categoryCard = document.querySelector('.category__cards');

// display projects
const projectsAPI = '/assets/js/data/projects.json';
const jsonProjects = await getJSON(projectsAPI);

for (const data of jsonProjects) {
  const categoryTemplate = projectCategoryTemplate(data['category']);
  let projectsTemplate = '';

  for (const project of data['projects']) {
    projectsTemplate += projectCardTemplate(project);
  }

  if (!projectsTemplate) continue;
  categoryCard.insertAdjacentHTML('beforeend', categoryTemplate + projectsTemplate);
}

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

// controls
sliderControls();
