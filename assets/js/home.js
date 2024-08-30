import { homeSkillTemplate, getJSON } from '/assets/js/modules/template.js';

const skillList = document.getElementById('skill');

async function displaySkills() {
  const skills = await getJSON('/assets/js/data/skills.json');
  let delay = 0;

  for (const skill of skills) {
    let items = '';

    for (const item of skill.items) {
      items += homeSkillTemplate(item, delay);
      delay += 0.1;
    }

    skillList.insertAdjacentHTML('beforeend', `<h3>${skill.category}</h3>` + items);
  }
}

displaySkills();
