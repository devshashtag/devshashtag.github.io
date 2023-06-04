import { homeSkillsTemplate, getJSON } from '/assets/js/modules/template.js';

const infoList = document.querySelector('section.home__info .info__list');
const skillsAPI = '/assets/js/data/skills.json';
const jsonData = await getJSON(skillsAPI);

for (const data of jsonData) {
  const header = `<h3>${data['category']}<h3>`;
  const skills = homeSkillsTemplate(data['items']);

  infoList.insertAdjacentHTML('beforeend', header + skills);
}
