import {
  homeSkillTemplate,
  sidebarCategoryTemplate,
  sidebarProjectTemplate,
  getJSON,
} from '/assets/js/modules/template.js';

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
  const jsonProjects = await getJSON(projectsAPI);

  for (const data of jsonProjects) {
    const categoryTemplate = sidebarCategoryTemplate(data['category']);
    let projectsTemplate = '';

    for (const project of data['projects']) {
      projectsTemplate += sidebarProjectTemplate(project);
    }

    if (!projectsTemplate) continue;
    projectsList.insertAdjacentHTML('beforeend', categoryTemplate + projectsTemplate);
  }
}

displaySkills();
displayProjects();
