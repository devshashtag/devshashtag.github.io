import { homeSkillTemplate, sidebarCategoryTemplate, sidebarItemTemplate, getJSON } from '/assets/js/modules/template.js';

const infoList = document.getElementById('skill');
const projectsList = document.getElementById('projects');

async function displaySkills() {
  const skillsAPI = '/assets/js/data/skills.json';
  const jsonData = await getJSON(skillsAPI);
  let delay = 0;

  for (const data of jsonData) {
    const header = `<h3>${data['category']}</h3>`;
    let skills = '';

    for (const item of data['items']) {
      skills += homeSkillTemplate(item, delay);
      delay += 0.1;
    }

    infoList.insertAdjacentHTML('beforeend', header + skills);
  }
}

async function displayProjects() {
  const projectsAPI = '/assets/js/data/projects.json';
  const jsonData = await getJSON(projectsAPI);

  for (const card of jsonData) {
    const categoryTeamWork = sidebarCategoryTemplate(card['category'], true);
    const categoryIndividual = sidebarCategoryTemplate(card['category'], false);

    let teamwork = '';
    let individual = '';

    for (const project of card['projects']) {
      if (project.teamwork) teamwork += sidebarItemTemplate(project);
      else individual += sidebarItemTemplate(project);
    }

    // categories
    if (teamwork) projectsList.insertAdjacentHTML('beforeend', categoryTeamWork + teamwork);
    if (individual) projectsList.insertAdjacentHTML('beforeend', categoryIndividual + individual);
  }
}

displaySkills();
displayProjects();
