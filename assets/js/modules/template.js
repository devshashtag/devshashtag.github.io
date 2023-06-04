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

// home templates
function homeSkillsTemplate(items) {
  let itemsHTML = '';

  for (const item of items) {
    itemsHTML += `
      <!-- ${item.name} -->
      <li>
        <div class="info__text">${item.name}</div>
        <div class="progress-bar" style="--prog: ${item.progress}%" title="${item.progress}"></div>
      </li>
    `;
  }

  return itemsHTML;
}

// projects templates
function categoryTemplate(name, teamwork) {
  return `
    <!-- category -->
    <div class="category__name">${name}<span class="sep">-</span>${teamwork ? 'team work' : 'solo'}</div>
  `;
}

function imagesTemplate(projectName, homeUrl, imageUrls) {
  let imagesHTML = '';

  for (const imageUrl of imageUrls) {
    imagesHTML += `
      <a href="${homeUrl}" title="نمایش دمو" target="_blank">
        <img src="${imageUrl}" alt="${projectName} alt" />
      </a>
    `;
  }

  return imagesHTML;
}

function linksTemplate(projectName, pages, root) {
  let urlsHTML = '<ul>';

  for (const page of pages) {
    urlsHTML += `
      <li><a href="${(root ? root : '') + page.url}" target="_blank">${projectName} - ${page.name}</a></li>
    `;
  }

  return urlsHTML + '</ul>';
}

function cardTemplate(project) {
  return `
    <!-- card -->
    <div class="category__card">
      <div class="card__name">${project.name}</div>
      <div class="card__image">
        <img src="${project.images[0]}" alt="${project.name} alt" />
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
              ${imagesTemplate(project.name, project.url, project.images)}
          </div>
          <div class="modal__content">
            <h3>about</h3>
            <p>${project.description}</p>

            <h3>live demo pages</h3>
            ${linksTemplate(project.name, project.pages, project.url)}

            <h3>source code</h3>
            ${linksTemplate(project.name, project.sources)}
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

export { headerTemplate, homeSkillsTemplate, categoryTemplate, cardTemplate, getJSON };
