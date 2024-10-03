const getJSON = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

// header
function headerMenuTemplate() {
  const currentPage = window.location.pathname.split('.')[0].replace('/index', '/');
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
        <nav class="header__menu">
          <div class="navbar-toggle"><span class="toggle-icon"></span></div>

          <ul class="menu__links">
            ${headerMenuTemplate()}
          </ul>
        </nav>
        <div class="header__brand">
          <a href="https://devshashtag.github.io" target="_blank">DevsHashtag</a>
        </div>
      </div>
    </header>
  `;
}

// skill
function homeSkillTemplate(item, delay) {
  return `
    <!-- ${item.name} -->
    <li>
      <div class="home__label">${item.name}</div>
      <div class="progress-bar" style="--prog: ${item.progress}%; --delay: ${delay}s" title="${item.progress}"></div>
    </li>
  `;
}

// category
function projectCategoryTemplate(name) {
  return `
    <!-- category -->
    <h2 class="category__name">${name}</h2>
  `;
}

function projectLinksTemplate(name, links, root = '') {
  if (!links?.length) return '';

  let linksTemplate = '<ul>';

  // localhost redirect to my github pages
  const isLocalHost = ['localhost', '127.0.0.1', '', '::1'].includes(window.location.hostname);

  if (root && root[0] === '/' && isLocalHost) {
    root = `https://devshashtag.github.io${root}`;
  }

  for (const { title, url } of links) {
    linksTemplate += `
      <!-- ${name} - ${title} -->
      <li><a href="${root + url}" target="_blank">${name} - ${title}</a></li>
    `;
  }

  return linksTemplate + '</ul>';
}

function projectCardTemplate(project) {
  const pages = projectLinksTemplate(project.name, project.pages, project.root);
  const sources = projectLinksTemplate(project.name, project.sources);

  return `
    <!-- card -->
    <div class="category__card">
      <div class="card__name">${project.name}</div>
      <div class="card__image">
        <img src="${project.image ?? ''}" alt="${project.name}" loading="lazy" />
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
            <img src="${project.image}" alt="${project.name}" loading="lazy" />
          </div>
          <div class="modal__content">
            <h3>about</h3>
            <p>${project.description}</p>
            ${pages.includes('li') ? `<h3>live demo</h3> ${pages}` : ''}
            ${sources.includes('li') ? `<h3>source code</h3> ${sources}` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
}

export { headerTemplate, homeSkillTemplate, projectCategoryTemplate, projectCardTemplate, getJSON };
