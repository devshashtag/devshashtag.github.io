import { homeSkillTemplate, getJSON } from '/assets/js/modules/template.js';
// , sidebarCategoryTemplate, sidebarProjectTemplate

const infoList = document.getElementById('skill');
// const projectsList = document.getElementById('projects');

async function displaySkills() {
  const skillsAPI = '/assets/js/data/skills.json';
  const jsonData = await getJSON(skillsAPI);
  let delay = 0;

  for (const data of jsonData) {
    const header = `<h3>${data['category']}</h3>`;
    let skills = '';

    for (const item of data['items']) {
      skills += homeSkillTemplate(item, delay);
      delay += 0.5;
    }

    infoList.insertAdjacentHTML('beforeend', header + skills);
  }
}

// <!-- projects -->
// <section class="sidebar__projects">
// <h2 class="projects__header">projects</h2>
// <nav class="projects__list">
// <ul id="projects"></ul>
// </nav>
// </section>
//
// async function displayProjects() {
//   const projectsAPI = '/assets/js/data/projects.json';
//   const jsonProjects = await getJSON(projectsAPI);

//   for (const data of jsonProjects) {
//     const categoryTemplate = sidebarCategoryTemplate(data['category']);
//     let projectsTemplate = '';

//     for (const project of data['projects']) {
//       projectsTemplate += sidebarProjectTemplate(project);
//     }

//     if (!projectsTemplate) continue;
//     projectsList.insertAdjacentHTML('beforeend', categoryTemplate + projectsTemplate);
//   }
// }

displaySkills();
// displayProjects();
