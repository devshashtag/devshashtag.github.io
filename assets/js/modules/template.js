// global templates
function headerMenuTemplate() {
  const currentPage = window.location.pathname.split('.')[0];

  const pages = [
    { name: 'home', url: '/' },
    { name: 'projects', url: '/projects.html' },
  ];

  const menuItems = pages.map((page) => {
    const activeClass = currentPage == page.url.split('.')[0] ? ' class="active-item"' : '';
    return `
      <li${activeClass}><a href="${page.url}">${page.name}</a></li>
    `;
  });

  return menuItems.join('');
}

function headerTemplate() {
  return `
    <!-- header -->
    <header class="header">
      <div class="container">
        <!-- menu -->
        <nav class="header__menu">
          <!-- toggle -->
          <div class="navbar-toggle"><span class="toggle-icon"></span></div>

          <!-- links -->
          <ul class="menu__links">
            ${headerMenuTemplate()}
          </ul>
        </nav>
        <!-- brand -->
        <div class="header__brand">
          <a href="https://devshashtag.github.io" target="_blank">
            <span>⊰</span>
            Devs<span>.</span>Hashtag
            <span>⊱</span>
          </a>
        </div>
      </div>
    </header>
  `;
}

// skills
function homeSkillsTemplate(items) {
  let itemsHTML = '';

  for (const item of items) {
    itemsHTML += `
      <!-- ${item.name} -->
      <li>
        <div class="home__label">${item.name}</div>
        <div class="progress-bar" style="--prog: ${item.progress}%" title="${item.progress}"></div>
      </li>
    `;
  }

  return itemsHTML;
}

// sidebar
function sidebarCategoryTemplate(name, teamwork) {
  return `
    <!-- category -->
    <h3>${name} <span>-</span> ${teamwork ? 'team work' : 'individual'}</h3>
  `;
}

function sidebarItemTemplate(project) {
  return `<li><a target="_blank" href="${project.url}">${project.name}</a></li>`;
}

// projects
function projectsCategoryTemplate(name, teamwork) {
  return `
    <!-- category -->
    <div class="category__name">${name}<span>-</span>${teamwork ? 'team work' : 'individual'}</div>
  `;
}

function projectsImagesTemplate(projectName, homeUrl, imageUrls) {
  let imagesHTML = '';

  for (const imageUrl of imageUrls) {
    imagesHTML += `
      <a href="${homeUrl}" title="نمایش دمو" target="_blank">
        <img src="${imageUrl}" alt="${projectName}" loading="lazy" />
      </a>
    `;
  }

  return imagesHTML;
}

function projectsLinksTemplate(name, pages, root) {
  if (!pages || !pages.length || !pages[0]?.name) return '';

  let urlsHTML = '<ul>';

  for (const page of pages) {
    urlsHTML += `
      <li><a href="${(root ? root : '') + page.url}" target="_blank">${name} - ${page.name}</a></li>
    `;
  }

  return urlsHTML + '</ul>';
}

function projectsCardTemplate(project) {
  const pages = projectsLinksTemplate(project.name, project.pages, project.url);
  const sources = projectsLinksTemplate(project.name, project.sources);

  return `
    <!-- card -->
    <div class="category__card">
      <div class="card__name">${project.name}</div>
      <div class="card__image">
        <img src="${project.images[0]}" alt="${project.name}" loading="lazy" />
      </div>
      <div class="card__modal">
        <div class="modal__box">
          <div class="modal__header">
            <div class="modal__name">${project.name}</div>
            <button class="modal__close" title="بستن پنجره">
              <i class="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
          <div class="modal__image">
              ${projectsImagesTemplate(project.name, project.url, project.images)}
          </div>
          <div class="modal__content">
            <h3>about</h3>
            <p>${project.description}</p>

            ${pages.includes('li') ? `<h3>live demo pages</h3> ${pages}` : ''}

            ${sources.includes('li') ? `<h3>source code</h3> ${sources}` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
}

const getJSON = async (url) => {
  const response = await fetch(url);
  const jsonData = await response.json();

  return jsonData;
};

export { headerTemplate, homeSkillsTemplate, sidebarCategoryTemplate, sidebarItemTemplate, projectsCategoryTemplate, projectsCardTemplate, getJSON };
