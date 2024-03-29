// global templates
function headerMenuTemplate() {
  const currentPage = window.location.pathname.split('.')[0];
  const pages = [
    { name: 'home', url: '/' },
    { name: 'projects', url: '/projects.html' },
  ];

  let menuItems = '';

  for (const page of pages) {
    const isActive = currentPage == page.url.split('.')[0];

    menuItems += `
      <li${isActive ? ' class="active-item"' : ''}>
        <a href="${page.url}">${page.name}</a>
      </li>
    `;
  }

  return menuItems;
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
            <span>⊰</span>Devs<span>.</span>Hashtag<span>⊱</span>
          </a>
        </div>
      </div>
    </header>
  `;
}

// skills
function homeSkillTemplate(item, delay) {
  return `
    <!-- ${item.name} -->
    <li>
      <div class="home__label">${item.name}</div>
      <div class="progress-bar" style="--prog: ${item.progress}%; --delay: ${delay}s" title="${item.progress}"></div>
    </li>
  `;
}

// sidebar
function sidebarCategoryTemplate(name) {
  return `
    <!-- category -->
    <h3>${name}</h3>
  `;
}

function sidebarProjectTemplate(project) {
  if (!project?.pages) project.url = project.sources[0].url;

  return `
    <!-- project -->
    <li><a target="_blank" href="${project.url}">${project.name}</a></li>
  `;
}

// projects
function projectCategoryTemplate(name) {
  return `
    <!-- category -->
    <h2 class="category__name">${name}</h2>
  `;
}

function projectImagesTemplate(projectName, homeUrl, imageUrls) {
  let imagesHTML = '';

  for (const imageUrl of imageUrls) {
    imagesHTML += `
      <!-- image -->
      <img src="${imageUrl}" alt="${projectName}" loading="lazy" />
    `;
  }

  return imagesHTML;
}

function projectLinksTemplate(name, links, root) {
  if (!links?.length) return '';

  let linksTemplate = '<ul>';

  for (const link of links) {
    const url = link?.url !== undefined ? (root ?? '') + link.url : link.source;

    linksTemplate += `
      <!-- ${name} - ${link.name} -->
      <li><a href="${url}" target="_blank">${name} - ${link.name}</a></li>
    `;
  }

  return linksTemplate + '</ul>';
}

function projectCardTemplate(project) {
  const pages = projectLinksTemplate(project.name, project.pages, project.url);
  const sources = projectLinksTemplate(project.name, project.sources);

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
              ${projectImagesTemplate(project.name, project.url, project.images)}
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

export {
  headerTemplate,
  homeSkillTemplate,
  sidebarCategoryTemplate,
  sidebarProjectTemplate,
  projectCategoryTemplate,
  projectCardTemplate,
  getJSON,
};
