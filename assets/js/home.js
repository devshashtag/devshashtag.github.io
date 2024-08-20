import { homeSkillTemplate, getJSON } from '/assets/js/modules/template.js';

const skillList = document.getElementById('skill');

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

    skillList.insertAdjacentHTML('beforeend', header + skills);
  }
}

displaySkills();
